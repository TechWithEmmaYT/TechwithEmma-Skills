# Planning

How a film gets decided before it gets built: the three plan files, the install
commands that belong in them, the autonomy rules, and how to read a reference
honestly enough to plan against it.

## Contents
- [Why the plan is never optional](#why-the-plan-is-never-optional)
- [Requirements and install commands](#requirements-and-install-commands)
- [The spec](#the-spec)
- [The style guide](#the-style-guide)
- [The shotlist](#the-shotlist)
- [Autonomy rules](#autonomy-rules)
- [Long films need a director's brief](#long-films-need-a-directors-brief)
- [Working across sessions](#working-across-sessions)

**Reference intake**

- [Inspect the actual video](#inspect-the-actual-video)
- [What a still can and cannot tell you](#what-a-still-can-and-cannot-tell-you)
- [Extract the grammar](#extract-the-grammar)
- [Translate it into the new film](#translate-it-into-the-new-film)


## Why the plan is never optional

The plan is not a form to clear with the user — it is the document the renderer is built from. A shot that was never decided cannot be animated, and a film assembled shot by shot without one drifts into a catalogue of effects with no argument.

So the plan is written in every mode, including a fully autonomous overnight run. What changes with autonomy is whether anyone is asked to approve it, never whether it exists.

Three files, written in this order, each short enough to read in a minute:

| File | Answers |
| --- | --- |
| `docs/spec.md` | What film is this, built how, from what, with what still missing |
| `docs/style_guide.md` | What does it look like, in values precise enough to reproduce |
| `docs/shotlist.md` | What happens, second by second, on which beat |

## Requirements and install commands

Pair every gap found in the preflight with the command for the detected platform, and put the result in the spec's `<requirements>` block so installs are approved along with the film.

| Missing | macOS | Debian / Ubuntu | Windows |
| --- | --- | --- | --- |
| Node 22+ | `brew install node` | `sudo apt install nodejs npm` | `winget install OpenJS.NodeJS` |
| ffmpeg | `brew install ffmpeg` | `sudo apt install ffmpeg` | `winget install Gyan.FFmpeg` |
| Chromium | `npm i -D playwright && npx playwright install chromium` | same, plus `npx playwright install-deps` | `npm i -D playwright && npx playwright install chromium` |
| Audio analysis | `pip install numpy librosa soundfile` | same | same |

Chromium is roughly a 150 MB download — ask before running it.

If that download fails — a blocked CDN, a sandbox, a corporate proxy, a stale `__dirlock` in the browser cache — do not stop. Playwright drives an already-installed Chrome or Edge with no download at all:

```js
const browser = await chromium.launch({ channel: 'chrome' });   // or 'msedge'
```

Verified working on a machine where `npx playwright install chromium` failed outright. Try the installed-browser channel before reporting the render as blocked, and say which browser the render used, since font rendering differs slightly between channels. A stale lock is cleared with `rm -rf ~/Library/Caches/ms-playwright/__dirlock` once no install process is running. Autonomy over the film never implies authority to install software or spend money on a paid API; those are asked for separately.

## The spec

```xml
<inputs>
Product: Linear-style issue tracker · https://example.com
Duration: 24s · Formats: 9:16 primary, 16:9 and 1:1 secondary
States: logo → empty inbox → issue typed → assigned → board view → chart → done → logo
Real data: 4 issue titles and 3 assignee names supplied by the user (docs/content.md)
Brand: canvas #0C0C0D, accent #5E6AD2, Inter display + Inter UI
Music: synthesize, 124 BPM, 8 bars · Narration: none
Reference: ./refs/cap-launch.mp4, taking its feature-card grammar only
</inputs>

<direction>
Near-black canvas, one indigo accent, one type family at two weights. The camera never
cuts during a state change — the container morphs and its content swaps behind a 2-frame
blur. A cursor causes every change; nothing animates on its own.
Banned for this film: gradients on UI chrome, glow, particles, any shot without a cursor.
</direction>

<structure>
Opening: mark-then-wordmark (the name carries recognition for this audience).
Middle:  feature cards on one surface (several small improvements, one product).
Ending:  the live CTA (next step is to open the app).
124 BPM, 8 bars, 24s. Hard cuts on downbeats only, rounded to 1/60s.
0.0-2.0   hook: wordmark assembles from the issue rows it will later contain
2.0-5.9   empty inbox; cursor arrives
5.9-9.7   issue typed character by character, real title
9.7-13.5  assignee picker opens, avatar springs in
13.5-17.4 board view: cards redistribute into three columns
17.4-21.2 chart draws itself to the real figure
21.2-24.0 collapse back to wordmark; last frame equals first
</structure>

<build>
Route: canvas + seek(t) + Playwright for this custom-drawn single-container morph.
Canvas remains the default. Consider HyperFrames when HTML component reuse materially helps; use Remotion when requested or already established. Follow the route table in SKILL.md.
Springs: snappy (320/30) for cursor and controls, default (170/26) for the container,
heavy (90/18) for the wordmark. No overshoot on type.
Assets: screenshots of /inbox, /board and /insights captured with Playwright; logo from
/favicon.svg; colours read from the live site's CSS variables; avatars drawn as initials.
Layout: lib/layout.js; UI scaled to 0.78 in 9:16; chart relabelled, never cropped.
</build>

<requirements>
Present: Node 24, ffmpeg.
Must install: Playwright + Chromium (~150 MB) — `npm i -D playwright && npx playwright install chromium`.
Not needed: numpy/librosa (score is synthesized, so the BPM is already known).
No image or voice generator needed; every asset is captured or drawn.
</requirements>

<gotchas>
Loop seam: the wordmark must return to its exact opening scale and the cursor to its
opening position, both at rest.
The real issue title is 46 characters and wraps at 9:16 — check at 360px wide.
Product UI is dark; do not place it on the light 1:1 variant without re-capturing.
Never invent an issue count, a user number, or a performance figure.
</gotchas>
```

Keep it this size. A spec longer than a screen stops being read, including by the agent that wrote it.

## The style guide

Written from the reference, in values rather than adjectives, because "clean and modern" cannot be rendered:

- **Palette** — canvas, surface, two text levels, one accent, one border, each as a hex.
- **Type** — display family, weight, size as a fraction of width, tracking at that size; the same for UI text. Tracking matters: canvas defaults are loose at display sizes.
- **Shot lengths** — the reference's actual range in seconds, measured from its contact sheet.
- **Transitions** — which of hard cut, match cut, whip, mask push, morph, and in what proportion.
- **Camera** — whether it moves, how far, how often.
- **Texture** — grain opacity, shadow softness, border alpha, or none.
- **Deliberate exceptions** — anything from the banned-defaults list this film uses on purpose, with its reason.

## The shotlist

One row per shot. Times rounded to the frame so cuts never land inside a motion-blur group.

```markdown
| # | Start | End | Beat | On screen | Text in / out | Camera | SFX | Asset |
|---|------:|----:|-----:|-----------|---------------|--------|-----|-------|
| 1 | 0.000 | 2.000 | 1 | Wordmark assembles from 6 issue rows | clip-up / hold | 1.02x drift | thump @0.0 | drawn |
| 2 | 2.000 | 5.903 | 5 | Empty inbox, cursor enters from lower right | none | still | whoosh @2.0 | inbox.png |
| 3 | 5.903 | 9.677 | 9 | Issue title typed, 46 chars | per-char / none | push 1.08x | click x46 | inbox.png |
```

Check three things before writing code: every gap between shots is under 4 seconds, the first row earns attention on its own, and the last row sets up the first if the film loops.

## Autonomy rules

The default is to show the brief-back and the shotlist, then wait. Skip the wait — never the plan — when the user says *go all out*, *your best*, *surprise me*, *don't ask*, *one shot*, *just do it*, or sets up an overnight or autonomous run.

In autonomous mode: choose every default, state the three or four assumptions that most affect the result, log them in `docs/review_log.md`, and run through to a finished render with the critique loop intact. Autonomy is permission to decide, never permission to ship frames nobody looked at.

Two things autonomy never covers. It does not authorise installing software, spending money on a paid API, or publishing anywhere — ask for those separately. And it is not created by a timeout: a plan that says "continue if I do not answer in ten minutes" is not the user's authorisation, so never write one, and never treat silence as approval unless the user already granted the autonomous run.

Ask a blocking question only when proceeding would waste the whole render: no access to the product for a product film, a metric or claim that cannot be invented, or a missing capability with no fallback.

## Long films need a director's brief

Past about 60 seconds, or whenever there are characters, chapters, or a licensed track, the spec grows into a brief and the work spans sessions. Say that up front rather than promising a single pass.

The brief adds: the film in one line, so every later decision can be checked against it; references with what to keep and what to push; a character bible with proportions, palette, and expressions that survive a style change; a beat sheet with acts and a visual payoff every three to five seconds; rules for when text goes huge and when it sits like a subtitle; and the gates below.

Run the gates in order and do not skip one: plan → stills for every shot → animatic at 960x540 with placeholder audio → full animation → polish → sound → final render. Pacing problems are cheap to fix in the animatic and expensive to fix after polish.

When chapters are split across parallel work, write `docs/animation_guide.md` first — shared primitives, spring presets, palette, type scale, naming — so every chapter comes back in one style instead of five.

## Working across sessions

Keep one project per brand. The second film costs a fraction of the first because the renderer, the layout module, the sound synthesiser, and the captured assets already exist.

`motion/CLAUDE.md` carries the render contract and banned defaults into every later session. `docs/review_log.md` carries what was already judged and fixed, so a later pass does not re-litigate a settled decision or repeat a rejected idea.

---

# Reference intake

Everything above assumes you know what film you are making. When the user supplies a
reference — a link, a file, a product whose launch film they like — this is how to turn it
into the plan rather than guessing from a thumbnail.


## Inspect the actual video

A caption, a thumbnail, or a claim about how a video was made is not an analysis of it. Get the file and look at it.

```bash
python3 scripts/inspect_video.py refs/launch.mp4 -o refs/ --strip 4.2
```

This probes the media, confirms it decodes fully, and builds contact sheets spanning the whole duration with every cell mapped to its real timestamp. The familiar `fps=2,tile=6x5` recipe does not — it is 30 tiles at two per second, so it silently shows the first 15 seconds of any video and nothing warns you.

For a link, retrieve the video through whatever browser, connector, or public media URL is permitted. Confirm the download actually succeeded before extracting: a partial file still reports a full duration in its metadata. If retrieval fails, say exactly what could not be inspected rather than working from the post's description.

Listen to the reference when audio matters and the tooling allows it, recording narration, music, cue placement, and pauses separately. An audio stream's existence says nothing about its content.

## What a still can and cannot tell you

A single frame is genuinely useful and strictly limited. It gives palette, type treatment, composition, density, and texture. It gives nothing about pacing, shot length, transitions, camera behaviour, choreography, or sound.

So a poster frame is a legitimate starting point when the video itself is unreachable — just say which one you looked at, and never describe a thumbnail review as a video review.

A spaced contact sheet shows composition and sequence. Dense consecutive strips are needed for fast transitions and choreography. Inspect first and last frames directly when the film loops.

## Extract the grammar

Record only what the new brief needs:

| Dimension | Record |
| --- | --- |
| Story | The first visible hook, the problem, the demonstrated outcome, the closing action |
| Layout | Hero placement, text and visual zones, negative space, UI scale, dense versus quiet shots |
| Type | Display and UI roles, weight, case, emphasis, line breaks, how text enters and leaves |
| Colour | Background, foreground, and accent relationships, plus any deliberate palette change |
| Timing | Approximate shot spans and reading holds; exact frame ranges only if recreating |
| Motion | What moves, its anchor and pivot, direction, depth, sequence, how it settles |
| Transition | Cut, match, mask, camera travel, blur, palette change, retained objects |
| Media | Real screenshot, recording, constructed UI, illustration, 3D object, live footage |
| Audio | What was actually heard; mark anything unheard or unmeasured as unknown |

Do not guess font identities from a frame. Record the weight, case, and proportion instead, which is what actually has to be reproduced.

## Translate it into the new film

Write down what is preserved and what changes, explicitly. For example: keep the quiet cream canvas, single teal accent, and serif italic emphasis, but replace the story, the characters, and every product screen.

Use one primary reference. A secondary reference is fine for one specific element — captions, an end card, a transition family — but combining several references' palettes, fonts, cameras, and transitions produces an incoherent film that looks sampled rather than authored.

Take grammar, never content. Another product's characters, branding, metrics, pricing, testimonials, and promotional overlays belong to that product, not to the new film.
