---
name: expo-uniwind-theme
description: Set up or repair an Expo Uniwind theme foundation using Tailwind CSS v4, semantic light and dark tokens, system theme switching, Expo Router navigation colors, spacing, radii, fonts, and global toast feedback. Use when adding Uniwind to Expo or replacing manual NativeWind theme boilerplate with Uniwind.
---

# Expo Uniwind Theme

Create a small CSS-first theme foundation for Expo. Preserve the installed Expo version, Expo Router structure, package manager, branding, and existing UI decisions.

## Confirm the theme

Inspect the project first. Ask only for missing decisions: primary and secondary colors, neutral/background direction, light/dark support, font, and compact/comfortable/spacious density. Recommend accessible semantic status colors instead of asking for every value. When the project has no feedback system, include Sonner Native by default; preserve an existing toast system and skip Sonner only when the user asks.

Before changing files, tell the user in no more than five bullets what will change. Wait for approval unless implementation was already explicitly requested.

## Inspect before setup

Read `package.json`, Expo config, Metro config, root layout, global CSS, and existing theme files. Also check for gesture-handler, safe-area, navigation, font, and feedback dependencies before installing anything. Use documentation matching the installed versions. Do not upgrade Expo, add Uniwind Pro, migrate from NativeWind, or remove an existing theme unless requested.

## Install the current packages

Install `uniwind` and `tailwindcss` with the project's package manager so current compatible versions are resolved. Uniwind uses Tailwind CSS v4 and does not require a Babel preset or JavaScript Tailwind config for ordinary setup.

Import `global.css` from the Expo Router root layout or another component that mounts on every platform, never from `index.ts` or `index.js`. Keep `withUniwindConfig` as the outermost Metro wrapper and use a relative `cssEntryFile`. Because Tailwind scans from the CSS file's directory, add explicit `@source` entries for shared components or monorepo packages outside that scan root. Let Metro generate Uniwind typings; do not hand-maintain them.

Follow the file contract and token pattern in [references/uniwind-theme.md](references/uniwind-theme.md). For every Expo Router setup or repair, read and adapt its complete root-layout template; do not stop after configuring CSS and Metro.

## Build one semantic CSS theme

Keep the design system in `global.css` using `@layer theme`, `:root`, and Uniwind's `@variant light` and `@variant dark`. Prefer semantic tokens such as `background`, `foreground`, `card`, `card-foreground`, `border`, `input`, `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `accent`, `accent-foreground`, `muted`, `muted-foreground`, `destructive`, `success`, and `warning`.

Components must use semantic utilities such as `bg-background`, `text-foreground`, and `border-border`; do not repeat raw colors. Keep spacing on a 4-point rhythm, define intentional screen gutters, section gaps, control heights, radii, and typography roles, and avoid arbitrary values unless matching supplied designs.

For styling differences only, use Uniwind platform selectors directly in complete `className` strings: `ios:`, `android:`, `web:`, or `native:`. Prefer these over `Platform.select()` for colors, spacing, typography, sizing, and layout. Keep `Platform.select()` or platform files for different behavior, APIs, data, or component implementations.

Use data selectors such as `data-[selected=true]:...` for prop-driven component states. Use only equality selectors with semantic `data-*` props; presence-only selectors are unsupported. Keep interactive variants for interaction state.

Use `hairlineWidth()`, `fontScale()`, `pixelRatio()`, or `light-dark()` only inside named `@utility` rules in `global.css`; do not place them directly in arbitrary `className` values. Prefer ordinary semantic tokens and utilities when device-specific computation is unnecessary.

Uniwind itself requires no React context provider. Switch modes with `Uniwind.setTheme("light" | "dark" | "system")` and read theme state with `useUniwind` only when component logic truly needs it. Prefer theme-aware classes for styling. This does not remove Expo Router's React Navigation `ThemeProvider`, which owns navigation surfaces.

Do not add theme persistence unless requested. If requested, restore it before themed UI appears so the app does not flash the wrong theme.

