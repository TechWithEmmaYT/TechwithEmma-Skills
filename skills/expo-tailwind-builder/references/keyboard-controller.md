# Expo keyboard controller

Use this reference only for screens with inputs that the keyboard can cover.

## Setup

Inspect the installed Expo SDK and existing keyboard solution first. Do not add a second keyboard manager. When the project needs this library, install its Expo-compatible version instead of guessing a version:

```bash
npx expo install react-native-keyboard-controller
```

Keep the project's required Reanimated setup. Confirm whether the installed Expo SDK includes the native module in Expo Go; otherwise use a development build.

Wrap the app once near the root:

```tsx
import { KeyboardProvider } from "react-native-keyboard-controller";

<KeyboardProvider>{/* navigation and app content */}</KeyboardProvider>;
```

Do not add a provider per screen. If launch-time keyboard preloading causes a visible flicker, use `preload={false}` only after reproducing the problem.

## Form screens

Use `KeyboardAwareScrollView` when focused inputs or validation changes can move below the keyboard:

```tsx
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

<KeyboardAwareScrollView
  bottomOffset={24}
  contentContainerStyle={{ flexGrow: 1 }}
  keyboardShouldPersistTaps="handled"
>
  {/* Form content */}
</KeyboardAwareScrollView>;
```

Choose `bottomOffset` from the real sticky action, toolbar, or spacing requirement. Use `KeyboardToolbar` only when the product needs previous/next/dismiss controls. Use `KeyboardStickyView` for an intentionally keyboard-attached composer or action; do not make every submit button sticky.

Keep safe-area and keyboard responsibilities separate: the screen shell handles system edges, while the keyboard-aware content keeps focused controls visible. Test the first and last input, validation appearing while focused, keyboard dismissal, return-key behavior, sticky actions, and both iOS and Android.

## Official references

- [Expo keyboard handling](https://docs.expo.dev/guides/keyboard-handling/)
- [Expo Keyboard Controller](https://docs.expo.dev/versions/latest/sdk/keyboard-controller/)
- [Keyboard Controller documentation](https://kirillzyusko.github.io/react-native-keyboard-controller/)
