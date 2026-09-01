# Illustration Assets

Read this when a welcome, onboarding reveal, empty state, personalized result, paywall, or celebration depends on custom artwork that does not exist yet.

## Decide whether artwork is needed

Inspect existing assets first. Prefer native UI, icons, charts, or product previews when they explain the feature better. Use custom artwork when character, emotion, narrative, or brand atmosphere materially improves the moment.

Do not replace missing art with complicated JSX shapes, emoji, traced competitor artwork, or generated UI text. Design a replaceable asset slot and keep controls, copy, and meaningful data outside the image.

## Define one asset family

Lock the shared style once: medium, character appearance, proportions, palette, lighting, texture, perspective, edge treatment, and emotional tone. For every asset specify:

- screen and communication role;
- subject, pose/action, and expression;
- crop, camera angle, and safe empty space for nearby copy;
- transparent or full-background output;
- aspect ratio and intended display size;
- light/dark variants only when one asset cannot serve both;
- filename and elements to exclude.

Keep recurring characters identical across prompts. Generate related poses as one set or reuse an approved reference image when the tool supports it.

## Write ready-to-use prompts

Use this compact form:

```text
[Shared style lock]. Create [filename] for [screen]: [subject, action,
expression]. [Composition, crop, safe space]. [Background treatment].
[Aspect ratio/output]. No text, logo, watermark, UI controls, or extra limbs.
```

Make each prompt complete enough to paste into ChatGPT Images or another approved generator without design knowledge.

## Handoff

Record the asset slot, prompt, filename, dimensions, crop behavior, theme use, and temporary replacement in `mobile-design.md`. If image generation was not requested, finish the design and give the user the shared style plus all prompts in the final chat response; offer to generate them when a suitable tool is available.

Representative artwork is acceptable during design, but identify what must be approved, regenerated, licensed, or replaced before release.
