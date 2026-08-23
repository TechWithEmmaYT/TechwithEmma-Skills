# Flexible Expo onboarding flows

Use this reference for questionnaires, first-run education, permissions, personalization, and account-preparation flows. Onboarding is a sequence of user goals, not a sequence of identical cards.

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

## Routing and progress

Use Expo Router route parameters such as `/onboarding/[step]` when distinct steps should support native back behavior, direct replacement, or route-derived progress. Validate the route key and redirect unknown steps safely. Derive progress from the configured step order rather than maintaining a second mutable counter.

A single route with local state is also valid for a short, inseparable flow. Choose based on navigation needs, not a universal rule.

## Answers and persistence

Keep draft answers in the smallest state container that supports the flow. Persist only when unfinished onboarding must survive termination or meaningfully long interruption. Do not add AsyncStorage, Zustand, or a database automatically.

Validate before advancing when the next screen depends on the answer. Submit private or account-owned answers to the backend only after the user is authenticated and the API contract is known. Never mix credentials into an unrelated onboarding profile payload.

## Permission steps

Explain the benefit before showing the system prompt, and request permission only after an explicit user action. Handle already-granted, denied, restricted, and can-ask-again states. Provide a useful fallback and settings path when permission is denied; do not trap the user unless the feature truly cannot function without it.

## Completion and verification

Design proportional feedback for meaningful completion, then make the next destination obvious. Test forward/back navigation, restored answers where applicable, invalid route keys, keyboard behavior, compact phones, dynamic type, permission denial, interrupted loading, and final submission failure.

