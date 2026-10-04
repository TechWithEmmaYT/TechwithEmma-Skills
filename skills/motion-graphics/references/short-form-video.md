# Short-form video

## Contents

- [What makes it different](#what-makes-it-different)
- [The frame](#the-frame)
- [Captions are the design](#captions-are-the-design)
- [The visual stage](#the-visual-stage)
- [Structure](#structure)
- [Pacing against narration](#pacing-against-narration)
- [The end card](#the-end-card)
- [Burning captions from a timing file](#burning-captions-from-a-timing-file)

## What makes it different

A launch film is 20 seconds of music-led spectacle. A short-form explainer is 60–150 seconds of narration-led teaching, and almost every rule inverts: holds are longer, type is the main element rather than an accent, the camera barely moves, and the piece has to survive being watched muted.

The failure mode is importing launch-film speed. A viewer being taught something needs time to read the caption and look at the evidence; cutting every 1.5 seconds makes a tutorial unwatchable even though it makes a reel exciting.

## The frame

1080x1920, 30 fps is enough — the motion is mostly type and the file is smaller. Divide the frame into three zones and keep them stable for the whole video:

```
  0 - 12%    breathing room; platform UI intrudes here
 12 - 62%    visual stage: screenshots, diagrams, device frames
 62 - 80%    caption band: the narration, 2-5 words at a time
 80 - 100%   breathing room; captions, handles and buttons intrude here
```

Nothing important goes in the top or bottom 12%, where the platform's own interface sits. A stable caption band is what makes wildly different content feel like one series — the viewer's eye learns where the words appear and stops hunting.

A light near-neutral canvas with a faint grid reads as considered and keeps screenshots legible. Dark works too, but then every screenshot has to be dark as well.

## Captions are the design

Most short-form is watched muted, so the captions carry the whole video. Two or five words on screen at once, driven by the narration's actual word timings.

Build contrast inside each phrase rather than between phrases: set the two or three load-bearing words in heavy weight or italic at full contrast, and drop the connective words to a lighter weight and a grey. The eye lands on the meaning before it reads the sentence. A caption where every word is the same weight reads as a subtitle and gets ignored.

Each word springs in on its own small delay rather than the phrase appearing at once. Hold a phrase at least 0.6 seconds even if the narration is faster, and never let one word straddle a cut.

One accent colour for emphasis, one shape family for decoration. A small set of hand-drawn marks — an arrow, a burst, a circle-underline, a sparkle bullet — used consistently gives the series a signature at almost no cost, as long as they are the same marks every time.

## The visual stage

The stage above the captions proves what the narration claims. Three kinds of content, rotated so no kind appears twice in a row:

- **Screenshots** as evidence. Floating with one soft shadow and a 1px border, tilted no more than 2 degrees, drifting 1–2% over their hold. Crop to the part being discussed; a full window at phone size is unreadable.
- **Diagrams** for relationships. Nodes, connectors, and a single highlighted path. These explain what a screenshot cannot: how pieces relate, what order things happen in, what connects to what.
- **Lists** for enumeration. Three to five items, each springing in on its own beat with a consistent bullet mark, never more than seven words per line.

Icon and logo tiles work well for "these tools, combined" moments — rounded white chips with a soft shadow, the real brand marks, arranged in a ring or grid and springing in on a stagger.

## Structure

```
0:00-0:03  Hook. The outcome, the surprising claim, or the problem in five words.
           No logo, no "in this video", no introduction.
0:03-0:10  The promise. What the viewer will be able to do, and why it matters now.
0:10-2:00  Body. One idea per 8-15 seconds, each with a caption claim and one piece of
           visual evidence. Reset the stage between ideas so sections stay distinct.
last 0:08  Payoff and call to action: what to do, where, and a reason to act.
```

For a listicle, make the ordinal a real chapter marker: a large number card, a palette or layout shift, a name, a one-line benefit, then the demonstration. Keeping that grammar identical across all five items is what lets the viewer track position without a progress bar, and varying the evidence inside each chapter is what stops it feeling mechanical.

## Pacing against narration

Build from the voice track, not against it. Generate or record narration first, measure word timings, then lay the captions and the stage changes onto those times.

Change the stage on sentence boundaries, never mid-clause. Hold each piece of evidence at least 2 seconds — long enough to be read — and give the viewer a beat of nothing-new after a dense diagram.

## The end card

Hold 2 to 3 seconds. The specific action, the handle or URL, and one reason. Keep motion alive in it — a drifting mark, a cursor, a last caption springing in — so it reads as the end of the film rather than a frozen frame.

If a watermark runs through the video, keep it at 25–40% opacity in a corner that no caption or platform element touches, and keep it in exactly the same place for every video in the series.

## Burning captions from a timing file

Drive captions from a timing file rather than hardcoding them, so re-recording the narration does not mean rebuilding the animation. When captions are drawn by the renderer the timing file feeds `seek(t)` directly; when they are burned in afterwards, generate an ASS or SRT from the same file:

```bash
ffmpeg -i out/silent.mp4 -vf "subtitles=out/captions.ass:fontsdir=assets/fonts" \
  -c:v libx264 -crf 18 -pix_fmt yuv420p out/captioned.mp4
```

Drawing them in the renderer is better — it gives per-word springs, mixed weights, and the accent colour, none of which a burned-in subtitle format does well. Use the burn-in path only when the captions must be editable by someone without the project.

Check the result at 360 px wide before delivering. Captions that are comfortable on a desktop preview are frequently unreadable on the device the video is actually watched on.
