---
name: mobile-ui-design
description: Turn a mobile app idea, plan, codebase, or references into a complete screen inventory, an approved visual direction, an adaptive UI-board prompt, optional image generation, and a portable mobile-design.md handoff. Use when planning or visualizing a mobile product before implementation. Do not use to implement the screens.
---

# Mobile UI Design

Define the mobile product visually before implementation. Work standalone: never assume another skill, framework, image tool, or planning document is available.

Tell the user concisely what you intend to inspect or produce before taking action. Do not edit application code while using this skill.

## Understand the product

Inspect any supplied brief, plan, codebase, screenshots, assets, or references. Reuse reliable decisions already present.

When important information is missing, ask one compact batch covering only what is necessary:

- product purpose and target user;
- platform or device priorities;
- required flows or known screens;
- visual tone, colours, logo, and typography preferences;
- whether existing references should influence the direction.

Do not make users repeat information already available. A formal project plan is helpful but never required.

## Build the complete screen inventory

List every screen implied by the product and group them into flows. Include states that materially change the experience, such as empty, loading, permission, success, error, or active-task states, only when they deserve a distinct design.

Show the inventory, call out assumptions, and then continue to the complete prompt. Do not stop merely to ask which image to generate.

Do not force onboarding, authentication, or any fixed screen category. Select screens from the actual product.

## Define the visual direction

Propose one coherent direction containing:

- product personality and emotional tone;
- colour roles, contrast, and light or dark preference;
- typography character and hierarchy;
- spacing, shape, elevation, icon, illustration, and motion language;
- native versus custom interface expectations;
- accessibility and platform considerations;
- how supplied references influence the result.

If a logo is missing, use a neutral wordmark or placeholder treatment. Do not invent a detailed logo and silently make it part of the product identity.

### Interpret gradient requests as background direction

When the user asks for a gradient, a gradient feel, or a sleek colour blend without naming a component, treat it as the app's background atmosphere first. Apply it full-bleed behind the screen or across the shared flow shell so content, cards, and controls sit over one coherent colour environment. Keep primary buttons solid and high-contrast by default. Use a gradient inside a button only when the user explicitly requests a gradient button or an approved reference clearly makes it part of the control language.

For a multi-screen flow, decide whether one persistent background should continue behind transparent screen surfaces and subtly evolve with progress, state, or narrative. Specify the gradient's stops, direction, intensity, light and dark treatment, contrast overlays, and which screens intentionally return to a plain background for rest. Do not scatter unrelated gradients across buttons, cards, badges, and icons as a substitute for a background system.

When the product includes onboarding, a quiz, personalization, or a pre-paywall journey, read [references/premium-onboarding.md](references/premium-onboarding.md). Design it as a product-specific value journey with varied step bodies, not a repeated questionnaire or a fixed long funnel. Treat length as a rhythm decision and record the approved beat sequence in the handoff.

When the product includes a subscription, free trial, upgrade, or paywall, read [references/paywall-design.md](references/paywall-design.md). Define the value, plan presentation, pricing clarity, dismissal, restore, and important states without choosing or integrating a billing SDK.

References are evidence, not templates. Abstract useful qualities such as density, hierarchy, warmth, or navigation. Never inject competitor names, trademark warnings, or generic legal disclaimers into the generated design prompt unless the user explicitly asks for them.

## Populate the design with representative data

For UI concepts, prototypes, prompts, and boards, make every data-dependent surface look complete. Freely invent realistic representative names, balances, purchases, charts, trends, plans, projections, progress, dates, messages, activity, notifications, recommendations, generated results, and other product content when real data or production logic is not yet available.

Do not weaken the design with empty states, vague boxes, `Lorem ipsum`, repeated zeros, or missing charts merely because an API, database, formula, or final copy has not been supplied. Choose data that demonstrates hierarchy, density, state changes, personalization, and the product's best intended experience.

Do not put `sample`, `demo`, `mock`, `placeholder`, or similar warnings inside the UI or generated artwork. The screen should look like a polished real product. After presenting the design, tell the user in chat that representative design data was used and should be connected to real APIs, approved formulas, verified claims, and production content before release. Record the same implementation note in the handoff, outside the UI specification.

Representative design data is permission to visualize the intended product, not permission to publish false claims. Before production, replace or remove invented ratings, testimonials, customer counts, financial or health calculations, live activity, scarcity, and other factual claims.

## Keep one project design document

When the project filesystem is available, create the real design document as soon as there is enough product context to form the initial inventory and direction:

```text
docs/design/mobile-design.md
```

