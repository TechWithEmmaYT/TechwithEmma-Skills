---
name: expo-nativewind-build
description: Build, implement, audit, or improve polished Expo and React Native screens and components from an approved design using NativeWind, responsive mobile layouts, accessible interactions, and complete UI states. Use when turning mobile designs into working Expo UI or improving an existing implementation. Do not use to generate design-board prompts.
---

# Expo NativeWind Build

Create mobile interfaces that feel intentional, product-specific, and native to the app. Preserve working navigation, data flow, business logic, dependencies, and established design decisions.

## Get a compact design brief

Inspect existing screens, theme tokens, assets, fonts, components, and supplied references first. Do not ask for information the project already answers. In one compact message, ask only for missing decisions:

- app category, audience, screen goal, and primary action;
- primary, secondary, and optional accent colors;
- neutral/background direction and light, dark, or both modes;
- font preference or permission to recommend one;
- compact, comfortable, or spacious density;
- desired feeling or visual references.

If the user provides only a primary color, propose an accessible supporting palette for confirmation. If a screenshot or established app already defines the direction, summarize what was inferred and ask the user to correct it rather than starting a long interview.

Before changing files, show no more than five short bullets covering the screen/flow, design direction, affected files, components/assets, and verification. Wait for confirmation, then implement only that scope.

## Establish the screen hierarchy

Understand what comes before and after the screen, what the user needs first, and which single action should dominate. Remove unnecessary layers, repeated labels, decorative containers, and hidden interactions. Place frequent primary actions within comfortable reach without covering content or platform navigation.

Use familiar mobile patterns unless the product benefits from a deliberate alternative. Read [references/mobile-design-conventions.md](references/mobile-design-conventions.md) when choosing an industry direction, responsive layout, or spacing system.

## Load guidance only when needed

- When the user wants a platform-native control, native tabs, or guidance choosing between Expo UI, universal React Native UI, and another package, read [references/native-and-universal-ui.md](references/native-and-universal-ui.md).
- For a multi-step first-run experience, read [references/onboarding-flows.md](references/onboarding-flows.md). Share the shell and navigation, not one forced card layout.
- Before creating or expanding `components/ui`, read [references/reusable-components.md](references/reusable-components.md).
- For forms, authentication, chat composers, or screens where the keyboard can cover content or actions, read [references/keyboard-controller.md](references/keyboard-controller.md).
- When the approved design uses Lottie, read [references/lottie.md](references/lottie.md). Do not install or add animation merely because onboarding is present.

## Use the existing design system

Consume semantic tokens such as `background`, `foreground`, `card`, `border`, `primary`, `secondary`, `accent`, `muted`, `destructive`, `success`, and `warning`. Do not add raw hex colors or unrelated fonts inside screens when tokens exist.

Use a consistent 4-point spacing rhythm. Related elements sit closer than unrelated groups; section gaps should be visibly larger than internal gaps. Prefer existing NativeWind utilities and shared screen gutters over arbitrary values. Keep typography roles, control heights, border radii, icon sizes, and elevation consistent.

Use semantic utilities throughout the screen: `bg-background` for the screen, `bg-card` for raised surfaces, `text-foreground` for primary copy, `text-muted-foreground` for supporting copy, and token-backed border and action colors. Do not fall back to `text-black`, `text-white`, `bg-white`, `bg-gray-*`, or raw colors unless the design intentionally needs fixed contrast over media or another non-themed surface.

If NativeWind, theme tokens, fonts, or toast infrastructure are missing or broken, report the gap and offer the `expo-nativewind-theme` foundation as a separate approved change. Do not silently turn a screen-design request into project-wide configuration work.

## Enforce a complete screen shell

Every route screen must have a full-height semantic root. Use either the project's reusable `Screen` component or `SafeAreaView` from `react-native-safe-area-context`, and ensure the root applies `flex-1 bg-background`. Do not rely on content height or a third-party component's `className` to fill the viewport.

Choose safe-area edges intentionally:

- include `top` when no native header already protects the content;
- include `bottom` when no tab bar, sheet, or navigator already manages it;
- avoid applying the same inset in both the navigator and screen;
- for full-bleed images, maps, video, or gradients, keep the background in a `flex-1` outer view and place interactive content inside a safe-area layer.

Use `react-native-safe-area-context`, not React Native's deprecated `SafeAreaView`. When multiple screens share this behavior, read [references/reusable-components.md](references/reusable-components.md) and create one small `Screen` primitive instead of repeating wrappers.

## Implement for React Native

- Reuse project components before creating new ones; extract a component only when it has a real second use, establishes a design-system contract, or isolates meaningful complexity.
- Use `Pressable` states and disabled/loading behavior intentionally.
- Choose `ScrollView`, `FlatList`, or `SectionList` according to content size and virtualization needs.
- Verify that every screen root fills the viewport, uses the semantic background, and protects content that touches system edges.
- On keyboard-heavy screens, use the project's existing solution or `react-native-keyboard-controller`; keep the focused input and submission action reachable and avoid layering another keyboard library on top.
- Respect platform navigation, back behavior, status bars, bottom tabs, sheets, and modals.
- Use the project's icon system. Do not substitute emoji or text glyphs for interface icons unless the product direction calls for them.
- Add motion or haptics only when they communicate state, orientation, or completion; do not make them a default decoration.

## Design every relevant state

Implement the states the screen can actually reach: initial/loading, populated, empty, error, disabled, selected/pressed, offline, and success where applicable. Keep form validation next to the field. Use the existing global toaster for asynchronous outcomes that are not tied to one field; avoid duplicate inline and toast messages.

For forms that need validation, use React Hook Form with Zod and `@hookform/resolvers/zod`. Keep the Zod schema as the validation source, show field errors beside their controls, preserve entered values after recoverable failures, and disable duplicate submissions while pending. Install missing packages with the project's package manager instead of guessing versions.

Make destructive actions visually distinct and require confirmation when recovery is difficult. Preserve user input after recoverable errors.

## Accessibility and responsive checks

- Keep interactive targets at least 44 by 44 points.
- Verify text/background and state contrast in every supported theme.
- Support font scaling without clipping important text or controls.
- Provide accessibility labels for icon-only actions and meaningful roles/states.
- Do not rely on color alone for status.
- Check compact and larger phone widths, long content, long names, keyboard-open layouts, and both orientations only when the app supports them.

## Verify visually and functionally

Use a bounded loop: implement, run or capture the screen, compare it with the approved design and tokens, fix relevant mismatches, then verify again. Stop when the requested UI and relevant checks pass, or report the blocker. Do not expand scope.

Run the project's typecheck and lint, then start Expo and inspect at least one native target. Exercise navigation, gestures, keyboard behavior, safe areas, loading/empty/error/success states, theme modes, and touch targets relevant to the change. If visual inspection is unavailable, say so instead of claiming a visual match.

Report completed screens, reused/created components, design tokens followed, commands run, native targets visually checked, and remaining states or platform checks. Keep the handoff concise.
