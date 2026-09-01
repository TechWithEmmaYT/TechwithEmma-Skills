# Personalized Plan and Paywall UI

Use this reference to implement a generated result, subscription paywall, and optional post-dismissal offer in Expo or React Native. It covers presentation and host contracts, not automatic billing setup.

## Inspect the host first

Find the approved design, routes, onboarding answers, plan-generation source, theme and fonts, assets, catalog, entitlement state, purchase/restore callbacks, legal destinations, analytics abstraction, and installed motion or gradient packages. Preserve the working stack.

Do not add RevenueCat, StoreKit, Google Play Billing, product IDs, analytics, or a state library merely to build UI. Integrate commerce only when explicitly requested and its source of truth is known.

## Model the connected flow

Use routes, sheets, modals, or local states according to the approved navigation behavior; do not force one architecture. Model the meaningful states explicitly:

`building -> result -> primaryOffer -> optionalRescue -> purchasing -> success | basicDestination`

Keep plan derivation and billing separate. Compute the personalized result once and carry stable values or an ID forward rather than recomputing them on the paywall.

Expose semantic host actions:

```ts
type PaywallActions = {
  onEditPlan(): void;
  onStartJourney(): void;
  onSelectProduct(productId: string): void;
  onPurchase(productId: string): Promise<void>;
  onClosePrimary(): void;
  onAcceptRescue(productId: string): Promise<void>;
  onDeclineRescue(): void;
  onRestore(): Promise<void>;
  onOpenLegal(target: "terms" | "privacy"): void;
};
```

Do not infer product IDs, eligibility, or intent from visible prices, CTA copy, or screen position.

## Build plan generation and result

Render 3–5 meaningful building checkpoints with pending, active, complete, error, and retry states. If work is instant, keep the transition short; if remote, bind to real phases when available and do not invent precise progress.

Use one scroll container for a long result. Compose distinct sections for the plan hero, answer evidence, rules/recommendations, first-week path, projection, preview, and edit action. Keep a sticky or concluding `Start my journey` CTA above the home indicator and pad content so the final section remains reachable.

Keep representative data behind one fixture or adapter:

```ts
type PersonalizedPlan = {
  title: string;
  summary: string;
  evidence: Array<{ label: string; value: string }>;
  rules: Array<{ source: string; replacement: string; schedule?: string }>;
  milestones: Array<{ period: string; title: string; outcome: string }>;
  projection?: { label: string; value: string; disclaimer?: string };
};
```

Use the approved full-screen background or gradient outside safe-area content. Keep cards and CTA solid by default. Do not nest same-direction scroll containers.

## Implement a non-scrolling paywall by default

Build the primary paywall as a single-viewport, non-scrolling composition unless the user approved a longer design. Fit close/restore, concise outcome, one hero/proof, plan selection, purchase CTA, billing disclosure, and legal links without shrinking them into illegibility.

For compact screens, localization, and Dynamic Type, first reduce optional copy, adapt spacing, or move secondary comparison details to a separate sheet. Use a scrollable paywall only when the approved experience explicitly requires it; then verify that plans and disclosures are never hidden under a fixed footer.

- Render close immediately with a labelled 44pt target and keep Restore reachable.
- Give plan choices radio semantics and selected state.
- Drive selected product, price, CTA, and disclosure from the same catalog object.
- Show billed total/cadence beside any period equivalent.
- For trials, show due today, exact charge date, renewal price/cadence, and cancellation text near the CTA.
- Prevent duplicate purchases at both the control and action layers.
- Treat user cancellation of the store sheet as a quiet return, not an error toast.

Use normalized store-backed presentation data. When the catalog is unavailable during UI work, provide the same shape from one fixture; never parse or construct localized display prices inside the view.

## Implement an optional rescue offer

Render the rescue screen only when the host supplies an approved eligible offer or alternative. Keep it single-viewport by default, show it once according to the product's decision policy, and give it one purchase CTA plus one visible decline action. Decline must leave for the declared basic, preview, or exit destination—never loop back.

Render exact offer duration, discounted billed price, cadence, and regular renewal price. If eligibility disappears or no offer is configured, skip the rescue state. Never create a countdown from component mount time; use a genuine expiry timestamp or omit it.

## Motion and haptics

Use the project's existing Reanimated, Gesture Handler, and haptics setup when present:

- resolve building checkpoints from state;
- reveal result sections without delaying interaction;
- carry or crossfade one result artifact into the paywall;
- animate plan selection in roughly 180–225ms;
- keep CTA width and billing text stable while purchasing;
- use standard route/sheet transitions for dismissal and rescue.

Use selection haptics for changing plans, light feedback for deliberate commitment or claiming an offer, and success feedback only after entitlement is confirmed. Do not add haptics to automatic loading, paywall entrance, ordinary scrolling, disabled actions, failed purchases, or intentional cancellation. Respect platform settings and Reduce Motion for visual alternatives.

## Complete states and verification

Handle generation pending/error/retry, populated and edited result, catalog loading/unavailable, selected plan, ineligible trial/offer, purchase pending/cancelled/error/success, restore pending/not-found/success, offline behavior when relevant, rescue accepted/declined, and prototype replay when requested.

Support Dynamic Type, compact and large phones, both themes, safe areas, localized prices, Reduce Motion, rapid taps, and screen readers. Mascot art is accessible only when informative. Announce selection, generation completion, purchase errors, and confirmed success appropriately.

Test every callback without claiming a real purchase unless the store flow was connected and exercised. In the final handoff, list what still uses representative plan logic, formulas, analytics, catalog prices, offer eligibility/expiration, verified claims, purchase/restore, legal links, and entitlement state.
