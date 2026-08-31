# Premium Onboarding Design

Use this reference to design onboarding, personalization quizzes, first-run education, and pre-paywall journeys. Decide the experience here; implementation belongs to the builder.

## Choose the right journey

Start from the activation moment: the first result or action that makes the product useful.

- Use a short activation flow for utilities whose value is immediate.
- Use a deeper personalized flow when answers materially change a health, fitness, learning, finance, coaching, meditation, or lifestyle result.
- Never add steps only to make onboarding feel longer. Every step must build understanding, relevance, trust, or commitment.

A personalized journey may follow:

`Hook and proof -> useful questions -> responsive feedback -> plan creation -> meaningful result -> contextual paywall -> activation`

Treat this as an arc, not a required screen count.

Do not automatically compress a premium consumer journey into a few setup screens. Length follows rhythm: a 20–30-screen narrative whose steps mostly cost nothing may feel lighter than a six-screen form. Every screen must still earn its place. Present the recommended length and one-line arc once for approval before locking the inventory.

Pace with five beat types: `ask`, `react`, `teach`, `reveal`, and `commit`. Use only a small number of genuine questions, never place more than two asks together, and repay each ask with a low-effort response. A welcome establishes the promise; later beats prove and personalize it.

For a personalized monetized product, default to the high-value arc: `welcome/proof -> useful asks -> product demonstration -> personal calculation -> visualization -> acknowledged outcome -> testimonials/proof -> plan building -> personalized plan -> contextual paywall`. Keep name entry, rating prompt, permissions, commitment gesture, and post-dismissal consequence optional. Omit a default beat only when the product cannot support it or the user declines it.

## Structure the welcome

Make the first screen earn the first tap. Use a clear product identity, one concise promise, one strong visual or product preview, one primary action, and a quieter returning-user action when relevant. Show what the product helps the user achieve, not a dense feature list.

Choose flat, image-led, or restrained atmospheric treatment from the product direction; a gradient is not required for premium quality. Motion may reveal the identity or transition into the first useful step, but it must be authored for that concept rather than a generic entrance. Keep the final interactive state available immediately under Reduce Motion.

## Vary the experience

Keep one clear purpose and one primary action per screen. Share a coherent shell and visual language, but choose the body that best serves each step:

- product demonstration, image, video, or interactive preview;
- centered statement, statistic, social proof, or personalized insight;
- single-select, multi-select, cards, chips, or ranked choices;
- slider, ruler, wheel, date, time, duration, or numeric picker;
- text, voice, photo, or media input when the product genuinely accepts it;
- live projection, chart, comparison, or changing target;
- permission education followed by an explicit request action;
- plan-building transition, result reveal, or next-action screen;
- contextual paywall tied to the result the user just created.

Avoid a sequence of identical option cards. Ask only questions whose answers change content, recommendations, defaults, segmentation, or the result.

Keep one idea and one primary action per screen. Split two ideas into separate low-effort beats. Let a reversible single-select advance immediately when confirmation adds no value.

