---
name: expo-native-builder
description: Design, build, audit, or improve polished Expo and React Native screens using the project's existing Uniwind, NativeWind, or StyleSheet system, native navigation patterns, purposeful motion, restrained gradients, accessible interactions, and complete UI states. Use for direct screen or flow implementation with or without a separate design handoff. Do not use to generate design-board prompts.
---

# Expo Native Builder

Create mobile interfaces that feel intentional, product-specific, and native to the app. Preserve working navigation, data flow, business logic, dependencies, and established design decisions.

## Get a compact design brief

Inspect existing screens, tokens, assets, fonts, components, and references first. In one compact message, ask only for missing decisions:

- app category, audience, screen goal, and primary action;
- primary, secondary, and optional accent colors;
- neutral/background direction and light, dark, or both modes;
- typography, density, feeling, or visual references;
- for onboarding or paywalls, the intended destination and whether monetization, trial, plans, or a dismissible paywall is in scope.

If a screenshot or established app defines the direction, summarize what was inferred and ask for corrections rather than starting a long interview. If only a primary colour is supplied, propose an accessible supporting palette.

Before changing files, show no more than five short bullets covering the screen/flow, design direction, affected files, components/assets, and verification. Wait for confirmation, then implement only that scope.

## Work standalone

Never require or invoke another skill automatically. Recommend `mobile-ui-design` only for design exploration, UI boards, or a portable handoff—not because a direct build lacks mockups. Handle motion, gradients, onboarding, and paywall UI here.

## Detect the styling system

Inspect `package.json`, Metro/Babel config, `global.css`, generated types, root imports, and existing components.

- Use **Uniwind** when the active project uses `uniwind`, `withUniwindConfig`, and `@import "uniwind"`.
- Use **NativeWind** when the active project uses `nativewind`, its Metro/Babel setup, or NativeWind theme variables.
- Use **StyleSheet** when screens use `StyleSheet.create`, theme objects, or inline React Native styles without an active Tailwind binding.
- If packages overlap, follow the configuration used by the running app or ask one concise question.

Never introduce Tailwind into a StyleSheet project, mix styling providers, or migrate systems unless requested. Use installed versions and the existing package manager.

## Establish the hierarchy

Understand the screen's place in the flow and let one action dominate. Remove unnecessary layers, repeated labels, decorative containers, and hidden interactions. Keep frequent actions reachable without covering content or platform navigation.

## Load guidance only when needed

- For mobile direction, spacing, native controls, tabs, pickers, sheets, or choosing Expo UI versus React Native UI, read [references/native-ui.md](references/native-ui.md).
- For a multi-step first-run experience, read [references/onboarding-flows.md](references/onboarding-flows.md). Share the shell and navigation, not one forced card layout.
- For a subscription, trial, upgrade, or paywall surface, read [references/paywall-ui.md](references/paywall-ui.md).
- Before creating or expanding `components/ui`, read [references/reusable-components.md](references/reusable-components.md).
- For forms, authentication, chat composers, or screens where the keyboard can cover content or actions, read [references/keyboard-controller.md](references/keyboard-controller.md).
- For transitions, gestures, scroll effects, animated data, or other motion, read [references/motion-native.md](references/motion-native.md).
- For full-screen, flow-wide, animated, or image-overlay gradients, read [references/gradient-background.md](references/gradient-background.md).

## Use the existing design system

Use existing semantic tokens, typography roles, controls, icons, radii, and elevation. Follow a consistent 4-point spacing rhythm: related elements sit closer than separate sections. Use semantic utilities with Uniwind/NativeWind and the existing theme object with StyleSheet; do not scatter raw colours or create a competing system.

If the styling foundation, theme tokens, fonts, or toast infrastructure are missing or broken, report the gap. Offer `expo-uniwind-theme` for Uniwind or `expo-nativewind-theme` for NativeWind as a separate approved change. Do not silently turn a screen request into project-wide configuration work.

Use supported platform modifiers for visual differences and platform files or conditional rendering when APIs or behavior differ.

## Enforce a complete screen shell

Every route needs a full-height semantic root using the project's `Screen` or `react-native-safe-area-context`, never React Native's deprecated `SafeAreaView`. Apply only edges not already owned by a header, tab bar, sheet, or navigator. Keep full-bleed media/gradients outside and interactive content inside the safe-area layer.

## Implement for React Native

- Reuse project components before creating new ones; extract a component only when it has a real second use, establishes a design-system contract, or isolates meaningful complexity.
- Use `Pressable` states and disabled/loading behavior intentionally.
- Choose `ScrollView`, `FlatList`, or `SectionList` according to content size and virtualization needs.
- Keep focused inputs and submission actions reachable without layering keyboard libraries.
- Respect platform navigation, back behavior, status bars, bottom tabs, sheets, and modals.
- Use the project's icon system. Do not substitute emoji or text glyphs for interface icons unless the product direction calls for them.
- Add motion or haptics only for state, orientation, feedback, or completion.

## Apply native-quality polish

Extract hierarchy and behavior from supplied references without copying branding. Prefer native controls and navigator-owned UI when they fit. Choose push, replace, sheet, or modal from what Back should do; completed one-way flows must not remain reachable. Keep one accent family, one neutral family, and one radius scale.

## Design every relevant state

Implement reachable loading, populated, empty, error, disabled, selected/pressed, offline, and success states. Keep field errors inline and use the existing toaster only for asynchronous outcomes not tied to one field.

When backend data, formulas, catalog values, or content are not ready, still build a complete populated UI with realistic representative data and working local states. Include the charts, progress, ratings, testimonials, statistics, messages, prices, countdowns, processing, recommendations, and results needed to show the intended product. Keep these values in one fixture, constants file, or replaceable adapter; never show `sample`, `mock`, `placeholder`, or implementation warnings inside the UI.

For forms that need validation, use React Hook Form with Zod and `@hookform/resolvers/zod`. Keep the Zod schema as the validation source, show field errors beside their controls, preserve entered values after recoverable failures, and disable duplicate submissions while pending. Install missing packages with the project's package manager instead of guessing versions.

Make destructive actions visually distinct and require confirmation when recovery is difficult. Preserve user input after recoverable errors.

## Accessibility and responsive checks

- Keep interactive targets at least 44 by 44 points.
- Verify text/background and state contrast in every supported theme.
- Support font scaling without clipping important text or controls.
- Provide accessibility labels for icon-only actions and meaningful roles/states.
- Do not rely on color alone for status.
- Check compact and large phones, long content/names, keyboard-open layouts, and supported orientations.

## Verify visually and functionally

Use a bounded loop: implement, run or capture the screen, compare it with the approved design and tokens, fix relevant mismatches, then verify again. Stop when the requested UI and relevant checks pass, or report the blocker. Do not expand scope.

Run the project's typecheck and lint, then start Expo and inspect at least one native target. Exercise navigation, gestures, keyboard behavior, safe areas, loading/empty/error/success states, theme modes, and touch targets relevant to the change. When motion changed, record the complete affected flow and inspect it at normal speed and frame by frame for flashes, jumps, clipped springs, and keyboard discontinuities. If visual inspection is unavailable, say so instead of claiming a visual match.

Report completed screens, reused/created components, design tokens followed, commands run, native targets visually checked, and remaining states or platform checks. If representative data was used, explicitly list in the final chat response what must later connect to real APIs, formulas, catalog/pricing, eligibility, verified claims, analytics, or backend state. Keep the handoff concise.
