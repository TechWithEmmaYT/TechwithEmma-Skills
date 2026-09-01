# Flexible Expo onboarding flows

Use this reference to implement questionnaires, first-run education, permissions, personalization, and account-preparation flows. Build the approved journey from `mobile-design.md` or the supplied brief; onboarding is a sequence of user goals, not identical cards.

When direction is missing, propose one value-first flow and ask the user to correct it once. Length follows rhythm, not a fixed count. Ask whether monetization belongs at the end when unclear; never invent a paywall.

For visual journey decisions, use the supplied design or [the onboarding design reference](mobile-ui-design/references/onboarding-design). This file owns implementation structure.

## Preserve the experience

Use the approved `ask -> react -> teach -> reveal -> commit` rhythm. Do not compress a narrative journey into a questionnaire:

- keep one idea and one primary action per screen;
- place no more than two asks together before feedback, teaching, or payoff;
- make asks cheap and auto-advance reversible single-select choices when appropriate;
- reuse answers in later choices, copy, visuals, calculations, and recommendations;
- reveal personal figures progressively rather than crowding one summary;
- ramp effort from taps to limited typing, optional commitment, then payment only after value;
- derive honest phase progress from the active path; never show a misleading `Step N of M`.

A personalized monetized flow may end with `plan building -> personalized result -> contextual paywall -> optional rescue offer`. Keep the long result visually rich when it must synthesize many answers. Implement the paywall and offer using [paywall-ui.md](paywall-ui.md); they remain single-viewport and non-scrolling by default.

## Share the shell, vary the composition

Let the shared shell own safe areas, progress, back/skip/next behavior, keyboard handling, draft answers, and validation. Let each step own the layout and control appropriate to its purpose.

Useful layout modes include:

- **heading:** title and support above an interactive body;
- **showcase:** a device preview, chart, grid, or carousel is the visual, with copy below;
- **centered:** hero or insight above centered copy;
- **dialogue:** a real mascot, avatar, or coach speaks beside a question.

Declare layout and beat alongside each step. Do not force pickers, permissions, charts, or product demonstrations through one option-card component. Typed question text belongs to intentional dialogue, not every heading.

A mascot is optional. When present, show it once per screen or not at all; do not place a mascot above a device frame already displaying the same mascot. Carry one character, metric, card, or illustration across related steps when it strengthens continuity.

Valid bodies include selection rows, chips, date/time controls, rulers, text fields, permissions, product demonstrations, carousels, charts, comparisons, live projections, plan-building states, personalized results, and custom interactions. Use real snap paging for carousels, stop autoplay after touch, and disable autoplay under Reduce Motion.

Model heterogeneous steps with a discriminated union and a small renderer switch. Prefer explicit kinds such as `singleSelect`, `multiSelect`, `text`, `date`, `ruler`, `info`, `permission`, and `custom` over one component with many optional props.

## Implement adaptive answers

Every question must change the next step, available choices, wording, calculation, recommendation, visual state, plan, or final result. Do not collect and forget answers.

Allow option sources such as `Option[] | ((answers) => Option[])`. When a parent answer changes, clear dependent answers it invalidates. Resolve labels through the option catalogue rather than assuming every list is static.

Keep these concerns separate:

- direct answers;
- derived values and constraints;
- recommendations;
- visible consequences.

Make calculations pure and deterministic so Back or answer edits recompute later states correctly. Use a small branch resolver for conditional paths and derive progress from the resolved path.

When production logic is unavailable, isolate believable representative calculations in one fixture or pure function per concern. Populate charts, forecasts, plan dates, recommendations, ratings, testimonials, and result states so the interface feels complete. Never place `mock`, `sample`, or placeholder warnings inside the UI; list everything that requires real formulas, APIs, catalog data, or verified claims in the final handoff.

## Routing, progress, and background continuity

Use Expo Router parameters such as `/onboarding/[step]` when steps need native Back, replacement, deep links, or route-derived progress. Validate route keys and redirect unknown steps safely. A single route with local state is valid for a short inseparable flow.

When approved choreography keeps the progress, background, or visual anchor mounted, disable only the nested onboarding Stack transition and animate step content. Keep the global navigator opaque.

