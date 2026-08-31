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

For a personalized monetized flow, preserve the high-value arc: `welcome/proof -> useful asks -> product demonstration -> personal calculation -> visualization -> acknowledged outcome -> testimonials/proof -> rating-prompt -> permissions -> plan building -> personalized plan ->  hold-to-commit -> contextual paywall`. Name entry and post-dismissal consequence are optional product decisions.

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

Vary the header with the step, not only the body. Declare a layout per step alongside its beat. A useful set, none of which is mandatory:

- **heading** — plain title and supporting line above the body. The default, and the whole set for a flow with no character.
- **showcase** — the body is the visual (device frame, chart, grid, carousel) and centred copy captions it from below.
- **centered** — a hero element above centred copy, body underneath. For steps with nothing to answer.
- **dialogue** — a speaker beside the question. Only when the product actually has a character, avatar, or coach voice; the side it sits on follows writing direction.

A mascot is a product decision, not a requirement, and most flows ship without one. Where a product does have a character, show it once per screen or not at all: a character above a device frame that already contains that character is the mistake declared layouts prevent. Typed or animated question text belongs to `dialogue` alone — animating a caption under a chart is noise.

Never force a date picker, ruler, permission prompt, or informational screen through an `OnboardingOptionCard` API.

A carousel is a valid body when several cards are the same kind of thing read one after another. Use real snap paging, stop autoplay on first touch, never autoplay under Reduce Motion, and keep the dots a position indicator rather than a second control competing with the swipe.

Premium flows may also use product demonstrations, full-bleed media, centered insights, live projections, animated plan-building states, personalized results, and contextual paywalls. Keep the shell consistent while allowing each body to own its layout and interaction.

## Implement an adaptive conversation

Translate the approved journey into explicit dependencies rather than a fixed questionnaire. Each question should document what its answer changes: the next step, wording, options, calculation, recommendation, visual state, plan, or final result. Do not collect and forget answers.

Let earlier answers change later *choices*, not only wording. Type an option list as `Option[] | ((answers) => Option[])` and resolve it at the render site, so a goal, level, or context question narrows what the next step offers. A question whose answer only rephrases a sentence is close to a question that changes nothing.

When a parent answer changes, clear the dependent answers it invalidated rather than silently keeping a choice the app would no longer offer. Keep any label lookup working for computed lists by reading from the catalogue behind them, not from the step definition.

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

Assume the data arrives later. Keep every representative value — projections, plan dates, ratings, counts, prices, testimonials — in one named constant or one pure function per concern, never scattered through JSX, so a later pass can replace the source without touching layout, copy, or motion. List each of those sources in the handoff with what must replace it. A UI built this way survives the backend arriving; one with figures inlined into screens has to be rebuilt to receive them.

## Accounts inside the flow

Account creation is a product decision, not a default. Ask whether the product needs one at all, and where, before designing around it.

- Place it after the payoff, not before it. A signup wall in front of the first useful moment converts on nothing: the user has seen no reason yet.
- Prefer collecting answers anonymously and attaching them to the account at creation. Keep the draft in the flow's own state, submit once after authentication, and make that submit idempotent so a retry cannot duplicate a profile.
- If the product genuinely requires an account before the app opens, say so on the welcome screen and keep the flow itself unauthenticated up to that point, so a failed signup does not cost the user their answers.
- Treat authentication as its own beat: an ask with a real failure surface. Keep field errors inline, preserve entered values after a recoverable failure, and never mix onboarding answers into a credentials payload.
- Sort out what happens on return: a user who signs in on a second device should not repeat the questionnaire, so decide whether the server or the device owns completion state.
- Restore-purchase, paywall entitlement, and account identity interact. Decide which one gates the app before building any of them.

Do not install an auth provider, SDK, or backend client to satisfy an onboarding brief. Report the missing contract instead, and keep the flow working against local state until it exists.

## Permission steps

Explain the benefit before the system prompt and request only after explicit action. Handle granted, denied, restricted, and can-ask-again states with a useful fallback or settings path.

Spend the screen's single primary action on the prompt. A permission screen with a real ask buried in the body and a "continue" in the action slot teaches the user to tap past the ask without seeing it. Own the permission state above the body so the one bottom control can trigger it, then advance on either outcome; a permanently blocked state changes the control to a plain continue and offers Settings.

Implement acquisition attribution as a skippable categorical answer and send it only through an approved existing analytics or backend contract. Do not install tracking or transmit it to a new service implicitly. That in-app question is not the system tracking prompt and does not replace it.

The platform tracking prompt (`expo-tracking-transparency`, iOS App Tracking Transparency) is its own decision, and the test is simple: request it only if the app really does link its data to other companies' data, which in practice means an attribution or ad SDK reading the advertising identifier. An app that does not track must not ask — it costs trust and invites rejection.

- Explain in the app's own words first, then request. Say what it measures and, just as explicitly, what it never touches.
- Advance on either answer and never gate the flow, a payoff, or a purchase on it.
- Configure the plugin's `userTrackingPermission` string; note that a development client shows its own description text, not the app's.
- Handle platforms and versions without the prompt by treating the step as already answered, rather than showing a control that does nothing.

