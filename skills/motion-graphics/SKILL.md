---
name: motion-graphics
description: Produce motion graphics videos rendered entirely from code — product launch films, feature announcements, UI-morph loops, showreels, animated explainers, and vertical short-form videos — using a deterministic seek(t) renderer, headless Chromium frame capture, closed-form springs, beat-locked synthesized sound, and a frame-critique loop. Use when the user asks for a launch video, product reel, promo video, motion graphics, animated explainer, teaser, demo video, or short-form video, with or without an existing brand.
---

# Motion Graphics

## Contents

- [Preserve the user's film](#preserve-the-users-film)
- [Run three gates in order](#run-three-gates-in-order)
- [Gate 1: capability preflight](#gate-1-capability-preflight)
- [Gate 2: always write the plan](#gate-2-always-write-the-plan)
- [Gate 3: approval, and when to skip it](#gate-3-approval-and-when-to-skip-it)
- [Classify the job before the film](#classify-the-job-before-the-film)
- [Name the film type](#name-the-film-type)
- [Default to long form](#default-to-long-form)
- [Choose the render route once](#choose-the-render-route-once)
- [Get a reference, or go find one](#get-a-reference-or-go-find-one)
- [Resolve the assets before animating](#resolve-the-assets-before-animating)
- [Build on the seek(t) contract](#build-on-the-seekt-contract)
- [Score it to the beat grid](#score-it-to-the-beat-grid)
- [Look at your own frames before showing anything](#look-at-your-own-frames-before-showing-anything)
- [Deliver every format from one timeline](#deliver-every-format-from-one-timeline)
- [Quality check](#quality-check)

## Preserve the user's film

Extract the subject, the one thing the viewer must remember, duration, aspect ratios, brand assets, references, music, voiceover, deadline, and exclusions before proposing anything. Treat every named feature, screen, colour, font, lyric, and beat as locked. A supplied script, storyboard, or brand guide overrides this skill's defaults.

Inspect what already exists: a product URL, a repository, a `docs/design/*-design.md` handoff, brand tokens, fonts, logo files, prior videos, screen recordings. Reuse those instead of asking the user to describe them again. Never substitute a generic reel for the film the user asked for.

## Run three gates in order

Confusing these is the most common way this work fails. They are independent, and only one of them is ever skippable.

| Gate | Always runs? | What it produces |
| --- | --- | --- |
| 1. Capability preflight | Yes. Never skippable | What can be rendered on this machine, and what is missing |
| 2. Plan | Yes. Never skippable | `docs/spec.md`, `docs/style_guide.md`, `docs/shotlist.md` |
| 3. Approval | Default yes, skippable | The user's OK, or recorded assumptions |

"Go all out" skips approval. It does not install Chromium, and it does not excuse animating a film whose shots were never decided. A plan is not a formality to clear with the user — it is the document the renderer is built from, so it gets written even in a fully autonomous overnight run.

## Gate 1: capability preflight

The model writes a program, not a video, and the runtime differs on every machine this skill lands on. Detect what is present before writing code, then name what is missing and the command that fixes it on the detected platform. Never assume a package manager, and never discover a missing binary at encode time.

```bash
node -v                                 # need 22+
ffmpeg -version                         # need any recent build
npx playwright --version                # route A only
python3 -c "import librosa"             # only when a music track is supplied
```

Require only what the plan actually uses. Node and ffmpeg are always needed.

For route A, the `playwright` npm package is required — it is the capture driver, and no browsing tool substitutes for it, because rendering means calling `seek(t)` and screenshotting a canvas thousands of times straight into an encoder. **The browser binary is a separate question, and usually already answered.** Check for an installed Chrome or Edge before downloading anything:

```js
// chromium.launch({ channel: 'chrome' }) — or 'msedge'. No download.
```

Only fall back to `npx playwright install chromium` (~150 MB) when no suitable browser exists, and ask before running it. Downloading a second browser onto a machine that already has one wastes time and frequently fails behind a proxy or in a sandbox. numpy and librosa are needed **only** when the user supplies a track that must be beat-matched — a synthesized score sets its own BPM, so the grid is already known. An image, video, or voice generator is needed only for a shot that cannot be drawn or captured.

Put the result in the plan's `<requirements>` block, not in a throwaway message, so installs are approved along with the film. Degrade and say what was degraded when a gap has a fallback; stop and ask when it blocks everything. The per-platform install commands are in [references/production-plan.md](references/production-plan.md#requirements-and-install-commands).

If there is no shell at all and the work is chat-only, say plainly that no MP4 can be produced there, then deliver the complete project and the exact commands to run. Never describe a render that did not happen.

## Gate 2: always write the plan

Three short files, before any animation code:

- `docs/spec.md` — what film this is and how it gets built, as an XML block with `<inputs>`, `<direction>`, `<structure>`, `<build>`, `<requirements>`, `<gotchas>`. It doubles as a reusable prompt.
- `docs/style_guide.md` — the look in values precise enough to reproduce: palette hexes, type family and weight and tracking, shot lengths, transitions, camera, texture.
- `docs/shotlist.md` — one row per shot: start, end, beat, what is on screen, how text enters and exits, camera move, SFX cue, asset. Times rounded to the frame so a cut never lands inside a motion-blur group.

Before writing shots, choose the **opening, the middle and the ending as three separate decisions**, and record which three and why. The opening is not picked from a menu: name the first question this audience actually has — what's new, what would it do for me, is it for me, what does it work on, can it really make something good, how do I get it — and answer that in two seconds. The device follows from the question. Whether the logo comes first follows from whether the name carries weight for this audience; an unknown wordmark in the first second wastes the most valuable two seconds in the film. The options and when each applies are in [references/shot-design.md](references/shot-design.md#choose-an-opening-a-middle-and-an-ending-separately).

Keep each to about a screen; a spec longer than that stops being read, including by the agent that wrote it. Read [references/production-plan.md](references/production-plan.md) for the filled example, the shotlist table, the autonomy rules, and the director's brief that films over 60 seconds need.

## Gate 3: approval, and when to skip it

By default, show the brief-back in at most eight lines plus the shotlist, and wait. This is the cheapest place to be wrong: a rejected shotlist costs a minute, a rejected render costs an hour.

Skip the wait — not the plan — when the user says *go all out*, *your best*, *surprise me*, *don't ask*, *one shot*, *just do it*, or sets up an overnight or autonomous run. Then choose every default, state the three or four assumptions that most affect the result, log them in `docs/review_log.md`, and run to a finished render. The critique loop still runs; autonomy is permission to decide, never permission to ship unexamined frames.

Ask a blocking question only when proceeding would waste the whole render: no product access for a product film, a claim or metric that cannot be invented, or a missing capability with no fallback.

## Classify the job before the film

"Make me one like this" has two readings that produce completely different work, and guessing wrong wastes the whole production. Settle it first:

- **Original** — a new film for the user's product. Everything below applies.
- **Inspired by a reference** — the reference's visual grammar, the user's story. Take its structure, pacing, and type treatment; never its content, characters, branding, or claims.
- **Exact edit** — reproduce the same shots, timing, motion, people, and audio, changing only what the user named. This is an edit, not an animation, and most of this skill's defaults are wrong for it.
- **Footage-led** — the user has real footage and wants it cut, with motion graphics built around it.

The last two are covered by [references/footage-editing.md](references/footage-editing.md). Read it before touching supplied media, and never invent graphics or narration for footage that has not been inspected.

## Name the film type

Five types with different structures, pacing, and sound. Name the one in scope; a brief may combine two, but never silently.

- **Launch film** — music-led, no narration, feature statements over real product UI. The default for "make a video for my product".
- **UI morph** — 15–25s, one container that never cuts, morphing state to state with a cursor driving every change and the last frame equal to the first.
- **Short-form explainer** — 9:16, 60–150s, narration-led with word-level captions and a CTA end card. Read [references/short-form-video.md](references/short-form-video.md).
- **Showreel** — 10–20s, technique-led, no product. Proves the engine works; contains no idea, so it is a poor deliverable.
- **Story film** — 45s and up, narrative rather than feature list, with chapters and a score. Needs a director's brief and multiple sessions; say so before starting.

Read [references/shot-design.md](references/shot-design.md) for beat structures, the hook, the end card, and how to write the words, and [references/motion-patterns.md](references/motion-patterns.md) for twelve ready scene recipes — pick one by the viewer's takeaway. Read [references/signature-devices.md](references/signature-devices.md) for the recurring moves in shipped launch films — typed carets, inline chips, word slots, travelling objects — with implementations; a film using none of them will read as assembled rather than designed.

## Default to long form

**"Make me a launch video" means a full-length film, not a teaser.** Default to **45–75 seconds** and build the whole thing. Shipped launch films sit in that range because it is what a product story needs: a hook, three to five capabilities each actually demonstrated, a payoff, and a lockup. Eight seconds holds four shots and cannot carry a product.

Go shorter only when the user says so — a named duration, "teaser", "short", "quick", a platform with a hard limit, or an explicit budget constraint. Never shorten silently to save render time or tokens; a 20-second film delivered against an unspecified brief is a worse outcome than a longer render, and the user cannot tell from the file that it was cut short.

If the brief is genuinely ambiguous and a wrong guess would waste the production, ask once, in the same message as the rest of the brief-back, and name the default you will otherwise use. Under "go all out", do not ask — take the long default.

State the chosen duration in `docs/spec.md` with the reason, so a 20-second choice is always visible as a decision rather than an accident.

## Choose the render route once

Decide before building, say which and why, record it in `docs/spec.md` and `motion/CLAUDE.md`, and never switch mid-film — switching means rewriting every shot.

| Route | Choose when |
| --- | --- |
| **Canvas + `seek(t)` + Playwright** | Default. Zero dependencies, total control, and what an unguided model picks anyway |
| **Remotion** (React) | The user asks · the repo has it · a template or series where content changes but the film does not |
| **HyperFrames** (HTML + GSAP) | The user asks · the repo has it · the piece is DOM- and CSS-shaped |
| **Node canvas rigs** | The look is hand-drawn — watercolour, paper, ink, visible brush texture |
| **An existing editor or compositing project** | Real footage, an exact edit, or a localised replacement in a film the user owns. Preserve the original timeline rather than rebuilding it |
| **3D, driven by the chosen renderer** | The brief needs believable device sides, lens changes, occlusion, or a camera orbit. A skewed screenshot cannot produce those |

Never install a framework to satisfy this skill; route A needs nothing beyond Playwright. Verify a framework's current CLI and API against its own docs rather than copied examples. Read [references/render-engine.md](references/render-engine.md).

## Get a reference, or go find one

Without a reference the output converges every time on the same film: centred title on a gradient, everything fading in, a logo at the end. Ask for one, but never stall on the answer — offer all four paths in one line and take the first available:

1. A video file, a frame, or a link the user supplies.
2. A product whose launch film the user likes, by name.
3. The user's own site, app, past videos, or image library — the strongest option, because nobody else can copy it.
4. Sourced automatically from a launch-video directory such as [whatships.com](https://whatships.com), naming which film's grammar is being copied.

With no reference at all, pick a structure from [references/motion-patterns.md](references/motion-patterns.md) and proceed; the patterns are self-contained and browsing examples is optional.

Use one primary reference, plus at most one secondary for a specific element such as captions. Take the reference's grammar; never its content, logo, characters, or claims. Read [references/reference-intake.md](references/reference-intake.md) for how to inspect a reference honestly and turn it into `docs/style_guide.md`.

## Resolve the assets before animating

Most of what appears on screen is drawn in code, not sourced: device frames, browser chrome, cursors, charts, loaders, mascots, icons, gradients, grain, and all type. Real product UI is captured from the live URL with Playwright and never redrawn from imagination. Only photographic images, 3D renders, character art, live footage, and natural voiceover need an outside generator.

Probe in order — connected image or video MCP servers, then API keys in `.env`, then free fallbacks, then redesign the shot so it does not need the asset, and only then ask the user. List the asset manifest in `docs/spec.md` before animating so a wrong screen is caught early.

Read [references/assets-and-generation.md](references/assets-and-generation.md) for product capture, brand extraction, the generator probe, generate-then-trace, and the free fallbacks.

Representative data is allowed where real data is unavailable, but never put `sample`, `demo`, `lorem ipsum`, or a placeholder brand on screen, and never state a metric, price, rating, or claim the user has not confirmed. List every invented value for replacement.

## Build on the seek(t) contract

Every film is a pure function of time. `window.seek(t)` paints the exact frame for moment `t` with no state carried between frames, no CSS transitions, no timers, no `requestAnimationFrame` during render, and seeded noise instead of `Math.random`. That rule is what makes a render reproducible, a one-line fix cheap, and frame 812 renderable without simulating the 811 before it.

Read [references/render-engine.md](references/render-engine.md) for the page skeleton, the capture loop, subframe motion blur, the determinism check, and format-aware layout. Read [references/motion-language.md](references/motion-language.md) for spring presets with measured overshoot, multi-target `track()`, text and transition recipes, and the banned-defaults list.

## Score it to the beat grid

Sound is where a code-rendered film stops reading as a tech demo. Cuts land on beats, UI actions land on measured onsets, and nothing important happens in silence. Measure a supplied track; synthesize the score and effects in code when none is supplied. Read [references/sound-design.md](references/sound-design.md).

## Look at your own frames before showing anything

Render a contact sheet, open it, and judge it as a harsh motion director rather than its author. Films that work are three or more critique rounds, not one shot. Score hook, phone-size readability, motion quality, variety, composition, brand accuracy, and sound sync out of 10; fix the three worst problems; re-render only the affected seconds; repeat until every score is 8 or above. Read [references/critique-loop.md](references/critique-loop.md).

Never claim a render, a score, or a visual approval without having run the command and looked at the output.

## Deliver every format from one timeline

Write scenes against a layout function rather than fixed pixels, then render 9:16, 1:1, and 16:9 from the same timeline, reframing type and UI per format. Never crop a 16:9 render down to vertical, and never promise arbitrary reframing from one finished render.

Take the frame rate from the brief rather than defaulting to 60. 60 fps suits fast camera moves and UI motion; 30 is right for narration-led short form and halves both render time and file size; match the source when editing existing footage. Render only the formats that were asked for.

Deliver `out/final.mp4` per format, `out/poster.png`, `out/contact.png`, `out/loop_check.mp4` when the film loops, and a short `README.md` with the render commands. Report real paths and durations, list any invented values, and say what you would improve next.

## Quality check

Confirm the film matches the requested subject and duration; the hook lands inside 2 seconds; no 2-second stretch is static; every product screen is real; every claim and number is confirmed or listed for replacement; motion uses springs with overshoot only where intended; the render is deterministic across two runs; audio sits at the target loudness with cuts on the beat; type stays readable at 360 px wide; and the last frame sets up the first when the piece loops.

Run the anti-template check before declaring it finished: no centred title on a gradient, no shot where everything simply fades in, no corner labels or frame borders, no glow on UI chrome, no generic particle burst, one display face and one UI face, one accent colour. Every exception needs a brand reason recorded in `docs/style_guide.md`.
