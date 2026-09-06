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

## Adaptable motion recipes

Choose only recipes that explain this product. Invent another sequence when it communicates better. Starting values below are implementation defaults, not measurements from reference videos: press feedback around 80–140 ms, content entrances 180–300 ms with 40–80 ms offsets, and explanatory reveals 350–650 ms. Tune on device; keep actions usable and reading time user-controlled. Use restrained springs for direct manipulation or selection, timing for deliberate reveals, and one shared progress value for coordinated effects.

| Moment | Default behavior and implementation intent |
|---|---|
| Welcome | Introduce the visual anchor, then the promise; keep the CTA anchored. For product-led artwork, cycle a small stack of cards using translation, scale, and layering; pause after a readable demonstration. |
| Before/after | Reveal aligned images through a clipped mask driven by one progress value; attach a divider to the same value. Keep labels readable and offer a static comparison under Reduce Motion. |
| Conversation | Reveal short messages in meaningful groups; respond immediately to a selected reply. Scroll only when the user is near the bottom, preserve history, and show messages immediately under Reduce Motion. Avoid compulsory typing delays. |
| Answer selection | Update the selected border/check immediately, then animate the related insight or preview. Replace an interrupted animation with the latest answer's target; do not queue stale responses. |
| Chart or calculation | Build the line, bars, or dot grid alongside its derived number; reveal the explanation after the relationship is visible. Keep units and axes stable; settle immediately under Reduce Motion. |
| Detail inspection | Reveal one or two magnified crops over a stable image to explain a specific detail. Use matching source crops, not invented differences; remove zoom travel under Reduce Motion. |
| Expand and return | Expand a selected thumbnail from measured bounds into a focused card while preserving its source space. Confirm Save with a state change, then return to the source. Keep focus and hit targets attached to the active control; use an immediate detail state under Reduce Motion. |
| Product benefit | Let a demonstrated action reveal its consequence: earned credit updates a balance, a photo receives messages, or a preview changes. Sequence meaningful feedback rather than decorative particles; distinguish a demonstration from a real completed action. |
| Commitment and setup | Apply the hold-fill behavior in the onboarding reference; then resolve progress/checkpoints from actual state. Stop on cancellation or error, and celebrate completion once. |
| Result and paywall | Introduce the main result, then supporting evidence. Carry its visual identity into the paywall; plan selection updates the indicator, total, trial terms, and CTA from one selected-plan state. Keep billing copy legible throughout. |

For each selected recipe, define the resting state and replay policy. Back restores answers and settled reveals; only replay a demonstration when useful or explicitly requested. Disable automatic cycles under Reduce Motion, pause them offscreen, and cancel pending work when leaving. Do not hide navigation or purchasing controls behind an entrance sequence.

When studying a video, separate recorded effects from inferred implementation: note approximate sequence/timing, distinguish recording cursor/tap overlays from app feedback, and never infer actual haptics or gesture physics from pictures. Frame sequences support motion analysis but do not establish live playback or exact easing. Transfer the behavior, not competitor assets, copy, or claims.

## Choose difficult controls carefully

Use `existing project primitive -> built-in API -> installed dependency -> maintained focused package -> custom`.

Before hand-building, investigate compatible maintained packages for carousels, sheets, wheel/ruler pickers, sliders, sortable rows, charts, OTP, zoom, marquees, and confetti. Check Expo/React Native/New Architecture compatibility and ask before installation. A custom control must document its missing physics and accessibility behavior.

Typical candidates include Reanimated Carousel, Gorhom Bottom Sheet, React Native Community Slider/DateTimePicker, Quidone Wheel Picker, Legend Ruler Picker, Number Flow, React Native Graph, Lottie, MaskedView, Expo Blur, Expo Haptics, and an existing project confetti solution. These are candidates, never a dependency bundle.

## Accessibility and verification

Respect Reduce Motion: remove large travel, rotation, zoom, parallax, looping, and particles while preserving feedback and comprehension. Pause inactive loops/media and cancel work on unmount.

Record the affected flow on a native target. Inspect at normal speed and frame by frame for flashes, jumps, stale values, clipped springs, replayed entrances, gesture conflicts, wrong hit targets, and keyboard discontinuities. Check rapid interaction, reversal/cancellation, compact screens, iOS, Android, and reduced motion where relevant.
