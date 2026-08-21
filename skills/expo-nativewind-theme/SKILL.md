---
name: expo-nativewind-theme
description: Set up or repair Expo and React Native styling with NativeWind v4, semantic light and dark themes, and Google fonts. Use when creating an Expo UI foundation, adding theme switching, wiring CSS variables, or loading fonts without flashing unstyled content.
---

# Expo NativeWind Theme

Build a compact, teachable UI foundation with NativeWind v4, semantic colors, light and dark modes, and Google fonts. Preserve the project's current Expo SDK, routing structure, package manager, and working design decisions.

## Inspect before changing files

Read `package.json`, the Expo app config, Metro and Babel configs, the global CSS entry, the root layout, and existing theme files. Check the installed Expo, NativeWind, Tailwind, React Native Reanimated, and font-package versions.

Use the documentation matching the installed versions. Do not upgrade Expo or switch NativeWind major versions unless the user asks.

## Set up NativeWind v4

Follow the current official NativeWind Expo installation steps. Install packages with the project's package manager instead of writing guessed versions into `package.json`.

The v4 setup normally includes:

- `nativewind`, `react-native-reanimated`, and `react-native-safe-area-context`
- Tailwind CSS 3 and the NativeWind preset
- a CSS file containing the three Tailwind directives
- NativeWind's Babel preset and Metro wrapper
- Metro as the Expo web bundler
- a TypeScript declaration file referencing `nativewind/types`
- content globs covering every folder that contains `className` strings

Do not mix NativeWind v4 setup with v5 preview instructions. Read [references/nativewind-theme.md](references/nativewind-theme.md) for the file contract and semantic-theme pattern.

## Create one semantic theme

Keep the raw light and dark palettes in one theme module. Convert the palette to NativeWind variables with `vars()` and expose a small helper for native-only color props such as icons, switches, and activity indicators.

Prefer semantic names such as `background`, `foreground`, `card`, `border`, `primary`, `primary-foreground`, `muted`, and `muted-foreground`. Components should consume semantic utilities such as `bg-background` and `text-foreground`, not repeat hex colors.

Apply the active variable object to a root `View`. Set `userInterfaceStyle` to `automatic` when the app should follow the device. Use `useColorScheme()` for reading and changing the mode, and support `light`, `dark`, and `system` when the product offers a manual selector.

Do not add persistence unless the user requests it. If persistence is requested, restore the preference before rendering themed UI to avoid a visible theme flash.

## Load Google fonts

Install the requested `@expo-google-fonts/<family>` package through Expo's installer. Choose one of the official approaches:

- Prefer the `expo-font` config plugin when a development build is already part of the workflow and fonts should be embedded.
- Use the package's `useFonts` hook for a simple Expo Router setup or Expo Go workflow.

For runtime loading, call `SplashScreen.preventAutoHideAsync()` at module scope, load only the weights the UI uses in the root layout, hide the splash screen when fonts either load or error, and render nothing until then. Map the loaded font names in Tailwind once and use those utilities consistently.

## Integrate the app shell

Keep NativeWind, Expo Router's `ThemeProvider`, the status bar, and native navigation surfaces on the same resolved color scheme. Avoid blanket safe-area wrappers and global hardcoded background colors that fight the theme.

## Verify

1. Run the project's typecheck and lint commands.
2. Start Expo with a cleared cache when configuration changed.
3. Open at least one native target and verify semantic classes, light mode, dark mode, system mode, and font loading.
4. Confirm the initial screen has no white flash, invisible icons, or unthemed navigation background.

Do not report visual verification if only static checks ran.

## Official references

- [NativeWind v4 installation](https://www.nativewind.dev/docs/getting-started/installation)
- [NativeWind themes](https://www.nativewind.dev/docs/guides/themes)
- [NativeWind color scheme](https://www.nativewind.dev/docs/api/use-color-scheme)
- [Expo fonts](https://docs.expo.dev/develop/user-interface/fonts/)
