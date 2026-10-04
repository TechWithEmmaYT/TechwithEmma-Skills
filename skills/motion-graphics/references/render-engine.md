# Render engine

## Contents

- [The render contract](#the-render-contract)
- [House rules file](#house-rules-file)
- [The film page](#the-film-page)
- [The capture loop](#the-capture-loop)
- [Motion blur without a renderer](#motion-blur-without-a-renderer)
- [Determinism check](#determinism-check)
- [Format-aware layout](#format-aware-layout)
- [Speed and scale](#speed-and-scale)
- [When to use a framework instead](#when-to-use-a-framework-instead)

## The render contract

The page exposes one function. `window.seek(t)` paints the complete frame for time `t` in seconds and returns when the frame is ready. Everything else follows from that:

- No state carried between frames. Calling `seek(9.5)` straight after `seek(0.1)` must produce the same pixels as playing through.
- No CSS transitions or animations, no `setTimeout`, no `setInterval`, no `requestAnimationFrame` while rendering.
- No `Math.random`, no `Date.now`, no network calls during a frame. Seeded noise only.
- Fonts and images load once before the first frame and are awaited.
- Time is the only input. A value that changes must be a function of `t`.

The payoff is that any frame can be rendered independently, a fix costs one line plus a re-render of the affected seconds, two runs produce byte-identical output, and the render never drifts off the audio.

## House rules file

Write this into `motion/CLAUDE.md` so later sessions inherit it:

```markdown
# Motion studio rules

## Render contract
- Every film is a pure function of time: `window.seek(t)` paints frame t.
- No CSS transitions, no timers, no rAF in render mode, no state between frames.
- Seeded noise (mulberry32) only, never Math.random.
- Render with `node render.mjs`, encode H.264 yuv420p, CRF 16.

## Look
- Banned: centred title on a gradient, everything fading in, corner labels,
  frame borders, glow on UI chrome, generic particle bursts.
- One display face, one UI face. One accent colour unless the brief says otherwise.
- Something new happens every 2 to 4 seconds.

## Sound
- Score and SFX synthesized in code unless a track is supplied.
- Hits land on the measured beat grid (audio/beats.json). Master to -14 LUFS.

## Gate before showing anything
1. Render a contact sheet and look at it.
2. Score hook, readability at 360px, motion, variety, brand accuracy, sound sync.
3. Fix the three worst problems. Repeat until every score is 8+.
4. Only then run the full render.
```

## The film page

`index.html` is one file with one canvas. Scenes are objects with a time window and a `draw` that receives time local to the scene, which keeps each shot independently editable.

```html
<style>html,body{margin:0;background:#0A0A0A;overflow:hidden}canvas{display:block}</style>
<canvas id="c" width="1080" height="1920"></canvas>
<script type="module">
import { spring, track, rng, clamp } from './lib/motion.js';

const W = 1080, H = 1920, DUR = 20;
const g = document.getElementById('c').getContext('2d');

const SCENES = [
  { from: 0, to: 3, draw(t) {                      // kinetic statement
      const s = spring(t - 0.1, 320, 30);          // snappy: settles by 0.32s
      g.save();
      g.translate(W / 2, H / 2);
      g.scale(0.92 + 0.08 * s, 0.92 + 0.08 * s);
      g.globalAlpha = clamp(t * 5);
      g.fillStyle = '#F2F0EB';
      g.font = '700 190px "Inter", sans-serif';
      g.textAlign = 'center';
      g.fillText('SHIP FASTER', 0, 0);
      g.fillStyle = '#D97757';
      g.fillRect(-320 * s, 56, 640 * s, 14);       // accent rule draws itself
      g.restore();
  }},
  { from: 3, to: 6, draw(t) {                      // staggered grid
      const r = rng(7);
      for (let i = 0; i < 48; i++) {
        const x = (i % 6) * 170 + 115, y = (i / 6 | 0) * 170 + 420;
        const s = spring(t - i * 0.03 - r() * 0.1, 260, 20);
        g.fillStyle = i % 7 ? '#F2F0EB' : '#D97757';
        g.fillRect(x - 60 * s, y - 60 * s, 120 * s, 120 * s);
      }
  }},
];

function draw(t) {
  g.fillStyle = '#0A0A0A';
  g.fillRect(0, 0, W, H);
  for (const s of SCENES) if (t >= s.from && t < s.to) s.draw(t - s.from);
}

window.seek = (t) => { draw(t); return true; };

// Live preview in a normal browser only; never runs under the renderer.
if (!navigator.webdriver) {
  const t0 = performance.now();
  (function loop() { draw(((performance.now() - t0) / 1000) % DUR); requestAnimationFrame(loop); })();
}
</script>
```

Keep scenes in `scenes/*.js` once the file passes roughly 400 lines, and import them into one `SCENES` array. One giant file becomes unfixable around shot twelve.

Preload fonts and images before the first frame and expose a readiness promise the renderer awaits. Canvas text silently falls back to a system face when a webfont has not loaded, which is invisible in preview and ruins every frame of the render.

## The capture loop

`render.mjs` walks time, screenshots the canvas, and pipes PNGs straight into ffmpeg. Nothing is written to disk between the two.

```js
// node render.mjs --fps 60 --dur 20 --sub 4 --w 1080 --h 1920 --out out/silent.mp4
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync, createReadStream } from 'node:fs';
import { createServer } from 'node:http';
import { resolve, extname } from 'node:path';

const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
const FPS = +arg('fps', 60), DUR = +arg('dur', 20), SUB = +arg('sub', 4);
const WIDTH = +arg('w', 1080), HEIGHT = +arg('h', 1920), OUT = arg('out', 'out/silent.mp4');
mkdirSync('out', { recursive: true });

// Serve over localhost. A page loaded from file:// cannot import ES modules —
// Chrome treats it as an opaque origin and CORS blocks every `import`, so
// window.seek is never defined and the render dies in waitForFunction.
const server = createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const file = resolve(process.cwd(), rel);
  if (!file.startsWith(process.cwd())) { res.writeHead(403).end(); return; }
  const type = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
    '.css': 'text/css', '.json': 'application/json', '.png': 'image/png',
    '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2' }[extname(file)] || 'application/octet-stream';
  createReadStream(file).on('error', () => res.writeHead(404).end())
    .once('open', () => res.writeHead(200, { 'Content-Type': type })).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;

// Falls back to an installed Chrome when the Chromium download is unavailable.
let browser;
try { browser = await chromium.launch(); }
catch { browser = await chromium.launch({ channel: 'chrome' }); }
const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 1 });
page.on('pageerror', (e) => { console.error('page error:', e.message); process.exit(1); });
await page.goto(origin + '/index.html');
await page.evaluate(() => document.fonts.ready);
await page.waitForFunction(() => typeof window.seek === 'function');

const vf = `tmix=frames=${SUB},select='eq(mod(n\\,${SUB})\\,${SUB - 1})',setpts=N/${FPS}/TB`;
const ff = spawn('ffmpeg', ['-y', '-f', 'image2pipe', '-framerate', String(FPS * SUB), '-i', '-',
  ...(SUB > 1 ? ['-vf', vf] : []), '-r', String(FPS),
  '-c:v', 'libx264', '-crf', '16', '-preset', 'slow', '-pix_fmt', 'yuv420p', OUT],
  { stdio: ['pipe', 'inherit', 'inherit'] });

const total = Math.round(DUR * FPS * SUB);
for (let i = 0; i < total; i++) {
  await page.evaluate((t) => window.seek(t), i / (FPS * SUB));
  const png = await page.locator('#c').screenshot({ type: 'png' });
  if (!ff.stdin.write(png)) await new Promise((r) => ff.stdin.once('drain', r));
  if (i % (FPS * SUB) === 0) console.log(`${(i / (FPS * SUB)).toFixed(0)}s / ${DUR}s`);
}
ff.stdin.end();
await new Promise((r) => ff.on('close', r));
await browser.close();
server.close();
```

**Serve the page; never open it from `file://`.** This is the first thing that breaks for anyone following this skill. Chrome gives a `file://` page an opaque origin, so every ES module `import` is blocked by CORS, `window.seek` is never defined, and the render hangs in `waitForFunction` with no obvious cause. The same applies to the determinism check below and to any `fetch` of a local JSON beat grid. A single inline `<script>` with no imports is the only case that works from `file://`, and the moment the film grows past one file it stops working.

Fail loudly on a page error, and handle the encoder exiting non-zero or the pipe backpressuring rather than reporting success when ffmpeg died mid-stream. A silent exception inside `seek` produces a video of a frozen or blank frame, discovered only after the whole render.

When the film composites over video, `seek(t)` must return a promise and the renderer must await it, so the capture waits for the source frame to decode. Drawing before `seeked` resolves captures the previous frame, which shows up as a one-frame stutter scattered through the export.

Add `--from` and `--to` arguments once the film is long. Re-rendering six seconds after a fix instead of sixty is the difference between three critique rounds and one.

## Motion blur without a renderer

Render `SUB` subframes per output frame, average each group, and keep one. `tmix` does the averaging, `select` keeps the last of each group, `setpts` rewrites timestamps to the output rate. Verified: 480 subframes at 240 fps through this chain produce exactly 120 frames and 2.000 s at 60 fps.

Use `--sub 4` for fast camera moves and whip transitions, `--sub 2` for ordinary UI motion, and `--sub 1` for drafts and animatics — the subframe count multiplies render time directly.

Those are starting points; the real rule is measured. Blur works when the subframe step is small relative to the thinnest stroke on screen. Take the fastest element's travel in pixels per output frame, divide by `SUB` to get the step, and compare it to the thinnest stroke you need to stay readable — on 1080p UI text that is about 3 px. A step more than roughly 2–3× that stroke renders as separate resolvable copies rather than blur, which looks like a stutter, not a pan.

Worked example: a pan travelling 19 px per frame at `--sub 4` steps 4.8 px, which smears 3 px letterforms into four visible ghosts. Doubling to `--sub 8` fixes it and doubles an already long render. Re-cropping the asset so the pan travels 12 px per frame fixes it for free. **Shortening or slowing the move is almost always cheaper than buying subframes** — check the displacement before raising `SUB`.

One caveat: because each output frame averages its own group of subframes, a hard cut that falls inside a group produces one frame blending both shots. That is correct shutter behaviour, but it reads as a glitch on a fast cut. Place hard cuts on output-frame boundaries — round every cut time to a multiple of `1 / FPS` when building the shotlist — so the shutter never straddles one.

## Determinism check

Hashing two whole MP4s is a weak test: it compares encoder output rather than the renderer, and it never exercises the failure that actually happens — a frame that differs depending on which frames were drawn before it. Test the page directly, comparing decoded pixels at the same timestamps after seeking out of order.

```js
// node check-determinism.mjs
import { chromium } from 'playwright';
import { createHash } from 'node:crypto';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
await page.goto(origin + '/index.html');   // same localhost server as render.mjs
await page.evaluate(() => document.fonts.ready);

const shot = async (t) => {
  await page.evaluate((x) => window.seek(x), t);
  return createHash('sha256').update(await page.locator('#c').screenshot()).digest('hex');
};

const probes = [0.5, 2.0, 4.25, 9.5, 14.75];
const inOrder = [];
for (const t of probes) inOrder.push(await shot(t));          // sequential pass
const shuffled = [...probes].reverse();
const outOfOrder = new Map();
for (const t of shuffled) outOfOrder.set(t, await shot(t));   // reverse pass
await page.reload();                                          // cold pass
await page.evaluate(() => document.fonts.ready);
const cold = [];
for (const t of probes) cold.push(await shot(t));

probes.forEach((t, i) => {
  const ok = inOrder[i] === outOfOrder.get(t) && inOrder[i] === cold[i];
  console.log(`${ok ? 'OK  ' : 'FAIL'} t=${t}`);
});
await browser.close();
```

A failure means a timer, a `Math.random`, a module-scope generator that advances per call, a cached value, or a canvas not fully cleared. All four are invisible in preview and ruin a render.

## Format-aware layout

Scenes read positions from a layout module so one timeline produces every aspect ratio. Never hardcode a pixel coordinate in a scene, and never crop a wide render to vertical.

```js
// lib/layout.js
export function layout(W, H) {
  const vertical = H > W, square = Math.abs(W - H) < 1;
  const gutter = Math.round(W * (vertical ? 0.08 : 0.06));
  return {
    W, H, vertical, gutter,
    safe: { l: gutter, r: W - gutter, w: W - gutter * 2 },
    cx: W / 2,
    titleY: vertical ? H * 0.38 : H * 0.44,
    display: Math.round(W * (vertical ? 0.115 : 0.072)),   // headline size
    body: Math.round(W * (vertical ? 0.042 : 0.026)),
    uiScale: vertical ? 0.78 : 1,                           // product UI shrinks in 9:16
    columns: vertical ? 1 : square ? 2 : 3,
  };
}
```

Render the formats in parallel, each to its own file:

```bash
node render.mjs --w 1080 --h 1920 --out out/vertical.mp4 &
node render.mjs --w 1080 --h 1080 --out out/square.mp4 &
node render.mjs --w 1920 --h 1080 --out out/wide.mp4 &
wait
```

## Speed and scale

Take the frame rate from the brief instead of always reaching for 60. 60 fps earns its cost on fast camera moves and UI motion; 30 is right for narration-led short form and halves both render time and file size; 24 reads as deliberately cinematic and suits a character- or story-led piece; an edit over existing footage should match its source. Shipped launch films use all four.

A 20-second 1080x1920 film at 60 fps with 4 subframes is 4,800 screenshots and typically 8–20 minutes. Keep drafts at 960x540, 30 fps, `--sub 1` until the shotlist is settled; that is roughly 30 seconds per pass and makes the critique loop affordable.

If a frame takes more than about 60 ms, the cost is usually shadow blur, large `filter` values, or re-rasterising the same image every frame. Pre-render static layers to an offscreen canvas once, outside `seek`.

Never use `will-change` on anything the camera scales — it rasterises at the pre-scale size and the text renders blurry.

## When to use a framework instead

Plain canvas plus Playwright has zero dependencies and total control, and is the right default. Switch when the user asks, or when the shape of the work demands it:

- **Remotion** (React) for a series, a template others will reuse, or data-driven videos where the content changes but the film does not. Preview with `npx remotion studio`, render with `npx remotion render`.
- **HyperFrames** (HTML + GSAP) when the film is essentially a web page with choreography, or when the team already thinks in DOM and CSS.

Both still need the same discipline: deterministic time, springs instead of easing curves, a beat grid, and a critique loop. Say which route is in use before building, because switching later means rewriting every scene.

Check each framework's current documentation before running its commands rather than copying setup lines from an article; both projects have changed their CLI, and Remotion's spring options in particular differ by version. Never install a second framework to satisfy this skill — if the project has neither, route A needs nothing beyond Playwright.
