# Reusable Expo UI components

Build a small design-system surface from real repeated needs. Do not create a large speculative component library before screens establish the patterns.

## What belongs where

- `src/components/ui`: product-wide primitives such as text, button, input, screen, icon, card, alert, loading, empty state, and toaster host.
- Feature folder: domain components such as an onboarding option, workout set row, subscription plan card, or delivery-status timeline.
- Route folder: composition used by only one screen and unlikely to gain a second consumer.

Theme tokens control values; reusable components control structure and behavior.

## Component contract

Define only the dimensions each component genuinely supports:

- **variant**: semantic intent such as primary, secondary, outline, ghost, or destructive;
- **size**: approved component heights, padding, typography, and icon sizes;
- **state**: default, pressed, focused, selected, disabled, loading, and error where relevant;
- **content**: label, children, icons, description, or trailing content with clear types;
- **override**: `className`, `contentClassName`, or `style` for layout adjustments without allowing every caller to replace the component's identity.

Use token-backed NativeWind class maps and the project's `cn` helper. Add a variant library only when it is already installed or repeated complexity justifies an approved dependency.

## Recommended primitives

Create only what the current product uses:

- `AppText`: typography roles and semantic tones while preserving React Native text props.
- `Button`: variants, sizes, loading, disabled, pressed feedback, optional icons, and accessible label.
- `Input`: label, helper/error message, icons/actions, secure-entry behavior, focus/error states, and native input props.
- `Screen`: background, optional scrolling, intentional safe-area edges, keyboard behavior, and consistent gutters.
- `Icon`: typed names mapped to the project's cross-platform icon source.
- `Card` or surface: only when the product has a repeated container language.
- `Alert`, `EmptyState`, and `LoadingIndicator`: meaningful states with concise copy and an optional recovery action.
- `AppToaster`: one themed global Sonner Native host when the foundation uses it.

Do not wrap platform controls such as `Switch`, pickers, navigation headers, or native sheets solely to make everything appear under `components/ui`. Wrap them only when the app needs repeated product-specific behavior or styling.

## Quality checks

- Forward native props and refs when consumers need them.
- Keep touch targets at least 44 points and expose accessibility roles, labels, values, and states.
- Make loading disable duplicate submission without losing the label's meaning.
- Keep validation messages inline and connect them to the field.
- Ensure long labels, dynamic type, RTL, light/dark themes, and disabled/error contrast remain usable.
- Avoid components with many boolean styling flags; prefer a small explicit variant set or feature composition.
- Do not extract a component merely to shorten one screen.