When current external research is allowed and useful, study [Appllama's welcome-screen collection](https://github.com/Appllama/top-welcome-screens) and [paywall collection](https://github.com/Appllama/top-paywall-screens) as read-only evidence for flow structure, interaction states, and motion. Extract patterns rather than copying branding, wording, artwork, prices, or complete compositions.

## Choose optional onboarding modules deliberately

Use these when they serve a clear product or business purpose; never force all of them into every flow:

- **Acquisition attribution:** ask where the user heard about the app using a short, skippable list such as search, creator/video, social, referral, advertisement, or other. Place it after initial value, not as the opening screen, and do not pretend it personalizes the result when it does not.
- **Contextual permissions:** explain the immediate benefit of notifications, health data, location, camera, microphone, or photos before the native prompt. Ask only when the next feature needs it and show the useful fallback.
- **Social proof presentation:** during design exploration, use realistic representative ratings, customer counts, outcomes, testimonials, or activity when needed to show the intended layout and persuasion hierarchy. Do not mark them as sample content inside the UI. Tell the owner after presenting the design that these claims must be verified, replaced, or removed before production.
- **Honest comparison:** contrast the user's current approach with the product's approach through specific capabilities, time, effort, or outcome. Avoid vague competitor attacks and unsupported superiority claims.
- **Commitment moment:** a short pledge, intention, or hold-to-confirm interaction can make a meaningful goal feel deliberate. On completion, a concise congratulations state may combine restrained confetti, one haptic, and optional sound before revealing the next action. Keep it accessible, proportional, and easy to skip; it is not a substitute for legal consent.

A design concept may include a ratings, testimonials, customer-count, or social-proof screen with realistic representative content when it supports the intended story. This is separate from invoking the native store-review prompt. Record the real review-request timing as an implementation decision outside the UI.

## Make personalization visible

Respond to useful answers through copy, visuals, calculations, recommendations, or the next question. Use empathetic feedback only when it is specific and credible.

Design the journey as an adaptive conversation:

`Ask -> remember -> interpret -> adapt -> recommend -> synthesize -> activate`

Before adding a question, state what its answer changes. It may change the next question, branch, wording, choices, calculation, recommendation, imagery, plan, or final result. Remove questions whose answers are collected and forgotten. Branch when relevance improves; keep paths distinct or reconnect them according to the actual product journey rather than implementation convenience.

Use acknowledgment intentionally. It may be encouragement, reassurance, a personalized observation, a useful consequence, or simply a more relevant next question. Vary the rhythm so responses feel human rather than repetitive. When answers conflict, explain the tradeoff clearly, recommend a realistic option, and preserve user agency.

During design exploration, freely use realistic representative values, projections, and formulas to demonstrate how the personalized result should look and respond. Present them naturally inside the UI without sample, mock, or placeholder labels. After showing the design, tell the owner in chat that production logic must replace them with approved formulas and real collected data, especially in health, finance, or safety contexts. Record that implementation note in the handoff, outside the UI.

## Design the reveal

- Restate one collected value through escalating frames: immediate value, longer-term calculation, visual impact, and dated outcome. Stage figures rather than crowding one results screen.
- Reuse names, selections, and earlier visuals in later headings, recommendations, and the final plan. Name capture is optional; answer continuity is required.
- Carry one responsive character, metric, illustration, or product preview through the journey when it strengthens continuity.
- Demonstrate the product through believable live UI when that communicates value better than abstract art.
- Ramp effort from taps to limited typing, optional gesture commitment, then payment after the payoff.
- Choose phase progress, a subtle progress bar, or no indicator. Never misrepresent remaining length or use a raw `Step N of M` counter.

## Turn answers into visual feedback

Choose the format that best explains the current decision instead of repeating option cards:

- charts, progress views, timelines, and highlighted metrics for projections;
- carousels, imagery, and illustrations for visual preferences or emotional context;
- sliders, rulers, pickers, and schedules for ranges and commitment;
- comparison states for current versus projected outcomes;
- plan cards and generated summaries that combine earlier answers.

When a control has meaningful consequences, show them while the user interacts. A pace slider may update a timeframe, chart, required commitment, recommendation, and caution state together. Use threshold feedback rather than changing prose on every pixel, and never rely on color alone. These visuals should demonstrate plausible intended product logic, not merely decorate the funnel; representative logic is allowed during design and is replaced or validated during implementation.

Build later states from earlier decisions. Selected values, imagery, metrics, and plan fragments should increasingly combine into the result so personalization becomes the product demonstration.

End with something meaningful: a routine, recommendation, forecast, target, first lesson, first task, or preview of the personalized plan. Do not finish with a generic "You're all set" screen or an empty dashboard.

The paywall may follow the result when monetization requires it, but show enough evidence that the result feels genuinely personalized. A design concept may include representative authority statistics, testimonials, urgency, countdowns, staged processing, and offer states when they are part of the intended experience. Keep them presentation-ready in the UI, isolate them in the handoff, and identify everything that must connect to verified claims, real timing, commerce data, formulas, or backend state in the post-design chat note—not on the UI screens.

## Direct the visual experience

Define one product-specific atmosphere across onboarding and the app:

- a coherent photography, illustration, 3D, abstract, or product-preview asset family;
- background and gradient roles, including where plain surfaces provide rest;
- motion character such as energetic, playful, calm, precise, or cinematic;
- consistent typography, progress, button placement, spacing, and control language;
- clear contrast and reduced-motion alternatives.

When the user requests a gradient without assigning it to a component, make it the full-screen background atmosphere first. For a connected journey, consider one persistent background layer behind transparent screen content that changes subtly with progress or narrative state. Keep cards legible and primary buttons solid by default; a gradient button requires an explicit request or a clearly approved control treatment.

Use gradients and motion as product materials, not automatic decoration. A meditation app may use slow atmospheric background gradients, layered depth, and gentle dissolves; a fitness app may use firmer movement and progress energy. Do not give every category the same glowing gradient treatment, and do not spread the background gradient across every button, card, badge, and icon.

Plan motion across the journey, not as unrelated entrances. Identify which answer, number, card, image, chart, or progress element can persist, transform, or reorganize into the next state. Prefer `action -> immediate feedback -> meaningful transformation -> next state` over fading one screen out and another in. Motion must not delay answering, and reduced-motion alternatives must preserve feedback and comprehension.

## Plan trust and measurement

Introduce account creation, permissions, sensitive questions, and payment only when their benefit is understandable. Request system permission in context and provide a fallback when possible.

Include analytics intentions in the handoff without choosing a vendor: onboarding started, step viewed, step completed, permission result, result reached, paywall viewed, purchase or skip, activation completed, and relevant retention milestones. Optimize the complete journey, not only conversion among users who survived the funnel.

## Handoff requirements

Record the activation moment, journey archetype, ordered and conditional steps, purpose of each question, answer dependencies, derived values, constraints, recommendations, visual formats, motion continuity, result, paywall relationship, skip/back behavior, and unresolved decisions in `mobile-design.md`. Keep this decision map concise; do not dump internal reasoning into the handoff.
