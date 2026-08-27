---
name: expo-app-assets-v2
description: Design distinctive consumer app icons and produce production-ready Expo/iOS/Android icon and splash assets. Use for app-icon exploration, icon generation, adaptive icons, monochrome icons, splash marks, or Expo asset configuration.
---

# Expo App Assets V2

Create memorable App Store-quality identities first. Handle platform assets second.

## 1. Understand the product

Inspect the app, existing UI, config, assets, colors, audience, personality, and product purpose.

Infer what is already obvious from the project. Do not make the user repeat it.

Separate:

Brand → what should the app feel like?
Concept → what visual idea makes it recognizable?
Style → how should that idea be rendered?

Never start by asking “what symbol represents this category?”

## 2. Design an identity, not a category icon

Read `references/app-icon-styles.md` before creating concepts.

The icon should feel like a consumer product identity, not documentation for what the app does.

Prioritize:

**Memorable idea → distinctive silhouette → visual personality → small-size recognition → rendering polish**

A concept may be literal, abstract, character-based, symbolic, or seemingly unrelated to the category if it creates a stronger identity.

If the concept looks like the first search result for “[category] app icon”, reject it or transform it.

Avoid automatically using:

- locks for security
- wallets/cards for finance
- dumbbells for fitness
- leaves for plant apps
- clouds/suns for weather
- forks/food bowls for calories
- chat bubbles for AI
- sparkles for AI
- brains/circuits for intelligence

These are allowed only when transformed into something distinctive.

## 3. Exploration boards

When the user wants options, generate 6–9 concepts.

For multi-app tests, usually create 2 concepts per app.

Each pair must differ at the CONCEPT level, not merely color or rendering.

Before rendering, mentally derive:

**Brand Emotion → Archetype → Visual Behavior → Composition → Palette → Depth**

Do not expose this reasoning unless requested.

Vary archetypes such as:

- character / creature
- expressive object
- abstract organism
- negative-space mark
- transformed familiar object
- geometric identity
- cropped or edge-emerging form
- symbolic scene
- visual metaphor
- expressive typography/letterform
- tactile object
- minimal silhouette

Do not force every archetype into every board.

Use the black-silhouette test:
if two concepts become essentially the same icon when filled black, replace one.

The board should look like different world-class consumer-app teams designed each option independently — never like one coordinated icon pack.

## 4. Rendering behavior

Do NOT default to 3D.

Choose rendering based on the concept.

Valid treatments include:

- bold flat graphic
- soft dimensional
- controlled gradient
- minimal monochrome
- chunky outline
- geometric
- tactile/material
- negative space
- illustrated character
- crisp vector-like form

Mix treatments naturally across exploration boards.

Avoid repeated:
centered object + gradient background + shadow.

Avoid generic AI aesthetics:
glass blobs, excessive bloom, neon glow, chrome, random gradients, clay objects, sparkles everywhere.

## 5. Icon composition

Every strong icon should have:

- one dominant idea
- strong silhouette
- roughly 60–85% visual occupancy when appropriate
- 2–4 main colors
- strong figure/background contrast
- very few internal details
- one memorable visual quirk
- readability around 32px

Composition does NOT always need to be centered.

Use cropping, asymmetry, oversized forms, edge emergence, overlap, transformation, or negative space when they strengthen the idea.

The background is part of the artwork, not merely a tile behind a floating logo.

No text unless the concept specifically depends on a distinctive letterform.

## 6. Generation prompts

Keep image-generation prompts concise.

Do not dump the entire skill into the prompt.

For an exploration board, tell the image model:

- apps/product brief
- number of concepts
- concepts must use different archetypes
- icons should behave like independent consumer brands
- diversity of composition/rendering
- small-size readability
- major exclusions
- board layout

Let the model invent individual metaphors unless the user explicitly requests specific concepts.

When useful include:

“If an idea looks like a generic search result for this app category, replace it.”

## 7. Selection → production master

Exploration boards are previews only.

Once the user selects a concept, regenerate it as a standalone 1024×1024 source.

Never use a cropped exploration-board cell as the production master.

Standard iOS icon:
- 1024×1024 PNG
- opaque
- full square artwork
- no baked rounded corners

For reusable foreground/splash artwork, create a transparent source when appropriate.

## 8. Expo assets

Read `references/expo-asset-config.md`.

Create only required assets, typically:

- `icon.png`
- optional iOS light/dark/tinted variants
- `adaptive-icon-foreground.png`
- Android background color/image
- `adaptive-icon-monochrome.png`
- `splash-icon.png`
- optional dark splash variant

Never pretend a flattened icon is a valid foreground, monochrome, and splash source.

Keep Android essential artwork inside its adaptive safe zone.

## 9. Project safety

Inspect the existing Expo config before editing.

Preserve:

- plugins
- identifiers
- schemes
- environment logic
- permissions
- existing native configuration

Use a staging folder for generated assets.

Do not overwrite existing production assets without approval.

If the user only asks for concepts or images, DO NOT modify Expo configuration.

## 10. Final quality gate

Reject an icon if:

- it feels like a corporate logo in a box
- the category symbol is painfully obvious/generic
- it needs explanation to be memorable
- multiple concepts share essentially the same silhouette
- rendering style is doing all the creative work
- it becomes unreadable at launcher size
- it looks like generic AI-generated icon art

Final question:

**Would someone remember this icon after seeing it for two seconds?**

If not, iterate.