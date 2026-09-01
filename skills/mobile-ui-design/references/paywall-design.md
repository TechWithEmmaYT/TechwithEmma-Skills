# Personalized Plan and Paywall Design

Use this reference when onboarding leads to a generated result, subscription, trial, upgrade, or post-dismissal offer. Design the experience and handoff; do not choose or integrate a billing SDK.

## Design an earned sequence

A personalized journey may use:

`plan building -> personalized result -> primary paywall -> optional rescue offer`

These moments have different jobs:

- **Plan building** makes the synthesis visible.
- **Plan result** proves that the user's answers changed something valuable.
- **Primary paywall** presents one clear purchase decision.
- **Rescue offer** optionally lowers one genuine barrier after dismissal.

Do not force every product through all four moments. A standalone upgrade may begin from the premium capability the user just tried. A rescue offer is optional and must never become a loop.

## Build and reveal the plan

The building state is not a bare spinner. Show 3–5 short checkpoints derived from the user's answers, such as matching a distracting app to a replacement action or protecting a chosen focus window. Use a progress object, assembling cards, a character action, or a path filling in. If generation is instant, use a short transition rather than a fake wait; if it is remote, include honest pending, error, and retry states.

The result can be a long scroll when it must combine many answers. Make it a guided story, not a wall of text or identical cards:

1. **Personal claim:** plan name, transformation, hero or mascot, and strongest metric.
2. **Proof of listening:** a compact `Based on your answers` strip.
3. **What changes:** rules, recommendations, schedule, or personalized feed.
4. **What happens first:** first day, week, or phased journey.
5. **What could improve:** an honest forecast, chart, or before/after comparison.
6. **What it feels like:** a preview of the intervention or premium experience.
7. **Control:** a quiet `Edit plan` action and a sticky or concluding `Start my journey` CTA.

Vary the composition—hero, timeline, split metric, chart, rule row, and story card—while keeping one radius and spacing system. Use the user's answers in meaningful combinations; inserting only their name is not personalization. The commitment CTA opens the commercial step and must not imply that a purchase already happened.

## Create connected visual peaks

The result, paywall, and rescue offer should each feel important without looking like different products. Carry at least one plan title, goal, metric, chart, mascot, or artifact across the cut.

Escalate instead of restarting:

- **Atmosphere:** strengthen, deepen, invert, or simplify the established background.
- **Type:** let the result or paywall headline become the largest type in the flow; roughly 30–40pt is a useful starting range, not a fixed token.
- **Imagery:** use one focused mascot, illustration, 3D object, or product artifact per screen.
- **Depth:** bring the selected plan forward with border, fill, check, and restrained elevation.
- **Density:** group promise, plan, price, CTA, and terms deliberately.

When gradients belong to the direction, use them as full-screen atmosphere first. Keep cards readable and primary buttons solid unless a gradient control was explicitly approved. Preserve the product's fonts, accent family, radii, spacing, and character language.

## Keep the primary paywall focused

Default to a **single-viewport, non-scrolling paywall**. Most paywalls should show the complete decision at once:

`close + restore -> outcome headline -> one hero/proof -> plan choice -> purchase CTA -> billing disclosure + legal`

Use a scrollable paywall only when the user explicitly approves a longer comparison, story, or content requirement. Do not shrink important type or hide billing terms merely to avoid scrolling; simplify the pitch, move optional details into an all-plans/comparison sheet, or adapt the layout for compact screens and larger text.

Choose one selling story: personalized plan, goal anchored, result reveal, trial timeline, plan choice, comparison, or feature demonstration. The long result screen should already carry most persuasion, so a contextual paywall normally needs only a concise reminder of value.

Keep a visible, labelled 44pt close target from the moment the screen appears unless the approved product is genuinely subscription-gated. Use `X`, `Close`, or `Not now`; reserve `Cancel subscription` for managing an existing subscription. Keep Restore, Terms, and Privacy reachable without competing with purchase.

## Present plans, price, and copy clearly

