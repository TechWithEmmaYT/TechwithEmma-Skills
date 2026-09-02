# Native Expo UI and keyboard behavior

Use this reference for mobile hierarchy, safe areas, native controls, tabs, sheets, pickers, forms, and keyboard behavior.

## Mobile baseline

- Design around one primary goal and visual entry point.
- Create hierarchy with typography, spacing, contrast, and grouping before decoration.
- Follow the existing semantic tokens and a consistent 4-point spacing rhythm.
- Keep actions reachable while respecting system gestures, navigation, safe areas, Dynamic Type, and 44-point targets.
- Design relevant loading, populated, empty, error, success, disabled, and offline states.
- Avoid decorative gradients/glass, floating cards for every section, emoji icons, raw color mixtures, and web patterns copied into native UI.

## Choose native technology per surface

Inspect the Expo SDK, Router version, supported platforms, existing navigation, and installed UI packages.

- Use React Native core plus the active styling system for shared branded surfaces and web support.
- Use `@expo/ui` only when the control supports every required target and native SwiftUI/Compose behavior is intended.
- Use Expo Router Native Tabs only when requested and compatible; keep JavaScript tabs when custom behavior is required.
- Prefer system menus and pickers when they fit. Use the existing bottom-sheet solution rather than adding a competing library.
- Hide necessary platform differences behind a small component or platform files while keeping business state outside native views.

Uniwind, NativeWind, and StyleSheet style React Native views; do not assume their APIs style native SwiftUI or Compose components.

## Choose navigation by meaning

- Use `router.push` when Back should return to the current screen.
- Use `router.replace`, `dismissTo`, or the existing completion boundary after onboarding, authentication, purchase, or another one-way flow so Back cannot reopen finished state.
- Use a modal for a self-contained task, a sheet for a short interruption, and an overlay only when the underlying screen must remain visible.
- Keep full-attention flows above tabs; tabs are peers and should not slide between each other.
- Back undoes navigation or dismisses transient UI; it must not undo an already completed real-world event.

Preserve the project's working navigation and deep-link structure. Do not refactor routes merely to enforce this vocabulary.

## Safe areas and scrolling

Use a full-height semantic root and `react-native-safe-area-context`, never React Native's deprecated `SafeAreaView`. Apply only the edges not owned by a header, tab bar, sheet, or navigator. Put full-bleed background/media outside the safe-area content layer.

Use `ScrollView` for bounded content, `FlatList`/`SectionList` for growing collections, and avoid same-direction nested scroll views. Pad content above pinned actions and the home indicator.

## Keyboard handling

First reuse the project's keyboard solution and ordinary React Native behavior. Do not install a keyboard library for every form.

For simple forms, use an appropriate scroll container, `keyboardShouldPersistTaps="handled"`, correct return-key behavior, and enough bottom space to keep focused fields and validation visible. Keep safe-area and keyboard responsibilities separate.

When inputs, validation, or a composer must track the keyboard interactively and the project already uses `react-native-keyboard-controller`, wrap the app once with `KeyboardProvider`. Use `KeyboardAwareScrollView` for obscured fields, `KeyboardStickyView` only for an intentionally attached action/composer, and `KeyboardToolbar` only when previous/next/dismiss controls are needed.

If the library is genuinely required but missing, check Expo compatibility and ask before running `npx expo install react-native-keyboard-controller`. Verify whether Expo Go supports the native module or a development build is required. Test first/last inputs, validation while focused, dismissal, sticky actions, and iOS/Android.

## Verify

Check compact and large phones, long/localized content, RTL when supported, light/dark themes, keyboard-open layouts, screen readers, Dynamic Type, gesture areas, native Back behavior, and every supported platform.
