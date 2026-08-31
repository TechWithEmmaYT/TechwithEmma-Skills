# Native Mobile UI

Use this reference for product direction, spacing, native controls, tabs, pickers, sheets, or choosing Expo UI versus React Native UI.

## Mobile baseline

- Design around one primary user goal and visual entry point.
- Use hierarchy through spacing, typography, contrast, and grouping before decoration.
- Keep frequent actions reachable while respecting system gestures, navigation, safe areas, the keyboard, Dynamic Type, and 44-point touch targets.
- Design the loading, empty, error, success, disabled, and offline states that can occur.
- Use familiar patterns unless the product benefits from a deliberate alternative.

Use a 4-point spacing palette such as `4, 8, 12, 16, 20, 24, 32, 40, 48, 64`. Internal gaps stay smaller than component gaps; component gaps stay smaller than section gaps. Adapt gutters to compact and large phones. Never import landing-page spacing into mobile screens.

## Direction by product

- Finance prioritizes trust, legible numbers, explicit status, and careful destructive actions.
- Health and wellness use clear, non-judgmental progress and recovery language.
- Learning uses visible progress, helpful correction, and proportionate celebration.
- Fitness emphasizes current action, momentum, timers, and readable metrics in motion.
- Productivity favors organized density, scanning, and predictable repeated actions.
- Commerce and delivery prioritize imagery, price/status clarity, trust, and fulfillment.
- Social prioritizes people, identity, privacy, moderation, and creation feedback.
- AI products make complex actions understandable and reserve glow or processing effects for meaningful moments.

These are starting expectations, not branding. Follow the approved emotional direction and references.

## Choose the UI technology per surface

Inspect the Expo SDK, Router version, platforms, navigation, and installed UI packages.

- Use `@expo/ui` when the requested component exists for every required target and native SwiftUI/Compose behavior is desired.
- Use React Native core plus the active styling system for shared branding, behavior, or web support.
- Use Expo Router Native Tabs only when explicitly requested and its current SDK/status fits the project; keep JavaScript tabs when custom behavior is required.
- Use one maintained third-party package only when Expo or React Native lacks the behavior. Verify compatibility and ask before installation.

Prefer native menus for contextual actions and native/platform pickers when they cover the required targets. For bottom sheets, use the existing solution or one maintained system—never competing sheet libraries. Hide necessary platform differences behind a small shared component or platform files while keeping validation and business state outside native views.

Uniwind, NativeWind, and StyleSheet style React Native surfaces; Expo UI components use their documented props and modifiers. Do not assume Tailwind classes or React Native style objects work on SwiftUI or Compose views.

## Avoid

Avoid floating cards for every section, mixed raw colours/radii, colour-only states, decorative gradients or glass, hidden primary actions, generic empty states, delayed interaction, emoji as interface icons, and web-only component advice copied into React Native.

Verify every supported native platform and web when in scope. Consult current Expo UI, Router Native Tabs, safe-area, accessibility, Pressable, and list documentation for the project's exact versions.
