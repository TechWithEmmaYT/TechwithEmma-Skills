# Native Motion

Use this reference for transitions, gestures, scroll effects, animated data, micro-interactions, and coordinated motion. Motion belongs inside `expo-native-builder`; do not require another skill.

## Decide before animating

Inspect the Expo and React Native versions, New Architecture status, navigation, installed animation libraries, affected screens, gestures, lists, sheets, and reduced-motion behavior.

Name the purpose: feedback, continuity, state change, explanation, or rare delight. If none applies, keep the platform default. Prefer a few meaningful moments over entrances on every element.

For complex or app-wide motion, show a compact direction covering the motion character, important interactions, implementation choice, and reduced-motion behavior before coding. Ordinary press feedback and approved screen transitions do not need another approval round.

## Choose the smallest compatible tool

- Keep native navigation, tab, sheet, keyboard, and control motion when it already expresses the interaction.
- Use Reanimated for gesture-, scroll-, or progress-driven motion and coordinated shared values.
- Use Gesture Handler when the interface directly follows touch.
- Use React Native Animated or LayoutAnimation when the project already uses them and the interaction is simple.
- Use Skia or shaders only for custom GPU drawing that transforms and opacity cannot achieve.

Do not install or replace native animation infrastructure without checking compatibility and getting approval. Follow the project's installed versions and rebuild requirements.

## Reuse difficult primitives

Choose in this order: `existing project primitive -> built-in API -> focused maintained package -> custom implementation`.

- Use the existing or Gorhom bottom sheet for production sheet gestures, snapping, scrolling, and keyboard behavior.
- Consider Reanimated Carousel for gesture paging, Sortables or Reanimated DnD for reordering, Number Flow for values that roll on their own (see Animate numbers), and React Native Graph or Skia for an approved interactive graph.
- Use Lottie for authored animation assets, MaskedView for shaped reveals, and Expo Blur for native blur when the project and platform support them.
- Prefer Expo Haptics for ordinary feedback. Add specialized haptics, confetti, shaders, or GPU effects only when the approved interaction materially needs them.

Verify maintenance, Expo/React Native/New Architecture compatibility, platform support, accessibility, and native cost. Ask before adding a dependency; a compelling demo is not enough.

## Build coherent behavior

- Drive related responses from one meaningful input such as press, gesture, scroll, selection, playback, or processing progress.
- Let direct manipulation follow the finger, remain interruptible, and release into physics seeded with gesture velocity.
- Use short ease-out timing for system-driven transitions; exits should be faster than entrances.
- Start press feedback on press-in. Scale buttons or cards subtly; use highlight or opacity for rows.
- Preserve continuity when an answer, image, number, chart, card, or spatial relationship carries into the next state.
- Keep tabs and frequent navigation on platform motion. Do not add generic slide or fade-up effects to every screen.
- Fire haptics once, on the same frame as a meaningful selection, snap, threshold, or completion.
- Do not fake calculation or network time to make a loading animation visible.

For onboarding, coordinate `action -> immediate feedback -> meaningful transformation -> next state`. Keep the shared shell, progress, background, and persistent visual anchors mounted when the approved design calls for continuity.

## Animate numbers

A number that changes is the most-read element on the screen. Animate the digits and nothing else.

- Keep units, currency symbols, and words static. `h`, `m`, `%`, `€`, `a week` belong in sibling `Text`, never inside the animated element: a unit that re-renders with the number wobbles, and a still unit gives the eye a fixed frame to read the moving figure against.
- Split a compound value into one animated figure per unit (`7` `h` `45` `m`), each with its own worklet formatter derived from one shared split so the halves cannot disagree at a rollover.
- Zero-pad or fix the width of any figure a unit sits beside, and set `fontVariant: ["tabular-nums"]`, `includeFontPadding: false`, `padding: 0`. Proportional digits change width as they change value and shove the unit sideways.
- Drive gesture-linked numbers from the shared value, not React state. Reanimated can write a `TextInput`'s `text` prop from a worklet, so the figure tracks the finger at native rates while React never re-renders:

```tsx
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

// Module-scope worklet: digits only, no unit.
function hourDigits(value: number) {
  "worklet";
  return String(Math.floor(value));
}

const animatedProps = useAnimatedProps(() => ({
  defaultValue: hourDigits(hours.value),
  text: hourDigits(hours.value),
}));
```

  Commit React state only on snap, so later steps read a stable answer. Give the row one `accessibilityLabel` with the fully formatted value and hide the moving parts from the accessibility tree.

- Reserve per-digit wheel packages such as Number Flow for values that change occasionally and change on their own: a total, a price, a count, a score. They fit poorly on large display type scrubbed by a gesture, where their masks clip tall glyphs, their container breaks baseline alignment with adjacent text, and their default ~900ms roll queues up behind the finger. If one is used there anyway, shorten `spinTiming`/`transformTiming` to roughly the snap interval and verify the headline against a real device screenshot.
- For a reveal rather than a scrub, count from the previous value with `withTiming` and an ease-out over 300-450ms, and stagger dependent figures so each lands after the one it is derived from. Under Reduce Motion, set the final value immediately.

## Protect performance and accessibility

Keep continuous interaction off React render paths. Prefer UI-thread/shared-value work and properties such as transform and opacity; avoid animating layout dimensions every frame when translation inside a fixed container works.

Cancel loops and work when the owning screen becomes inactive. Test reversal, cancellation, repeated input, navigation interruption, realistic lists, keyboard changes, and lower-end Android performance.

Respect Reduce Motion. Collapse large travel, parallax, rotation, zoom, loops, and particles to a short fade or immediate state while preserving feedback and comprehension.

## Verify motion

Record the complete affected flow on a native target. Watch it once at normal speed and once frame by frame for flashes, jumps, stale values, clipped springs, replayed entrances, gesture conflicts, and keyboard discontinuities. Check iOS, Android, reduced motion, rapid interaction, and a release build when performance matters. Report any platform or device not actually verified.
