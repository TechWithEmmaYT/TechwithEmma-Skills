# Onboarding Choreography

Use this reference for multi-step onboarding, quizzes, personalization, and plan-building journeys.

Treat the flow as one evolving interface, not separate screens with repeated fade or slide entrances. For each transition identify:

1. the user action;
2. the immediate feedback;
3. what leaves;
4. what persists or transforms;
5. what the next state adds.

Answers, numbers, cards, imagery, charts, progress, and generated plan fragments may move, resize, recolor, reflow, or reorganize into later states. Preserve an element only when continuity improves understanding.

## Coordinate interaction and meaning

Drive related responses from one meaningful input such as slider progress, selected index, gesture translation, or calculated progress:

- sliders can update a timeframe, chart, metric, label, gradient, and caution state;
- carousels can scale, focus, and settle with the drag;
- numbers can roll or interpolate when their value changes;
- charts can draw or reshape to explain a projection;
- selected answers can assemble into the final plan or summary.

Update continuous visuals while the user interacts, but change explanatory copy at meaningful thresholds. Use a restrained haptic for selection, snapping, crossing an important threshold, or completing a commitment—not for every animation.

For an approved hold-to-commit moment, let progress follow the press continuously and cancel cleanly on early release. Successful completion may trigger one synchronized haptic, a brief congratulations reveal, restrained confetti, and optional sound. Keep the sequence short, fire it once, and move focus toward the next action. Under Reduce Motion, replace particles with a static or gently revealed success state.

## Choreography rules

- Prefer `action -> feedback -> transformation -> next state`.
- Keep transitions responsive; choreography must not make users wait.
- Distinguish new-content entrance, between-state transformation, and reverse motion.
- Reverse meaningful spatial transitions when navigating back.
- Handle rapid taps, interrupted gestures, early release, changed answers, and recalculated results without stale visual state.
- Give motion hierarchy: one anchor or hero, then restrained supporting motion.
- For design prototypes, animate clearly labelled illustrative values when needed to demonstrate the intended structure. Keep sample data separate from production logic so real formulas and collected data can replace it cleanly.

Respect reduced motion by shortening travel and removing strong parallax, loops, particles, and dramatic scale while preserving state feedback, updated values, and navigation clarity.