## Integrate Expo Router

Import `global.css` once from the root layout. Keep the root screen full height with `flex-1 bg-background`.

Uniwind themes React Native views without a provider, but Expo Router navigation surfaces still need matching React Navigation colors. In every Expo Router app, build `DefaultTheme` and `DarkTheme` variants from the same Uniwind semantic CSS variables and wrap the root navigator with Expo Router's `ThemeProvider`, unless an equivalent bridge already exists. This provider is required for navigation UI; it is not a custom Uniwind provider. Do not create a second hardcoded palette.

Keep the navigation theme, `StatusBar`, native tabs, modals, and app background aligned with the active scheme. Preserve existing root providers. When Sonner Native or gesture-driven UI is present, keep the shell inside one full-height `GestureHandlerRootView`. Use safe-area padding only where the layout needs it. When Uniwind Free safe-area utilities are used, mount one `SafeAreaProvider` and forward `SafeAreaListener` changes to `Uniwind.updateInsets`; preserve an equivalent existing bridge.

Treat the root layout as one coordinated startup shell. It must load fonts, hold the splash screen until font loading succeeds or fails, derive React Navigation colors from live Uniwind CSS variables, resolve the status-bar and toaster schemes, render the navigator, and mount one global toaster. Do not implement these as disconnected snippets that leave the app with an incomplete root.

## Fonts and native props

Load fonts through Expo Font or an installed `@expo-google-fonts/*` package, then map the exact loaded family names to CSS font tokens. Load only weights the app uses and keep the splash screen visible until runtime-loaded fonts finish or fail. Call `void SplashScreen.preventAutoHideAsync()` once at module scope, hide the splash in an effect after `fontsLoaded || fontError`, and return `null` only while both values are false. Coordinate this release with existing auth or asset startup work instead of adding competing splash controllers.

Use `className` directly for supported style props. For native props that require actual values, use Uniwind's supported `*ClassName` bindings or `useCSSVariable`; do not duplicate token hex values in components. Native color bindings use an `accent-` utility, for example `colorClassName="accent-primary"`. Define variables needed only from JavaScript with `@theme static`. Wrap only third-party components with `withUniwind`; React Native and Reanimated core components already support `className`.

## Add global toast feedback

When the app has no feedback system, install the current Expo-compatible `sonner-native` package and any missing peer dependencies using Expo-aware install commands. Render exactly one `Toaster` in the root layout, after the navigator and inside the gesture-handler root. For web support, use Sonner Native's current platform-file adapter rather than importing a native-only implementation on web. Resolve customization from Uniwind semantic variables after checking the installed Sonner API.

Keep field validation inline and reserve toasts for global asynchronous outcomes or actions. Do not expose raw server errors, toast routine navigation, or show duplicate inline and toast messages. Read the mandatory root-shell and toast contracts in [references/uniwind-theme.md](references/uniwind-theme.md).

## Verify

1. Run typecheck and lint when available.
2. Restart Expo with a cleared cache after Metro or CSS configuration changes.
3. Verify light, dark, and system modes on at least one native target.
4. Verify fonts, safe areas, status bar, navigation backgrounds, modal backgrounds, and native color props.
5. Trigger the toast variants the product uses and confirm the root has exactly one `Toaster` after the navigator.
6. Confirm every navigation color comes from the live Uniwind variables and changes with light, dark, and system modes.
7. Confirm there is no white flash, missing utility, unthemed navigation surface, duplicate safe-area provider, or dynamic class name Tailwind cannot detect.

Do not claim runtime or visual verification unless it was performed.

## Official documentation

- [Uniwind quickstart](https://docs.uniwind.dev/quickstart)
- [Uniwind data selectors](https://docs.uniwind.dev/api/data-selectors)
- [Uniwind full model reference](https://docs.uniwind.dev/llms-full.txt)
- [Expo fonts](https://docs.expo.dev/develop/user-interface/fonts/)
- [Sonner Native](https://github.com/gunnartorfis/sonner-native-toasts)
