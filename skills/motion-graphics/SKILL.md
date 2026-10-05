---
name: motion-graphics
description: Create product launch videos, UI demos, motion graphics, explainers and short-form films with a request-appropriate render route, real product assets, choreographed interactions, sound and visual review. Use for launch videos, product reels, promos, animated explainers, teasers, demo videos and more.
---

# Motion Graphics

Act as a motion designer and product-launch director. Build a film through actions, transformations and visual continuity. Do not default to presentation slides of headings, bullets and screenshots with entrance effects. Title cards and still holds are useful when they support the story or give the viewer time to understand a result.

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

Before writing shots, choose the opening, middle and ending separately. Base the opening on the audience's first question and the product's strongest visual evidence. A logo reveal, typed request, result-first shot or visual metaphor can each work; none is mandatory. Record what earns attention in the first two seconds and how it leads into the demonstration. For each interaction, specify starting state → action → response → result → readable hold. Design neighbouring scenes together: specify what persists, transforms or carries attention across the join, with shared boundary position, scale and motion direction. A transition should develop the previous state, not merely decorate the gap between unrelated scenes. Read [references/product-choreography.md](references/product-choreography.md) for UI films and [references/shot-design.md](references/shot-design.md) for structure.

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

**And default to 16:9 at 1920x1080.** A launch film's home is YouTube, a website hero, an X post and an email — all landscape. Render vertical and square only when the user asks for them or names a social-first destination, and when you do, reframe from the same timeline rather than cropping. The short-form explainer is the exception: it is 9:16 by definition. A UI-morph loop is often best at 1:1, since the container is centred and the canvas is plain.

Go shorter only when the user says so — a named duration, "teaser", "short", "quick", a platform with a hard limit, or an explicit budget constraint. Never shorten silently to save render time or tokens; a 20-second film delivered against an unspecified brief is a worse outcome than a longer render, and the user cannot tell from the file that it was cut short.

If the brief is genuinely ambiguous and a wrong guess would waste the production, ask once, in the same message as the rest of the brief-back, and name the default you will otherwise use. Under "go all out", do not ask — take the long default.

State the chosen duration in `docs/spec.md` with the reason, so a 20-second choice is always visible as a decision rather than an accident.

## Choose the render route once

Default to **Canvas + seek(t) + Playwright**. Choose the route before building and record the reason in `docs/spec.md`. Honour an explicit user choice and preserve an existing suitable video project.

| Preference | Route | Choose when |
| --- | --- | --- |
| 1 — default | **Canvas + seek(t) + Playwright** | A self-contained code-rendered film, custom graphics, UI choreography or procedural animation can be built directly. Keep this route unless another has a concrete advantage for the request. |
| 2 | **HyperFrames (HTML)** | Reusable HTML/CSS components, complex DOM layouts or framework-managed media and timelines materially simplify the requested film. It is an option, not a mandatory upgrade for every UI video. |
| 3 | **Remotion (React)** | The user asks for Remotion or an existing Remotion project should be continued. If React reuse offers a substantial advantage otherwise, explain the proposed choice rather than silently making it the default. |

For footage-led or exact edits, preserve the existing editor/compositor timeline. Use drawing rigs for hand-drawn work and real 3D where perspective, occlusion or camera orbits require it; these can supply assets or layers to the selected pipeline.

Install only necessary dependencies within the task's authorization and environment permissions. If the chosen route is unavailable, disclose the fallback and its visual tradeoffs. When using a framework, read its available skill and current official docs; use its native timeline and render contract instead of imposing the Canvas capture loop. Existing brand and reference information should answer creative setup questions where possible. Prototype the hardest interaction and scene handoff before extending the film.

## Get a reference, or go find one

Without a reference the output converges every time on the same film: centred title on a gradient, everything fading in, a logo at the end. Ask for one, but never stall on the answer — offer all four paths in one line and take the first available:

