# Onboarding, personalized plan, and paywall design

Use this reference when the product includes onboarding, first-run education, personalization, a generated plan, subscription, trial, upgrade, or post-dismissal offer. Design the experience; do not choose libraries, configure billing, or implement screens.

## Follow the user's journey first

The user's screen list, sequence, implementation plan, and exclusions always override this default. When they request onboarding but supply no desired journey, design a product-specific version of:

`welcome/proof -> useful questions -> responsive teaching and product demonstration -> personal calculation/visualization -> attribution -> earned rating moment -> contextual permissions -> fingerprint-style pledge -> signed-oath congratulations -> plan building -> detailed personalized plan (congratulations like confetti) -> contextual paywall -> optional eligible offer -> activation`

Adapt or omit a module when it is irrelevant, unsupported, unsafe, or conflicts with the product. For example, a calorie tracker should ask only questions that change calorie targets, nutrition guidance, pacing, recommendations, or the final plan, then reuse those answers throughout the visualizations, pledge, plan, and paywall.

## Pace a useful conversation

Treat monetized onboarding as a personalized conversational funnel to the paywall: each answer updates the journey and changes later content, recommendations, results, or the offer.

Start from activation: the first result or action that makes the product useful. Use `ask`, `react`, `teach`, `reveal`, and `commit` as pacing beats, not a fixed screen count.

- Keep one idea and one primary action per screen.
- Never put more than two genuine asks together without feedback, teaching, or payoff.
- Make every answer change a later choice, copy, calculation, recommendation, visual, plan, or route.
- Use reversible auto-advance for cheap single-select choices when confirmation adds no value.
- Ramp effort from taps to limited typing, deliberate pledge, then payment after value.
- Use honest phase progress or a moving bar; never show a misleading `Step N of M`.

Vary step bodies: product previews, centered insights, cards/chips, sliders/rulers/pickers, text/media inputs, charts/comparisons, permission education, plan construction, and result stories. Avoid repeating identical option-card screens.

## Design the welcome and visible personalization

Choose the welcome archetype from the product: minimal brand/promise, product preview or photography, outcome plus social proof, authentication-first when genuinely required, or a short educational carousel. Do not default every app to a mascot, gradient, carousel, or sign-in wall.

Whichever archetype fits, the welcome needs a clear identity, concise promise, one strong product-specific visual/preview, one primary action, and a returning-user action when relevant. Show the result the product enables rather than a feature list.

Choose the composition from the user, references, product, and content, not a fixed ratio. It may be full-bleed, hero-heavy, content-heavy with a rounded panel, curved/split, or overlapping. Gradients, radii, and single/layered shadows are optional. Preserve `identity -> visual -> promise -> primary action -> optional secondary action`.

Reuse answers visibly. Acknowledge them through relevant copy, narrowed choices, calculations, imagery, recommendations, and later plan sections. Combining only the user's name with a generic plan is not personalization.

Build value through escalating frames: immediate response, calculation, visualization, acknowledged outcome, and detailed result. Demonstrate the real product with believable UI when it communicates value better than abstract artwork.

## Place attribution, rating, and permissions deliberately

Ask where the user found the app after initial value, not as the opening screen. Keep it skippable and do not pretend it personalizes the product. Acquisition attribution is separate from App Tracking Transparency.

Place a rating moment where sentiment has been earned. A social-proof screen and the native store-review prompt are different; never design duplicate in-app stars beside the system control. Representative ratings/testimonials may show the layout but must be identified for verification outside the UI.

Request notifications, health, tracking, camera, photos, location, or microphone only when used. Explain the immediate benefit before the system prompt, show a useful fallback, and let optional denial continue. ATT belongs only in products whose actual data behavior requires it.

## Design the pledge and oath result

A fingerprint-style hold may make the user's chosen intention deliberate. It is a visual hold-to-fill metaphor, not Touch ID, biometric authentication, a legal signature, or payment confirmation unless the product explicitly requires a real system capability.

