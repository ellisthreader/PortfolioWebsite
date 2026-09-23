/**
 * Renders the 1200×630 link-preview cards in public/og/ with headless Chrome,
 * so they use the site's real typeface and project screens.
 *
 *   node scripts/build-og-images.mjs
 *
 * Run after `npm run images`. Set CHROME_PATH if Chrome isn't in the default macOS location.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer-core';

const ROOT = resolve('.');
const OUT = resolve('public/og');
const TMP = resolve('storage/framework/og.html');
const CHROME =
    process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const projects = JSON.parse(readFileSync('resources/content/projects.json', 'utf8')).filter(
    (project) => !project.hidden,
);
const media = JSON.parse(readFileSync('resources/content/project-media.json', 'utf8'));
const images = JSON.parse(readFileSync('resources/content/images.json', 'utf8'));

const TONES = {
    porcelain: '#e8eae6',
    mist: '#dfe5e9',
    stone: '#e6e3de',
    graphite: '#1c1f22',
    moss: '#173f33',
};

const file = (path) => pathToFileURL(resolve(ROOT, path)).href;
const font = file('resources/fonts/mona-sans-latin-wdth.woff2');

function screen(key) {
    const entry = images[key];

    if (!entry) {
        return null;
    }

    const width = entry.widths.find((candidate) => candidate >= 1440) ?? entry.widths.at(-1);

    return file(`public/images/work/${key}-${width}.webp`);
}

const escape = (text) =>
    text.replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[char]);

function page(body) {
    return `<!doctype html><html><head><meta charset="utf-8"><style>
        @font-face { font-family: 'Mona Sans'; src: url('${font}') format('woff2'); font-weight: 200 900; font-stretch: 75% 125%; }
        * { box-sizing: border-box; margin: 0; }
        body { width: 1200px; height: 630px; overflow: hidden; background: #f4f5f3; color: #15171a;
               font-family: 'Mona Sans', sans-serif; -webkit-font-smoothing: antialiased; position: relative; }
        .mark { position: absolute; top: 56px; left: 64px; font-size: 26px; font-weight: 620; font-stretch: 112%; letter-spacing: -0.02em; }
        .title { font-weight: 640; font-stretch: 125%; letter-spacing: -0.045em; line-height: 0.92; }
        .muted { color: #5c6168; }
        .plate { position: absolute; top: 132px; left: 612px; width: 720px; height: 560px; border-radius: 22px; overflow: hidden; }
        .window { position: absolute; top: 56px; left: 56px; width: 760px; border-radius: 10px 10px 0 0; overflow: hidden; background: #fff;
                  box-shadow: 0 1px 2px rgb(21 23 26 / .06), 0 12px 32px -8px rgb(21 23 26 / .18), 0 40px 80px -24px rgb(21 23 26 / .22); }
        .bar { height: 26px; border-bottom: 1px solid #dfe1dd; }
        .window.dark, .window.dark .bar { background: #1d2024; border-color: rgb(255 255 255 / .08); }
        .window img { display: block; width: 100%; }
        .dot { display: inline-block; width: 12px; height: 12px; border-radius: 99px; background: #0e5a45; margin-right: 14px; }
    </style></head><body>${body}</body></html>`;
}

function projectCard(project) {
    const cover = media[project.slug]?.cover ?? {};
    const toneName = media[project.slug]?.tone ?? 'porcelain';
    const tone = TONES[toneName];
    const dark = toneName === 'graphite' || toneName === 'moss';
    const shot = screen(cover.desktop ?? cover.image ?? '');
    const titleSize = project.title.length > 16 ? 72 : 88;

    return page(`
        <div class="mark">Ellis Threader</div>
        <div style="position:absolute; left:64px; bottom:64px; width:${shot ? 520 : 1000}px;">
            <div class="title" style="font-size:${titleSize}px">${escape(project.title)}</div>
            <p class="muted" style="margin-top:28px; font-size:27px; line-height:1.35; max-width:${shot ? 500 : 860}px">${escape(project.summary)}</p>
        </div>
        ${
            shot
                ? `<div class="plate" style="background:${tone}"><div class="window${dark ? ' dark' : ''}"><div class="bar"></div><img src="${shot}"></div></div>`
                : ''
        }
    `);
}

function defaultCard() {
    return page(`
        <div style="position:absolute; left:64px; right:64px; top:180px;">
            <div class="title" style="font-size:150px">Ellis Threader</div>
            <p style="margin-top:44px; font-size:36px; line-height:1.3; max-width:900px;">
                Software engineer in London. I design and build web platforms, AI voice systems and mobile apps.
            </p>
        </div>
        <p class="muted" style="position:absolute; left:64px; bottom:60px; font-size:26px;"><span class="dot"></span>ellisthreader.com</p>
    `);
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--allow-file-access-from-files'] });
const tab = await browser.newPage();

await tab.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

const cards = [['default', defaultCard()], ...projects.map((project) => [project.slug, projectCard(project)])];

for (const [name, html] of cards) {
    writeFileSync(TMP, html);
    await tab.goto(pathToFileURL(TMP).href, { waitUntil: 'networkidle0' });
    await tab.evaluate(() => document.fonts.ready);
    await tab.screenshot({ path: `${OUT}/${name}.png`, type: 'png' });
    console.log(`public/og/${name}.png`);
}

rmSync(TMP, { force: true });
await browser.close();
