# Motion and Gradients

Use this reference for ordinary premium polish inside the builder. For a dedicated motion audit, complex gesture choreography, shaders, or an app-wide motion identity, prefer the separate `react-native-motion` skill when it is available.

## Motion gate

Before animating, name the purpose: feedback, continuity, state change, explanation, or rare delight. If none applies, keep the platform default.

- High-frequency actions such as tabs, back, keyboard, and scrolling use platform motion.
- Frequent presses use subtle feedback around 100–150 ms.
- Sheets, modals, state transitions, and toasts may use standard restrained motion.
- Rare milestones may carry more personality without delaying the next action.

Use the project's installed animation stack. Prefer Reanimated for UI-thread motion and Gesture Handler for continuous gestures; do not install them or replace working animation code without approval.

## Motion behavior

- Gesture-driven motion follows the finger continuously and releases into a spring seeded with gesture velocity.
- System-driven motion uses short ease-out timing, normally below 300 ms; exits are faster than entrances.
- Prefer `transform` and `opacity`. Avoid animating layout dimensions each frame when translation inside a fixed container works.
- Press feedback starts on press-in. Use a small scale on buttons/cards or a background/opacity change on rows; do not animate every element.
- Keep motion interruptible and prevent animations from replaying on harmless re-renders or back navigation.
- Pair haptics with meaningful snap, selection, or completion moments, once per action and on the same frame.
- Respect Reduce Motion: replace spatial movement with a short fade or immediate final state.

## Gradient direction

Use gradients to support brand identity, focus, depth, progress, media readability, or a meaningful transition. Do not default to purple AI gradients, mesh backgrounds, glow, or gradients on every surface.

- Use the approved palette and normally two or three stops.
- Keep text contrast readable in both themes; add a localized image overlay behind text rather than darkening the entire image.
- Reserve strong gradients for one or two priority surfaces such as a hero, progress state, premium action, or generated artwork.
- Use Uniwind's supported gradient utilities when Uniwind is active. Otherwise follow the project's existing `expo-linear-gradient`, Skia, SVG, or StyleSheet-compatible approach.
- Animate a gradient only when its movement communicates progress, state, or ambient product character. Prefer slow restrained transforms or stop changes and test on a lower-end Android device.

## Verification

Record the complete affected flow, not just the hero animation. Watch once for feel and once frame by frame. Check gesture cancellation, rapid taps, modal/sheet dismissal, keyboard appearance and dismissal, theme changes, Reduce Motion, and wrong-color or white one-frame flashes. Do not claim smoothness from static screenshots or development-only code review.
