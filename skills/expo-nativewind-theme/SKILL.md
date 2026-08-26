---
name: expo-nativewind-theme
description: Set up or repair an Expo NativeWind v4 design foundation with semantic light and dark colors, spacing and shape tokens, Google fonts, and Sonner Native feedback. Use when configuring NativeWind, creating app-wide design tokens, adding theme switching, wiring CSS variables, loading fonts, or installing a global Expo toaster.
---

# Expo NativeWind Theme

Build a compact, modern UI foundation with NativeWind v4, semantic colors, consistent layout tokens, light and dark modes, Google fonts, and global toast feedback. Preserve the project's current Expo SDK, routing structure, package manager, and working design decisions.

## Confirm the foundation first

Inspect existing tokens and branding before asking questions. In one compact message, ask only for missing decisions:

- primary, secondary, and optional accent colors;
- preferred neutral/background direction;
- light, dark, or both modes;
- font family or permission to recommend one;
- compact, comfortable, or spacious density;
- whether to include Sonner Native when no feedback system exists.

Propose accessible semantic status colors such as destructive, success, and warning rather than making the user choose every value.

Before writing files or installing packages, show no more than five short bullets covering tokens, packages, affected files, toaster placement, and verification. Wait for confirmation and change only that scope.

## Inspect before changing files

Read `package.json`, the Expo app config, Metro and Babel configs, the global CSS entry, the root layout, and existing theme files. Check the installed Expo, NativeWind, Tailwind, React Native Reanimated, and font-package versions.

Use the documentation matching the installed versions. Do not upgrade Expo or switch NativeWind major versions unless the user asks.

## Set up NativeWind v4

Follow the current official NativeWind Expo installation steps. Install packages with the project's package manager instead of writing guessed versions into `package.json`.

The v4 setup normally includes:

- `nativewind`, `react-native-reanimated`, and `react-native-safe-area-context`
- Tailwind CSS 3 and the NativeWind preset
- a CSS file containing the three Tailwind directives, imported once by the root layout
- NativeWind's Babel preset and Metro wrapper
- Metro as the Expo web bundler
- a TypeScript declaration file referencing `nativewind/types`
- content globs covering every folder that contains `className` strings

Do not mix NativeWind v4 setup with v5 preview instructions. Read [references/nativewind-theme.md](references/nativewind-theme.md) for the file contract and semantic-theme pattern.

## Create one semantic token system

Keep the raw light and dark palettes in one theme module. Convert the palette to NativeWind variables with `vars()` and expose a small helper for native-only color props such as icons, switches, and activity indicators.

Prefer semantic color names such as `background`, `foreground`, `card`, `card-foreground`, `border`, `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `accent`, `accent-foreground`, `muted`, `muted-foreground`, `destructive`, `success`, and `warning`. Components should consume semantic utilities such as `bg-background` and `text-foreground`, not repeat hex colors.

Define a restrained 4-point spacing scale and reuse it through NativeWind utilities. Include only values the product uses, typically `0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64`. Establish intentional screen gutters, section gaps, control heights, border radii, and typography/line-height roles. Avoid arbitrary values such as `mt-[13px]` unless matching a supplied design requires them.

Apply the active variable object to a root `View`. Set `userInterfaceStyle` to `automatic` when the app should follow the device. Import `useColorScheme` from `nativewind`, never from `react-native`, and use it for reading and changing the mode. Support `light`, `dark`, and `system` when the product offers a manual selector.

```ts
import { useColorScheme } from "nativewind";
```

The themed root view must be full height and provide a native fallback background in addition to NativeWind classes: use `className="flex-1 bg-background"` together with `style={[themes[resolvedScheme], { flex: 1, backgroundColor: colors[resolvedScheme].background }]}`. This prevents a collapsed or white root if styles load late and ensures descendants receive the active variables.

NativeWind variables do not theme React Navigation by themselves. In an Expo Router app, create matching light and dark navigation themes and wrap the root navigator with React Navigation's `ThemeProvider`. Build those themes from the existing palette exported by `app-theme.ts`; do not create a second navigation palette. Map React Navigation's `background`, `card`, `text`, `border`, `primary`, and `notification` roles to the corresponding semantic app colors. Read the navigation-theme bridge in [references/nativewind-theme.md](references/nativewind-theme.md) and resolve a missing or system scheme before indexing the theme objects.

Import the navigation theme APIs from Expo Router so the app uses its compatible navigation exports:

```ts
import { DarkTheme, DefaultTheme, Stack, ThemeProvider, type Theme } from "expo-router";
```

Do not add persistence unless the user requests it. If persistence is requested, restore the preference before rendering themed UI to avoid a visible theme flash.

## Load Google fonts

Install the requested `@expo-google-fonts/<family>` package through Expo's installer. Choose one of the official approaches:

- Prefer the `expo-font` config plugin when a development build is already part of the workflow and fonts should be embedded.
- Use the package's `useFonts` hook for a simple Expo Router setup or Expo Go workflow.

For runtime loading, call `SplashScreen.preventAutoHideAsync()` at module scope, load only the weights the UI uses in the root layout, hide the splash screen when fonts either load or error, and render nothing until then. Map the loaded font names in Tailwind once and use those utilities consistently.

For Plus Jakarta Sans, import the hook and available app weights from its family package:

```ts
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/plus-jakarta-sans";
```

## Add global toast feedback

When approved and the project has no existing toast system, install the current compatible package through Expo:

```bash
npx expo install sonner-native
```

Check Sonner Native's current peer requirements against the installed Expo SDK rather than blindly reinstalling or upgrading them. Place one `Toaster` in the root layout after the navigator and inside the existing gesture-handler root. Match toast foreground, background, border, icons, and variants to the semantic theme.

Use toasts for global asynchronous outcomes and actions. Keep field validation beside the field, avoid duplicate toast and inline messages, avoid exposing raw server errors, and do not toast routine navigation. For Expo Web support, follow Sonner Native's current platform-file adapter guidance instead of forcing the native package onto web.

## Integrate the app shell

Keep NativeWind, Expo Router's React Navigation `ThemeProvider`, the status bar, and native navigation surfaces on the same resolved color scheme. Avoid blanket safe-area wrappers and global hardcoded background colors that fight the theme.

## Verify

1. Run the project's typecheck and lint commands.
2. Start Expo with a cleared cache when configuration changed.
3. Open at least one native target and verify semantic classes, spacing, light mode, dark mode, system mode, and font loading.
4. Trigger approved toast variants and verify safe-area placement, dismissal, and readable contrast.
5. Confirm the initial screen has no white flash, invisible icons, or unthemed navigation background.

Do not report visual verification if only static checks ran.

## Official references

- [NativeWind v4 installation](https://www.nativewind.dev/docs/getting-started/installation)
- [NativeWind themes](https://www.nativewind.dev/docs/guides/themes)
- [NativeWind color scheme](https://www.nativewind.dev/docs/api/use-color-scheme)
- [Expo fonts](https://docs.expo.dev/develop/user-interface/fonts/)
- [Sonner Native](https://www.npmjs.com/package/sonner-native)
