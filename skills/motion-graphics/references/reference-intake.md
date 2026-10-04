# Reference intake

## Contents

- [Inspect the actual video](#inspect-the-actual-video)
- [What a still can and cannot tell you](#what-a-still-can-and-cannot-tell-you)
- [Extract the grammar](#extract-the-grammar)
- [Translate it into the new film](#translate-it-into-the-new-film)

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
