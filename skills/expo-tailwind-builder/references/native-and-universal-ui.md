# Native and Universal UI Choices

Use this reference only when the user requests a native-looking surface, Expo Router Native Tabs, or help selecting a date picker, menu, bottom sheet, profile/settings pattern, or alternative package.

## Choose per surface

First inspect the Expo SDK, Expo Router version, supported platforms, existing navigation, and installed UI packages. Ask which platforms must share the feature when that is not already clear. Do not convert the whole app to one UI technology because one control should feel native.

- Use `@expo/ui` when the requested component exists for every required target and the user wants SwiftUI, Jetpack Compose, or its universal API.
- Use React Native core components plus the project's active Uniwind or NativeWind setup when consistent branding, shared behavior, web support, or one cross-platform implementation matters most.
- Use Expo Router Native Tabs only when the user explicitly wants a system tab bar and accepts its current alpha status and SDK requirements. Keep JavaScript or custom tabs when the design needs behavior the system tab bar cannot provide.
- Use an established third-party package only when Expo or React Native does not provide the required behavior. Check current Expo compatibility and maintenance first, explain the choice, and install only after approval.

## Common surfaces

- **Profile and settings:** Prefer a universal screen shell, semantic list rows, switches, and shared state. Add native menus, pickers, or navigation affordances only where they improve platform familiarity.
- **Date and time:** Use the Expo UI or platform-native picker when it supports the targets. Otherwise use the Expo-documented community picker. Keep the stored value independent of the rendered picker.
- **Dropdowns and menus:** Use a native menu for contextual actions. Use an accessible universal select, popover, or picker for a cross-platform form field.
- **Bottom sheets:** Use Expo UI when its implementation and platform coverage fit. Otherwise choose one maintained React Native sheet library; do not install competing sheet systems.
- **Tabs:** Native Tabs suit conventional platform navigation. JavaScript or custom tabs suit branded layouts, special center actions, and interaction patterns outside the native tab API.

## Keep one app contract

Hide platform differences behind a small shared component or platform files such as `Control.ios.tsx`, `Control.android.tsx`, and `Control.web.tsx`. Keep validation, business state, analytics, and data transformations outside the native view implementation.

Uniwind and NativeWind style React Native surfaces. Expo UI components use their documented props and modifiers, so do not assume Tailwind classes work on SwiftUI or Jetpack Compose views. Map the app's semantic colors, spacing, and typography through each API it supports.

Do not replace navigation, install packages, or introduce platform-specific files without briefly telling the user what will change. Verify the interaction on every supported native platform and on web when web is in scope.

## Current official references

- [Expo UI](https://docs.expo.dev/versions/latest/sdk/ui/)
- [Expo Router Native Tabs](https://docs.expo.dev/router/advanced/native-tabs/)
- [Expo third-party library reference](https://docs.expo.dev/versions/latest/)
