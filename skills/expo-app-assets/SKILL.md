---
name: expo-app-assets
description: Generate, configure, or replace production Expo app icons, Android adaptive and monochrome icon layers, iOS icon variants, and light or dark splash screens. Use when an Expo or React Native app needs launcher artwork, themed icons, splash branding, or corrected app asset configuration.
---

# Expo App Assets

Create a coherent app-icon and splash-screen asset set, then configure it without damaging the project's existing Expo setup.

## Inspect before proposing changes

Read the app config, Expo SDK, `package.json`, existing assets, and native directories. Determine whether the project uses app JSON, dynamic JS/TS config, Continuous Native Generation, or manually maintained native projects. Preserve dynamic config and existing plugins.

Ask only for missing brand decisions: app purpose, dominant symbol, primary/background colors, whether light/dark/tinted variants are wanted, and whether the splash uses the same mark. If the app already answers these questions, summarize the inferred direction instead. Do not make the user repeat information visible in the project.

If the user has not approved both a concept and a style, read [references/icon-concept-and-prompt.md](references/icon-concept-and-prompt.md). Inspect the product and offer a diverse exploration board or one focused direction. Keep concept selection separate from rendering style and preserve explicit brand choices.

Before generating images or changing files, show no more than five short bullets covering the concept, planned assets, platform variants, config changes, and verification. Wait only when the concept or style is unapproved, generation was not requested, or a separate paid-provider charge may apply. Otherwise proceed from the user's existing approval without adding another gate.

## Create and approve the source concept

Prefer an existing logo or user-supplied source when one exists. Otherwise propose an exploration board and let the user choose: generate several numbered concepts in one image when the user wants options, or generate one concept when the direction is already approved. A board is for selection only; regenerate the chosen concept as a clean standalone source instead of treating the board crop as the final asset.

Before generating any image, show the complete copy-ready prompt. Keep it specific to the inspected app and include the concept, selected visual direction, palette, material, lighting, composition, square canvas requirements, and exclusions. Then ask whether the user wants to generate from that prompt, refine it, or choose another direction. Do not regenerate or reprint an updated prompt after every concept unless the user asks for it.

Before writing any generated file, create a unique staging directory such as `generated/app-assets/20260823-1430/`. Add a short suffix if that path already exists. Put every concept and derived asset from the current run there. Never overwrite, rename, or delete the project's existing icon or splash files during generation.

If the current model cannot generate images, tell the user to switch to an image-capable model. If switching is unavailable, provide a polished copy-ready prompt for Chatgpt (recommended), Gemini or another image model, including the app concept, visual style, composition, colors, square format, and exclusions. Ask the user to generate and upload the result before producing platform assets or configuring file paths. Never claim an image was generated when only a prompt was provided.

Keep the concept recognizable at small size: one cohesive dominant subject, strong silhouette, restrained detail, no device mockup, no wordmark-sized text, no baked-in rounded corners, and no fake app-store badge. Reject stock-like category symbols, corporate logos in boxes, disconnected pieces, and ideas that require explanation. Show the concepts and let the user choose before producing final platform assets.

When a separate Android foreground or reusable splash mark is needed, prefer generating or extracting one transparent source subject, then compose approved backgrounds and platform variants from that same subject. This keeps the iOS composite, Android adaptive icon, monochrome icon, and splash visually consistent. Do not independently regenerate each layer and claim they match.

## Produce distinct deliverables

Read [references/expo-asset-config.md](references/expo-asset-config.md) before exporting or editing the app config.

Create only the variants the app needs inside the new staging directory, using clear names. A typical set is:

- `icon.png`: opaque 1024x1024 master for the top-level or legacy icon;
- optional iOS light, dark, and tinted 1024x1024 icons;
- `adaptive-icon-foreground.png`: transparent Android foreground with the mark inside the safe zone;
- either a full-bleed Android background image or an approved background color;
- `adaptive-icon-monochrome.png`: a single-color silhouette on transparency for themed icons;
- `splash-icon.png` and an optional dark variant: transparent PNG artwork for `expo-splash-screen`.

Do not reuse a flattened full-color icon as Android foreground, background, and monochrome layers. Do not add transparency to a standard iOS PNG icon. Only create an iOS `.icon` directory through the supported Icon Composer workflow when the user requests it and the project SDK supports it; do not invent Icon Composer metadata.

## Configure Expo conservatively

After previewing the completed staging folder, ask the user to choose whether to copy the files manually, keep the new folder as the final location, or approve replacing specific existing assets. If the request was only to generate assets, stop without editing app config. Clearly show the source-to-destination mapping the user can copy.

Only after approval, merge the selected final paths into the existing app config. Use `android.adaptiveIcon` for Android layers and the `expo-splash-screen` config plugin for native splash screens. Prefer the plugin over deprecated `splash`, `ios.splash`, or `android.splash` fields. Do not point production config at a temporary staging path unless the user chooses to keep that folder as the final location.

Do not replace unrelated plugins, identifiers, permissions, schemes, or build settings. If `expo-splash-screen` is missing, propose `npx expo install expo-splash-screen` and wait for approval before installing. Explain that icon and splash configuration requires a new native build and is not delivered by an over-the-air JavaScript update.

## Verify the real output

- Confirm every referenced file exists, is PNG where required, has the intended dimensions, and has the correct opaque or transparent background.
- Preview Android foreground and background together under circle, squircle, and rounded-square masks. Ensure the essential mark remains within the 66x66 safe zone of the 108x108 adaptive-icon canvas.
- Preview the monochrome layer under multiple system tints and inspect iOS icons on light and dark wallpapers.
- Resolve the final config with `npx expo config --type public` when available. Do not run a clean prebuild if it would overwrite manually maintained native changes without explicit approval.
- Test splash screens with preview or production builds, not Expo Go. Report which platforms and appearance variants were actually inspected.

Keep the handoff concise: list generated assets, config fields changed, commands run, previews/builds checked, and any platform verification still outstanding.
