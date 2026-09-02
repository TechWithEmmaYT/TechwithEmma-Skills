# Illustration assets

Read this when a welcome, reveal, result, paywall, celebration, or empty state needs custom artwork that does not exist.

## Decide and define

Inspect existing assets first. Prefer native UI, icons, charts, photography, or product previews when they explain the feature better. Use custom artwork only when character, emotion, narrative, or atmosphere materially improves the design.

Never replace missing art with complicated JSX/SVG shapes, emoji, traced competitor artwork, or generated text. Keep controls, copy, and meaningful data outside the asset in a replaceable image or video slot.

Lock one asset family: medium/style, character appearance, proportions, palette, lighting, texture, perspective, edge treatment, and emotional tone. For each asset specify subject/action/expression, screen role, crop/camera, safe text space, transparent or full background, aspect ratio/display size, theme variants when necessary, filename, and exclusions.

## Prompt

```text
<Shared style lock>. Create <filename> for <screen>: <subject, action,
expression>. <Composition, crop, and safe space>. <Background treatment>.
<Aspect ratio/output>. No text, logo, watermark, UI controls, or extra limbs.
```

Keep recurring characters consistent. Generate related poses as one set or reuse the approved reference image when supported.

For a still asset, give the user the exact filename and a ready-to-paste prompt for ChatGPT Images or their preferred generator. When motion is needed, first approve the still/key art, then provide a short animation prompt, duration, loop behavior, crop, and target video or GIF format for an approved tool such as Gemini. Prefer a clean short video for richer motion and GIF only when its platform and quality tradeoffs are acceptable. Never claim either asset exists until it has been generated and inspected.

## Handoff

Record every slot, still and motion prompt, filename, dimensions, duration/loop, crop behavior, theme use, and temporary replacement in the design document. If generation was not requested, provide ready-to-use prompts and finish the design without blocking on artwork. Identify what must be generated, approved, licensed, converted, or replaced before release.
