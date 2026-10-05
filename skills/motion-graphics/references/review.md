# Review

Two passes, both required before delivering. The critique loop is what you see; the
measurement pass is what looking cannot show. A film routinely passes the first and fails
the second.

## Contents
- [Inspect, do not admire](#inspect-do-not-admire)
- [Contact sheets that cover the whole film](#contact-sheets-that-cover-the-whole-film)
- [Close inspection](#close-inspection)
- [Measure what stills cannot show](#measure-what-stills-cannot-show)
- [The rubric](#the-rubric)
- [Defects worth hunting](#defects-worth-hunting)
- [How many rounds](#how-many-rounds)
- [Delivery](#delivery)

**Measuring a film**

- [The flat-film failure](#the-flat-film-failure)
- [Run the measurement pass](#run-the-measurement-pass)
- [Benchmarks from shipped films](#benchmarks-from-shipped-films)
- [Reading the numbers](#reading-the-numbers)
- [Fixing a flat film](#fixing-a-flat-film)


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

## Measure what stills cannot show

Everything above is qualitative, and there is one failure it reliably misses: a film in which
every moment is the same size. Each frame looks correct; the film is flat. Run the measurement
pass as well, and before the final render:

```bash
node scripts/measure_film.mjs out/final.mp4 refs/reference.mp4
```

The number that matters most is **peak frame-to-frame change**. Shipped launch films reach
0.28–1.00. Under about 0.15 means nothing in the film ever detonates. A full visual review has
passed films measuring 0.070 — thirty frames inspected, defects found and fixed, contact sheet
clean — against a reference at 1.000.

Full benchmarks and what to do about a low score are in
[review.md](review.md).

## The rubric

Score each out of 10, with a timestamp for anything below 8:

| Criterion | Failing looks like |
| --- | --- |
| Hook | Nothing in the first 2 seconds that would stop a scroll; display type under ~25% of frame height |
| Dynamic range | Peak frame-to-frame change under 0.15, or no moment visibly bigger than the rest |
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

---

# Measuring a film

## The flat-film failure

There is one failure that frame-by-frame review cannot catch, because every individual frame
is correct: **a film in which every moment is the same size.** The palette is disciplined, the
springs are right, the type is readable, the cuts land on the beat — and it still reads as
tasteful rather than exciting. Nothing in it ever detonates, so nothing in it feels important.

Stills cannot show this. Only the distribution of change over time can, and that is cheap to
measure. Run the measurement pass before the final render on any film that will be compared to
shipped work.

Measured case: a 60s launch film passed its own full visual review — thirty frames inspected,
twelve defects found and fixed, contact sheet clean — and still had a peak frame-to-frame
change of **0.070** against **1.000** for the reference it was built to match. Its single
biggest moment was fourteen times weaker than the reference's ordinary cut. Every reviewer
looking at stills, including the one who made it, called it good.

## Run the measurement pass

```bash
node scripts/measure_film.mjs out/final.mp4
node scripts/measure_film.mjs out/final.mp4 refs/reference.mp4     # side by side
```

Needs only ffmpeg on PATH. It reports peak change, mean change, near-still share, event count,
contrast, audio onset density, and what share of visual events land on an audio onset.

The underlying measure is ffmpeg's `scene` score: for every frame, how different it is from the
one before it, on a 0–1 scale. A film's curve of those values is its motion curve, and its
spikes are its cuts.

```bash
# the raw curve, if you want to look at it directly
ffmpeg -i film.mp4 -vf "select='gte(scene,0)',metadata=print:file=scene.txt" -an -f null -
```

## Benchmarks from shipped films

Four launch films, measured: Notion 3.7 (66s), Muse (30s), Jockey (93s), Linkstore (40s).

| | peak change | mean change | near-still | contrast | onset every |
| --- | --- | --- | --- | --- | --- |
| Notion 3.7 | 1.000 | 0.0084 | 77% | 997x | 0.24s |
| Muse | 1.000 | 0.0081 | 68% | 588x | 0.27s |
| Jockey | 0.356 | 0.0075 | 71% | 274x | 0.28s |
| Linkstore | 0.283 | 0.0020 | 89% | 604x | 0.34s |
| **a flat film** | **0.070** | **0.0016** | **93%** | **104x** | **0.57s** |

**Peak change is the headline number.** Under about 0.15 means the film has no detonation
anywhere in it. Note that a high near-still share is *not* the problem — three of the four
references are still for 68–89% of their frames. Stillness is fine, and is what makes the
peaks land. What matters is whether the film ever leaves it.

## Reading the numbers

**peak change** — the biggest single-frame change in the film. The one number that most
separates shipped work from flat work. Shipped films reach 0.28–1.00.

**contrast** — peak divided by the film's median frame-to-frame change: the biggest moment
measured against the film's resting state. This is dynamic range. Shipped films run 250–1200x.

Do not measure the peak against the *median event* instead. A film whose every cut is a full
inversion scores badly on that ratio while being exactly right.

**mean change** — overall visual activity. A film at 0.0016 against references at 0.0075–0.0084
is roughly five times less active per frame throughout, which usually means flat 2D vector work
where the references use depth, photographic texture, or dense colour.

**events on sound** — share of visual events within 100ms of an audio onset. Notion lands 93%.
Every significant picture change is a hit.

**onset density** — a shipped launch film has an audio event every 0.24–0.34s. At 0.57s the
score is half as eventful as it should be, even when its loudness, frequency balance and
dynamic range all measure correctly. Balance is not density.

## Fixing a flat film

In order of effect:

1. **Hard-cut between inverted states.** See
   [motion-language.md](motion-language.md#the-inversion-cut). This alone moves a peak from
   0.07 to near 1.00, because nothing produces a larger single-frame change than light becoming
   dark in one frame.
2. **Scale the hook.** Display type in the first two seconds should occupy roughly a quarter to
   a third of frame height. See [story.md](story.md#the-hook).
3. **Build in anticipation.** Deliberately quiet the two seconds before each detonation. Jockey
   holds near-white and near-still for 2.5s, then detonates into a full-frame radial burst.
   The stillness is what makes the burst register.
4. **Give the film three detonations**, not twelve and not zero: one in the opening, one at the
   structural midpoint, one at the payoff.
5. **Double the sound events** and put a hit on every visual event.

A film can pass every item in [review.md](review.md)'s rubric and still fail here.
Run both.
