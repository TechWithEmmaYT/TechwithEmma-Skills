---
name: expo-uniwind-theme
description: Set up or repair an Expo Uniwind theme foundation using Tailwind CSS v4, semantic light and dark tokens, system theme switching, Expo Router navigation colors, spacing, radii, fonts, and optional toast feedback. Use when adding Uniwind to Expo or replacing manual NativeWind theme boilerplate with Uniwind.
---

# Expo Uniwind Theme

Create a small CSS-first theme foundation for Expo. Preserve the installed Expo version, Expo Router structure, package manager, branding, and existing UI decisions.

## Confirm the theme

Inspect the project first. Ask only for missing decisions: primary and secondary colors, neutral/background direction, light/dark support, font, compact/comfortable/spacious density, and whether to add Sonner Native when no feedback system exists. Recommend accessible semantic status colors instead of asking for every value.

Before changing files, tell the user in no more than five bullets what will change. Wait for approval unless implementation was already explicitly requested.

## Inspect before setup

Read `package.json`, Expo config, Metro config, root layout, global CSS, and existing theme files. Use documentation matching the installed versions. Do not upgrade Expo, add Uniwind Pro, migrate from NativeWind, or remove an existing theme unless requested.

## Install the current packages

Install `uniwind` and `tailwindcss` with the project's package manager so current compatible versions are resolved. Uniwind uses Tailwind CSS v4 and does not require a Babel preset or JavaScript Tailwind config for ordinary setup.

Follow the file contract and token pattern in [references/uniwind-theme.md](references/uniwind-theme.md).

## Build one semantic CSS theme

Keep the design system in `global.css` using `@layer theme`, `:root`, and Uniwind's `@variant light` and `@variant dark`. Prefer semantic tokens such as `background`, `foreground`, `card`, `card-foreground`, `border`, `input`, `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `accent`, `accent-foreground`, `muted`, `muted-foreground`, `destructive`, `success`, and `warning`.

Components must use semantic utilities such as `bg-background`, `text-foreground`, and `border-border`; do not repeat raw colors. Keep spacing on a 4-point rhythm, define intentional screen gutters, section gaps, control heights, radii, and typography roles, and avoid arbitrary values unless matching supplied designs.

For styling differences only, use Uniwind platform selectors directly in complete `className` strings: `ios:`, `android:`, `web:`, or `native:`. Prefer these over `Platform.select()` for colors, spacing, typography, sizing, and layout. Keep `Platform.select()` or platform files for different behavior, APIs, data, or component implementations.

Uniwind requires no app theme provider. Switch modes with `Uniwind.setTheme("light" | "dark" | "system")` and read theme state with `useUniwind` only when component logic truly needs it. Prefer theme-aware classes for styling.

Do not add theme persistence unless requested. If requested, restore it before themed UI appears so the app does not flash the wrong theme.

## Integrate Expo Router

Import `global.css` once from an early component that mounts on every platform. Keep the root screen full height with `flex-1 bg-background`.

Uniwind themes React Native views without a provider, but Expo Router navigation surfaces still need matching React Navigation colors. Build `DefaultTheme` and `DarkTheme` variants from the same Uniwind semantic CSS variables and wrap the navigator with Expo Router's `ThemeProvider`. Do not create a second hardcoded palette.

Keep the navigation theme, `StatusBar`, native tabs, modals, and app background aligned with the active scheme. Use safe-area padding only where the layout needs it.

## Fonts and native props

Load fonts through Expo Font or an installed `@expo-google-fonts/*` package, then map the exact loaded family names to CSS font tokens. Load only weights the app uses and keep the splash screen visible until runtime-loaded fonts finish or fail.

Use `className` directly for supported style props. For native props that require actual values, use Uniwind's supported `*ClassName` bindings or `useCSSVariable`; do not duplicate token hex values in components. Define variables needed only from JavaScript with `@theme static`.

## Optional toast feedback

When approved and the app has no toast system, install the current compatible `sonner-native` package through Expo and render one `Toaster` in the root layout. Resolve its colors from Uniwind semantic variables, keep field validation inline, and reserve toasts for global asynchronous results or actions. Do not expose raw server errors or show duplicate inline and toast messages.

## Verify

1. Run typecheck and lint when available.
2. Restart Expo with a cleared cache after Metro or CSS configuration changes.
3. Verify light, dark, and system modes on at least one native target.
4. Verify fonts, safe areas, status bar, navigation backgrounds, modal backgrounds, and native color props.
5. Trigger approved toast variants, then confirm there is no white flash, missing utility, or dynamic class name Tailwind cannot detect.

Do not claim runtime or visual verification unless it was performed.

## Official documentation

- [Uniwind quickstart](https://docs.uniwind.dev/quickstart)
- [Uniwind theming](https://docs.uniwind.dev/theming/basics)
- [Uniwind platform selectors](https://docs.uniwind.dev/api/platform-select)
- [Uniwind full model reference](https://docs.uniwind.dev/llms-full.txt)
- [Expo fonts](https://docs.expo.dev/develop/user-interface/fonts/)