Show visible hold progress, early-release cancellation, an accessible tap alternative, and a clear final state. Follow it with a concise congratulations confirming that the user signed their product-specific pledge or oath. Reuse their name, goal, and commitment. Say `oath` or `pledge`, never `OAuth`. Celebrate once and proportionately before plan building.

## Build and reveal the plan

Plan building should prove the app listened. Show 3–5 checkpoints connecting answers to decisions. If generation is instant, use a short truthful reveal rather than a fake wait; if it is remote, specify pending, error, retry, and fallback states.

Reveal a product-specific `Your plan is ready` congratulations, then show the detailed plan before the paywall. Make the result a guided long-form story when needed:

1. Personal plan name, promise, hero, and strongest metric.
2. `Based on your answers` evidence.
3. Rules, recommendations, schedule, or personalized content.
4. First day/week or phased milestones.
5. Honest calculation, chart, forecast, or comparison.
6. Preview of the real product or intervention.
7. Edit action and a clear CTA into the commercial decision.

Vary hero, metric, timeline, chart, rule, preview, and story compositions instead of producing a wall of identical cards. The result CTA must not imply that purchase already happened.

## Design the paywall and optional offer

Choose one primary selling story: personalized plan, feature comparison, trial timeline, before/after improvement, usage consequence, bundle, or goal/outcome reminder. Do not combine every persuasion pattern on one screen.

Carry at least one plan title, goal, metric, chart, image, or artifact into the paywall. Default to one focused non-scrolling viewport:

`close + Restore -> outcome reminder -> one hero/proof -> plan choice -> purchase CTA -> billing disclosure + legal`

Use at most three plan choices and distinguish selection with more than color. Show the actual billed amount/cadence, due-today value, exact future charge date when relevant, renewal, and cancellation terms near the CTA. Keep close, Restore, Terms, and Privacy reachable.

When production catalog data is unavailable, write believable representative plan names, monthly/yearly amounts, billed totals, trial length, due-today amount, charge date, renewal terms, savings, selected state, and offer values. Render the complete paywall so the design can be judged and tested; never leave commerce areas blank or label them as mock content inside the UI. Record every value for later replacement with real store products, eligibility, checkout, and entitlement data. Never invent false scarcity or pretend the representative checkout is connected.

After dismissal, one genuine eligible offer may address a different objection. Make it visually distinct, show original/discounted price, duration, cadence, and renewal together, and provide one claim CTA plus one visible decline that leaves the funnel. If there is no eligible offer, skip it or reveal the honest free destination; never loop back.

## Direct background and content motion

Choose a plain, image-led, or restrained gradient atmosphere from the product direction. Gradient is optional. When used, keep it coherent across the flow and provide quiet surfaces for dense reading; do not repeat it across every button, card, badge, and icon.

Motion is required across a polished onboarding journey, even when no reference animation was supplied. Design onboarding and connected paywall routes as one continuous surface with no page slide or whole-screen dissolve. Shared atmosphere, progress, and approved anchors remain mounted. What moves is content inside each screen: visual, headline, supporting copy, choices, calculated values, plan checkpoints/sections, carried paywall artifact, and CTA. Specify original product-specific choreography and reading order for every major beat, with the pledge, plan reveal, and paywall receiving deliberate peaks. Not every element must move, but the flow must not feel static. Reduced Motion presents final content immediately without losing feedback.

Use haptics only for meaningful user-caused selection, pledge completion, plan choice, offer claim, or confirmed purchase—not automatic loading, screen entrance, ordinary taps, or failed/cancelled payment.

## Record and verify the design

Record the activation moment, resolved screen inventory, beat sequence, answer dependencies, derived values, attribution/rating/permission purpose, pledge language, plan sections, paywall/offer exits, representative sources, background treatment, content choreography, accessibility, and unresolved decisions.

Check that every screen earns its place; no question is collected and forgotten; the detailed result visibly combines answers; pricing/disclosures are legible; optional permissions and exits preserve agency; no representative claim is presented as production truth; and the journey activates the real product after monetization or dismissal.
