# Motion language

## Contents

- [Springs instead of easing curves](#springs-instead-of-easing-curves)
- [Measured spring presets](#measured-spring-presets)
- [Values with more than one target](#values-with-more-than-one-target)
- [Type in motion](#type-in-motion)
- [Transitions between shots](#transitions-between-shots)
- [The swept mass, in detail](#the-swept-mass-in-detail)
- [Camera through the interface](#camera-through-the-interface)
- [Camera](#camera)
- [Colour, texture, and depth](#colour-texture-and-depth)
- [Looping](#looping)
- [Banned defaults](#banned-defaults)

## Springs instead of easing curves

Cheap motion travels from A to B on a fixed curve and stops. Expensive motion has mass: it accelerates, overshoots by a hair, and settles. Use a closed-form damped spring, which stays a pure function of time and so keeps `seek(t)` deterministic — unlike a simulated spring, which needs every previous frame.

Springs are the default for product and UI motion, not a universal law. A technique-led showreel may deliberately put several easing families on screen at once, and that is the point of the piece. Choose the family in `docs/style_guide.md` and apply it consistently; what is banned is linear motion arriving by accident.

```js
// lib/motion.js
export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));

// Unit step 0 -> 1. k = stiffness, d = damping. Three damping regimes, all exact.
export function spring(t, k = 170, d = 26) {
  if (t <= 0) return 0;
  const w0 = Math.sqrt(k), z = d / (2 * w0);
  if (z < 1) {                                        // underdamped: overshoots, settles
    const wd = w0 * Math.sqrt(1 - z * z);
    return 1 - Math.exp(-z * w0 * t) *
      (Math.cos(wd * t) + (z / Math.sqrt(1 - z * z)) * Math.sin(wd * t));
  }
  if (z === 1) return 1 - Math.exp(-w0 * t) * (1 + w0 * t);   // critically damped
  const wr = w0 * Math.sqrt(z * z - 1);               // overdamped: slow, never overshoots
  return 1 - Math.exp(-z * w0 * t) *
    (Math.cosh(wr * t) + (z / Math.sqrt(z * z - 1)) * Math.sinh(wr * t));
}

// Pure hash noise. Unlike a stateful generator, it cannot desynchronise when frames
// are rendered out of order, because the value depends only on its coordinates.
export function hash(i, j = 0) {
  let h = Math.imul(i ^ 0x9E3779B9, 0x85EBCA6B) ^ Math.imul(j + 0x165667B1, 0xC2B2AE35);
  h ^= h >>> 13; h = Math.imul(h, 0x5BD1E995); h ^= h >>> 15;
  return (h >>> 0) / 4294967296;
}

// mulberry32: a seeded stream. Safe ONLY when created fresh inside the frame it is
// used in — a generator hoisted to module scope advances across frames and makes
// out-of-order seeks disagree. Prefer hash(i, j) above for anything per-element.
export function rng(seed) {
  return () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
```

## Measured spring presets

These are the four presets to work from. Overshoot and settle time are measured from the function above, not estimated:

| Preset | k | d | Overshoot | Settles | Use for |
| --- | --- | --- | --- | --- | --- |
| Snappy | 320 | 30 | 0.8% | 0.39s | Buttons, toggles, leading edges, cursor targets |
| Default | 170 | 26 | 0% | 0.56s | Cards, containers, panels, camera |
| Display | 220 | 30 | 0% | 0.51s | Headlines in short shots, where Heavy would still be arriving |
| Heavy | 90 | 18 | 0% | 0.68s | Logo lockups, large objects, the final hold |
| Playful | 260 | 16 | 16.6% | 0.57s | Mascots, stickers, badges, celebration marks |

Settle time is measured as the moment the value stays within 0.5% of its target — the number that matters, since it is when motion stops being visible. Overshoot is the peak excursion past the target.

**Check the settle time against the shot length.** A spring started 0.2s into a 2-second shot and settling in 0.68s is fine; the same spring in a 1-second shot is still moving when the cut arrives, which reads as a broken or unfinished animation rather than a slow one. Short shots want Display or Snappy even for big type. If a headline must feel heavy in a short shot, shorten its travel distance rather than softening its spring.

Big type does not bounce. A 16% overshoot on a headline reads as a toy; the same overshoot on a sticker reads as charm. Keep overshoot off anything the viewer is reading.

Stagger a group with a per-item delay of 0.02–0.04s. Beyond roughly 0.05s the group stops reading as one object.

## Values with more than one target

When a value changes target several times — a cursor, a container's width, a tab indicator — do not restart the spring. Sum one spring per change, each starting at its own time. Motion stays continuous and frame 812 still renders without simulating the 811 before it.

```js
// keys: [[time, value], ...] sorted by time
export function track(t, keys, k = 170, d = 26) {
  let v = keys[0][1];
  for (let i = 1; i < keys.length; i++)
    v += (keys[i][1] - keys[i - 1][1]) * spring(t - keys[i][0], k, d);
  return v;
}

// A tab indicator that stretches: the leading edge is stiffer than the trailing edge
export function indicator(t, stops, width = 120) {
  const lead = track(t, stops, 320, 30), trail = track(t, stops, 140, 22);
  return { left: Math.min(lead, trail), right: Math.max(lead, trail) + width };
}

// Content swapping inside a morphing container: in after the morph starts, out before the next
export function swapAlpha(t, tIn, tOut) {
  return Math.min(clamp((t - tIn - 0.08) / 0.12), clamp((tOut - 0.1 - t) / 0.1));
}
```

Two edges on different springs is the single cheapest trick in UI motion. Anything that moves sideways while changing width — indicators, pills, selection rectangles, progress fills — looks rigid with one spring and alive with two.

## Type in motion

Text is the main actor in a launch film, so it needs more than a fade.

- **Word-level reveal.** Measure each word, spring each one in on its own delay, and let the baseline settle before the next word starts. This is the look of every strong short-form caption.
- **Emphasis within a line.** Change weight, size, italic, or colour on the two or three words that carry the meaning and grey the connective words down. A caption where every word has equal weight reads as a subtitle, not as design.
- **Clip reveal.** Animate a clipping rectangle rather than opacity: the letterforms arrive solid instead of ghosting through grey. Use a vertical clip for headlines, a horizontal wipe for rules and underlines.
- **Counting numbers.** Spring the value, not the opacity, and render with fixed digit width so the number does not jitter. A before/after pair (`3,724 -> 440 MiB`) is worth more than a sentence.
- **Exit before the next entrance.** Text leaves 0.1s before the container it sits in starts changing. Overlapping a text exit with the next entrance is the most common readability failure.

Set `textRendering` and explicit tracking; canvas defaults are loose for display sizes. One display face and one UI face for the whole film.

Typing a headline with a visible caret, and embedding real UI chips inside a running sentence, are the two highest-value type devices in current launch films and neither is expensive. Both are implemented in [signature-devices.md](signature-devices.md).

## Transitions between shots

**A transition is a shot, not a gap between shots.** The weakest films cut or crossfade; the strong ones spend half a second on a designed event that carries meaning across the join. Budget for them in the shotlist with their own start and end times.

Pick a small set and repeat it. A different transition on every cut reads as a template demo rather than a film.

- **Hard cut on the beat.** The default, and always correct on a downbeat. Round the cut to a whole frame so motion blur never smears it.
- **Match cut.** A shape, colour field, or UI element continues across the join in the same screen position. The strongest transition available and the only one that makes a film feel authored.
- **The swept mass.** A shaped field — a halftone dot wave, a solid form, a blurred band — sweeps across frame, inverts the background behind it, and carries the outgoing type out with it. Described in full below.
- **Camera through the interface.** The camera pushes into a region of the UI until the surrounding chrome passes the frame edges and the content becomes the new scene. No cut at all: the viewer travels from the tool into its output.
- **Whip.** 0.15–0.25s of fast translation with extra subframes. One or two per film.
- **Mask push.** A rectangle or circle wipes the next shot in, its edge aligned to a layout gutter.
- **The container that never cuts.** One element morphs through every state while its content swaps behind a short blur. This carries an entire film on its own.

### The swept mass, in detail

The most reusable of these, measured from a shipped film that uses it three times in five seconds:

1. A textured mass — a halftone dot field whose dot size varies across a gradient — enters from a frame corner on a Default spring, large enough to cross the whole frame.
2. As it passes over the outgoing word, that word **smears horizontally in the sweep's direction**, driven by the sweep velocity rather than a fixed blur. The type is being carried, not faded.
3. The mass covers the frame and the background **inverts** — white to black, or the reverse. The palette change happens inside the transition, not at a cut.
4. The incoming word arrives already smeared and resolves to sharp over about 0.15s.
5. The mass does not fully exit. It settles as a decorative arc at the frame edge, becoming part of the new composition.

Total: 0.4–0.6s. The reasons it works are worth keeping separate from the recipe — the blur direction matches the motion so the eye tracks it as one object; the inversion means the transition does the palette work a cut would have made abrupt; and the residue ties the two shots together so they read as one sequence.

Drive the dot field from a seeded hash per dot so it stays deterministic, and derive the type blur from the same time-based velocity that moves the mass, never from a separate timeline.

### Camera through the interface

Rather than cutting from a tool's UI to the thing it made, push the camera into the canvas region. The panels, timelines, and toolbars scale up and slide past the frame edges while the canvas content grows to fill. By the end, the interface is gone and its output is the scene.

It establishes "this was made in this tool" without a word of narration, and it is the natural opening for any product whose output is more impressive than its interface. Keep it slow enough to read — 1.0–1.5s — and keep the UI sharp throughout, since blurring it implies the tool is incidental.

## Camera

Treat the whole scene as a transform applied before drawing: translate, scale, and a small rotation. Move the camera on a Default spring, never linearly, and never more than one camera move per shot.

Slow continuous drift at 1–2% scale per second keeps a static shot alive without being noticed. A shot that holds perfectly still for more than 2 seconds reads as a frozen render.

Parallax by drawing background layers with 0.3–0.6x the camera offset. Two layers is usually enough; four turns to mush at 1080p.

## Colour, texture, and depth

One accent colour. A neutral canvas, either near-black (`#0A0A0A`–`#141413`) or near-white (`#FAFAF8`–`#F2F0EB`), carries product UI better than any gradient because screenshots already contain colour.

Depth comes from scale, blur, and contrast, not from drop shadows on everything. A product screenshot wants one soft shadow at low opacity and a 1px border at 8–12% white or black; anything more reads as a stock mockup.

Add grain only if the reference has it, as a seeded noise overlay at 2–4% opacity, regenerated per frame from the frame index so it shimmers. Static grain looks like a dirty lens.

## Looping

If the film loops, the last frame must equal the first — camera position, cursor position, velocity, noise phase, and audio tail included. `loopT` only wraps the clock; it guarantees nothing by itself. The scene has to be authored so that every value at `t = DUR` already equals its value at `t = 0`, which usually means ending a move one beat early and holding. Check the seam by playing the file twice back to back and looking at the join, not by trusting the wrap.

```js
export const loopT = (t, dur) => ((t % dur) + dur) % dur;
```

## Banned defaults

These are what an unguided render produces, and together they are how viewers recognise an AI-made video:

- A centred title on a gradient background.
- Everything entering by fading in.
- Corner labels, timecodes, frame borders, and bracket marks.
- Glow or bloom on UI chrome.
- Generic particle bursts and confetti standing in for a payoff.
- A full-screen logo at the end with nothing else happening.
- Dead time: any 2-second stretch where nothing new appears.
- Linear or `ease-in-out` motion anywhere.
- More than one accent colour, display face, or radius scale without a brand reason.

These are defaults to avoid, not absolute bans. Shipped films use several of them deliberately and well: a stylised fintech piece can be built entirely from emissive 3D objects and glow, and a showreel can use corner metadata and framing marks because the techniques are its subject. The failure is reaching for them unthinkingly. Choosing one on purpose is fine; record the choice and its reason in `docs/style_guide.md`.
