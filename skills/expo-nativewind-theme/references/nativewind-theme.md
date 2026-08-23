# NativeWind v4 theme reference

Use this reference after confirming the project is on NativeWind v4.

## Expected files

```text
app.json or app.config.ts
babel.config.js
metro.config.js
tailwind.config.js
nativewind-env.d.ts
src/global.css
src/theme/app-theme.ts
src/app/_layout.tsx
```

Adapt paths to the existing project instead of creating a duplicate app tree.

## Configuration contract

`babel.config.js` must use `babel-preset-expo` with `jsxImportSource: "nativewind"` and the `nativewind/babel` preset. `metro.config.js` must wrap Expo's default config with `withNativeWind` and point at the actual global CSS file. The CSS file contains:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

The Expo web config uses Metro, and the TypeScript declaration file contains:

```ts
/// <reference types="nativewind/types" />
```

Do not name that file `nativewind.d.ts`.

## Semantic token pattern

Keep one palette as the source of truth, then expose variables for Tailwind:

```ts
import { useColorScheme, vars } from "nativewind";

export const colors = {
  light: {
    background: "#F8FAFC",
    foreground: "#0F172A",
    card: "#FFFFFF",
    border: "#E2E8F0",
    primary: "#2563EB",
    primaryForeground: "#FFFFFF",
    secondary: "#E2E8F0",
    secondaryForeground: "#0F172A",
    accent: "#DBEAFE",
    accentForeground: "#1E3A8A",
    muted: "#F1F5F9",
    mutedForeground: "#64748B",
  },
  dark: {
    background: "#0B0F19",
    foreground: "#F8FAFC",
    card: "#161D2E",
    border: "#242C3E",
    primary: "#3B82F6",
    primaryForeground: "#FFFFFF",
    secondary: "#242C3E",
    secondaryForeground: "#F8FAFC",
    accent: "#172554",
    accentForeground: "#DBEAFE",
    muted: "#1C2436",
    mutedForeground: "#94A3B8",
  },
} as const;

const rgb = (hex: string) => {
  const value = Number.parseInt(hex.slice(1), 16);
  return `${value >> 16} ${(value >> 8) & 255} ${value & 255}`;
};

const makeTheme = (theme: (typeof colors)["light"]) =>
  vars({
    "--color-background": rgb(theme.background),
    "--color-foreground": rgb(theme.foreground),
    "--color-card": rgb(theme.card),
    "--color-border": rgb(theme.border),
    "--color-primary": rgb(theme.primary),
    "--color-primary-foreground": rgb(theme.primaryForeground),
    "--color-secondary": rgb(theme.secondary),
    "--color-secondary-foreground": rgb(theme.secondaryForeground),
    "--color-accent": rgb(theme.accent),
    "--color-accent-foreground": rgb(theme.accentForeground),
    "--color-muted": rgb(theme.muted),
    "--color-muted-foreground": rgb(theme.mutedForeground),
  });

export const themes = {
  light: makeTheme(colors.light),
  dark: makeTheme(colors.dark),
};

export function useThemeColor(name: keyof (typeof colors)["light"]) {
  const { colorScheme } = useColorScheme();
  return colors[colorScheme === "dark" ? "dark" : "light"][name];
}
```

Tailwind colors should reference those variables with alpha support:

```js
const color = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: color("background"),
        foreground: color("foreground"),
        card: color("card"),
        border: color("border"),
        primary: {
          DEFAULT: color("primary"),
          foreground: color("primary-foreground"),
        },
        secondary: {
          DEFAULT: color("secondary"),
          foreground: color("secondary-foreground"),
        },
        accent: {
          DEFAULT: color("accent"),
          foreground: color("accent-foreground"),
        },
        muted: {
          DEFAULT: color("muted"),
          foreground: color("muted-foreground"),
        },
      },
    },
  },
};
```

Use a root `View` with `style={themes[resolvedScheme]}` so all descendants receive the variables.

## Layout-token baseline

Tailwind's common spacing utilities already follow a 4-point rhythm. Prefer them over arbitrary values, and extend only semantic values the app will reuse:

```js
theme: {
  extend: {
    spacing: {
      "screen-sm": "16px",
      screen: "20px",
      "screen-lg": "24px",
      section: "32px",
      control: "48px",
    },
    borderRadius: {
      control: "12px",
      card: "16px",
    },
  },
}
```

These are starting points, not universal values. Adjust them to the approved density and existing product language. Keep touchable controls at least 44 points in both dimensions even when their visible surface is smaller.

## Toast integration contract

- Install with the project's Expo-aware package command and check current peer requirements.
- Keep exactly one app-wide `Toaster` unless separate roots are intentional.
- Mount it after router/navigation content, within the gesture root and providers it needs.
- Resolve colors from the same semantic palette as the rest of the app.
- Exercise only the default, success, error, warning, loading/promise, action, and dismiss variants the product uses.
- For web, use platform-specific adapter files when following Sonner Native's web recommendation.

Consult the current [Sonner Native README](https://www.npmjs.com/package/sonner-native) because its peer dependencies and customization API can change.

## Font-loading pattern

For the runtime approach, load only used weights in the root layout:

```tsx
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return null; // Replace with the project's existing app shell.
}
```

Map names such as `Inter_400Regular` to `font-inter` in Tailwind. If the project already waits for session restoration or other startup work, coordinate one splash-screen release instead of adding competing loaders.
