# Flexible Expo onboarding flows

Use this reference for questionnaires, first-run education, permissions, personalization, and account-preparation flows. Onboarding is a sequence of user goals, not a sequence of identical cards.

Implement the approved journey from `mobile-design.md` or the supplied brief. This reference also works when the user calls `expo-native-builder` directly with no design skill or project plan.

When direction is missing, propose one value-first flow and ask the user to correct it once. Flow length follows rhythm, not a fixed screen count: many low-effort screens may feel lighter than a short dense form. Ask whether a trial or paywall belongs at the end when monetization is unclear; do not invent one.

Do not invent extra questions or analytics services. Every step must explain value, collect information that changes the experience, show a response, build justified commitment, or activate the product.

## Pace the flow

Use five beat types: `ask`, `react`, `teach`, `reveal`, and `commit`. Preserve the approved beat sequence; never compress a narrative journey into a questionnaire.

- Place no more than two asks together before a low-effort reaction, lesson, or reveal. Repay each meaningful answer with a visible consequence.
- Make asks cheap: prefer taps to typing, labelled tiers to raw numbers, and ranges when precision is unnecessary. Auto-advance a reversible single-select when the choice is clear.
- Keep one idea and one primary action per screen. Split dense explanations or results into low-effort beats.
- Restate a collected value in escalating frames such as daily, monthly, yearly, visualized impact, and dated outcome. Reveal figures progressively instead of placing every result side by side.
- Reuse names and selected answers in later copy, calculations, recommendations, and plans. A name is optional; visible answer reuse is not.
- Maintain continuity with a responsive character, metric, illustration, or product preview. Demonstrate the product with believable live UI when that explains value better than abstract art.
- Ramp effort from taps to limited typing, optional commitment gesture, and payment only after the personalized payoff.
- Use phase progress, a subtle progress bar, or no indicator according to the approved design. Never show misleading remaining length or a raw `Step N of M` counter.

For a personalized monetized flow, preserve the high-value arc: `welcome/proof -> useful asks -> product demonstration -> personal calculation -> visualization -> acknowledged outcome -> testimonials/proof -> plan building -> personalized plan -> contextual paywall`. Name entry, rating prompt, permissions, hold-to-commit, and post-dismissal consequence are optional product decisions.

## Share the shell, vary the step body

The shared shell may own:

- safe-area-aware layout;
- progress derived from the active route/step;
- back, skip, next, and completion behavior;
- consistent title/subtitle placement;
- keyboard and scroll handling;
- draft answer access and validation.

Each step renders the control appropriate to its data or message. Supported kinds might include:

- single- or multi-select cards/radio rows;
- date picker;
- height, weight, age, duration, or numeric ruler/wheel;
- text, email, or numeric input;
- centered informational or social-proof content;
- notification, camera, photo, health, or location permission education and action;
- illustration or Lottie-led welcome, loading, reveal, or completion;
- a custom component for a product-specific interaction.

Never force a date picker, ruler, permission prompt, or informational screen through an `OnboardingOptionCard` API.

Premium flows may also use product demonstrations, full-bleed media, centered insights, live projections, animated plan-building states, personalized results, and contextual paywalls. Keep the shell consistent while allowing each body to own its layout and interaction.

## Implement an adaptive conversation

Translate the approved journey into explicit dependencies rather than a fixed questionnaire. Each question should document what its answer changes: the next step, wording, options, calculation, recommendation, visual state, plan, or final result. Do not collect and forget answers.

Model direct answers separately from derived values, constraints, recommendations, and consequences. Keep calculations pure and deterministic so going back or changing an earlier answer recomputes later state correctly. When the real logic is unavailable, isolate realistic representative calculations in one fixture or replaceable function so charts, recommendations, and results look and behave complete. Keep implementation labels in code only, never on the UI. Before production, connect approved formulas and real collected data, especially for health, finance, safety, or business outcomes.

Use a small branch resolver or configured decision function for conditional paths. Preserve genuinely different journeys; reconnect paths only when the product logic calls for the same later step. Derive progress from the active resolved path rather than a universal fixed step count.

## Model heterogeneous steps

Use a discriminated union with explicit kinds such as single-select, multi-select, date, ruler, text, info, permission, and custom. Use real answer types, keep renderers small, and prefer a clear switch over one generic component with many optional props.

Charts, carousels, timelines, comparisons, selected imagery, plan cards, highlighted metrics, and generated summaries are valid step bodies when they explain real state. Choose the simplest component that communicates the approved interaction; do not force every flow to contain all of them.

