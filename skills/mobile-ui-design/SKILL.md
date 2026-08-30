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

When the product includes onboarding, a quiz, personalization, or a pre-paywall journey, read [references/premium-onboarding.md](references/premium-onboarding.md). Design it as a product-specific value journey with varied step bodies, not a repeated questionnaire or a fixed long funnel.

References are evidence, not templates. Abstract useful qualities such as density, hierarchy, warmth, or navigation. Never inject competitor names, trademark warnings, or generic legal disclaimers into the generated design prompt unless the user explicitly asks for them.

## Populate the design with representative data

For UI concepts, prototypes, prompts, and boards, make every data-dependent surface look complete. Freely invent realistic representative names, balances, purchases, charts, trends, plans, projections, progress, dates, messages, activity, notifications, recommendations, generated results, and other product content when real data or production logic is not yet available.

Do not weaken the design with empty states, vague boxes, `Lorem ipsum`, repeated zeros, or missing charts merely because an API, database, formula, or final copy has not been supplied. Choose data that demonstrates hierarchy, density, state changes, personalization, and the product's best intended experience.

Do not put `sample`, `demo`, `mock`, `placeholder`, or similar warnings inside the UI or generated artwork. The screen should look like a polished real product. After presenting the design, tell the user in chat that representative design data was used and should be connected to real APIs, approved formulas, verified claims, and production content before release. Record the same implementation note in the handoff, outside the UI specification.

Representative design data is permission to visualize the intended product, not permission to publish false claims. Before production, replace or remove invented ratings, testimonials, customer counts, financial or health calculations, live activity, scarcity, and other factual claims.

## Keep a working design memory

When filesystem access is available, create `design-draft.md` in a unique OS temporary directory, never inside the project. Tell the user its path. Record the screen inventory, exact colours, typography, spacing, radii, borders, shadows, component rules, locked decisions, rejected ideas, and latest prompt.

Before every refinement, read the draft, change only what the user requested, preserve locked decisions, then update the stored prompt. Show only a concise change summary; print the complete updated prompt again only when the user asks. If files are unavailable, maintain the same concise draft in the conversation.

## Always write the complete board prompt

Read [references/board-prompt.md](references/board-prompt.md) and generate the entire board-ready prompt or prompt set before offering image generation. Cover the complete product and screen inventory so the user can copy it elsewhere without additional work. The user should not need to fill placeholders or know design terminology.

The prompt must specify:

- product context and audience;
- every screen in the approved inventory and its important content;
- navigation and relationships between screens;
- visual direction and reusable interface language;
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

After generation, compare the image with `design-draft.md`: colours, typography, spacing, radii, borders, shadows, required content, representative data, and cross-screen consistency. Report mismatches briefly, then ask the user to approve or refine. In chat—not inside the UI—state that representative data should be replaced or connected before production. Never regenerate automatically.

## Create the handoff

After approval, convert the working draft into a self-contained `mobile-design.md` using [references/mobile-design-file.md](references/mobile-design-file.md). Include the product summary, full screen inventory, visual decisions, approved prompt, interaction notes, assets, and unresolved decisions.

When filesystem access is available, save the approved handoff inside the project at:

```text
docs/design/mobile-design.md
```

Create `docs/design/` when needed. For a design scoped to one feature or flow rather than the whole app, use `docs/design/<feature>-design.md`. Update the same document during refinements instead of creating duplicate versions.

Never leave the approved design only in chat, a hosted artifact, the temporary working-draft directory, or an agent-specific cloud workspace. The temporary `design-draft.md` is working memory only; the approved project document is the source of truth.

Add or update a concise `Project documents` section in the root `AGENTS.md` with a relative Markdown link to the approved design. Preserve existing instructions and do not copy the full design document into `AGENTS.md`. If filesystem access is unavailable, provide the complete Markdown and state the intended project path.

The handoff must work with Expo, React Native, SwiftUI, Jetpack Compose, Flutter, another implementation agent, or a design-only workflow. If optional theming or implementation skills are installed, they may consume this file, but never require or assume them.

## Quality checks

Before finishing, confirm:

- the screen inventory represents the actual product;
- the prompt covers the complete product before any board is generated;
- the visual direction is specific enough to reproduce;
- refinements preserve locked tokens and component rules from the working draft;
- the prompt contains all required screen content and no empty placeholders;
- data-dependent screens look convincingly populated and contain no in-UI sample, mock, or placeholder labels;
- no board exceeds four columns or eight screens;
- competitor names or generic legal warnings were not added to the prompt;
- no image was generated before prompt approval;
- the user was offered refine, concept board, or a numbered full-app board after receiving the prompt;
- optional tools or skills were not presented as dependencies;
- the handoff, when requested, is portable, implementation-ready, saved under `docs/design/`, and linked from `AGENTS.md` when filesystem access is available.
