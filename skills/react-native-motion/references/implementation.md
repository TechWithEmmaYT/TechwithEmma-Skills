# Implementation

Choose technology after the motion concept has been designed.

Do not let the library determine the interaction.

## Inspect compatibility first

Determine:

- React Native version;
- Expo SDK;
- New Architecture status;
- current Reanimated version;
- existing Gesture Handler installation;
- Skia availability;
- native directories;
- whether a development build is required.

Do not blindly install the newest animation package into an older project.

Reanimated 4 requires React Native's New Architecture.

## Reanimated

Prefer Reanimated for:

- gesture-driven motion;
- scroll-driven motion;
- continuous interpolation;
- shared animation state;
- physics;
- derived values;
- layout transitions;
- animated props;
- highly coordinated interactions.

Use shared values as animation state.

Derive related animation properties from shared state rather than synchronizing
multiple React state variables frame-by-frame.

Typical tools include:

- `useSharedValue`;
- `useDerivedValue`;
- `useAnimatedStyle`;
- `useAnimatedProps`;
- `useAnimatedScrollHandler`;
- `useScrollOffset`;
- `withTiming`;
- `withSpring`;
- `withDecay`;
- `interpolate`;
- layout animations.

Prefer UI-thread worklets for continuous motion.

Bridge back to JavaScript only when application logic genuinely requires it.

## Gesture Handler

Use Gesture Handler when interaction directly follows touch:

- pan;
- drag;
- swipe;
- pinch;
- long press;
- composed gestures;
- interactive dismiss;
- reorder.

Map gesture progress into shared values.

Do not route continuous pointer updates through React state.

## Skia

Use Skia when the concept requires custom GPU drawing such as:

- procedural graphics;
- shader effects;
- custom paths;
- particle systems;
- masks;
- advanced gradients;
- distortion.

Do not reach for Skia for ordinary transforms or opacity transitions.

## React Native Animated

The built-in Animated API remains suitable for simpler animations when it is
already used in the project or additional dependencies are unnecessary.

Use declarative values, interpolation and composition.

Use the native driver where supported.

The native driver is best suited to non-layout properties such as transforms
and opacity.

Do not mix inconsistent driver strategies on the same animated value.

## LayoutAnimation

Consider LayoutAnimation for simple global layout changes where descendants and
surrounding content need to animate with the next layout pass.

Examples:

- expand/collapse;
- inserting rows;
- removing rows;
- simple container size changes.

Use another tool when precise interactive control is required.

## Animation input

Prefer a small number of meaningful inputs:

- press progress;
- gesture translation;
- gesture velocity;
- scroll progress;
- selected index;
- playback progress;
- processing progress;
- transition progress.

Derive visual responses from these.

## Timing vs physics

Use duration/easing when the motion represents a controlled visual transition.

Use spring/decay/velocity-based behavior when the interface should feel
physical.

Do not use a spring simply because "premium animation" was requested.

Tune:

- stiffness;
- damping;
- mass;
- overshoot;
- velocity;
- thresholds;
- snap points;

according to the interaction.

## Dependency changes

Before adding native dependencies:

- inspect existing packages;
- verify compatibility;
- explain the change;
- use the project's package manager;
- preserve Expo configuration;
- rebuild native dependencies when required.

Current Reanimated 4 Expo setup requires `react-native-reanimated` and
`react-native-worklets` and a native rebuild.

Do not run destructive prebuild operations against manually maintained native
projects without approval.