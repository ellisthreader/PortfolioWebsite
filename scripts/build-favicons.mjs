import { Buffer } from 'node:buffer';
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const source = await readFile(new URL('../public/favicon.svg', import.meta.url));
const output = new URL('../public/', import.meta.url);

const png = (svg, size) => sharp(svg).resize(size, size).png().toBuffer();

const searchIcon = await png(source, 192);
await writeFile(new URL('favicon.png', output), searchIcon);
await writeFile(new URL('ellis-threader-icon.png', output), searchIcon);

// iOS applies its own corner mask to touch icons.
const touchSource = Buffer.from(source.toString().replace('rx="14"', 'rx="0"'));
await writeFile(new URL('apple-touch-icon.png', output), await png(touchSource, 180));

const sizes = [16, 32, 48, 64];
const images = await Promise.all(sizes.map((size) => png(source, size)));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);

let offset = header.length;

for (const [index, image] of images.entries()) {
    const entry = 6 + index * 16;
    header.writeUInt8(sizes[index], entry);
    header.writeUInt8(sizes[index], entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(image.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += image.length;
}

await writeFile(new URL('favicon.ico', output), Buffer.concat([header, ...images]));
