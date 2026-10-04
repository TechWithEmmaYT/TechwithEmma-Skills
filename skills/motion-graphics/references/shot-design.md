# Shot design

## Contents

- [The beat grid](#the-beat-grid)
- [Teaser length: under 20 seconds](#teaser-length-under-20-seconds)
- [Launch film](#launch-film)
- [UI morph](#ui-morph)
- [Showreel](#showreel)
- [The showreel smoke test](#the-showreel-smoke-test)
- [Story film](#story-film)
- [Structures from shipped films](#structures-from-shipped-films)
- [Choose an opening, a middle and an ending separately](#choose-an-opening-a-middle-and-an-ending-separately)
- [Lead with the logo, or earn it](#lead-with-the-logo-or-earn-it)
- [The hook](#the-hook)
- [The closing line](#the-closing-line)
- [The end card](#the-end-card)
- [Writing the words](#writing-the-words)

## The beat grid

Every film is cut to a grid before it is animated. At 120 BPM a beat is 0.5s and a bar is 2s, which is why so many launch films land between 16 and 32 seconds — that is 8 to 16 bars.

Put state changes on beats, big moments on downbeats, and small accents on measured onsets. Round every cut to a whole frame so motion blur never straddles it. Choose the tempo from the film's temperament: 90–105 BPM for a considered, premium piece, 115–128 for ordinary product energy, 135+ for a listicle or a fast reel.

The rule that governs pacing is simpler than the grid: **something new every 2 to 4 seconds**. Not a new effect — a new piece of information. A shot that holds longer than 4 seconds needs a reason the viewer can see, and three shots in a row that each last 1 second read as a trailer for a film that does not exist.

## Teaser length: under 20 seconds

A brief of 5–15 seconds is not a shortened launch film; it is a different form, and the structures below do not compress into it gracefully. At 120 BPM, 8 seconds is exactly four bars, which buys four shots and nothing more.

What changes:

- **One idea per shot, not one feature.** Four shots means hook, product, one capability, lockup. A second capability has to be cut, not squeezed in.
- **The "something new every 2–4 seconds" rule tightens to every 1–2.** Put a secondary event on each half-bar — a caption arriving, a cursor landing, a counter moving — so a 2-second shot is not one static image held for two seconds.
- **The hook and the product must share a shot or be adjacent.** There is no room for an abstract opening that takes three seconds to resolve.
- **Spring settle times matter more than anywhere else.** A 0.68s settle inside a 2-second shot is most of its first act; see the preset table in [motion-language.md](motion-language.md#measured-spring-presets).
- **Cut the proof, never the payoff.** A teaser that shows one capability well beats one that names three.

Below about 5 seconds, drop to two shots — a hook and a lockup — and accept that it is a title card with motion rather than a film.

## Launch film

Music-led, no narration. The most common request. **Default to 45–75 seconds** unless the user asked for something shorter — that is where shipped launch films sit, because it is what a product story needs.

| Length | What fits | Use when |
| --- | --- | --- |
| 45–75s | Hook, 3–5 demonstrated capabilities, payoff, lockup | **The default.** Any unqualified "make a launch video" |
| 25–40s | Hook, 2–3 capabilities, lockup | A single feature release, or a stated constraint |
| 8–20s | Hook, one capability, lockup | Explicitly asked for; see Teaser length above |
| 90s+ | Chapters, a second product reveal, a narrative arc | A broad release with genuinely separate audiences |

The structure for the default length:

```
0:00-0:02  Hook. The problem, the result, or the product's single most striking image.
0:02-0:06  The product arrives. The UI assembles rather than fading in.
0:06-0:20  Three to five features. Each one: a claim in type, then the real UI doing it,
           with a cursor causing the change. One feature per 3-4 seconds.
0:20-0:24  One number that proves it works, counted up, with its unit.
0:24-end   Logo lockup, one line of positioning, the call to action.
```

What separates the good ones: the claim and its proof share the screen, so the viewer never has to take a sentence on trust. Make each benefit visible on the same demonstration asset rather than cutting to an unrelated screen — holding one artefact while it changes is what makes a feature list feel like a product instead of a brochure.

Alternate register. Impact cards with four words of huge type, then a readable UI moment with real content. Two impact cards in a row waste the second one; two UI moments in a row stop being read.

Commit to one of two rhythms and hold it for the whole film. **Alternation** — dark full-bleed type cards punctuating light product sections — gives chapters, lets the eye rest, and makes the product shots pop; it suits a broad release with several capabilities. **One committed mood** — everything dark, or everything light, with the claims in a fixed caption region and the real UI filling the frame — suits a dense product worth looking at, and is stronger for developer tools. Mixing the two reads as indecision rather than variety.

A film at the default length needs a mid-point reset: around 60% of the way through, change the register — a title card, a palette shift, a wide shot after a run of close ones — or the back half blurs into the front half.

## UI morph

15–25s, one container that never cuts. The hardest to fake and the strongest when it lands.

A single element moves through 8–12 states — logo, button, input, loader, success, card, chart, tooltip, command palette, toast, logo — changing size, radius, and fill while its content swaps behind a short blur. A cursor causes every change with a real click or hover. The camera never cuts, so the viewer never loses the object.

The technique that makes it work is two springs per edge. Animate the leading and trailing edges of the container on different stiffnesses so it stretches as it moves rather than sliding rigidly. Content enters after the morph starts and leaves before the next one begins — overlapping those is the most common readability failure in the form.

The last frame must equal the first, cursor position and velocity included, so it loops without a seam.

## Showreel

10–20s, technique-led, no product. The thing that makes one work, and that most attempts miss: **it annotates its own craft.** The labels are the content.

A measured example runs: a ball arcing along a dotted path captioned *slow in, slow out*, with *squash!* and *stretch* called out at the extremes → a headline assembling with *stagger: 50ms* and *overlap* annotated beside it → a glitch title with registration crosshairs → **a plotted easing graph** comparing *linear = robotic* against *ease in-out ✓*, with boxes animating underneath to demonstrate the difference → a particle burst labelled *follow-through* → radial rings counting 0–100% labelled *anticipation* → a name card offering work.

That is why the showreel inverts the product-film rules. Corner timecode, framing marks, annotation callouts, and deliberately mixed easing families all belong here, because the piece is styled as a technical sheet and the techniques are its subject. The same devices in a product film are noise.

Build it from contrasting technique families rather than variations on one. A measured set: a radial burst with concentric rings and tick marks · an easing comparison · a shape morph through circle, triangle, star and square with particle sparks · a dense tiled pattern (interlocking arcs or truchet tiles) animating in place · a point-cloud grid deforming into a 3D blob and then a torus · heavy type distorted or smeared · a full-bleed colour-field card with one word. Six or seven of these in fifteen seconds, each held just long enough to read.

Carry one palette and one accent through all of them so it reads as authored rather than sampled. Two shipped reels from the same prompt used orange/black/blue/acid-green and white/black/blue/red respectively — both coherent, because each committed.

**Show the easing comparison as data, not as prose.** One reel plots curves — *linear = robotic* against *ease in-out ✓* — with boxes animating underneath; another lays out a table captioned *Six ways to get from A to B*, one row per curve, with a dot travelling each row at its own rate so all six run simultaneously and the difference is visible rather than asserted. Either reads as craft; a sentence about easing does not.

It stays a poor client deliverable — it contains no idea about anything — but it is an excellent engine test, because one reel exercises springs, type, particles, graphs, counters and transitions in a single pass.

### The showreel smoke test

Before building a client film on a new machine or in a new project, render this as a pipeline check:

```text
Make a dynamic 15-second motion graphics video that shows what an incredible
motion designer you are, like it's your showreel for a résumé. Go all out.
```

It is a known-good exercise: fifteen seconds is long enough for six to eight shots and short enough to finish in one pass, and it has no product content to get wrong, so any failure is the pipeline's rather than the brief's. Render it, run the critique loop on it, and confirm the chain works end to end before anything is at stake.

**It is a test, not a deliverable, and never the answer to a client brief.** That line has been run thousands of times. The results are not identical — two reels from it shared no shot, no palette and no technique set — but they rhyme: a name card, an easing demonstration, corner timecode, a shape morph, an offer of work. Handing one to someone who asked for a product film gives them something that looks like everyone else's output and says nothing about their product.

## Story film

45s and up. A narrative rather than a feature list: a history, a day in a life, a problem that gets solved, a character who changes. Needs chapters, a beat sheet with a payoff every 3–5 seconds, and usually a score rather than a loop.

Breadth is what kills these. A broad release needs chapter resets — a title card, a palette shift, a camera reset — so the viewer gets a breath between sections, and each chapter needs one substantial result rather than six unreadable thumbnails. Compressing a wide product into a frantic catalogue is the characteristic failure.

## Structures from shipped films

Patterns worth stealing, each observed in a real launch video. Take the grammar, never the content, branding, or claims.

- **Feature card plus proof.** Alternating oversized verb cards with the same demonstration asset changing under each claim, ending on a before/after measurement and a platform row. Strong when the product has many small improvements.
- **Illustrated explainer.** A quiet cream canvas, one accent, serif italic emphasis inside otherwise plain sentences, an illustration vocabulary carrying the meaning, and real product inserts used sparingly. Strong when the idea is relational and a dashboard would overexplain it.
- **Dark dimensional reel.** Wide and macro shots alternating, depth used to reveal the product, real UI masked into 3D device screens, short benefit headlines between. Strong for visual products; expensive, because the depth is the point and a tilted flat screenshot does not reproduce it.
- **Metaphor becomes interface.** An abstract hook establishes the idea — many links becoming a storefront, a role label cycling through jobs — then resolves into the literal product doing it, then groups into the brand. The hook and the proof must share tokens or the film splits in two.
- **One complete task.** Request, process, useful artefact. A single job followed from question to finished output, with integrations introduced only after the job is understood. The most convincing structure for anything agentic, and the most forgiving of a small feature set.
- **Sustained proof.** A fast, spectacular visual entry, then deliberately longer holds on conversations, tables, and generated output. The contrast is the design: the spectacle earns attention, the slow part earns belief.
- **Chaptered capability release.** Numbered or titled chapters, each with a reset, a short label, and one substantial result. The only structure that survives a release with six unrelated features.

Each of these is written out as a step-by-step recipe, with its choreography and its specific traps, in [motion-patterns.md](motion-patterns.md). Pick one there by the viewer's takeaway before writing the shotlist.

A caution that applies to all of them: a finished video does not reveal how it was made, what it cost, or whether its numbers are true. Borrow structure and visual grammar. Never import another product's metrics, pricing, claims, or promotional overlays into a client's film.

## Choose an opening, a middle and an ending separately

A launch film is three decisions, not one template. Pick each from the vocabulary below based on what the product is and who already knows it — then say in `docs/spec.md` which three you chose and why. Two films using the same middle with different openings read as completely different films.

### Openings

**The opening answers the first question that this audience actually has.** That question is different for every product, which is why shipped launch films share no opening template — and why picking a device before identifying the question produces a film that looks borrowed.

Ask it literally: *someone who has never heard of this, seeing it mid-scroll with no sound — what do they need to know first?* Then answer that in two seconds. The device follows from the question, never the other way round.

| Their first question | Answer it with | Seen in |
| --- | --- | --- |
| "What's new?" (they already know the product) | Identity, then the change, then the version | A known tool's release film |
| "What would this do for *me*?" | A word slot cycling the roles or jobs it serves | A product serving several audiences |
| "Is this for me?" | A typed positioning line naming the audience outright | A product for a specific, narrow user |
| "What does it work on?" | The medium itself, in volume — the files, videos, documents it handles | A tool defined by its input |
| "Can it actually make something good?" | The output. No words, no logo — just the thing it produces | A product whose value is visual |
| "Is this real, and how do I get it?" | The actual install command, typed live in a real terminal | A developer tool |
| "Why should I care at all?" | The problem in five words of huge type, no brand | A product solving an unrecognised problem |

### Lead with the logo, or earn it

Three of the six films studied open on the mark; three never show it until the end. The split is not stylistic:

**Open on the mark** when the name carries weight — a known brand, or a release where the name *is* the news. The pattern is consistent: the mark lands alone, the wordmark extends from it (usually rightward, on a stiffer spring than the mark), both hold about a second, then the wordmark dissolves or blurs out rather than cutting, so the mark reads as persisting underneath. Then the film starts properly. It costs 1–1.5s and buys legitimacy.

**Skip it** when the audience does not know the name yet and something else is more persuasive — the output, the problem, the command. An unknown wordmark in the first second is a logo nobody can read spending your most valuable two seconds. Put it at the end instead, where the film has earned it, and where recognition is the point rather than the obstacle.

A useful test: if the name were replaced with a competitor's, would the opening still work? If yes, the name is doing no work and should not be first.

### Opening devices

These are the moves, not a running order. Each is the natural answer to one of the questions above.

- **Mark, then wordmark beside it.** Covered above.
- **Fragments assembling into the mark.** Bars, pixels, or tokens resolving into the logo. Earns the mark rather than stating it, and sets up a product about assembling things.
- **The triad.** Three one-word claims, one per beat, full screen, no UI: *Record. Edit. Share.* The whole product before anything is demonstrated. Needs words strong enough to stand alone.
- **The word slot.** A stable phrase with a cycling slot — *Meet your ___*. Shows range before showing any one thing.
- **The typed positioning line.** One sentence, typed live, naming the audience. Let inline chips land in the finished sentence afterwards rather than typing around them.
- **Straight into the output.** The product's own result, full frame, no words — then reveal it was made in the tool by pulling back into the interface.
- **The typed command.** A real install or prompt, character by character with a block caret.
- **Cold open on the problem.** Huge type, no brand, no product.
- **Tokens converging.** Scattered fragments gathering into the product. Resolve it fast.

Whichever is chosen, the first two seconds must work muted, at phone size, mid-scroll. No film opens on a slow fade from black or the word "Introducing".

### Middles

- **Feature cards on one surface.** Alternating claim cards with the same demonstration asset changing under each. Best for a release of many small improvements.
- **One complete task.** Request, processing, artefact, outcome. Best for agentic products and small feature sets; the most convincing structure there is.
- **Chapters.** Grouped capabilities with a reset between each. The only structure that survives a broad release.
- **Sustained proof.** Fast visual entry, then deliberately long holds on real UI, tables and output. Best when the audience buys on evidence.

### Endings

- **The news.** *Cap v0.6 is here.* State the actual announcement. Use when the film exists because something shipped.
- **The reframe.** A line about what the viewer can now do, not what the product has — *You built a system.* The strongest ending, and the hardest to write.
- **The live CTA.** The product's real control — a prompt field, a button — with a cursor clicking it. Use when the next step is to go and use it.
- **The platform row.** Logo plus where to get it. Use when availability is the news.

Hold any ending at least 1.5s, and keep something moving in it.

## The hook

The first two seconds decide whether the rest is watched, and they have to work with no sound, at phone size, mid-scroll.

Strong hooks: the result before the explanation; a number that should not be possible; the problem stated in five words of huge type; one striking image with no text at all; a familiar interface doing something unfamiliar.

Weak hooks: a logo; the product name; "introducing"; a slow fade from black; a sentence that needs the second sentence.

## The closing line

The strongest launch films end on a sentence that reframes everything before it rather than naming the product again — a line about what the viewer can now do, not about what the product has. The viewer has watched a sequence of capabilities; one line turns it into an outcome. Write it as something true about them, hold it long enough to read twice, then resolve to the lockup. See [signature-devices.md](signature-devices.md#the-closing-line-that-reframes).

## The end card

Hold it for at least 1.5 seconds — long enough to read, short enough not to waste. Logo, one line of positioning, and the actual next step: a URL, a platform row, an app-store badge, a prompt field with a cursor clicking it.

Keep something alive in it. A fully static end card after 25 seconds of motion reads as the file ending rather than the film finishing.

## Writing the words

Four to seven words per card at display size. Phone-size readability sets the ceiling, not taste.

Write claims, not labels. "Color correction." is a label; "Fix the footage you already shot." is a claim. A film whose cards read in sequence as a coherent argument is the clearest signal of design rather than assembly.

Emphasise two or three words per line with weight, size, italic, or the accent, and let the connective words sit lighter. A line where every word carries equal weight reads as a subtitle, not as design.

Never put a number, a price, a rating, or a comparative claim on screen that the user has not confirmed. List anything representative for replacement before delivery.
