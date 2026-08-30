# React Native Motion Packages

Use this catalogue when an approved interaction needs animation infrastructure. Prefer what the project already has, choose the smallest suitable primitive, verify Expo/React Native/New Architecture compatibility, and ask before installing anything. These are candidates, not a default dependency bundle.

## Foundations

- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) — UI-thread animations, shared values, interpolation, layout transitions, and worklets.
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/) — native touch and gesture recognition for direct manipulation.
- [React Native Animated and LayoutAnimation](https://reactnative.dev/docs/animations) — built-in granular value animation and global layout transactions; use when sufficient.
- [Moti](https://moti.fyi/) — declarative universal animation layer built for React Native.
- [React Native Skia](https://shopify.github.io/react-native-skia/) — high-performance 2D drawing, paths, charts, particles, and custom visual effects.
- [React Native SVG](https://github.com/software-mansion/react-native-svg) — scalable vector graphics, paths, masks, and cross-platform SVG rendering.
- [Lottie React Native](https://airbnb.io/lottie/#/react-native) — authored animation assets for onboarding, empty, loading, and celebration states.
- [React Native Keyboard Controller](https://kirillzyusko.github.io/react-native-keyboard-controller/) — frame-synchronized keyboard movement and interactive keyboard transitions.

## General animation utilities

- [React Native Ease](https://github.com/AppAndFlow/react-native-ease) — lightweight declarative animations powered by platform APIs.
- [Redash](https://wcandillon.gitbook.io/redash/) — utilities for Reanimated and Gesture Handler; use only when its helpers fit the installed versions.
- [React Native Stagger](https://github.com/animate-react-native/stagger#readme) — Reanimated-powered stagger orchestration.

## Gestures, drag, and scrolling

- [React Native Expanding Circle Transition](https://github.com/alexbrillant/react-native-expanding-circle-transition)
- [React Native Reanimated DnD](https://reanimated-dnd-docs.vercel.app/) — drag-and-drop interactions.
- [React Native Sortables](https://github.com/MatiPl01/react-native-sortables) — ready-to-use sortable lists and grids.
- [React Native Reanimated Carousel](https://www.npmjs.com/package/react-native-reanimated-carousel) — performant gesture-driven carousel and paging progress.
- [Gorhom Bottom Sheet](https://github.com/gorhom/react-native-bottom-sheet) — production bottom-sheet gestures, snapping, scrolling, keyboard, and modal behavior.
- [React Native Collapsible Tab View](https://github.com/PedroBern/react-native-collapsible-tab-view#readme) — Reanimated collapsible headers and tabbed scroll coordination.
- [React Native Header Motion](https://github.com/pawicao/react-native-header-motion) — high-level scroll-driven header choreography.
- [React Native Marquee](https://github.com/animate-react-native/marquee#readme) — cross-platform Reanimated marquee motion.
- [React Native Header Motion](https://github.com/pawicao/react-native-header-motion)

## Data and specialized controls

- [React Native Number Flow](https://github.com/Rednegniw/number-flow-react-native) — rolling and transitioning numeric values.
- [React Native Graph](https://github.com/margelo/react-native-graph) — Skia-based interactive animated line graphs.
- [Reanimated Color Picker](https://alabsi91.github.io/reanimated-color-picker/) — gesture-driven color selection.

## Feedback and celebration


- [React Native Tickle](https://github.com/Renegades-Studio/react-native-tickle) — transient and continuous AHAP-style haptics.
- [React Native Turbo Haptics](https://github.com/christianbaroni/react-native-turbo-haptics) — fast worklet-compatible haptics.
- [React Native Fast Confetti](https://github.com/AlirezaHadjar/react-native-fast-confetti) — Skia Atlas confetti for meaningful 
celebrations.

Use Expo Haptics or an existing project wrapper for ordinary feedback. Choose specialized haptics only when continuous or worklet timing materially improves the interaction. Celebration must remain proportional and accessible.

## Masks, blur, themes, and GPU effects

- [Expo Blur](https://docs.expo.dev/versions/latest/sdk/blur-view/) — native blur surfaces.
- [React Native MaskedView](https://github.com/callstack/masked-view#readme) — masks for reveals and shaped content.
- [React Native Theme Switch Animation](https://github.com/WadhahEssam/react-native-theme-switch-animation/) — animated light/dark theme transitions.
- [React Native Shine](https://github.com/software-mansion-labs/react-native-shine) — interactive GPU shader effects.
- [Native Springs Shaders](https://github.com/MatthewSRC/native-springs-shaders) — native shader effects for React Native and Expo.

Use GPU effects only when they support the approved visual or interaction concept. Profile them on a lower-end Android device and provide a reduced-motion or simpler fallback.

## Selection rule

Choose in this order:

`existing project primitive -> built-in API -> focused maintained package -> custom implementation`

Do not select a package because its demo looks impressive. Match it to the required behavior, maintenance, platform support, bundle/native cost, accessibility, and the project’s installed animation stack.