Before a backend exists, populate the intended journey with believable names, goals, habits, answer-dependent copy, calculations, charts, projections, ratings, testimonials, commitment states, plan-building progress, milestones, dates, recommendations, and personalized results. The UI should look presentation-ready rather than empty or unfinished. Keep all representative sources easy to replace and list them in the final chat handoff after the UI is complete.

For sliders, pickers, carousels, or schedules with meaningful consequences, update derived values and visuals during interaction. Change supporting explanations at meaningful thresholds, preserve the exact selected value, pair caution colors with text or an icon, and offer a recommended alternative without silently overriding the user.

## Routing and progress

Use Expo Router route parameters such as `/onboarding/[step]` when distinct steps should support native back behavior, direct replacement, or route-derived progress. Validate the route key and redirect unknown steps safely. Derive progress from the configured step order rather than maintaining a second mutable counter.

A single route with local state is also valid for a short, inseparable flow. Choose based on navigation needs, not a universal rule.

### Own the onboarding transition

When approved choreography keeps the shell, progress, background, or visual anchors mounted, disable the onboarding Stack's default transition and animate only step content. For a flow-wide gradient or image, render it once in the group layout over an opaque semantic fallback; make only that nested Stack and navigation background transparent. Keep ordinary flows and the global navigator opaque.

## Answers and persistence

Keep draft answers in the smallest state container that supports the flow. Persist only when unfinished onboarding must survive termination or meaningfully long interruption. Do not add AsyncStorage, Zustand, or a database automatically.

Validate before advancing when the next screen depends on the answer. Submit private or account-owned answers to the backend only after the user is authenticated and the API contract is known. Never mix credentials into an unrelated onboarding profile payload.

## Permission steps

Explain the benefit before the system prompt and request only after explicit action. Handle granted, denied, restricted, and can-ask-again states with a useful fallback or settings path.

Implement acquisition attribution as a skippable categorical answer and send it only through an approved existing analytics or backend contract. Do not install tracking or transmit it to a new service implicitly.

For protected capabilities, verify entitlements, purpose text, unavailable state, and minimum requested scope.

## Commitment interactions

An approved hold-to-commit action must show progress, cancel on early release, and provide an accessible tap alternative. Celebrate once and proportionately with reduced-motion and non-audio feedback. Ask before adding confetti or audio. Never use a hold as legal agreement, payment confirmation, or the only path forward.

## Store ratings

A designed ratings or social-proof screen may use realistic representative content when it belongs to the approved onboarding story. This does not authorize invoking the native store-review prompt. If a real review request is implemented, connect it later at the approved product moment and ask before installing a package.

## Motion, gradients, and assets

Read [motion-native.md](motion-native.md) for approved custom transitions and [gradient-background.md](gradient-background.md) for atmospheric backgrounds.

- Use one purposeful motion beat per step rather than replaying the same entrance on every route.
- Preserve continuity across steps: an important answer, number, card, image, chart, or progress element may transform into the next composition or final plan.
- Prefer `action -> immediate feedback -> meaningful transformation -> next state` over fade-out, navigation, and repeated fade-in.
- Drive related motion from the same interaction or derived value so charts, metrics, labels, gradients, and recommendations stay synchronized.
- Keep selection feedback immediate and pair haptics only with meaningful selection, snap, or completion moments.
- Preload critical local assets when practical; pause media when inactive and prevent white or wrong-theme flashes.
- Keep readable content and controls inside safe areas while allowing approved media or gradients to extend edge to edge.

For a UI build, an approved staged processing or plan-building sequence may demonstrate the intended experience with representative progress and completed results. Keep it skippable in prototype/dev workflows and isolate its timing and messages. Before production, connect it to real work or replace it with a truthful result reveal; identify that connection in the final chat handoff.

## Result, paywall, and analytics

Carry the answers into a visible result or next action. If a paywall is approved, make its relationship to that result explicit and preserve transparent pricing, restore, close, and platform-required purchase behavior.

Use the project's existing analytics abstraction when present. Track only events approved by the product scope, such as flow start, step view/completion, permission outcome, result reached, paywall view, purchase/skip, and activation. Do not install an analytics SDK or collect sensitive answer values without approval.

## Completion and verification

Make the completion destination obvious. Test branches, calculation thresholds, answer edits, forward/back, invalid routes, rapid taps, keyboard, compact phones, Dynamic Type, permission denial, interrupted work, media lifecycle, Reduce Motion, relevant offline behavior, paywall dismissal, and submission failure. Record the flow and check for flashes, replays, stale values, or delayed interaction.

## Verify pacing

Walk and record the complete flow. Report its beat sequence, longest run of asks, taps before the first payoff, screens carrying multiple ideas, derived values shown before their source answer, and steps that neither cost little nor change the experience. Fix or remove failed beats.
