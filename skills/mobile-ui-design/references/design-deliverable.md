# Mobile design deliverable

Use one `docs/design/mobile-design.md` file, or `docs/design/<feature>-design.md` for a scoped flow. Keep `Status: Draft` during exploration and change the same file to `Approved` only after user approval. Do not create separate draft/final copies or edit application code/`AGENTS.md` automatically.

Keep the complete document near 1,000–2,000 words. Preserve reproducible values and coverage: locked requirements, screen inventory, colour and type roles, spacing and shape rules, states, motion, asset prompts, representative data, real-data replacements, and open decisions. Compress shared rules into one source of truth; use one compact entry for ordinary screens and extra detail only for distinct layouts, conversion moments, or complex states. Remove process history, rationale already implied by a decision, rejected options, generic design advice, and repeated per-screen rules before cutting any product or visual requirement. A large approved inventory may exceed the target only when completeness genuinely requires it.

## Compact handoff

Use only sections relevant to the product:

```markdown
# Mobile Design — <Product>
Status: Draft | Approved
Last updated: <date>

## Product
- Audience, primary job, platforms, core flow, activation moment
- User requirements and exclusions

## Direction
- Tone and reference influence
- Background: plain | image-led | gradient, with approved behavior
- Colour roles, typography, spacing, radii, borders/elevation, icons/imagery
- Motion character, content choreography, reduced motion, accessibility

## Screen inventory
1. <screen> — <purpose, content, primary action, navigation, important state>
   - Beat/layout when relevant
   - Answer changes: <later choice, calculation, visual, route, or result>

## Components and states
- Shared controls and navigation
- Loading, populated, empty, error, disabled, selected, success, permission

## Assets
- Existing assets and approved/generated files
- Required illustration/image prompts, filenames, ratios, crops, replacements

## Representative data
- Values shown for visual completeness
- Real source/formula/catalog/claim/analytics/legal item to connect or verify

## Board prompt and review
- Approved prompt or prompt status
- Generated board path and review status

## Open decisions
- <Only unresolved decisions, or None>
```

For onboarding/paywalls also record the beat sequence, longest ask run, answer reuse, attribution/rating/permissions, pledge/oath language, plan-building checkpoints, detailed result sections, paywall and offer exits, prices/disclosures, persistent atmosphere, and per-screen content reveal order.

Keep the board prompt compact and standalone. Reuse concise shared visual rules, then give each screen only its unique content, state, emphasis, and action; do not repeat the complete design system under every screen.

## Board-ready prompt

Write one complete, copy-ready prompt with no unresolved brackets:

```text
Create a high-resolution mobile UI board for <product and audience>.

PRODUCT AND SCOPE
<purpose, platform, complete screen count, flows, activation moment>

VISUAL DIRECTION
<tone, background choice, colour roles, typography, spacing, shape, depth,
components, imagery/icons, content motion, accessibility, reference influence>

SCREENS
For every approved screen: name, purpose, specific content and believable data,
primary action/navigation, important state, and visual emphasis.

BOARD COMPOSITION
<selected concept screens or numbered full-app boards, readable portrait layout,
consistent device framing and flow order>

QUALITY AND AVOID
<legibility, realism, consistency, product-specific mistakes, no sample/mock/
placeholder/Lorem ipsum labels, no copied branding>
```

For a concept board, select 3–5 screens from different parts of the real journey. A full-app prompt must cover every approved screen, split into numbered boards of at most eight screens. Use one row for 1–4; for 5–8 use at most four columns and two balanced rows.

An explicit request to generate counts as approval. Otherwise show the complete prompt, then offer refinement, a concept board, or one numbered full-app board. Generate only the approved board. After generation, compare it with this document, record the actual file path, and note mismatches without silently regenerating.

During refinement, preserve locked decisions and update this same document. Show concise changes unless the user asks to see the full prompt. Approved handoffs keep only current decisions and implementation-relevant information.
