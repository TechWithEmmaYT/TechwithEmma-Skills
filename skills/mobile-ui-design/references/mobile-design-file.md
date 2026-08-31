# `MOBILE-DESIGN.md` Working Document and Handoff

Create this file in `docs/design/` during the first design pass, once the initial inventory and direction exist. It is the single persistent working document and later becomes the portable implementation handoff; it is not permission to modify application code.

Use `Status: Draft` while exploring. Update this same file after every meaningful decision or generated board. When the user approves the design, make it concise, remove superseded exploration, and change the status to `Approved`. Never create separate temporary, draft, final, or cloud-only copies.

Use the sections that the product needs:

```markdown
# Mobile Design — <App name>

Status: Draft | Approved
Last updated: <date>

## Product
- Audience:
- Primary job:
- Platforms:
- Core flow:

## Direction
- Approval status:
- Tone:
- Reference use:
- Approved output mode: prompt only | concept board | full-app board
- Approved board or prompt:
- Logo status: supplied | temporary wordmark | unresolved

## Tokens
- App background and gradient role:
- Paper and surfaces above the background:
- Text and muted text:
- Primary and primary content:
- Secondary and status colours:
- Spacing rhythm:
- Radius scale:
- Border and elevation:

## Typography
- Display role:
- Body role:
- Label role:
- Approved or candidate font families:
- Type hierarchy:

## Components
- Buttons, including solid or explicitly approved gradient treatment:
- Inputs:
- Cards and lists:
- Chips and filters:
- Navigation:
- Sheets, dialogs, and toasts:
- Empty, loading, error, success, and disabled states:

## Screen inventory
1. <screen> — Beat: ask | react | teach | reveal | commit — Layout: heading | showcase | centered | dialogue — <purpose and primary action>
   - Answer changes: <required for asks: the later screen, options, calculation, or result this answer decides>
2. <screen> — Beat: <beat> — Layout: <layout> — <purpose and primary action>

## Onboarding pacing
- Activation moment:
- Beat sequence:
- Genuine questions and longest consecutive ask run:
- Revealed value and its escalating frames:
- Continuity: carried answers, name, character, metric, or visual:
- Effort ramp:
- Progress treatment:

## Interaction and platform rules
- Safe areas:
- Keyboard behaviour:
- Touch targets:
- Motion and reduced motion:
- iOS/Android differences:
- Accessibility:

## Imagery and icons
- Photography or illustration direction:
- Icon family and weight:
- Supplied assets:
- Prohibited or temporary assets:

## Prompt handoff
- Approved board prompt:
- Generated image status and path:
- Optional design-system-board prompt status:

## Representative design data
- Data shown for visual completeness:
- Real API, database, CMS, or user source to connect:
- Formula, claim, rating, testimonial, or live activity requiring approval:
- Production replacement status:

## Open decisions
- <Only unresolved decisions; write “None” when settled.>
```

During Draft status, keep the current direction, latest full prompt, generated-board paths, locked decisions, and unresolved questions; omit long discarded alternatives. During Approved status, remove obsolete exploration and retain only what an implementation agent needs.

The approved beat sequence is part of the design and must survive implementation.

Record decisions accurately; do not invent exact colour values, font names, screen requirements, or assets that the user did not approve. Representative screen content and data may be invented to demonstrate the UI, but record what must later connect to production sources. When design tokens are inferred from an image, label them as estimates in the handoff, never on the UI. Link or name generated files only when they actually exist.
