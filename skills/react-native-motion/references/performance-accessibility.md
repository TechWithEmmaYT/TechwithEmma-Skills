# Performance and Accessibility

A visually impressive interaction that drops frames, blocks input or ignores
accessibility is not production quality.

## Keep continuous motion cheap

Prefer properties that can update without expensive React layout and rendering.

Commonly favorable properties include:

- transform;
- opacity;
- shader uniforms;
- drawing properties.

Avoid driving continuous animation through React `setState`.

Avoid expensive JS work during gestures and scrolling.

## Use native/UI-thread execution

For React Native Animated, use the native driver when the required properties
support it.

For Reanimated, keep continuous calculations and animation state in shared
values/worklets when possible.

The user should not lose smooth interaction because the JavaScript thread is
busy.

## Coordinate instead of multiplying

Prefer one progress value driving several visual responses over several
independent loops.

Stop or cancel animation when the owning component is no longer active.

Avoid unnecessary perpetual animations.

## Lists

Be careful with:

- long looping animations inside virtualized lists;
- expensive effects on every row;
- large blurred surfaces;
- shader-heavy list items;
- large image decoding during animation.

Profile representative datasets.

## Gestures

Animations must remain stable during:

- quick repeated gestures;
- cancellation;
- direction reversal;
- navigation interruption;
- simultaneous gestures;
- release at different velocities.

Do not create interactions that only work during the happy-path demo.

## Reduced motion

Respect the user's reduced-motion preference.

Preserve:

- state changes;
- hierarchy;
- feedback;
- confirmation.

Reduce or remove:

- large travel distances;
- strong parallax;
- dramatic zoom;
- 3D rotation;
- repeated looping;
- unnecessary particles;
- aggressive atmospheric effects.

Do not simply disable all feedback.

## Platform behavior

Check both iOS and Android.

Pay particular attention to:

- gesture conflicts;
- keyboard transitions;
- safe areas;
- scroll behavior;
- navigation;
- clipping;
- shadows;
- perspective transforms;
- haptics;
- low-end Android performance.

## Verification

Where possible:

- test development/production builds rather than assuming Expo Go behavior;
- inspect frame smoothness;
- test realistic data;
- test rapid interaction;
- test navigation interruption;
- enable reduced motion;
- test physical devices.

Report anything that was not actually verified.