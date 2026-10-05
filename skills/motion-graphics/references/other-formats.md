# Other formats

Two jobs whose rules differ from a launch film's: the narration-led vertical explainer,
and any work built on footage the user supplied rather than frames you drew.

## Contents
- [What makes it different](#what-makes-it-different)
- [The frame](#the-frame)
- [Captions are the design](#captions-are-the-design)
- [The visual stage](#the-visual-stage)
- [Structure](#structure)
- [Pacing against narration](#pacing-against-narration)
- [The end card](#the-end-card)
- [Burning captions from a timing file](#burning-captions-from-a-timing-file)

**Footage editing**

- [Classify the job first](#classify-the-job-first)
- [Inspect before editing](#inspect-before-editing)
- [Exact edits](#exact-edits)
- [Footage-led assembly](#footage-led-assembly)
- [Graphics over footage](#graphics-over-footage)
- [Captions on supplied speech](#captions-on-supplied-speech)
- [Speed, sync and frame rate](#speed-sync-and-frame-rate)
- [What footage cannot give you](#what-footage-cannot-give-you)


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

---

# Footage editing


## Classify the job first

"Make me one like this" is ambiguous and the two readings produce completely different work. Resolve it before anything else:

- **Inspired** — take the reference's visual grammar, write a new story with the user's product, people, and copy. Everything in the rest of this skill applies.
- **Exact** — reproduce the same shots, timing, motion, people, and audio, changing only what the user named. This is an edit, not an animation, and most of this skill's defaults are wrong for it.

An explicit brief such as "swap our logo into this video" already answers the question. Anything vaguer gets one short question, because guessing wrong wastes the entire production.

A third case sits between them: the user has real footage — a screen recording, a talking head, a demo capture — and wants motion graphics built around it. That is footage-led assembly, below.

## Inspect before editing

Never invent graphics or narration for footage that has not been examined. Probe the media, then look at it:

```bash
python3 scripts/inspect_video.py source.mp4 -o review/ --strip 12.5
ffprobe -v error -show_format -show_streams -of json source.mp4
ffmpeg -v error -xerror -i source.mp4 -f null -        # does it fully decode?
```

Record the A-roll, the pauses and alternate takes, baked-in captions, watermarks, music, and which shots are reusable. Check rotation metadata and the real versus nominal frame rate before cutting anything.

If the footage the job depends on is missing, say so and stop that part — it blocks footage-dependent work, not an original animation the user also asked for.

## Exact edits

The user's source is the authority. Preserve its timing, transitions, people, audio, and every shot not named in the brief; rebuilding the whole film is not a logo swap.

- Map the specific shots that change, with timestamps, and confirm that list before touching anything.
- Use editable originals when the user has them. A flattened MP4 does not contain separable layers, however much it looks like it does.
- A branded surface baked into moving footage needs tracked compositing or selective reconstruction, not a rectangle pasted on top. Prove one hard shot in a short preview before promising the whole film matches.
- Re-render only affected ranges while iterating, then produce the complete output once.
- Keep the original audio unless the brief changes it, and keep the original duration unless asked.

If an exact match is not achievable with the available source, say which shots will differ and how, before starting.

## Footage-led assembly

When real footage carries the message and graphics support it, build in this order:

1. **Cut the spoken argument first.** Place the A-roll and its audio, remove dead air and bad takes, and get the argument coherent before any graphic exists. Pacing problems fixed here are free; fixed after choreography they are not.
2. **Add supporting footage** — B-roll, screen captures, demonstrations — against the argument, not against a rhythm.
3. **Add motion graphics** only where they aid comprehension: a claim's evidence, a term definition, an architecture diagram, a step number, a zoom to the thing being discussed.
4. **Time captions last**, after every cut and speed change is final.

Keep faces readable and avoid masking over meaningful action. Preserve source room tone where it carries atmosphere, and duck music under narration rather than cutting it.

## Graphics over footage

Code-drawn overlays sit on footage the same way they sit on a canvas, with two differences that matter.

The background is moving and noisy, so overlays need more contrast than they would on a flat canvas: a solid or heavily blurred backing plate behind text, a shadow or stroke on thin marks, and larger type than a static design would need. Check legibility against the busiest frame the overlay covers, not the calmest.

The footage sets the grade. Sample the actual colours from a frame and build the accent from them rather than importing a palette that fights the source.

For a render that composites drawn overlays onto video, the renderer must seek the video to composition time and wait for the frame to decode before capturing — a canvas drawn before `seeked` resolves captures the previous frame, which looks like a one-frame stutter scattered through the export.

## Captions on supplied speech

Use real timestamped transcription from the finished audio. Do not transcribe by ear from on-screen text, and do not reuse timings from before a re-cut.

Correct product names, acronyms, and technical terms in the transcript before timing anything. Group words into phrases around meaning and natural pauses, usually one or two lines, and emphasise a few words rather than all of them.

Convert audio timestamps to the composition's frame rate and clamp intervals at their boundaries so an old phrase cannot hang into the next one. Check the longest phrase and the tightest pause at phone size.

## Speed, sync and frame rate

Change video and audio speed together, then verify the resulting duration, lip sync, and pitch rather than assuming the filter handled it. Normalise output frame rate deliberately — a source's nominal frame rate frequently differs from its average, and variable-frame-rate screen recordings are the usual culprit behind drifting sync.

Never upscale low-resolution footage and present it as new detail.

## What footage cannot give you

An MP4 is flattened. It does not contain separable layers, a removable watermark, clean plates behind baked captions, or the original project. Removing something baked in means reconstructing what was behind it, which is sometimes impossible and always worth flagging before promising it.

Audio presence is not audio review. Confirming a stream exists says nothing about intelligibility, sync, or clipping — report what was measured and what still needs a listen.
