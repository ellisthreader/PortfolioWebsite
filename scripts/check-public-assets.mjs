import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const sourceFiles = execFileSync(
    'git',
    [
        'ls-files',
        'resources/js/**/*.ts',
        'resources/js/**/*.tsx',
        'resources/css/**/*.css',
    ],
    { encoding: 'utf8' },
)
    .split('\n')
    .filter(Boolean);

const trackedFiles = new Set(
    execFileSync('git', ['ls-files'], { encoding: 'utf8' })
        .split('\n')
        .filter(Boolean),
);

const assetExtensions = String.raw`(?:webp|png|jpe?g|gif|svg|mp4|webm|glb|gltf|ico)`;
const publicAssetPattern = new RegExp(
    String.raw`publicAsset\(\s*['"\`](/[^'"\`]+\.${assetExtensions})['"\`]`,
    'gi',
);
const absoluteAssetPattern = new RegExp(
    String.raw`['"\`](/[^'"\`]+\.${assetExtensions})['"\`]`,
    'gi',
);

const references = new Map();

for (const file of sourceFiles) {
    const contents = readFileSync(file, 'utf8');

    collectMatches(publicAssetPattern, contents, file);
    collectMatches(absoluteAssetPattern, contents, file);
}

const missing = [];
const untracked = [];

for (const [assetPath, files] of [...references].sort(([a], [b]) => a.localeCompare(b))) {
    const relativePath = join('public', assetPath.slice(1));

    if (! existsSync(relativePath)) {
        missing.push({ assetPath, files });

        continue;
    }

    if (! trackedFiles.has(relativePath)) {
        untracked.push({ assetPath, files });
    }
}

if (missing.length || untracked.length) {
    if (missing.length) {
        console.error('Missing public assets:');
        printFindings(missing);
    }

    if (untracked.length) {
        console.error('Untracked public assets referenced by the site:');
        printFindings(untracked);
    }

    process.exit(1);
}

console.log(`Verified ${references.size} referenced public assets.`);

function collectMatches(pattern, contents, file) {
    pattern.lastIndex = 0;

    for (const match of contents.matchAll(pattern)) {
        const files = references.get(match[1]) ?? new Set();

        files.add(file);
        references.set(match[1], files);
    }
}

function printFindings(findings) {
    for (const { assetPath, files } of findings) {
        console.error(`- ${assetPath}`);

        for (const file of files) {
            console.error(`  referenced by ${file}`);
        }
    }
}
