import { existsSync, mkdirSync, copyFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const PUBLIC = 'public';
const BACKUP = join('storage', 'app', 'project-image-originals');
const MAX = 1400; // keep current dimensions (sources are ~1536 max) — no softening.

// Every project image. WebP is generated for all; the PNG originals stay on disk
// (AIResume.png is still served full-quality by the footer/hero download links).
const FILES = [
    'BL.png',
    'HKE.png',
    'AIAssistant.png',
    'Uplifta.png',
    'Uplifta2.png',
    'Uplifta3.png',
    'VibyraApp.png',
    'ChatoraAI.png',
    'AccountantAI.png',
    'ChessAI.png',
    'DroneScanAI.png',
    'Till.png',
    'AIResume.png',
];

const kb = (n) => `${(n / 1024).toFixed(0)}KB`;
mkdirSync(BACKUP, { recursive: true });

let beforeTotal = 0;
let afterTotal = 0;

for (const name of FILES) {
    const pngPath = join(PUBLIC, name);
    if (!existsSync(pngPath)) {
        console.log(`SKIP  ${name} (not found)`);
        continue;
    }

    // Pristine source: prefer the backup; otherwise back up the current file now.
    const backup = join(BACKUP, name);
    if (!existsSync(backup)) copyFileSync(pngPath, backup);

    // Restore the PNG in public from the pristine backup (undo earlier in-place resize).
    copyFileSync(backup, pngPath);

    const webpPath = pngPath.replace(/\.png$/i, '.webp');
    const meta = await sharp(backup).metadata();
    const beforeSize = statSync(pngPath).size;

    await sharp(backup)
        .resize({ fit: 'inside', height: MAX, width: MAX, withoutEnlargement: true })
        .webp({ alphaQuality: 100, effort: 6, quality: 86 })
        .toFile(webpPath);

    const afterSize = statSync(webpPath).size;
    beforeTotal += beforeSize;
    afterTotal += afterSize;
    console.log(
        `OK    ${name.padEnd(18)} ${meta.width}x${meta.height}  ${kb(beforeSize)} png -> ${kb(afterSize)} webp  (${(beforeSize / afterSize).toFixed(1)}x smaller)`,
    );
}

console.log(
    `\nTOTAL ${kb(beforeTotal)} -> ${kb(afterTotal)}  (saved ${kb(beforeTotal - afterTotal)}, ${(beforeTotal / afterTotal).toFixed(1)}x smaller)`,
);
console.log(`PNG originals preserved in public/ and backed up in ${BACKUP}/`);
