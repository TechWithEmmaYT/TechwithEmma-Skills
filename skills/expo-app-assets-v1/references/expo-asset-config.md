# Expo Asset Requirements and Configuration

Platform requirements and config patterns. Prefer the project's own SDK documentation where it conflicts with this file.

## iOS / root master

- 1024×1024 PNG, square, full-bleed, opaque.
- No baked rounded corners — the OS applies its own mask, and a pre-rounded icon gets double-masked.
- No meaningful transparency. A file can be RGBA and still be fully opaque; what matters is that no pixel is actually transparent, since iOS composites over black and any transparent region turns into a black hole in the artwork.
- Keep critical detail away from the edge.

`ios.icon` accepts a single image, light/dark/tinted variants, or an Icon Composer `.icon` directory (SDK 54+). The root `icon` field is the shared fallback when a platform-specific one is absent.

## Android adaptive icons

Android composites two independent layers and then applies a launcher-chosen mask. The foreground is *not* a finished icon — it is a layer.

The canvas is 108×108dp with a centered 66×66dp region guaranteed never to be clipped. On a 1024×1024 working canvas that safe region is **roughly 625×625, centered** (66/108 ≈ 61%).

Treat 625px as a safe-area guideline, not a hard box: essential geometry — the part that makes the icon recognizable — stays inside it, while decorative or background artwork may extend beyond and be clipped. Requiring the entire foreground to fit inside 625px produces a small mark floating in a large empty tile.

- `foregroundImage` — transparent artwork only. No baked background, no baked mask, no launcher tile.
- `backgroundColor` — preferred for a simple full-bleed ground.
- `backgroundImage` — optional full-bleed image, same dimensions as the foreground. Overrides `backgroundColor`; do not supply both as competing sources.
- `android.icon` — optional flattened fallback for older launchers.

Preview the result under circle, squircle, and rounded-square masks before accepting it.

## Monochrome icon

This is the most frequently botched asset, because a plausible-looking wrong answer is one command away.

The monochrome layer is a **silhouette derived from the foreground's geometry**. Android tints it with an arbitrary system color, so anything that survives only through color or lighting will not survive.

It is not: a grayscale conversion, a luminance desaturation, a flattened full-color rendering, or gradient artwork.

It is:
- one single opaque color (white or black) on transparency
- one coherent silhouette, with interior detail collapsed or cut as negative space
- no gradients, no shading, no anti-aliasing grey used as a tone
- legible under any tint

Verify by counting distinct colors in the output — a correct monochrome file resolves to one foreground color plus transparency (plus edge anti-aliasing of that same color). Dozens of colors means a flatten happened.

## Splash screen

- 1024×1024 transparent PNG source. Expo currently supports PNG splash artwork.
- Keep it simple and control rendered size with `imageWidth` rather than by padding the source.
- Derive it from the same approved identity — do not redesign a separate mark and call it consistent.
- The launcher icon is usually not the right splash asset unchanged: the launcher version is optimized for a tiny masked square, while the splash sits alone on a large field.
- Add a dark variant only when it materially differs, or when asked.

## Config shape

Adapt paths and colors; merge into the existing config rather than replacing it. Omit variants that were not created.

```json
{
  "expo": {
    "icon": "./assets/branding/icon.png",
    "ios": {
      "icon": {
        "light": "./assets/branding/ios-icon-light.png",
        "dark": "./assets/branding/ios-icon-dark.png",
        "tinted": "./assets/branding/ios-icon-tinted.png"
      }
    },
    "android": {
      "icon": "./assets/branding/icon.png",
      "adaptiveIcon": {
        "foregroundImage": "./assets/branding/adaptive-icon-foreground.png",
        "backgroundColor": "#F4F1EA",
        "monochromeImage": "./assets/branding/adaptive-icon-monochrome.png"
      }
    },
    "plugins": [
      [
        "expo-splash-screen",
        {
          "backgroundColor": "#F4F1EA",
          "image": "./assets/branding/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "dark": {
            "backgroundColor": "#111111",
            "image": "./assets/branding/splash-icon-dark.png"
          }
        }
      ]
    ]
  }
}
```

### Dynamic config

`app.config.js` / `app.config.ts` is code, not data. Edit it as code — preserve the `ConfigContext` spread, environment lookups, variant ternaries, exported function signature, and every existing plugin entry with its options. Do not regenerate it as static JSON; that silently drops build-variant logic.

## Native-project boundary

App-config changes apply through Prebuild / CNG. If the project maintains `ios/` or `android/` by hand, editing the Expo config alone does not move the assets — update the native asset catalogs and resource directories through native tooling, and say that is what was done.

Icon and splash changes require a **new native build**. They do not ship over the air. Expo recommends testing splash screens in preview or production builds, because Expo Go and development-client branding interfere with the result.

Avoid destructive clean prebuilds purely for verification.

## Official references

- [Expo splash screen and app icon guide](https://docs.expo.dev/develop/user-interface/splash-screen-and-app-icon/)
- [Expo app config reference](https://docs.expo.dev/versions/latest/config/app/)
- [Expo SplashScreen config plugin](https://docs.expo.dev/versions/latest/sdk/splash-screen/)
- [Android adaptive icon design](https://developer.android.com/develop/ui/compose/system/icon_design_adaptive)
