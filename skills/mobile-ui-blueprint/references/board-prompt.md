# Mobile UI Board Prompt

Use this structure to write the complete board-ready prompt before asking whether to generate an image. Replace every placeholder with product-specific content before showing it to the user.

Do not include these headings when a more natural prompt reads better. Do not require a fixed number of screens.

## Prompt structure

```text
Create a high-resolution mobile UI board for [PRODUCT NAME], a [PRODUCT TYPE] for [TARGET USER AND JOB].

PRODUCT SCOPE
Design the complete product inventory of [SCREEN COUNT] portrait mobile screens. The screens should feel like one coherent product and form a clear end-to-end flow.

PRODUCT DIRECTION
[Personality, emotional tone, platform expectations, and the main experience the design must communicate.]

VISUAL LANGUAGE
- Colour: [semantic colour roles, contrast, and light/dark treatment]
- Typography: [font character, hierarchy, weights, and numeric treatment]
- Shape and spacing: [corner language, spacing rhythm, density, and touch-target expectations]
- Components: [buttons, cards, inputs, navigation, controls, feedback, and media treatment]
- Imagery and icons: [illustration, photography, icon style, and logo treatment]
- Accessibility: [contrast, text sizing, non-colour cues, and reachable interactions]

SCREENS

[Repeat this block for every approved screen included in the selected board.]

[SCREEN NAME]
- Purpose: [what the user accomplishes]
- Content: [specific headings, controls, data, imagery, and actions]
- State: [default, loading, empty, permission, active, success, error, or other relevant state]
- Navigation: [where the primary actions lead]
- Visual emphasis: [what should attract attention first]

BOARD GENERATION OPTIONS
- Concept board: use [3–5 RECOMMENDED SCREEN NAMES] in [READABLE LAYOUT AND ASPECT RATIO]. Keep the screens large enough to judge hierarchy, components, and content.
- Full-app board: include all [SCREEN COUNT] screens in [ORDERLY OVERVIEW LAYOUT AND ASPECT RATIO]. Preserve flow order and accept smaller details in exchange for complete coverage.
- Shared composition: [background, spacing, device framing, annotations if any, and how the flow should read]. Do not add a design-system panel unless requested.

QUALITY
Produce polished, realistic mobile product UI with consistent components, believable content, accurate alignment, strong hierarchy, accessible contrast, and crisp readable text. Keep the product identity consistent across every screen.

AVOID
[Only product-specific mistakes, such as excessive gradients, weak contrast, crowded cards, decorative charts, tiny labels, or an inappropriate visual tone.]
```

## After presenting the prompt

After showing the initial complete prompt, ask the user to choose: refine it, generate the concept board, or generate the full-app board. During later refinements, update the stored prompt and show only a concise change summary. Reprint the full prompt only when requested.

## Generation guidance

### Concept board

- Select 3–5 screens that best test the proposed direction.
- Choose screens from different parts of the real flow rather than fixed categories.
- Keep the screens large enough to judge hierarchy, components, and content.
- The complete screen inventory still belongs in the handoff even when only selected screens appear on the board.

### Full-app board

- Include every approved screen from the inventory.
- Choose rows, columns, grouping, and aspect ratio from the number of screens.
- Preserve flow order and label groups only when labels improve comprehension.
- Warn the user when one overview will trade detail for coverage; do not split it into extra image generations without approval.

- The prompt itself must always contain the full inventory, even when the user later generates only the concept board.
- Return copy-ready text with no unresolved bracket placeholders.

## Optional design-system prompt

Create a separate design-system prompt only when requested. It may cover colour tokens, type scale, spacing, radii, icons, controls, component states, and logo exploration. Do not make approval of a design-system image a prerequisite for the app board.

## Reference handling

Translate references into visual qualities. Do not put competitor names, generic copyright statements, or trademark warnings into the generated prompt unless the user explicitly requests that wording.