For a flow-wide gradient or image, mount it once in the group layout over an opaque semantic fallback and make only the onboarding screens transparent. Keep readable content inside safe areas while atmospheric media may extend edge to edge. Read [gradient-background.md](gradient-background.md) for the complete background contract.

## Answers, persistence, and accounts

Use the smallest state container that supports the flow. Persist only when unfinished onboarding must survive termination or a meaningful interruption; do not add AsyncStorage, Zustand, or a database automatically.

Validate before advancing when later state depends on the answer. Keep representative values centralized rather than scattered through JSX so production sources can replace them without rebuilding layout or motion.

Account creation is a product decision:

- prefer it after the personalized payoff;
- collect answers anonymously and attach them once after authentication;
- keep submission idempotent and preserve answers after recoverable failures;
- keep credential errors inline and never mix onboarding answers into a credentials payload;
- decide whether device or server owns completion for returning users.

Do not install an auth provider or backend client to satisfy an onboarding UI brief. Report the missing contract and keep the flow working against local state.

## Permissions and store-rating moments

Explain a permission's immediate benefit before the native prompt. Spend the screen's primary action on requesting it, then handle granted, denied, restricted, and can-ask-again states with a useful fallback or Settings path. Advance on either outcome unless the capability is genuinely required.

Acquisition attribution is a skippable categorical answer, not App Tracking Transparency. Request ATT only when the app actually links its data with other companies' data through advertising or attribution behavior. Configure accurate purpose text and never gate value or purchase on the answer.

A designed social-proof screen and the native store-review prompt are different:

- representative ratings may fill the approved design but must be verified or removed before release;
- request the native review only at an earned moment;
- do not draw a second star control beside the system sheet;
- never block progression because the OS may show nothing.

## Commitment interactions

An approved hold-to-commit control must show progress, cancel on early release, and provide an accessible tap alternative. It is never legal agreement, payment confirmation, or the only path forward.

Use one clock and one progress value. Match `delayLongPress` to the visible duration, fire completion from the press callback rather than the animation, and support `onAccessibilityTap`. Let the same progress drive any transition it triggers.

Keep full-screen transition covers inside the screen layout when possible. A React Native `Modal` can outlive a pushed route and cover the destination. When an effect navigates after a phase or timer, read unstable callbacks through a ref so callback identity changes do not restart navigation or cancel cleanup.

Celebrate once and proportionately. Use one restrained haptic and optional sound only when approved; provide Reduce Motion and non-audio feedback.

## Motion, assets, and growing content

Read [motion-native.md](motion-native.md) for custom transitions.

- prefer `action -> immediate feedback -> meaningful transformation -> next state`;
- animate one purposeful beat rather than replaying the same entrance;
- drive related charts, metrics, gradients, and labels from the same value;
- use haptics only for meaningful selection, snap, commitment, or completion;
- preload critical local assets and pause inactive media;
- prevent white or wrong-theme flashes between routes.

Plan-building may use representative progress in prototypes, but keep timing and messages isolated. Before production, connect it to real work or replace it with a truthful short reveal.

Any ordinary content screen that can outgrow the viewport should use one appropriate scroll container with enough bottom padding for pinned actions. Do not nest same-direction scroll views. Paywalls are the exception: follow [paywall-ui.md](paywall-ui.md), which defaults to a non-scrolling decision screen and moves optional comparison detail elsewhere.

For third-party app artwork, use licensed owner-provided assets through a small registry and a neutral fallback. Never trace icons from screenshots. On iOS Screen Time products, prefer the system picker when it correctly owns app selection and icon rendering.

## Complete and verify

Make the completion destination explicit. Use an existing analytics abstraction only when approved; never install one or transmit sensitive answers implicitly.

Test the full resolved paths: answer dependencies and edits, Back/forward, invalid routes, progress, calculations, rapid taps, keyboard, compact phones, Dynamic Type, permission denial, interrupted work, media lifecycle, Reduce Motion, offline behavior where relevant, result continuity, paywall dismissal, and submission failure.

Walk and record the complete flow. Report its beat sequence, longest run of asks, first payoff, screens carrying multiple ideas, representative sources awaiting production data, and any step that neither costs little nor changes the experience.
