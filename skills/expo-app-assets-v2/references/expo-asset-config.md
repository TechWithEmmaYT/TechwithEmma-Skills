# Expo Asset Requirements and Configuration

Use the current project SDK documentation when it differs from this reference.

## Asset requirements

### Standard and iOS icons

- Export a square 1024x1024 PNG.
- A standard iOS image icon must fill the whole square, remain opaque, and contain no pre-rendered rounded corners. The operating system applies its mask.
- Expo can accept `ios.icon` as one image, light/dark/tinted image variants, or an Icon Composer `.icon` directory. `.icon` support begins with Expo SDK 54.
- Keep critical detail away from the edge and test legibility at launcher size.

### Android adaptive icons

Android combines independent foreground and background layers, then applies a launcher mask. The 108x108 canvas has a centered 66x66 safe zone that is never clipped. Keep the essential mark within that zone while allowing background artwork to extend edge to edge.

- `foregroundImage`: transparent artwork layer; no baked background or outer mask.
- `backgroundColor`: preferred for a simple full-bleed background.
- `backgroundImage`: optional full-bleed image, with the same dimensions as the foreground. It overrides `backgroundColor`.
- `monochromeImage`: one-color silhouette on transparency for themed icons. It may share the foreground geometry, but not a flattened multicolor rendering.
- `android.icon`: optional flattened fallback for older Android devices.

### Splash screen

Use a 1024x1024 transparent PNG source. Keep the splash visually simple and use `imageWidth` to control its rendered size. Supply a dark image/background only when it materially differs. Expo currently supports PNG splash artwork.

## Example app config

The example paths below represent an approved final location, not the generated staging directory. Adapt paths and colors to the project; merge this into the existing config rather than replacing it.

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

Omit variants that were not created. Use either `backgroundColor` or `backgroundImage` for the adaptive icon, not both as competing sources. When the project uses `app.config.js` or `app.config.ts`, preserve its functions, environment lookups, and object spreads.

## Native-project boundary

App-config changes apply through Expo Prebuild/CNG. If the project manually owns `ios/` or `android/` without prebuild, update the native asset catalogs/resources through their native tooling instead of claiming the Expo config alone is sufficient.

Splash and icon changes require a new native binary. Expo recommends testing splash screens in preview or production builds because Expo Go and development-client branding can interfere with the result.

## Official references

- [Expo splash screen and app icon guide](https://docs.expo.dev/develop/user-interface/splash-screen-and-app-icon/)
- [Expo app config reference](https://docs.expo.dev/versions/latest/config/app/)
- [Expo SplashScreen config plugin](https://docs.expo.dev/versions/latest/sdk/splash-screen/)
- [Android adaptive icon design](https://developer.android.com/develop/ui/compose/system/icon_design_adaptive)
