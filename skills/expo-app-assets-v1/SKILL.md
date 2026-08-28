---
name: expo-app-assets
description: Design memorable consumer app icons and turn an approved icon into correct Expo/iOS/Android production assets. Use whenever the user needs an app icon, icon concepts or exploration boards, a brand mark for a mobile app, Android adaptive or monochrome icons, a splash screen, or wants icon and splash assets wired into an Expo project — including when they only say "I need an icon for my app" or "make me a splash screen" without mentioning Expo.
---

# Expo App Assets

Two jobs: invent an identity worth remembering, then turn it into platform assets that actually build.

Both halves fail in predictable ways. The creative half fails by producing a competent category illustration nobody remembers. The production half fails by wiring a plausible-looking file into config when the file is the wrong shape, wrong alpha, or does not exist. The workflow below exists to catch both.

## 1. Scope the request

Do only what was asked. These are separate jobs:

- **Concepts only** — explore, present, stop. Do not touch project files or config.
- **Assets only** — derive from an existing approved source. Do not redesign the mark.
- **Full pipeline** — concepts through configuration, with an explicit selection gate in the middle.

If the user asked for icon ideas, finishing by rewriting `app.json` is a failure, not a bonus.

## 2. Inspect before deciding anything

Read the project: `app.json` / `app.config.js` / `app.config.ts`, `package.json` (Expo SDK version), existing `assets/`, UI colors and typography, product copy, audience.

Infer what the project already tells you. Do not make the user restate their own product.

Note which config style is in use (static JSON vs dynamic TS), and whether `ios/` and `android/` directories exist — that decides whether config edits are sufficient. See `references/expo-asset-config.md`.

## 3. Requires an image-capable model

This skill draws icons. It does not write prompts for someone else to draw.

Settle capability before promising anything: confirm this session can actually generate images. If it cannot, say so plainly and stop — tell the user to run this in an image-capable model, or to supply their own source artwork. Do not offer a copy-ready prompt as a consolation deliverable.

That rule exists because handing a prompt to a separate image model loses the work. Everything that makes an icon good — the product understanding, the divergence decisions, the finish standard, the judgment about what to reject — has to survive compression into a block of text, and it does not. The receiving model has only the words, so it falls back on its own house style for the category, and the result is the generic version of whatever the app is. Prompts also get longer with every constraint added, which dilutes them further. A model that reasons and draws in the same context has no lossy step, which is why it produces better icons than any prompt can.

When generating, work one icon per generation, not one image containing several. A single image asked to hold several distinct concepts hands the divergence job to the image model, which is the thing it is worst at — it will produce variations of one idea. Choosing the directions is this skill's job. Generate each concept separately and present them together.

After generating, confirm the file exists on disk and check its real dimensions. A generation call that returned text is not a success. Never fabricate a file path, never claim an icon was generated, and do not substitute hand-written SVG unless the user asked for vector artwork.

## 4. Explore concepts

Read `references/app-icon-styles.md` before generating concepts. It owns the creative method: the derivation process, archetype and visual-behavior vocabulary, the divergence procedure, and the tests.

Follow the count the user asked for. If they asked for exploration without a number, 6–9 is a useful set.

The short version of the method, so you know what you are aiming at: derive each concept forward from **brand emotion → archetype → visual behavior → composition → palette → rendering depth**, and let concept settle before rendering style. Start from "what identity could this product own?" rather than "what symbol represents this category?" An icon does not have to explain the app.

Before presenting, run the four tests in the reference — black-silhouette, icon-pack, two-second, 32px. They are cheap and they catch the failures that matter.

## 5. Selection gate

Exploration output is a preview, never a production source.

After the user picks, regenerate the winner as a clean standalone 1024×1024 image. Never crop a cell out of a board and promote it — board cells carry neighboring artwork, compressed detail, and layout padding.

Do not proceed on an imagined asset. If the winner cannot be regenerated, ask the user for the source file rather than deriving from anything else.

## 6. Derive platform assets

Requires a real approved source on disk. Verify that first.

Work in a fresh staging directory — `generated/app-assets/YYYYMMDD-HHMM/` — so nothing shipped gets overwritten while you iterate. Replace production files only after the user has seen the staged ones and approved.

Assets to produce (skip what the project does not need):

| Asset | Shape |
|---|---|
| iOS / root master | 1024×1024, opaque, full-bleed, no baked corner radius |
| Android adaptive foreground | 1024×1024, transparent, essential mark within centered ~625px safe region |
| Android background | flat `backgroundColor`, or a full-bleed image the same size as the foreground |
| Monochrome | single opaque color on transparency, derived from foreground geometry |
| Splash | transparent, simple, sized via `imageWidth` |

Each of these has requirements that are easy to get subtly wrong — particularly monochrome and the adaptive safe area. `references/expo-asset-config.md` has the details; read it before deriving.

**Image tooling ladder.** Do not assume any library is installed. Check, then use the first that fits: tooling the project already has → `sharp` if present in the Expo project's dependencies → platform-native tooling such as `sips` on macOS → propose installing something and get approval before modifying the project. If nothing available can perform a transformation correctly, say so and give the user the next action rather than inventing a workflow around a library that is not there.

## 7. Verify before configuring

Wiring a broken asset into config and finding out at build time wastes a native build cycle. Check every file first:

- exists at the expected path, correct format
- square, expected dimensions
- iOS master is genuinely opaque — an RGBA file can carry an alpha channel and still be fully opaque, so check effective transparency, not just channel presence
- Android foreground actually has transparency and no baked launcher tile
- monochrome resolves to one foreground color on transparency, not a grayscale conversion
- essential artwork sits inside the adaptive safe region
- paths in config match paths on disk

Report what you checked. If a check fails, fix the asset — do not note it and continue.

## 8. Configure Expo safely

Merge the minimum needed. Never replace the user's config wholesale.

Preserve functions, environment lookups, object spreads, conditional expressions, plugins and their options, bundle identifiers and package names, schemes, permissions, and every unrelated native setting. Dynamic `app.config.ts` files in particular are code — edit them as code, not by regenerating JSON.

Config shapes and a worked example are in `references/expo-asset-config.md`. Prefer current Expo documentation where it conflicts with that reference.

## 9. Hand off honestly

Icon and splash changes are native. They ship in a new build — not through an OTA JavaScript update. Say this; users lose real time assuming otherwise.

Avoid destructive clean prebuilds just to verify. If the project maintains `ios/` or `android/` by hand, config changes alone will not move the assets — update the native asset catalogs and resource directories, and say that is what you did.

Tell the user what was generated, what was staged versus replaced, what you verified, and what remains for them to do.
