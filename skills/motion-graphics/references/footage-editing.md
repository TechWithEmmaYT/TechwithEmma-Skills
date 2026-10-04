# Footage editing

## Contents

- [Classify the job first](#classify-the-job-first)
- [Inspect before editing](#inspect-before-editing)
- [Exact edits](#exact-edits)
- [Footage-led assembly](#footage-led-assembly)
- [Graphics over footage](#graphics-over-footage)
- [Captions on supplied speech](#captions-on-supplied-speech)
- [Speed, sync and frame rate](#speed-sync-and-frame-rate)
- [What footage cannot give you](#what-footage-cannot-give-you)

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
