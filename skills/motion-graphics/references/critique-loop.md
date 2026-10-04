# Critique loop

## Contents

- [Inspect, do not admire](#inspect-do-not-admire)
- [Contact sheets that cover the whole film](#contact-sheets-that-cover-the-whole-film)
- [Close inspection](#close-inspection)
- [The rubric](#the-rubric)
- [Defects worth hunting](#defects-worth-hunting)
- [How many rounds](#how-many-rounds)
- [Delivery](#delivery)

## Inspect, do not admire

Frames can be read. Use that: render, look, and judge as a motion director who did not make it rather than as its author. This single habit is the difference between a film that works and one posted with "it's a bit mid".

Look before showing the user anything, and look again after every fix. Never report a score, a render, or an improvement without having opened the image.

## Contact sheets that cover the whole film

The usual recipe silently lies about long videos. `fps=2` with `tile=6x5` produces 30 tiles, which is 15 seconds of coverage — on a 105-second explainer that is the first 14%, with no error and no warning. Every judgement made from that sheet is about an opening.

Compute the sample rate from the duration instead, so the tiles always span the whole film:

```bash
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 out/final.mp4)
COLS=6; ROWS=5; N=$((COLS*ROWS))
FPS=$(python3 -c "print($N/$DUR)")
ffmpeg -v error -y -i out/final.mp4 -vf "fps=$FPS,scale=270:-1,tile=${COLS}x${ROWS}" \
  -frames:v 1 out/contact.png
```

`scripts/inspect_video.py` does this and the pagination below in one call, using only the Python standard library plus ffmpeg:

```bash
python3 scripts/inspect_video.py out/final.mp4 -o out/ --strip 4.2
```

It also decodes the file end to end — a truncated render still reports a full duration — and writes **`<out>/manifest.json`**, which maps every cell of every sheet to its real timestamp, so a defect can be reported as "at 12.4s" rather than "somewhere in the third row". Read that file rather than parsing stdout; stdout interleaves the JSON with human-readable notes and is not machine-parseable.

Past roughly 60 seconds, one sheet of 30 tiles samples too coarsely to catch anything — paginate instead, one sheet per 30-second window, and look at all of them:

```bash
for i in 0 1 2 3; do
  ffmpeg -v error -y -ss $((i*30)) -t 30 -i out/final.mp4 \
    -vf "fps=1,scale=270:-1,tile=6x5" -frames:v 1 out/contact_$i.png
done
```

## Close inspection

A contact sheet finds composition problems. Three narrower views find the rest:

```bash
# Small-size test: check at the width this format is actually watched at.
#   16:9 long form  -> 640 px (feed autoplay, email, small embed)
#   9:16 short form -> 360 px (phone, full screen)
ffmpeg -v error -y -i out/final.mp4 -vf "fps=1,scale=640:-1,tile=3x3" -frames:v 1 out/small.png

# Strip: 12 consecutive frames around a fast action, to catch pops and overlaps
ffmpeg -v error -y -ss 4.1 -i out/final.mp4 -vf "scale=320:-1,tile=12x1" -frames:v 1 out/strip.png

# Loop seam: play it twice and look at the join
ffmpeg -v error -y -stream_loop 1 -i out/final.mp4 -c copy out/loop_check.mp4

# Poster frame for the thumbnail
ffmpeg -v error -y -ss 1.2 -i out/final.mp4 -frames:v 1 out/poster.png
```

The small-size test is the one most often skipped and the one that catches the most. Type that is elegant at full size is frequently illegible once scaled down.

**Match the width to the format.** A 16:9 launch film is watched on a laptop, a TV, a site hero and an autoplaying feed card — check it at 640 px, not at 360. A 9:16 short really is watched on a phone, so 360 px is right there. Testing a landscape film at phone width condemns type that was never going to be seen that small, and testing a vertical film at 640 px passes captions that will be unreadable in the feed.

## The rubric

Score each out of 10, with a timestamp for anything below 8:

| Criterion | Failing looks like |
| --- | --- |
| Hook | Nothing in the first 2 seconds that would stop a scroll |
| Readability at delivery width | Any caption or UI label that cannot be read at 640 px (16:9) or 360 px (9:16) |
| Motion quality | Sliding, linear moves, pops, dead frames, unintended overshoot |
| Variety | A stretch over 4 seconds with no new information |
| Composition | Crowded edges, floating elements, inconsistent margins |
| Brand accuracy | Wrong colour, wrong font, invented UI, altered logo |
| Sound sync | A cut off the beat, a click with nothing moving under it |
| Claims | A number, price or comparison the user has not confirmed |

## Defects worth hunting

Look for these specifically rather than scanning generally — they are the ones that recur:

- Text overlapping during a container swap, because the exit and entrance were not separated.
- Anything sliding at constant speed instead of easing.
- Blurry scaled text, usually `will-change` on something the camera scales.
- A dead beat where the music changes and the picture does not.
- A hard cut smeared by motion blur because it fell inside a shutter group.
- A loop seam that jumps — position matched, velocity or noise phase not.
- A screenshot at the wrong theme for its canvas, or at the wrong scale factor so it is soft.
- Corner labels, timecodes, and frame borders that nobody asked for.
- A centred title on a gradient, or a shot where everything simply fades in.
- An end card so static the video looks like it stopped rather than finished.
- A metric, logo, or claim that was invented rather than supplied.

## How many rounds

As many as the defects require, and no more. A fixed count of rounds or a "score until everything is 8" ritual spends budget without guaranteeing anything, and it encourages inflating scores to exit the loop.

Work defect-driven instead: list concrete problems with timestamps, fix them, re-render only the affected seconds, and re-inspect those seconds. Stop when a pass finds no new defect — then say so, and name whatever is still weak but was not worth another pass. One honest "the third feature shot is the weakest and I would reshoot it with more hold" is worth more than a row of eights.

Re-render narrowly. Re-rendering the whole film for a fix at 00:14 is what makes people stop iterating.

## Delivery

Deliver and state plainly:

- `out/final.mp4` for each requested format, with real durations.
- `out/poster.png`, `out/contact.png` and `out/small.png`.
- `out/loop_check.mp4` when the film loops.
- A short `README.md` with the commands to re-render and change the film.
- The list of any representative values, so nothing invented is mistaken for real.
- What was measured versus what was only looked at — in particular, that the audio was measured but not heard.
- The one thing you would improve next.

A film handed over with an honest list of its remaining weaknesses is more useful than one handed over with a claim of perfection, and it is the only version of the claim that survives the user watching it.
