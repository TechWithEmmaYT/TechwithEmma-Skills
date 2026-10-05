#!/usr/bin/env node
// Measure a film's dynamic range, pacing and sound density. ffmpeg only, no deps.
// Why the numbers matter: references/review.md
//
//   node scripts/measure_film.mjs out/final.mp4 [reference.mp4 ...]

import { spawnSync } from 'node:child_process';
import { readFileSync, rmSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const files = process.argv.slice(2);
if (!files.length) {
  console.error('usage: node scripts/measure_film.mjs <film.mp4> [reference.mp4 ...]');
  process.exit(1);
}

const run = (cmd, args, cwd) =>
  spawnSync(cmd, args, { encoding: 'utf8', maxBuffer: 1 << 28, cwd });

function probe(file) {
  const r = run('ffprobe', ['-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=r_frame_rate', '-show_entries', 'format=duration',
    '-of', 'default=nw=1:nk=1', file]);
  const [fpsRaw, dur] = r.stdout.trim().split('\n');
  const [n, d] = (fpsRaw || '30/1').split('/').map(Number);
  return { fps: n / (d || 1), dur: parseFloat(dur) };
}

// ffmpeg's `scene` value: how different each frame is from the one before it, 0..1.
function changeScores(file, tmp) {
  // Run FROM tmp with a bare filename — in a filter graph ':' and '\' are separators,
  // so a Windows path like C:\Users\... cannot be passed to metadata=print:file=.
  run('ffmpeg', ['-v', 'error', '-i', resolve(file), '-vf',
    "select='gte(scene,0)',metadata=print:file=scene.txt", '-an', '-f', 'null', '-'], tmp);
  let txt = '';
  try { txt = readFileSync(join(tmp, 'scene.txt'), 'utf8'); } catch { return []; }
  const res = []; let t = 0;
  for (const line of txt.split('\n')) {
    let m = line.match(/pts_time:([\d.]+)/); if (m) { t = parseFloat(m[1]); continue; }
    m = line.match(/lavfi\.scene_score=([\d.]+)/); if (m) res.push([t, parseFloat(m[1])]);
  }
  return res;
}

function envelope(file, tmp) {
  const wav = join(tmp, 'a.wav');
  run('ffmpeg', ['-v', 'error', '-y', '-i', resolve(file), '-ac', '1', '-ar', '16000', wav]);
  let b; try { b = readFileSync(wav); } catch { return null; }
  let off = 12, dataOff = -1, dataLen = 0, sr = 16000;
  while (off < b.length - 8) {
    const id = b.toString('ascii', off, off + 4), sz = b.readUInt32LE(off + 4);
    if (id === 'fmt ') sr = b.readUInt32LE(off + 12);
    if (id === 'data') { dataOff = off + 8; dataLen = sz; break; }
    off += 8 + sz + (sz & 1);
  }
  if (dataOff < 0) return null;
  const n = Math.floor(dataLen / 2), hop = Math.floor(sr / 100), env = [];
  for (let i = 0; i + hop <= n; i += hop) {
    let s = 0;
    for (let j = 0; j < hop; j++) { const v = b.readInt16LE(dataOff + (i + j) * 2) / 32768; s += v * v; }
    env.push(Math.sqrt(s / hop));
  }
  return env;
}

const pct = (a, p) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length * p)] ?? 0; };

function measure(file) {
  const tmp = mkdtempSync(join(tmpdir(), 'measure-'));
  try {
    const { fps, dur } = probe(file);
    const sc = changeScores(file, tmp);
    if (!sc.length) throw new Error('no frames decoded');
    const vals = sc.map((x) => x[1]);
    const peak = Math.max(...vals), med = pct(vals, 0.5);

    const thresh = Math.max(0.08, med * 8);
    const events = [];
    for (let i = 1; i < sc.length - 1; i++) {
      if (sc[i][1] < thresh) continue;
      if (sc[i][1] < sc[i - 1][1] || sc[i][1] < sc[i + 1][1]) continue;
      const last = events[events.length - 1];
      if (last && sc[i][0] - last[0] < 0.4) {
        if (sc[i][1] > last[1]) events[events.length - 1] = sc[i];
        continue;
      }
      events.push(sc[i]);
    }

    // Peak vs RESTING state, not vs other events: a film whose every cut is a full
    // inversion scores badly on peak-over-median-event while being exactly right.
    const contrast = peak / (med || 1e-6);

    const env = envelope(file, tmp);
    let onsets = [], onsetEvery = NaN;
    if (env) {
      const eMax = Math.max(...env) || 1, e = env.map((v) => v / eMax);
      for (let i = 3; i < e.length - 1; i++) {
        if (e[i] - e[i - 3] > 0.14 && e[i] > 0.18 &&
            (!onsets.length || i / 100 - onsets.at(-1) > 0.12)) onsets.push(i / 100);
      }
      onsetEvery = dur / Math.max(1, onsets.length);
    }
    let locked = 0;
    for (const [t] of events) if (onsets.some((o) => Math.abs(o - t) < 0.10)) locked++;

    return {
      file, fps, dur, peak, contrast,
      mean: vals.reduce((a, b) => a + b, 0) / vals.length,
      still: vals.filter((v) => v < 0.004).length / vals.length,
      events: events.length, onsetEvery,
      locked: events.length ? locked / events.length : 0,
      top: [...events].sort((a, b) => b[1] - a[1]).slice(0, 6).sort((a, b) => a[0] - b[0]),
    };
  } finally { rmSync(tmp, { recursive: true, force: true }); }
}

// Measured from four shipped launch films — see references/review.md.
const BENCH = { peak: [0.28, 1.00], mean: [0.0020, 0.0084], contrast: [250, 1200], onset: [0.20, 0.40] };
const flag = (v, [lo, hi]) => (v < lo ? '  LOW' : v > hi ? ' high' : '   ok');

for (const f of files) {
  let m; try { m = measure(f); } catch (e) { console.error(`\n${f}: ${e.message}`); continue; }
  console.log(`\n=== ${m.file}\n    ${m.dur.toFixed(1)}s @ ${m.fps.toFixed(0)}fps`);
  console.log(`    peak change      ${m.peak.toFixed(3)}${flag(m.peak, BENCH.peak)}   (shipped: ${BENCH.peak[0]}–${BENCH.peak[1]})`);
  console.log(`    contrast         ${m.contrast.toFixed(0)}x${flag(m.contrast, BENCH.contrast)}   (vs resting state; shipped: ${BENCH.contrast[0]}–${BENCH.contrast[1]}x)`);
  console.log(`    mean change      ${m.mean.toFixed(4)}${flag(m.mean, BENCH.mean)}   (shipped: ${BENCH.mean[0]}–${BENCH.mean[1]})`);
  console.log(`    near-still       ${(m.still * 100).toFixed(1)}% of frames`);
  console.log(`    events           ${m.events}`);
  if (!Number.isNaN(m.onsetEvery))
    console.log(`    audio onset      every ${m.onsetEvery.toFixed(2)}s${flag(m.onsetEvery, BENCH.onset)}   (shipped: every ${BENCH.onset[0]}–0.34s)`);
  console.log(`    events on sound  ${(m.locked * 100).toFixed(0)}%`);
  console.log(`    biggest moments  ${m.top.map(([t, v]) => `${t.toFixed(1)}s(${v.toFixed(2)})`).join('  ') || '(none above threshold)'}`);
  if (m.peak < 0.15)
    console.log(`\n    FLAT: no detonation anywhere. Every moment is the same size, so nothing\n          reads as important. Fixes: references/review.md`);
}
