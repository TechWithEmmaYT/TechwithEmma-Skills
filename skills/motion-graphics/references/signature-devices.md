# Signature devices

The recurring moves in shipped 2026 launch films, with implementations. These are what separates a film that looks designed from one that looks assembled, and most of them cost very little.

## Contents

- [Typed text with a caret](#typed-text-with-a-caret)
- [Inline chips inside a sentence](#inline-chips-inside-a-sentence)
- [The word slot](#the-word-slot)
- [A stable caption region](#a-stable-caption-region)
- [A travelling object](#a-travelling-object)
- [Radial and arc formations](#radial-and-arc-formations)
- [Dissolves with texture](#dissolves-with-texture)
- [The closing line that reframes](#the-closing-line-that-reframes)

## Typed text with a caret

The single most common device in current launch films, and the cheapest to implement. It instantly reads as a person using the product rather than a slide appearing.

Type the headline rather than fading it in. Use a visible caret: solid while characters land, blinking once typing pauses. 20–30 characters per second reads as confident; below 15 feels slow, above 40 is unreadable.

```js
// Pure function of time: the character count is derived from t, never incremented.
export function typed(g, text, x, y, t, { cps = 26, start = 0, caret = '|', blink = 0.53, hold = 0.6 } = {}) {
  const el = Math.max(0, t - start);
  const n = Math.min(text.length, Math.floor(el * cps));
  const shown = text.slice(0, n);
  g.fillText(shown, x, y);
  const done = n >= text.length;
  const past = el - text.length / cps;
  if (done && past > hold) return { done: true, width: g.measureText(shown).width };
  const on = !done || (Math.floor(past / blink) % 2 === 0);   // blink only after the pause
  if (on) g.fillText(caret, x + g.measureText(shown).width, y);
  return { done, width: g.measureText(shown).width };
}
```

Left-align typed text. Centring it makes the whole line shift left as it grows, which is the giveaway that it is an effect rather than someone typing.

Two lines with the second dimmer is a strong pairing — the claim, then the qualifier: `steer it now.` / `or queue it for later.` Type the first, pause, type the second.

For a terminal or code product, use a monospace face and a block caret (`▌`) instead of a bar.

## Inline chips inside a sentence

A sentence with real product UI embedded in the running type — `Docs [📄] and [🤖] agents in one workspace.` It appears in almost every strong launch film of the last year, and it works because it fuses the claim and the proof into one object instead of cutting between them.

```js
// parts: ['Docs ', {chip:'page'}, ' and ', {chip:'bot'}, ' agents']
export function runWithChips(g, parts, x, y, { size = 48, gap = 10, draw }) {
  let cx = x;
  for (const p of parts) {
    if (typeof p === 'string') { g.fillText(p, cx, y); cx += g.measureText(p).width; }
    else { const w = size * (p.w ?? 1.9); draw(p, cx + gap, y - size * 0.78, w, size * 1.05); cx += w + gap * 2; }
  }
  return cx - x;      // total width — measure first, then centre the whole run
}
```

Measure the full run before drawing so the line can be centred as one object. Spring each chip in slightly after the word before it, so the sentence assembles left to right rather than appearing complete.

Keep chips at cap height, vertically centred on the baseline, with the same radius as the product's real UI. A chip taller than the line breaks the reading rhythm.

## The word slot

A stable phrase with one word swapping: `Built for ___` cycling teams, developers, agents. Or a role list where the selected item settles and the rest stay secondary.

Hold the fixed words completely still. Only the slot moves, clipped to its own viewport so words enter and leave without disturbing the line. Measure the widest variant and reserve that width, or the sentence reflows on every swap and the stillness is lost.

Three or four variants, roughly 0.4–0.6s each. Exit the device once the idea has landed; a slot that keeps cycling after the point is made becomes wallpaper.

## A stable caption region

For a product whose interface is the story, give the whole frame to the real UI and put every claim in one fixed region — lower left works well — in a consistent size and weight for the entire film.

The viewer learns where the words appear and stops hunting for them, which means the UI can change completely between shots without the film feeling discontinuous. Two short lowercase lines, the second dimmer, with one accent colour on the load-bearing word.

This is the opposite of alternating full-screen type cards with product shots, and it is better whenever the product is dense and worth looking at.

## A travelling object

One object that persists across cuts — a cursor, a mascot, a paper plane, a single card — carrying the eye from shot to shot. It is the cheapest continuity device there is, and it turns a sequence of scenes into one film.

Keep its position continuous across the cut: it leaves the old shot where it enters the new one. Give it a consistent scale and let it lead the camera rather than follow it. It should cause things, not just be present — arriving at a control before the control responds.

## Radial and arc formations

Media cards, avatars, or icons arranged on an arc or ring, rotating slowly, with one item pulled forward as the subject. Good for "many things, one system" moments — a knowledge store, an integration set, a content library.

Place items on the arc by index, not randomly, and give each a deterministic per-item delay. Keep the ring's rotation slow — under about 8 degrees per second — or the items become unreadable. Push the focused item toward the camera and dim the rest rather than stopping the motion.

## Dissolves with texture

Rather than a plain crossfade, dissolve through a texture: a halftone dot field, a scatter of small squares, a grain wash. The outgoing shot breaks into the texture and the incoming shot reassembles from it.

Drive it from a seeded hash per particle so it stays deterministic, and keep it to 0.3–0.5s. Use it two or three times in a film at most, on act boundaries — as an every-cut transition it becomes a screensaver.

A vignette iris — darkening inward to a circle and opening into the next shot — works well for the single transition into a final lockup.

## The closing line that reframes

The strongest launch films end on a sentence that reinterprets everything before it, rather than naming the product again: *You built a system.* The viewer has just watched a sequence of features, and one line turns it into an outcome they achieved.

Write it as something true about the viewer, not about the product. Hold it long enough to read twice, then resolve to the lockup. A film that ends on a feature list ends; a film that ends on a reframe lands.
