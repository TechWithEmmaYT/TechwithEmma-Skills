# Expo mobile design conventions

Use this reference for product direction and implementation decisions, not as a rigid visual recipe. A finance app, learning app, and fitness app should not receive the same surface treatment.

## Core mobile baseline

- Design around the screen's primary user goal and one clear visual entry point.
- Use familiar navigation and input patterns to reduce learning cost.
- Keep frequent actions reachable while respecting system gestures and navigation.
- Use hierarchy through spacing, typography, contrast, and grouping before adding decoration.
- Design loading, empty, error, success, disabled, and offline states that can occur.
- Treat accessibility, dynamic type, safe areas, keyboard behavior, and touch targets as part of the design.

## Spacing and density

Use a 4-point rhythm such as `4, 8, 12, 16, 20, 24, 32, 40, 48, 64`. Values are a palette, not a requirement to use all of them.

- Internal icon/label gaps are usually smaller than gaps between components.
- Card padding is smaller than the gap separating major sections.
- Compact density favors smaller approved gaps without shrinking touch targets.
- Comfortable density is the default for general consumer apps.
- Spacious density works for calm, editorial, wellness, or premium directions when content volume allows it.
- Screen gutters should adapt to compact and large phones rather than grow without bound.

Avoid importing desktop/web measurements such as large landing-page section padding into mobile screens.

## Direction by product category

- **AI and technology**: make complex actions feel understandable; reserve gradients, glow, and animated processing cues for meaningful moments.
- **Finance**: prioritize trust, legible numbers, conservative hierarchy, explicit status, and careful destructive confirmation.
- **Health and wellness**: reduce anxiety with clear language, approachable progress, and non-judgmental error/recovery states.
- **Learning**: use visible progress, encouraging correction, and proportionate celebration without sacrificing clarity.
- **Fitness**: emphasize momentum, current action, progress, timers, and readable metrics during movement.
- **Productivity**: favor organized density, fast scanning, predictable placement, and efficient repeated actions.
- **Commerce and delivery**: prioritize imagery, price/status clarity, trust signals, fulfillment state, and frictionless primary actions.
- **Social**: prioritize people, identity, content, privacy controls, moderation/reporting, and clear creation feedback.

These are starting expectations, not branding. Confirm the desired emotional direction and use supplied references to create a distinct visual system.

## Anti-patterns

- Repeating raw colors, spacing, or radii throughout screens.
- Making every section a floating card.
- Using gradients, glass effects, glow, or oversized rounding without a product reason.
- Hiding primary actions behind extra taps or decorative banners.
- Using color alone for error, selection, or success.
- Filling empty states with generic copy that does not explain the next action.
- Adding animations that delay interaction or obscure state.
- Copying web-only libraries or CSS interaction advice into React Native.

## Sources to consult

- [React Native accessibility](https://reactnative.dev/docs/accessibility)
- [React Native Pressable](https://reactnative.dev/docs/pressable)
- [React Native FlatList](https://reactnative.dev/docs/flatlist)
- [Expo safe areas](https://docs.expo.dev/develop/user-interface/safe-areas/)
- [Mobile App UI/UX Design Skill](https://github.com/ceorkm/mobile-app-ui-design/blob/main/SKILL.md), used as inspiration and adapted for native implementation
- [Industry Conventions reference](https://github.com/ceorkm/mobile-app-ui-design/blob/main/references/industry-conventions.md), used as directional context rather than copied rules