1. A video file, a frame, or a link the user supplies.
2. A product whose launch film the user likes, by name.
3. The user's own site, app, past videos, or image library — the strongest option, because nobody else can copy it.
4. Sourced automatically from a launch-video directory such as [whatships.com](https://whatships.com), naming which film's grammar is being copied.

With no reference at all, pick a structure from [references/motion-patterns.md](references/motion-patterns.md) and proceed; the patterns are self-contained and browsing examples is optional.

Use one primary reference, plus at most one secondary for a specific element such as captions. Take the reference's grammar; never its content, logo, characters, or claims. Read [references/reference-intake.md](references/reference-intake.md) for how to inspect a reference honestly and turn it into `docs/style_guide.md`.

## Resolve the assets before animating

Reuse the actual product's components, markup, styles, fonts and assets when available. For animated UI, prefer source components or faithful reconstructions of observed states; use screenshots for static proof and recordings for real interactions. Never invent product functionality or pass imagined UI off as real. Sanitize private data and record representative content. Graphics, mascots and device assets should serve the product story; choose code, existing assets or generation according to the shot.

Probe in order — connected image or video MCP servers, then API keys in `.env`, then free fallbacks, then redesign the shot so it does not need the asset, and only then ask the user. List the asset manifest in `docs/spec.md` before animating so a wrong screen is caught early.

Read [references/assets-and-generation.md](references/assets-and-generation.md) for product capture, brand extraction, the generator probe, generate-then-trace, and the free fallbacks.

Representative data is allowed where real data is unavailable, but never put `sample`, `demo`, `lorem ipsum`, or a placeholder brand on screen, and never state a metric, price, rating, or claim the user has not confirmed. List every invented value for replacement.

## Build on the seek(t) contract

Every generated frame must be reproducible from timeline time. Canvas uses `window.seek(t)`; Remotion uses its frame-driven composition model; HyperFrames uses its native seek-safe timeline. Use the selected framework's contract rather than requiring the same function name everywhere. Avoid wall-clock timers, unseeded randomness and accumulated state during rendering; await fonts and assets. The custom renderer examples below apply to Canvas only.

Read [references/render-engine.md](references/render-engine.md) for the page skeleton, the capture loop, subframe motion blur, the determinism check, and format-aware layout. Read [references/motion-language.md](references/motion-language.md) for spring presets with measured overshoot, multi-target `track()`, text and transition recipes, and the banned-defaults list.

## Score it to the beat grid

Sound is where a code-rendered film stops reading as a tech demo. Cuts land on beats, UI actions land on measured onsets, and nothing important happens in silence. Measure a supplied track; synthesize the score and effects in code when none is supplied. Read [references/sound-design.md](references/sound-design.md).

## Look at your own frames before showing anything

Before extending a UI film, render a short draft containing its opening, one complete interaction and a transition. Inspect stills and intermediate transition frames, then inspect a low-resolution animatic of the whole timeline before the final encode. Check settled reading time, input state changes, cursor causality, clipping and continuity. Contact sheets establish layout, not motion or audio quality. Log timestamped defects, fix the most consequential ones and re-inspect affected seconds. Stop when the checks find no new material defects; report remaining weaknesses without inflating scores. Read [references/critique-loop.md](references/critique-loop.md).

Never claim a render, a score, or a visual approval without having run the command and looked at the output.

## Deliver every format from one timeline

Write scenes against a layout function rather than fixed pixels so any aspect ratio can be rendered from one timeline, reframing type and UI per format. Never crop a finished render to another shape, and never promise arbitrary reframing from one output.

Render only what was asked for. A launch film ships 16:9 at 1920x1080 by default; add 9:16 and 1:1 when the user names a social destination. Rendering three formats triples the time for two files nobody requested.

Take the frame rate from the brief rather than defaulting to 60. 60 fps suits fast camera moves and UI motion; 30 is right for narration-led short form and halves both render time and file size; match the source when editing existing footage. Render only the formats that were asked for.

Deliver `out/final.mp4` per format, `out/poster.png`, `out/contact.png`, `out/loop_check.mp4` when the film loops, and a short `README.md` with the render commands. Report real paths and durations, list any invented values, and say what you would improve next.

## Quality check

Confirm the film matches the requested subject and duration; the hook lands inside 2 seconds; holds have a reading or story purpose; every product screen is grounded in the actual product; every claim and number is confirmed or listed for replacement; motion uses springs with overshoot only where intended; the render is deterministic across two runs; audio sits at the target loudness with cuts on the beat; type stays readable at the intended viewing size (check 640 px landscape and 360 px vertical as baselines); and the last frame sets up the first when the piece loops.

Run the anti-template check: every scene and graphic should serve this product. Gradients, centred type, logos, fades and celebration effects are choices, not automatic failures. Use them when the reference, brand or story supports them; avoid substituting them for a demonstration. Keep a coherent type and colour system and record the visual rationale in `docs/style_guide.md`.
