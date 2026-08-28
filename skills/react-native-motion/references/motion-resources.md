# Motion Resources

Use established components when they solve difficult motion infrastructure
without restricting the product's visual identity.

Check package compatibility, maintenance status, Expo/native requirements and
existing project dependencies before installing anything.

Do not treat this list as mandatory dependencies.

## Animated numbers

`number-flow-react-native`

Consider for:

- balances;
- prices;
- percentages;
- timers;
- countdowns;
- statistics;
- rapidly changing numeric values.

Prefer it over manually rebuilding rolling digit behavior when its API and
project compatibility fit.

Wrap it in product-specific typography and choreography.

## Interactive graphs

`react-native-graph`

Consider for:

- banking;
- investing;
- analytics;
- API monitoring;
- fitness;
- health trends.

Useful when animated line transitions and interactive graph scrubbing are part
of the experience.

Do not install a graph library for simple static sparklines unless justified.

## Bottom sheets

`@gorhom/bottom-sheet`

Prefer for conventional production bottom sheets requiring:

- gesture handling;
- snapping;
- dynamic sizing;
- scrollable content;
- modal behavior;
- keyboard handling.

Customize presentation and surrounding choreography.

Do not rebuild mature bottom-sheet gesture infrastructure without a product
reason.

## Reorderable lists and grids

`react-native-sortables`

Consider for:

- workout ordering;
- playlists;
- routines;
- ranked items;
- dashboards;
- configurable lists.

Customize lift, scale, spacing, shadows and haptic response around the reorder
interaction.

## Marquee

`@animatereactnative/marquee`

Consider for deliberately continuous content such as:

- media;
- logos;
- artwork;
- creator content;
- playful onboarding;
- selected horizontal/vertical strips.

Avoid decorative always-running marquees when they add unnecessary CPU/battery
cost or visual noise.

## Header motion

`react-native-header-motion`

Consider for:

- collapsing hero headers;
- sticky headers;
- large → compact titles;
- shared header progress;
- multi-scroll orchestration.

Treat exposed progress as a motion input.

Design the visual behavior yourself rather than accepting a generic header
style.

## Keyboard-driven motion

Consider `react-native-keyboard-controller` when interface motion must track
the keyboard frame-by-frame, including focused composers, auth forms, sheets
and input surfaces.

Do not approximate keyboard progress with unrelated timers.

## Carousels

Consider `react-native-reanimated-carousel` when a production carousel needs
gesture handling, looping, paging and Reanimated-driven progress.

Customize the card behavior and surrounding choreography instead of treating
the package's default motion as the product identity.

## Authored animation assets

Use `lottie-react-native` when an authored animation asset is the right medium
for onboarding, empty states or restrained success moments.

Do not use Lottie for interactions that must continuously follow touch or
scroll.

## Haptics

Prefer `expo-haptics` for ordinary Expo feedback. Consider worklet-compatible
haptic libraries only when precise gesture-thread timing materially improves
the interaction and project compatibility has been verified.

Haptics should confirm thresholds or completion, not fire on every decorative
movement.

## Masks and blur

Consider `@react-native-masked-view/masked-view` and Expo Blur for reveals,
shimmer masks and progressive focus effects when simpler clipping or opacity is
insufficient.

Large blurred surfaces can be expensive; profile them on Android.

## Shader primitives

`@native-springs/shaders`

Consider when the concept genuinely benefits from native shader effects such as:

- ripple;
- liquid distortion;
- aurora;
- light effects;
- reactive surfaces;
- transition distortion.

Shaders are optional ingredients, not a requirement for premium motion.

## Reference libraries

Use Make It Animated to study production interaction patterns.

Use Native Bloom to explore richer React Native visual and shader directions.

Extract the interaction principle.

Do not blindly copy the visual skin of reference apps.

## Decision order

Choose:

**Motion concept
→ interaction pattern
→ existing primitive if appropriate
→ customization
→ custom implementation only when needed**

## Sources

- [Make It Animated animations](https://makeitanimated.dev/animations)
- [Make It Animated resources](https://makeitanimated.dev/resources)
- [Native Bloom animation blocks](https://nativebloom.dev/blocks?animation=shader)
- [React Native Number Flow](https://github.com/Rednegniw/number-flow-react-native)
- [React Native Graph](https://github.com/margelo/react-native-graph)
- [React Native Sortables](https://react-native-sortables-docs.vercel.app/)
- [Gorhom Bottom Sheet](https://gorhom.dev/react-native-bottom-sheet/)
- [React Native Marquee](https://github.com/animate-react-native/marquee)
- [Native Springs Shaders](https://github.com/MatthewSRC/native-springs-shaders)
- [React Native Header Motion](https://github.com/pawicao/react-native-header-motion)
