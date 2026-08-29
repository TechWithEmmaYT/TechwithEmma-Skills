# Flexible Expo onboarding flows

Use this reference for questionnaires, first-run education, permissions, personalization, and account-preparation flows. Onboarding is a sequence of user goals, not a sequence of identical cards.

Implement the approved product journey from `mobile-design.md` or the supplied brief. Do not invent extra questions, a longer funnel, a paywall, fake loading, or new analytics services. If the experience is not designed yet, state the missing decisions instead of turning implementation into an unapproved redesign.

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

Model direct answers separately from derived values, constraints, recommendations, and consequences. Keep calculations pure and deterministic so going back or changing an earlier answer recomputes later state correctly. For an explicitly approved UI prototype, isolate clearly labelled sample calculations behind a mock function or fixture so the intended charts, recommendations, and result structure can be demonstrated. Before production use, replace them with the approved formula and real collected data, especially for health, finance, safety, or business outcomes.

Use a small branch resolver or configured decision function for conditional paths. Preserve genuinely different journeys; reconnect paths only when the product logic calls for the same later step. Derive progress from the active resolved path rather than a universal fixed step count.

## Model heterogeneous steps

A discriminated union keeps the flow configurable without pretending every step has the same props:

```ts
type Step =
  | { key: string; field: string; kind: "single-select"; options: Option[] }
  | { key: string; field: string; kind: "multi-select"; options: Option[] }
  | { key: string; field: string; kind: "date"; min?: string; max?: string }
  | { key: string; field: string; kind: "ruler"; min: number; max: number; unit: string }
  | { key: string; kind: "info"; body: string; illustration?: ImageSource }
  | { key: string; kind: "permission"; permission: "notifications" | "camera" | "photos" }
  | { key: string; kind: "custom"; render: StepRenderer };
```

Use the project's actual answer types instead of broad `string` fields in production. Keep renderers small and explicit; a switch over `step.kind` is often clearer than a generic component with dozens of optional props.

Charts, carousels, timelines, comparisons, selected imagery, plan cards, highlighted metrics, and generated summaries are valid step bodies when they explain real state. Choose the simplest component that communicates the approved interaction; do not force every flow to contain all of them.

For sliders, pickers, carousels, or schedules with meaningful consequences, update derived values and visuals during interaction. Change supporting explanations at meaningful thresholds, preserve the exact selected value, pair caution colors with text or an icon, and offer a recommended alternative without silently overriding the user.

## Routing and progress

Use Expo Router route parameters such as `/onboarding/[step]` when distinct steps should support native back behavior, direct replacement, or route-derived progress. Validate the route key and redirect unknown steps safely. Derive progress from the configured step order rather than maintaining a second mutable counter.

A single route with local state is also valid for a short, inseparable flow. Choose based on navigation needs, not a universal rule.

### Own the onboarding transition

In the onboarding route-group layout, disable Expo Router's default Stack transition so it does not slide the whole screen on top of the approved custom choreography:

```tsx
<Stack
  screenOptions={{
    headerShown: false,
    animation: "none",
  }}
/>
```

Individual step content may still animate through the approved motion system. This keeps the shared shell, background, progress, and persistent visual anchors mounted instead of making every step look like an unrelated pushed page.

When one gradient, shader, image, or atmospheric surface spans the full flow, render it once in the group layout. Give the outer root an explicit `flex: 1` and opaque semantic fallback color, then make both the nested navigation theme and Stack scene transparent:

```tsx
const transparentNavigationTheme: Theme = {
  ...baseNavigationTheme,
  colors: {
    ...baseNavigationTheme.colors,
    background: "transparent",
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    primary: colors.accent,
  },
};

<View
  className="flex-1"
  style={[themeVariables, { flex: 1, backgroundColor: colors.ground }]}
>
  <FlowBackground />
  <ThemeProvider value={transparentNavigationTheme}>
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "none",
        contentStyle: { backgroundColor: "transparent" },
      }}
    />
  </ThemeProvider>
</View>
```