For a feature or flow rather than the whole app, use `docs/design/<feature>-design.md`. Create `docs/design/` when needed. Start the document with `Status: Draft`, use [references/mobile-design-file.md](references/mobile-design-file.md), and update this same file throughout inventory, prompt writing, board generation, and refinement. Do not create an OS-temporary `design-draft.md`, a root-level draft, or separate draft/final copies.

Add or update a concise `Project documents` section in the root `AGENTS.md` with a relative link as soon as the draft is created. Preserve existing instructions and do not copy the design document into `AGENTS.md`.

Before every refinement, read the project design document, change only what the user requested, preserve locked decisions, and update the stored prompt and status. Show only a concise change summary; print the complete updated prompt again only when the user asks. If no project filesystem is available, maintain the draft in conversation and provide the complete Markdown with its intended project path.

## Always write the complete board prompt

Read [references/board-prompt.md](references/board-prompt.md) and generate the entire board-ready prompt or prompt set before offering image generation. Cover the complete product and screen inventory so the user can copy it elsewhere without additional work. The user should not need to fill placeholders or know design terminology.

The prompt must specify:

- product context and audience;
- every screen in the approved inventory and its important content;
- navigation and relationships between screens;
- visual direction and reusable interface language;
- the full-screen background treatment and gradient behavior across the flow when gradients are part of the direction;
- readable board composition and flow-based grouping;
- legibility, realism, accessibility, and output quality;
- product-specific visual mistakes to avoid.

Populate the screens with believable representative data whenever it improves the design. Never add in-UI labels that reveal it as sample or placeholder content.

On the initial pass, do not generate an image yet. Present the complete prompt once, then ask the user to choose one concise next action:

1. refine the prompt;
2. generate a concept board using 3–5 recommended representative screens;
3. generate one numbered full-app board from the complete prompt set.

If the user already requested a particular board, still show the complete prompt before its first generation. After that, use the latest stored prompt internally and do not repeat it unless requested. Keep a design-system board separate and optional.

## Generate only when requested

Never place more than four portrait screens in one row or more than eight screens on one board. Use one row for 1–4 screens and a balanced grid of up to four columns by two rows for 5–8 screens. Centre an incomplete final row. Split larger inventories into numbered boards grouped by user flow.

If an image-generation tool is available and the user approves one option, generate only the requested board. Do not generate every numbered board automatically.

If no image-generation tool is available, say so after presenting the prompt. Recommend pasting it into [ChatGPT Images](https://help.openai.com/en/articles/11084440-im) or [Gemini Apps image generation](https://support.google.com/gemini/answer/14286560), then ask whether the user wants the prompt refined for concept-board or full-app-board generation. Do not pretend an image was generated or tell the user to switch models without giving them the usable prompt first.

## Review each board

After generation, compare the image with the current project design document: colours, typography, spacing, radii, borders, shadows, required content, representative data, and cross-screen consistency. Record the generated asset path and review outcome in that same document. Report mismatches briefly, then ask the user to approve or refine. In chat—not inside the UI—state that representative data should be replaced or connected before production. Never regenerate automatically.

## Create the handoff

After approval, tighten the existing project design document into a concise, self-contained implementation handoff. Change `Status: Draft` to `Status: Approved`; preserve the product summary, complete screen inventory, locked visual decisions, approved prompt or board paths, interaction notes, assets, representative-data replacement notes, and unresolved decisions.

Update the same file rather than generating another final document. Never leave the approved design only in chat, a hosted artifact, an OS temporary directory, or an agent-specific cloud workspace. The linked `docs/design/...` document is the source of truth from first draft through approval.

The handoff must work with Expo, React Native, SwiftUI, Jetpack Compose, Flutter, another implementation agent, or a design-only workflow. If optional theming or implementation skills are installed, they may consume this file, but never require or assume them.

## Quality checks

Before finishing, confirm:

- the screen inventory represents the actual product;
- the prompt covers the complete product before any board is generated;
- the visual direction is specific enough to reproduce;
- refinements preserve locked tokens and component rules from the project design document;
- the prompt contains all required screen content and no empty placeholders;
- data-dependent screens look convincingly populated and contain no in-UI sample, mock, or placeholder labels;
- no board exceeds four columns or eight screens;
- competitor names or generic legal warnings were not added to the prompt;
- no image was generated before prompt approval;
- the user was offered refine, concept board, or a numbered full-app board after receiving the prompt;
- optional tools or skills were not presented as dependencies;
- the design document was created under `docs/design/`, linked from `AGENTS.md`, updated rather than duplicated, and marked `Approved` only after approval;
- the approved handoff is concise, portable, and implementation-ready.
