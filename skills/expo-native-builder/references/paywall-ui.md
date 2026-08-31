# Paywall UI

Use this reference to implement subscription, trial, upgrade, and plan-selection UI. It covers the interface and host action contract, not automatic billing setup.

## Inspect the host first

Find the route, approved design or brief, existing product catalog, billing callbacks, entitlement state, restore action, legal destinations, navigation behavior, analytics abstraction, and installed packages. Preserve them.

If no design skill or project plan was used, ask one compact batch for the premium outcome, plans, trial, price source, close/skip behavior, restore/legal destinations, and what happens after success. Then propose one clean hierarchy and continue after approval. Do not block on another skill.

Do not add RevenueCat, StoreKit, Google Play Billing, a payment SDK, product IDs, or analytics merely to build the UI. Add commerce integration only when explicitly requested and its source of truth is known.

## Implement the offer hierarchy

Use the approved structure or this compact default:

`close/restore -> outcome-led value -> focused proof or comparison -> plan/trial selection -> primary CTA -> renewal and legal terms`

Keep one primary action. Make the selected plan obvious through more than colour, and update the CTA and disclosure from the same selected-plan state. Keep important terms visible before purchase. Use a scrollable body with a fixed purchase region only when content cannot fit accessibly; add a short surface fade rather than hiding rows beneath the footer.

Use a personalized result from onboarding when approved, but never leak sensitive answers or recompute high-stakes claims inside presentation code.

## Complete the UI before commerce is connected

When a billing/catalog source exists, render its localized title, price, period, trial eligibility, introductory offer, and renewal terms. When it does not, still build the complete paywall using realistic representative products, prices, savings, ratings, testimonials, trial dates, countdowns, eligibility, processing, purchase outcomes, and offer variants. Keep them in one fixture or replaceable adapter; do not scatter values through components or put `mock`, `sample`, or placeholder warnings on the UI.

After completing the UI, explicitly list in the final chat response what must connect to the store catalog, billing SDK, real eligibility, expiration/countdown state, verified reviews or claims, restore, legal destinations, analytics, and entitlement backend before release.

Expose separate semantic actions for close, skip, restore, legal links, plan/tier selection, trial toggle, purchase, and alternate-plan presentation. Do not infer a product ID from visible price or CTA text.

## Build complete interaction states

Handle available products loading, product unavailable, selected plan, purchase pending, purchase error, user cancellation, success, restore pending/result, ineligible trial, offline behavior when relevant, and replay/reset for prototypes. Prevent duplicate purchases and keep close/back behavior consistent with the approved journey.

Use restrained motion: immediate press feedback, roughly 180–225 ms selection or tier transitions, native scrolling, and standard sheet entry/dismissal. Respect Reduce Motion and avoid decorative mount animation. Keep continuous gestures on the UI thread when custom interaction is approved.

## Accessibility and verification

Give plan choices radio or tab semantics with selected state, preserve readable Dynamic Type, keep touch targets at least 44 points, and do not communicate savings or selection by colour alone. Ensure close, restore, legal, and purchase actions have clear labels.

Verify every plan and trial combination, localized long prices, compact phones, scrolling/fixed-footer overlap, loading/error/success, restore, dismissal, Reduce Motion, rapid taps, and both native platforms. Test the host callbacks without claiming a real purchase unless the billing flow was actually connected and exercised.