For protected capabilities, verify entitlements, purpose text, unavailable state, and minimum requested scope.

## Commitment interactions

An approved hold-to-commit action must show progress, cancel on early release, and provide an accessible tap alternative. Celebrate once and proportionately with reduced-motion and non-audio feedback. Ask before adding confetti or audio. Never use a hold as legal agreement, payment confirmation, or the only path forward.

Give the hold one clock and one source of truth. `delayLongPress` must equal the duration of the visible fill, or the commitment fires while the finger is still down; keep completion on the press callback and leave the animation purely visual so a commit cannot fire twice. Assistive activation cannot hold a control down, so commit on `onAccessibilityTap` as well.

Let the same progress drive the reveal it triggers. A circle growing from the control while the finger stays down, shrinking back on release, is the fill and the transition in one value — two animations kept in sync will drift. Then land on a destination painted in the colour the transition ended in, so nothing has to be dismissed afterwards.

Two failures cost real debugging time, so avoid both by construction:

- **A full-screen overlay in a `Modal` outlives its screen.** A pushed route leaves the previous screen mounted, and its modal renders above everything: a cover left visible becomes a dead, untouchable field of colour over the new screen. Prefer an in-layout overlay in the screen's action slot, or make dismissal a step the navigation cannot skip.
- **An effect that navigates must not depend on the navigation callback's identity.** `goNext` is recreated on every render and navigation causes a render, so the effect re-runs, its cleanup cancels the timer that would have taken the cover down, and it navigates again. Read the callback through a ref synced in its own effect and depend on the phase alone.

## Store ratings

A designed ratings or social-proof screen may use realistic representative content when it belongs to the approved onboarding story. Any rating average, customer count, or testimonial that is not verified must be held in one clearly marked constant and reported in the handoff as replace-or-remove before release; shipping it as written is a false claim.

Invoking the native prompt is a separate, approved decision. When it is approved, use the platform module (`expo-store-review` is bundled in Expo Go, so it needs no rebuild) and follow what the OS actually does:

- the sheet is a moment, not a button. Apple's guidance is explicit; call it when a screen with earned sentiment settles, never from a control labelled "rate us";
- do not draw an in-app star row beside it. The OS draws its own stars, so a second set either duplicates the control or collects a number nothing reads;
- never gate the step on it. It is capped by the OS, shows nothing in Expo Go, the simulator, or TestFlight, and must not block advancing;
- first run is rarely the best moment. Say so, and offer moving it to the first completed core action.

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

## Screens that outgrow one viewport

A centred `flex-1` column does not scroll. Once a screen grows past the viewport its content overflows silently: the illustration is cut off at the top and the pinned actions paint over the body. Any screen that can grow — comparisons, paywalls, dismissal offers, long option lists — scrolls its content and pins its actions.

Pin what the action is about, not only the action. On a purchase screen the plan cards, the amount due today, and the button that charges it belong together above the safe area, while the pitch scrolls above them. Never place a "free trial enabled" switch over that: a trial comes from the configured store product, so a toggle either does nothing or sells something other than what the screen shows. Keep the disclosure — due today, then price, cancel any time — as one line beside the control.

## Third-party app artwork

App icons are trademarks. Never draw, trace, recolour, or generate them, and never lift them from a screenshot. Load licensed files from the owner's brand or press kit through a small registry keyed by option value, with a neutral lettered tile as the fallback, so the UI works with none, some, or all of them present. On iOS, a shipped screen-time product should prefer Apple's `FamilyActivityPicker`, which renders genuine icons for the apps the user selects without exposing their identity to the app.

## Result, paywall, and analytics

Carry the answers into a visible result or next action. If a paywall is approved, make its relationship to that result explicit and preserve transparent pricing, restore, close, and platform-required purchase behavior.

A post-dismissal consequence screen may state what the free product is and may carry one better price. State it once: no countdown, no invented scarcity, no shame. A discount shown there must be a real introductory or promotional offer configured in both stores, or the checkout contradicts the screen.

Use the project's existing analytics abstraction when present. Track only events approved by the product scope, such as flow start, step view/completion, permission outcome, result reached, paywall view, purchase/skip, and activation. Do not install an analytics SDK or collect sensitive answer values without approval.

## Completion and verification

Make the completion destination obvious. Test branches, calculation thresholds, answer edits, forward/back, invalid routes, rapid taps, keyboard, compact phones, Dynamic Type, permission denial, interrupted work, media lifecycle, Reduce Motion, relevant offline behavior, paywall dismissal, and submission failure. Record the flow and check for flashes, replays, stale values, or delayed interaction.

## Verify pacing

Walk and record the complete flow. Report its beat sequence, longest run of asks, taps before the first payoff, screens carrying multiple ideas, derived values shown before their source answer, and steps that neither cost little nor change the experience. Fix or remove failed beats.
