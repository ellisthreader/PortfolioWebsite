/**
 * Renders project screens into responsive AVIF + WebP sets.
 *
 *   resources/images/work/<slug>/<name>.png  →  public/images/work/<slug>/<name>-<width>.{avif,webp}
 *
 * and writes resources/content/images.json, which the Laravel side reads to
 * build srcsets with intrinsic sizes. Re-run after adding or replacing a screen:
 *
 *   node scripts/build-work-images.mjs
 */
import { mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import sharp from 'sharp';

const SOURCE = 'resources/images/work';
const OUTPUT = 'public/images/work';
const MANIFEST = 'resources/content/images.json';
const WIDTHS = [480, 960, 1440, 1920, 2560];
// The widest slot on the site (a gallery screen on a 2x display) needs about 2200px.
const MAX_WIDTH = 2560;
const EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp']);

const manifest = {};
let rendered = 0;

rmSync(OUTPUT, { recursive: true, force: true });

for (const slug of readdirSync(SOURCE).sort()) {
    const dir = join(SOURCE, slug);

    if (slug.startsWith('_') || !statSync(dir).isDirectory()) {
        continue;
    }

    mkdirSync(join(OUTPUT, slug), { recursive: true });

    for (const file of readdirSync(dir).sort()) {
        const extension = extname(file).toLowerCase();

        if (!EXTENSIONS.has(extension)) {
            continue;
        }

        const name = basename(file, extname(file));
        const input = join(dir, file);
        const { width, height } = await sharp(input).metadata();
        const largest = Math.min(width, MAX_WIDTH);
        const widths = WIDTHS.filter((candidate) => candidate < largest);

        widths.push(largest);

        for (const target of widths) {
            const base = join(OUTPUT, slug, `${name}-${target}`);
            const pipeline = sharp(input).resize({ width: target, withoutEnlargement: true });

            await pipeline.clone().avif({ quality: 58, effort: 5 }).toFile(`${base}.avif`);
            await pipeline.clone().webp({ quality: 80, effort: 5 }).toFile(`${base}.webp`);
            rendered += 2;
        }

        manifest[`${slug}/${name}`] = { width, height, widths };
        console.log(`${slug}/${name}  ${width}×${height}  → ${widths.join(', ')}`);
    }
}

writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 4)}\n`);
console.log(`\n${Object.keys(manifest).length} images, ${rendered} files written.`);
