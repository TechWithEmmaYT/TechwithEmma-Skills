# Native content motion

Use this reference for internal screen choreography, gestures, scroll effects, animated values, micro-interactions, and coordinated motion. Motion belongs inside the Expo builder.

## Decide what moves and why

Inspect the installed animation stack, navigation, affected content, gestures, reduced-motion behavior, and platform targets. Motion should provide feedback, explain a change, preserve continuity, orient the user, or mark rare completion. For onboarding and important reveals, design an original product-specific motion sequence even when no reference animation was supplied; stillness may create contrast, but the whole flow must not be static.

Prefer the project's existing primitives. Use Reanimated for gesture-, scroll-, or progress-driven work; Gesture Handler for direct manipulation; and built-in Animated/LayoutAnimation when already used and sufficient. Ask before installing or replacing animation infrastructure.

## Onboarding and connected paywalls

The nested Stack always uses `animation: "none"`. Do not animate the route container or whole step. Choreograph content within the arriving screen:

`visual anchor -> headline -> explanation -> interactive body/value -> CTA`

Adapt that order to meaning rather than staggering everything automatically. Keep progress/background/persistent anchors mounted. A selection responds immediately; its consequence may then transform or reveal. Plan checkpoints resolve from state. A detailed result reveals sections in reading order. The paywall carries one result artifact and gets the most deliberate content entrance.

Do not wrap an interactive control in an entrance that can leave its visual position different from its hit box. Keep close, skip, Back, Restore, and primary actions usable immediately. Avoid replaying content that has already settled when React re-renders.

## Interaction rules

- Drive related visuals from one meaningful shared value.
- Start press feedback on press-in; use subtle scale for buttons/cards and opacity/highlight for rows.
- Let direct manipulation follow the finger, remain interruptible, and release with velocity-aware physics.
- Use short ease-out timing; exits should be faster than entrances.
- Keep continuous work off React render paths and favor transform/opacity over per-frame layout changes.
- Fire haptics once with a meaningful selection, snap, pledge completion, or confirmed success.
- Never fake network/calculation time merely to display animation.

For moving numbers, keep units static, use tabular figures, drive gesture-linked digits from shared values, and commit React state on snap. Under Reduce Motion, set final values immediately.

## Choose difficult controls carefully

Use `existing project primitive -> built-in API -> installed dependency -> maintained focused package -> custom`.

Before hand-building, investigate compatible maintained packages for carousels, sheets, wheel/ruler pickers, sliders, sortable rows, charts, OTP, zoom, marquees, and confetti. Check Expo/React Native/New Architecture compatibility and ask before installation. A custom control must document its missing physics and accessibility behavior.

Typical candidates include Reanimated Carousel, Gorhom Bottom Sheet, React Native Community Slider/DateTimePicker, Quidone Wheel Picker, Legend Ruler Picker, Number Flow, React Native Graph, Lottie, MaskedView, Expo Blur, Expo Haptics, and an existing project confetti solution. These are candidates, never a dependency bundle.

## Accessibility and verification

Respect Reduce Motion: remove large travel, rotation, zoom, parallax, looping, and particles while preserving feedback and comprehension. Pause inactive loops/media and cancel work on unmount.

Record the affected flow on a native target. Inspect at normal speed and frame by frame for flashes, jumps, stale values, clipped springs, replayed entrances, gesture conflicts, wrong hit targets, and keyboard discontinuities. Check rapid interaction, reversal/cancellation, compact screens, iOS, Android, and reduced motion where relevant.
