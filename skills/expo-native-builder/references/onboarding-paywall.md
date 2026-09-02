# Expo onboarding, plan, and paywall flow

Use this reference for onboarding, personalization, attribution, rating, permissions, pledge moments, generated plans, paywalls, and optional offers. The user's named screens and implementation plan always override the default below.

## Default when the request is vague

When a user asks for an app with onboarding but gives no journey, propose and implement a product-specific version of:

`welcome/proof -> useful questions -> responsive teaching and product demonstration -> personal calculation/visualization -> attribution -> earned rating moment -> contextual permissions -> fingerprint-style pledge -> signed-oath congratulations -> plan building -> detailed personalized plan (congratulations) -> contextual paywall -> optional eligible offer -> activation`

Adapt every beat to the product. A calorie tracker should ask only questions that change calorie targets, nutrition guidance, pacing, recommendations, or the final plan; demonstrate the product with believable calorie-tracking UI; then reuse those answers throughout the calculation, pledge, plan, and paywall.

Do not force the default when the user supplies a desired flow, screen list, design, or implementation plan. Follow their sequence and omissions exactly. Remove a default module when it is irrelevant, unsupported, unsafe, or conflicts with the product.

## Pace it as a conversation

Use `ask -> react -> teach -> reveal -> commit` as rhythm, not a mandatory screen list.

- Keep one idea and one primary action per screen.
- Never place more than two genuine asks together without feedback, teaching, or payoff.
- Make every answer change a later choice, copy, calculation, recommendation, visual, plan, or route.
- Reuse answers visibly and clear dependent answers when an earlier choice changes.
- Ramp effort from taps to limited typing, deliberate pledge, and payment only after value.
- Use a moving progress bar or honest phase progress; never display a misleading `Step N of M`.

Keep direct answers, derived values, recommendations, and visible consequences separate. Make calculations pure so Back and edits recompute the journey correctly. Keep believable prototype formulas and claims in one replaceable fixture. Populate every designed chart, forecast, plan date, recommendation, rating, testimonial, and result so the UI is complete and testable; never leave the surface blank because production data is missing.

## Route and component structure

Use `/onboarding/[step]` when the questions share a shell and need route-derived progress and Back behavior. Validate the route key and redirect unknown values safely. Give distinctive transition/result screens named routes when that keeps their composition clear.

`[step].tsx` should contain only route parsing, resolved step/progress, shared chrome, navigation, and `<StepRenderer />`. Put step data in `src/components/onboarding/steps.ts` and substantial bodies in focused files such as:

```text
src/components/onboarding/
|-- step-renderer.tsx
|-- select-step.tsx
|-- text-step.tsx
|-- product-preview-step.tsx
|-- rating-step.tsx
|-- permission-step.tsx
|-- pledge-step.tsx
|-- progress-bar.tsx
|-- steps.ts
`-- state.tsx
```

Group small related bodies when that is clearer; do not create a file for trivial markup. The goal is a readable, testable route—not maximum file count.

Use the smallest state container that supports the flow. Persist only when unfinished onboarding must survive termination. Do not add Zustand, AsyncStorage, authentication, or a backend automatically.

## Attribution, rating, and permissions

Ask “Where did you hear about us?” only when acquisition attribution is useful. Keep it skippable and separate from App Tracking Transparency.

Place the rating moment after an earned positive beat, not near the start. A designed social-proof screen and the native store-review request are different. The OS owns its review UI and may show nothing; progression must never depend on it.

Request notifications, health, tracking, photos, camera, or other permissions only when the product uses them. Explain the immediate benefit before invoking the native prompt, then handle granted, denied, restricted, and can-ask-again states. Continue without optional permissions and offer a Settings path when useful.

## Fingerprint pledge and signed result

The default pledge may use a fingerprint-style hold interaction to make an intention feel deliberate. This is a visual hold-to-fill gesture, not biometric authentication or Touch ID unless the user explicitly requests real device authentication.

The hold must show progress, cancel on early release, work through an accessible tap alternative, and use one progress value for the visual fill and completion. It is never legal consent, account authentication, or payment confirmation.

After completion, reveal a concise product-specific congratulations screen confirming that the user signed their pledge or oath. Say “oath,” “pledge,” or the approved product term—never “OAuth.” Reuse their name, goal, and chosen commitment. This signed result is a motivational state, not a legal signature. Celebrate once with restrained motion/haptics, then continue to plan building.

## Plan building and detailed result

Plan building must prove the app listened. Show 3–5 truthful checkpoints that connect collected answers to decisions. Support pending, complete, error, retry, and a useful fallback. Do not fake remote work; use a short honest reveal when generation is immediate.

When complete, reveal “Your plan is ready” or a product-specific congratulations before the result. The detailed plan should appear before the paywall and synthesize real earlier answers rather than showing a generic summary. It may include:

- plan title and personalized promise;
- answer evidence and derived target;
- rules or recommendations and why they were chosen;
- first-week path or milestones;
- calculations, chart, forecast, or progress visualization;
- preview of the real product experience;
- edit action and a clear CTA into the commercial decision.

Use one scroll container for a long result and keep the CTA reachable. The CTA commits to viewing/starting the plan; it must not imply that a purchase happened.

## Paywall and optional offer

Carry one plan title, metric, chart, image, or artifact from the result into the paywall. Default the primary paywall to a focused single viewport with close, Restore, one value story, plan selection, purchase CTA, billing disclosure, and legal actions.

When the task is UI-only or the store catalog is not connected, create one believable representative catalog fixture and render it fully: plan names, monthly/yearly amounts, billed totals, trial length, due-today amount, charge date, renewal cadence, savings, selected plan, and offer values when designed. The user must be able to see and test the complete decision. Do not present fixture IDs, prices, eligibility, or checkout as production-connected.

Closing the paywall goes to the declared free/exit destination or one approved eligible offer. The offer must address a different objection, show exact price/cadence/renewal, avoid invented scarcity, appear once per decision journey, and provide a visible decline that leaves the funnel.

Keep purchase pending/cancel/error/success and restore states explicit. Store-sheet cancellation is a quiet return. Never claim entitlement before confirmation.

## Background and internal content motion

Always set the nested onboarding and connected paywall Stack to `animation: "none"`. Routes do not slide, crossfade, or animate as whole screens. Keep shared progress, state, and any approved background mounted in the layout.

Animate content inside each arriving screen. Reveal the illustration, headline, copy, options, derived metrics, plan checkpoints, detailed sections, carried paywall artifact, and CTA in a deliberate reading order. Interactive controls must not remain visually offset from their hit boxes. Under Reduce Motion, render the final content immediately or with a very short opacity change.

Background treatment is a design decision. Use a plain semantic surface, image-led scene, or restrained gradient based on the product, user request, reference, and existing design system. Do not add a gradient merely because the flow includes onboarding or a plan.

## Verify the complete journey

Test resolved paths, answer edits, Back/forward behavior, invalid routes, progress, calculations, rapid taps, keyboard, permissions, pledge cancellation/completion, Reduce Motion, plan failure/retry, detailed result continuity, compact screens, paywall close, offer decline, purchase/restore states, and final activation. Report every representative formula, rating, testimonial, attribution event, price, trial, charge date, offer, permission, analytics event, or backend contract awaiting a production source, then ask whether the user wants those fixtures connected to the real backend/store products next.