Build `baseNavigationTheme` from the active `DefaultTheme` or `DarkTheme`, and map its colors from the project's actual semantic theme. Keep ordinary non-gradient flows opaque. Do not make the global app navigator transparent when only the onboarding group needs it.

## Answers and persistence

Keep draft answers in the smallest state container that supports the flow. Persist only when unfinished onboarding must survive termination or meaningfully long interruption. Do not add AsyncStorage, Zustand, or a database automatically.

Validate before advancing when the next screen depends on the answer. Submit private or account-owned answers to the backend only after the user is authenticated and the API contract is known. Never mix credentials into an unrelated onboarding profile payload.

## Permission steps

Explain the benefit before showing the system prompt, and request permission only after an explicit user action. Handle already-granted, denied, restricted, and can-ask-again states. Provide a useful fallback and settings path when permission is denied; do not trap the user unless the feature truly cannot function without it.

Implement acquisition attribution as a skippable categorical answer and send it only through an approved existing analytics or backend contract. Do not install tracking or transmit it to a new service implicitly.

When health or another protected capability is approved, verify the platform entitlement, purpose text, unavailable state, and minimum requested scope before calling the native API.

## Commitment interactions

For an approved hold-to-commit action, show continuous press progress and cancel cleanly when the pointer leaves or releases early. On success, show a brief congratulations state with one synchronized haptic; approved confetti and optional sound may reinforce this meaningful milestone. Fire the celebration once, keep it short, respect Reduce Motion and muted/silent preferences, and provide a non-audio accessible success cue. Reuse installed native-compatible packages or assets; ask before adding a confetti or audio dependency. Provide an accessible tap or confirmation alternative when a sustained gesture may be difficult. Never use a hold gesture as legal agreement, payment confirmation, or the only way through onboarding.

## Store ratings

Do not request an App Store or Play Store rating during first-run onboarding. If the approved product later requests one after a real successful action, use the platform-native review API or the project's existing wrapper. Do not attach it directly to a rating button, ask users whether they like the app first, request a specific star score, assume the prompt will display, or block navigation on its result. Ask before installing `expo-store-review` or another package.

## Motion, gradients, and assets

Read [motion-and-gradients.md](motion-and-gradients.md) when the approved design includes custom transitions or atmospheric backgrounds.

- Use one purposeful motion beat per step rather than replaying the same entrance on every route.
- Preserve continuity across steps: an important answer, number, card, image, chart, or progress element may transform into the next composition or final plan.
- Prefer `action -> immediate feedback -> meaningful transformation -> next state` over fade-out, navigation, and repeated fade-in.
- Drive related motion from the same interaction or derived value so charts, metrics, labels, gradients, and recommendations stay synchronized.
- Keep selection feedback immediate and pair haptics only with meaningful selection, snap, or completion moments.
- Preload the next step's critical local image, Lottie, font, or short video when practical; prevent white flashes and temporary wrong-theme backgrounds.
- Pause or unload media when the step is inactive. Respect Reduce Motion and test on a lower-end Android device.
- Keep readable content and controls inside safe areas while allowing approved media or gradients to extend edge to edge.

Use a real pending state for real calculation or network work. A short result-reveal transition may improve continuity, but do not delay a result merely to imply nonexistent AI processing.

## Result, paywall, and analytics

Carry the answers into a visible result or next action. If a paywall is approved, make its relationship to that result explicit and preserve transparent pricing, restore, close, and platform-required purchase behavior.

Use the project's existing analytics abstraction when present. Track only events approved by the product scope, such as flow start, step view/completion, permission outcome, result reached, paywall view, purchase/skip, and activation. Do not install an analytics SDK or collect sensitive answer values without approval.

## Completion and verification

Design proportional feedback for meaningful completion, then make the next destination obvious. Test every meaningful branch, calculation boundary, recommendation threshold, answer edit, and path transition, plus forward/back navigation, restored answers where applicable, invalid route keys, rapid taps, keyboard behavior, compact phones, dynamic type, permission denial, interrupted loading, media lifecycle, Reduce Motion, offline behavior where relevant, paywall dismissal, and final submission failure. Record the complete flow and check that transitions do not flash, replay unexpectedly, show stale derived values, or delay interaction.