- Use no more than three visible choices. Preselect the plan genuinely recommended.
- Differentiate selection with at least three cues: border, fill, and check/radio or elevation. Never rely on colour alone.
- A badge may overlap the card border by roughly half its height. Use one badge on one card, and make it agree with the selected default.
- Keep plan cards consistent in height and give unselected cards a visible neutral border.
- Show the localized amount actually billed and cadence prominently beside any monthly or weekly equivalent: `$79.99 billed yearly · $6.67/month`.
- Strike through an anchor price only when it is real. Compute savings from the prices shown.
- For trials, keep a compact ledger near the CTA: `Due today · $0.00` and `Due 21 July · $10.99/month`, followed by the renewal and cancellation sentence.
- Use a specific purchase CTA: `Start free trial`, `Try for $0.00`, or `Upgrade for $19.99`. Use `Continue` only when the selected card and nearby disclosure make the commitment unmistakable.
- Keep secondary actions as quiet text links. One is normally enough.

Treat exact type, badge, fade, and timing values as adaptable ranges rather than universal tokens. Follow the approved design system and available viewport.

## Design an optional rescue offer

After primary dismissal, one configured rescue offer may address a different objection: lower price, shorter commitment, or a basic path. It should be a visually distinct, single-viewport screen—not the first paywall with a louder badge.

- Lead with the reduced commitment and one offer artifact, background scene, or changed mascot state.
- Show original price, discounted price, offer duration, billed cadence, and regular renewal price together.
- Provide one claim CTA and one visible decline that leaves for the promised basic, preview, or exit destination.
- Show it at most once per decision journey unless the product defines another honest eligibility policy.
- Never use a resetting countdown, false scarcity, disguised close, or a discount checkout cannot honor.

If there is no genuine eligible offer, skip this screen or explain the basic experience honestly.

## Motion and haptics

Use one restrained transition grammar:

- checkpoints resolve in order while building;
- result sections reveal as reached, with the final state immediately available under Reduce Motion;
- one shared result element carries into the paywall;
- plan selection responds in roughly 180–225ms;
- rescue uses standard sheet/page entry with one authored hero motion at most.

Design these as one continuous surface rather than a set of pushed pages. The atmosphere, progress, and any persistent character stay mounted across the whole sequence; the page itself does not slide or dissolve. What moves is the content of each screen, choreographed on arrival, so the flow reads as one thing changing rather than a stack of screens replacing each other.

Specify that choreography per screen, and give the paywall the most deliberate one—it is the peak, and a paywall that simply appears while every screen before it animates is the most common failure of this flow. Name in the handoff what stays mounted, what moves on each arrival, what carries across the cut, and what the paywall's entry does that the earlier steps do not.

Use haptics only for user-caused, meaningful moments: plan selection, commitment, claiming an offer, or confirmed purchase success. Do not vibrate for automatic loading, screen entrance, every tap, an intentional store-sheet cancellation, or a purchase that has not succeeded.

## Representative data and trust

Use believable representative plans, forecasts, prices, ratings, testimonials, dates, and offer states when real systems are unavailable so the design looks complete. Do not place `mock`, `sample`, or placeholder warnings inside the UI.

Before production, connect or replace them with approved formulas, collected answers, localized catalog prices, real eligibility and expiration, verified claims and reviews, billing actions, entitlements, and legal destinations. Never monetize a platform capability that current store policy prohibits selling by itself.

## Handoff and review

Record in `mobile-design.md`: the sequence and destination after every close or decline; result sections and data sources; what carries between stages; visual escalation; default paywall scrolling behavior; plans, prices, eligibility, trial, disclosures, CTA and exit labels; rescue-offer policy; motion/haptics; representative content to replace; and unresolved commerce decisions.

Confirm: the result visibly combines earlier answers; each screen has one dominant story and CTA; the paywall fits one viewport by default; selection uses more than colour; charged total, due-today amount, charge date, renewal, close, Restore, and legal actions are clear; any rescue offer is genuine and dismissible; and no unverified claim is presented as production truth.
