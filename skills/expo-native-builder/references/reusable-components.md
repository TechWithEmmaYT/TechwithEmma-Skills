# Reusable Expo components

Create components from real repeated needs or to isolate substantial feature behavior. Do not build a speculative component library.

## Place components deliberately

- `src/components/ui`: product-wide primitives such as text, button, input, screen, icon, alert, loading, and empty states.
- `src/components/onboarding`: shared onboarding data/rendering and focused step bodies such as selection, demo, rating, permission, pledge, progress, and plan fragments.
- A route folder: composition used by one screen and unlikely to be reused.

Theme tokens own values; components own repeated structure and behavior. Keep route files readable and testable, but do not extract trivial markup solely to reduce line count.

## Component contracts

Expose only genuine dimensions: semantic variant, approved size, interaction state, typed content/icons, forwarded native props/ref, and a controlled class/style override. Use the project's existing class/style merge helper. Add a variant dependency only when it already exists or repeated complexity justifies an approved installation.

A compact `Screen` primitive may own a full-height semantic root, intentional safe-area edges, background choice, and optional scrolling/keyboard behavior. Do not make it silently own navigation or business state.

Do not wrap platform controls merely for uniformity. Wrap switches, pickers, headers, and sheets only when repeated product behavior or styling requires it.

## Quality checks

Support pressed, focused, selected, disabled, loading, and error states where applicable. Preserve long labels, Dynamic Type, RTL, screen-reader semantics, light/dark themes, 44-point targets, and sufficient contrast. Loading must prevent duplicate actions without hiding meaning; field errors stay beside their inputs.
