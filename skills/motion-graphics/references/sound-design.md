# Sound design

## Contents

- [Two paths](#two-paths)
- [Measuring a supplied track](#measuring-a-supplied-track)
- [Synthesizing the score](#synthesizing-the-score)
- [Sound effects](#sound-effects)
- [Narration](#narration)
- [The mix](#the-mix)
- [What cannot be verified by looking](#what-cannot-be-verified-by-looking)

## Two paths

If the user supplies a track, measure it and cut the picture to what is actually there. If they do not, synthesize the score in code on the same timeline as the picture, which means the grid is chosen rather than detected and no audio analysis library is needed at all.

Effects are a separate decision from the score: synthesize them, source them for this product,
or fall back to the bundled CC0 set at `assets/sfx/` — see
[assets-and-generation.md](assets-and-generation.md#sound-effects-make-source-or-fall-back).
Prefer synthesis when the film has a designed sonic identity, since the effects can then share
the score's tuning and decay. Two rules hold whichever route you take:

- **Randomise across variants.** One keypress sound repeated per character is the sound of a
  machine typing, not a person. Vary it, seeded by character index so the render stays
  deterministic.
- **Align the cue to the START of the motion**, not its resolution — clicks at the press,
  reveals at the payoff.

Volumes that work: music bed 0.30–0.40, effects 0.55–0.85, both lower for a restrained tone.
Never put the bed above 0.5.

Decide this in the plan, because it determines whether numpy and librosa need installing. Never make someone install audio analysis for a film whose score the agent is writing.

## Measuring a supplied track

Beat tracking returns beats. It does not return downbeats — knowing where beat one of each bar falls needs the meter and the phase, and taking every fourth beat from index zero silently assumes both. On any track whose detected first beat is not a bar start, that assumption puts every major cut in the film on the wrong beat.

Estimate the phase from accent instead:

```python
# python beats.py audio/track.wav > audio/beats.json
import sys, json, numpy as np, librosa

y, sr = librosa.load(sys.argv[1], sr=None, mono=True)
meter = int(sys.argv[2]) if len(sys.argv) > 2 else 4

onset = librosa.onset.onset_strength(y=y, sr=sr)
tempo, beat_frames = librosa.beat.beat_track(onset_envelope=onset, sr=sr, units="frames")
beats = librosa.frames_to_time(beat_frames, sr=sr)

# Accent at each beat, then the phase whose beats are loudest on average.
at_beat = onset[np.clip(beat_frames, 0, len(onset) - 1)]
phase = int(np.argmax([at_beat[p::meter].mean() if len(at_beat[p::meter]) else 0
                       for p in range(meter)]))

peaks = librosa.util.peak_pick(onset, pre_max=3, post_max=3, pre_avg=3,
                               post_avg=5, delta=0.5, wait=10)

json.dump({
    "bpm": round(float(np.atleast_1d(tempo)[0]), 2),
    "meter": meter,
    "phase": phase,                                              # which beat starts a bar
    "beats": [round(float(t), 3) for t in beats],                # state changes
    "downbeats": [round(float(t), 3) for t in beats[phase::meter]],  # cuts and big moments
    "hits": [round(float(t), 3) for t in librosa.frames_to_time(peaks, sr=sr)],  # SFX
}, sys.stdout, indent=1)
```

The phase estimate is a heuristic, not a transcription. It is reliable on music with a strong downbeat accent and unreliable on ambient or rubato material — check the first two bars against the waveform before cutting the whole film to it, and let the user override the meter for anything in 3 or 6.

Start the film on a downbeat, put shot changes on downbeats, put state changes on beats, and put UI sounds on measured onsets rather than on the grid, because a click that lands on a beat where nothing happens in the music sounds early.

A tempo estimate is not a beat grid. Align the significant reveals and cuts to accents you have actually checked, and leave the rest of the film free — not every UI event needs a musical hit, and a film where everything lands on a beat is as mechanical as one where nothing does.

## Synthesizing the score

With no supplied track the tempo is a decision, so write the grid into the spec and build both picture and sound from it. A serviceable score for a 20–30 second film is four layers, all cheap to synthesize: a sub-bass pulse on downbeats, a filtered noise or short-decay percussion layer on beats, a sustained pad or drone for the body, and a simple melodic motif of three to five notes that returns at the end card.

Compose against the structure rather than looping one bar: drop the pad for the two seconds before the main reveal so the reveal has somewhere to arrive, and leave the last bar thinner so the end card is not fighting a full mix.

## Density: how often something should happen

Measured across four shipped launch films, an audio event lands **every 0.24–0.34 seconds** —
roughly two per beat at 100 BPM. That is denser than it sounds when you are writing the cue
list, and it is the gap most synthesized scores fall into.

A score can measure correct on every other axis and still be half as eventful as it needs to
be. One case: bass/mid/air balance at 58/35/7%, continuity and dynamic range both inside the
shipped range, loudness exactly on target — and one onset every 0.57s. Nothing was wrong with
the sound; there was simply not enough of it. **Balance is not density.** Check both.

Count the cues against the duration before rendering:

```bash
node scripts/measure_film.mjs out/final.mp4    # reports onset density and cue-to-event lock
```

Notion 3.7 lands 93% of its visual events within 100ms of an audio onset. Aim for that: every
significant picture change gets a hit, and the gaps between get the score's own events.

## Sound effects

Synthesized effects placed on the grid carry a surprising amount of a film's quality. Four voices cover most product motion:

```js
// node sfx.mjs cues.json out/sfx.wav     cues: [{"t":0.5,"type":"click"}, ...]
import { readFileSync, writeFileSync } from 'node:fs';
const SR = 48000, cues = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const buf = new Float32Array(Math.ceil((Math.max(...cues.map(c => c.t)) + 2) * SR));

const VOICES = {
  click:  [0.05, (t, n) => Math.sin(2 * Math.PI * 1800 * t) * Math.exp(-t * 90) * 0.5],
  pop:    [0.15, (t, n) => Math.sin(2 * Math.PI * (600 + 900 * t) * t) * Math.exp(-t * 30) * 0.4],
  thump:  [0.50, (t, n) => Math.sin(2 * Math.PI * (90 - 60 * t) * t) * Math.exp(-t * 9) * 0.9],
  whoosh: [0.35, (t, n) => n * Math.sin(Math.PI * Math.min(1, t / 0.35)) * 0.25],
};

for (const c of cues) {
  const [len, fn] = VOICES[c.type], start = Math.floor(c.t * SR);
  let s = 42;                                   // reset per cue: identical every run
  const noise = () => (s = (s * 1664525 + 1013904223) >>> 0) / 2147483648 - 1;
  for (let i = 0; i < len * SR && start + i < buf.length; i++)
    buf[start + i] += fn(i / SR, noise()) * (c.gain ?? 1);
}

const n = buf.length, b = Buffer.alloc(44 + n * 2);           // 16-bit mono WAV
b.write('RIFF', 0); b.writeUInt32LE(36 + n * 2, 4); b.write('WAVEfmt ', 8);
b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22);
b.writeUInt32LE(SR, 24); b.writeUInt32LE(SR * 2, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34);
b.write('data', 36); b.writeUInt32LE(n * 2, 40);
for (let i = 0; i < n; i++)
  b.writeInt16LE(Math.round(Math.max(-1, Math.min(1, buf[i])) * 32767) , 44 + i * 2);
writeFileSync(process.argv[3], b);
```

Reset the noise seed per cue rather than letting one generator run through the file, so the same cue list always produces the same WAV.

Place effects where motion already is: a click where the cursor presses, a whoosh under a camera move, a thump on a hard cut to a new scene, a pop when an element springs in. An effect with nothing moving under it sounds like a mistake. Keep them well below the music — if an effect is audible as a separate event rather than as part of the picture, it is too loud.

## Narration

Generate or record narration first, measure its actual word timings, and build the caption track and the shot timings from those. Writing the animation first and fitting a voice to it afterwards produces captions that drift and shots that end mid-sentence.

Leave 150–250 ms of silence between sentences. The pause is what makes narration sound considered rather than rushed, and it gives each caption card room to land.

## The mix

Choose the target from the platform and the content; around -14 LUFS integrated with true peak at or below -1 dBTP suits most social delivery. Measure, never guess — a fixed `volume=` gain is not loudness normalisation.

First mix the stems. The sidechain duck pulls music down under narration automatically, which is the difference between a voice sitting in a film and a voice fighting it; drop that stage entirely when there is no narration.

```bash
ffmpeg -y -i audio/score.wav -i out/sfx.wav -i audio/vo.wav \
  -filter_complex "[0:a]volume=0.55[m];[2:a]asplit[v1][v2]; \
    [m][v2]sidechaincompress=threshold=0.05:ratio=8:attack=20:release=300[duck]; \
    [duck][1:a][v1]amix=inputs=3:duration=longest:normalize=0[a]" \
  -map "[a]" -ar 48000 out/mix.wav
```

Then normalise in **two passes**. Single-pass `loudnorm` works from a running estimate and lands near the target rather than on it; measuring first and feeding the measurements back gets much closer. On a 30-second mix this lands within about 0.1 LU.

**It does not hold on short films.** Under roughly 20 seconds there are too few integration blocks for the gated measurement to be stable, and `loudnorm` will quietly report `"normalization_type": "dynamic"` even with `linear=true`. Measured on an 8-second film: the two-pass result came out at -14.7 LUFS against a -14.0 target. For anything short, finish with a measure-and-correct loop — read the real integrated value, apply the exact gain difference, limit, and re-measure until it is inside 0.3 LU.

```bash
# Pass 1 — measure
ffmpeg -hide_banner -i out/mix.wav -af loudnorm=I=-14:TP=-1:LRA=11:print_format=json \
  -f null - 2>&1 | sed -n '/^{/,/^}/p' > out/loudness.json

# Pass 2 — apply the measured values (substitute from loudness.json)
ffmpeg -y -i out/mix.wav -af "loudnorm=I=-14:TP=-1:LRA=11\
:measured_I=-18.33:measured_TP=-1.13:measured_LRA=1.80:measured_thresh=-28.62\
:offset=0.07:linear=true" -ar 48000 out/master.wav

# Mux
ffmpeg -y -i out/silent.mp4 -i out/master.wav -map 0:v -map 1:a \
  -c:v copy -c:a aac -b:a 192k -movflags +faststart -shortest out/final.mp4

# Confirm the delivered file with ebur128 — NOT with loudnorm
ffmpeg -hide_banner -nostats -i out/final.mp4 -af ebur128=peak=true -f null -
```

**Verify with `ebur128`, never with `loudnorm=print_format=summary`.** `loudnorm` defaults to a -24 LUFS target, so its `Output Integrated` line reports what it *would* renormalise your file to, not what your file is. On a film that genuinely measures -14.5 LUFS it prints `Output Integrated: -24.2 LUFS`, and anyone trusting that line will "fix" a mix that was already correct. Only its `Input Integrated` line describes your file. `ebur128=peak=true` reports integrated loudness, range, and true peak in one pass with no target to confuse.

A film cut to a licensed track still needs the licence. Say so plainly when the user supplies commercial music for a public launch.

## What cannot be verified by looking

Frames can be inspected; audio cannot. Confirming that a file has an audio stream, or that cue times match beat times in JSON, is not the same as confirming the mix sounds right, the narration is intelligible, or a click lands where the cursor presses.

State that limit honestly in the handoff. Report what was measured — integrated loudness, true peak, cue times against the beat grid, stream presence and duration — and ask the user to listen once before publishing. Never claim audio quality that was not heard.
