# Lottie in Expo interfaces

Use Lottie for approved moments where authored animation communicates orientation, progress, status, or celebration. Do not add it to every onboarding step or use it as a substitute for clear layout and copy.

## Install for the current Expo SDK

Use Expo's compatibility-aware installer instead of hardcoding a version:

```bash
npx expo install lottie-react-native
```

Check the installed Expo SDK, native build workflow, and the current [Lottie React Native documentation](https://github.com/lottie-react-native/lottie-react-native) before changing native or Metro configuration.

## Asset and component pattern

Prefer a reviewed local JSON asset for predictable offline behavior and version control:

```tsx
import LottieView from "lottie-react-native";

<LottieView
  source={require("@/assets/animations/onboarding-success.json")}
  autoPlay
  loop={false}
  style={{ width: 220, height: 220 }}
/>
```

Give the animation explicit dimensions and a stable layout container so loading does not shift surrounding content. Use imperative playback or controlled progress only when it responds to real application state.

Use `.lottie` assets only when the format is actually supplied and after following current Metro/test guidance. Do not modify Metro for `.lottie` files when the app uses ordinary JSON.

## Motion behavior

- Loop only ambient or genuinely ongoing states; completion animations should usually play once.
- Pause or replace decorative motion when reduced motion is enabled. Provide a static image/icon or immediate final state.
- Avoid blocking navigation until a decorative animation finishes.
- Do not restart an animation on every harmless re-render.
- Keep files small, review performance on a lower-end Android device, and remove unused compositions/assets.
- Use color filters only when the animation's layer keypaths are known and the result was visually checked.

## Safety and verification

Use assets the product is licensed to ship. Do not download random remote animations at runtime or assume a public gallery asset permits commercial redistribution. Test actual iOS and Android rendering, theme contrast around the animation, reduced-motion fallback, offline behavior, and production builds when native configuration changed.

