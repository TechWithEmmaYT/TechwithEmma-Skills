---
name: expo-native-builder
description: Build, implement, audit, or improve polished Expo and React Native screens using the project's existing Uniwind, NativeWind, or StyleSheet system, native navigation patterns, purposeful motion, restrained gradients, accessible interactions, and complete UI states. Use when turning an approved mobile design into working UI or improving an existing implementation. Do not use to generate design-board prompts.
---

# Expo Native Builder

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

## Recommend companion skills only when useful

This skill must remain usable on its own. Never require, install, or invoke another skill automatically.

- When the user wants a new product or flow designed but provides no approved design, screenshots, or reproducible visual direction, briefly recommend `mobile-ui-design` first. Offer to continue directly from the current brief if the user prefers.
- When an approved design, `mobile-design.md`, screenshots, or an established interface already defines the direction, continue without recommending a design skill.
- Handle ordinary transitions, press feedback, gradients, haptics, and onboarding motion here. Recommend `react-native-motion` only for complex gestures, shaders, coordinated animation systems, or a dedicated app-wide motion identity.
- If a companion skill is unavailable, continue with the guidance in this skill and state any resulting limitation. Do not block the task.

## Detect the styling system

Before writing UI, inspect `package.json`, Metro and Babel configs, `global.css`, generated type declarations, root layout imports, and existing components.

- Use **Uniwind** when the active project uses `uniwind`, `withUniwindConfig`, and `@import "uniwind"`.
- Use **NativeWind** when the active project uses `nativewind`, its Metro/Babel setup, or NativeWind theme variables.
- Use **StyleSheet** when screens use `StyleSheet.create`, theme objects, or inline React Native styles without an active Tailwind binding.
- If both packages exist, follow the configuration and imports used by the running app. If that remains ambiguous, ask one concise question.

Follow the established system and component patterns. Never introduce Tailwind into a StyleSheet project, convert styles, or mix providers, hooks, Metro wrappers, CSS syntax, or generated types unless migration was explicitly requested. Use the existing package manager and installed versions.

## Establish the screen hierarchy

Understand what comes before and after the screen, what the user needs first, and which single action should dominate. Remove unnecessary layers, repeated labels, decorative containers, and hidden interactions. Place frequent primary actions within comfortable reach without covering content or platform navigation.

Use familiar mobile patterns unless the product benefits from a deliberate alternative. Read [references/mobile-design-conventions.md](references/mobile-design-conventions.md) when choosing an industry direction, responsive layout, or spacing system.

## Load guidance only when needed

- When the user wants a platform-native control, native tabs, or guidance choosing between Expo UI, universal React Native UI, and another package, read [references/native-and-universal-ui.md](references/native-and-universal-ui.md).
- For a multi-step first-run experience, read [references/onboarding-flows.md](references/onboarding-flows.md). Share the shell and navigation, not one forced card layout.
- Before creating or expanding `components/ui`, read [references/reusable-components.md](references/reusable-components.md).
- For forms, authentication, chat composers, or screens where the keyboard can cover content or actions, read [references/keyboard-controller.md](references/keyboard-controller.md).
- When implementing transitions, gesture feedback, animated gradients, or other visual polish, read [references/motion-and-gradients.md](references/motion-and-gradients.md).
- When motion needs Lottie or another existing library or difficult reusable primitive, read [references/motion-packages.md](references/motion-packages.md). Treat it as a candidate catalogue, verify compatibility, and ask before adding a dependency. Do not add animation merely because onboarding is present.

## Use the existing design system

Consume semantic tokens such as `background`, `foreground`, `card`, `border`, `primary`, `secondary`, `accent`, `muted`, `destructive`, `success`, and `warning`. Do not add raw hex colors or unrelated fonts inside screens when tokens exist.

Use a consistent 4-point spacing rhythm. Related elements sit closer than unrelated groups; section gaps should be visibly larger than internal gaps. Prefer tokens and primitives supported by the detected styling system over arbitrary values. Keep typography roles, control heights, border radii, icon sizes, and elevation consistent.

With Uniwind or NativeWind, use semantic utilities such as `bg-background`, `bg-card`, `text-foreground`, and `text-muted-foreground`. With StyleSheet, consume the equivalent semantic theme object through the project's existing hook or module. Do not scatter raw colors or create a competing theme system.

If the styling foundation, theme tokens, fonts, or toast infrastructure are missing or broken, report the gap. Offer `expo-uniwind-theme` for Uniwind or `expo-nativewind-theme` for NativeWind as a separate approved change. Do not silently turn a screen request into project-wide configuration work.

For platform-only visual differences in Uniwind or NativeWind, prefer supported `ios:`, `android:`, `web:`, or `native:` modifiers in complete class strings. In a StyleSheet project, follow its existing `Platform.select()` or platform-file convention. Use platform files or conditional rendering when behavior, APIs, props, or component implementations differ.

## Enforce a complete screen shell

Every route screen must have a full-height semantic root. Use either the project's reusable `Screen` component or `SafeAreaView` from `react-native-safe-area-context`, and apply the equivalent of `flex: 1` plus the semantic background through the active styling system. Do not rely on content height or a third-party component to fill the viewport.

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

## Apply native-quality polish

Study supplied references or representative shipping apps for hierarchy, navigation grammar, control choice, spacing, and motion behavior; extract patterns rather than copying pixels or branding.

Prefer native controls and navigator-owned headers, searches, sheets, and transitions when they meet the product need. Decide whether destinations push, replace, present as a sheet, or present as a modal based on what back should do. Finished onboarding, authentication walls, completed purchases, and other one-way doors must not remain reachable through back navigation.

Use one accent family, one neutral family, and one intentional radius scale. Gradients need a product or hierarchy reason and must not become the default background for every card or action. Read [references/motion-and-gradients.md](references/motion-and-gradients.md) before adding custom motion or gradient treatments.

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

Run the project's typecheck and lint, then start Expo and inspect at least one native target. Exercise navigation, gestures, keyboard behavior, safe areas, loading/empty/error/success states, theme modes, and touch targets relevant to the change. When motion changed, record the complete affected flow and inspect it at normal speed and frame by frame for flashes, jumps, clipped springs, and keyboard discontinuities. If visual inspection is unavailable, say so instead of claiming a visual match.

Report completed screens, reused/created components, design tokens followed, commands run, native targets visually checked, and remaining states or platform checks. Keep the handoff concise.
