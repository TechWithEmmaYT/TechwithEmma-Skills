---
name: react-native-motion
description: Design and implement polished motion systems, transitions, gestures, scroll interactions, micro-interactions, animated data, shaders, and signature interactions for React Native and Expo apps. Use when an app or screen needs animation, motion polish, premium interaction design, Reanimated, Gesture Handler, Skia, animated transitions, sticky or collapsing headers, gesture-driven UI, or improved interaction quality.
---

# React Native Motion

Design motion as part of the product experience, then implement it with the
simplest production-safe React Native technique that preserves the intended
interaction.

Do not add animation merely because a screen feels static.

Think:

**Product → Motion Identity → Attention Moment → Motion Concept → Ingredients
→ Choreography → Implementation → Polish**

## Inspect first

Before changing code, inspect:

- Expo and React Native versions;
- New Architecture status;
- navigation setup;
- existing animation libraries;
- installed native dependencies;
- design system;
- affected screens and components;
- existing gestures, sheets, scroll views, lists, and navigation transitions.

Do not reinstall or replace working animation infrastructure unnecessarily.

Infer the app's motion personality from its product and visual design.

## Design motion before coding

Read `references/motion-concept.md`.

Identify the small number of moments where motion will materially improve:

- hierarchy;
- feedback;
- continuity;
- progress;
- spatial understanding;
- delight;
- product personality.

Prefer 1–3 memorable signature interactions plus restrained supporting motion
over animating every element.

Do not default to generic fade-up entrances.

For each important interaction, define:

**User intent → motion behavior → visual response → completion state**

## Show the motion blueprint

Read `references/motion-blueprint.md`.

Before changing code, show a concise motion blueprint covering the motion
identity, signature interaction, restrained supporting motion, implementation
choice and reduced-motion behavior.

Wait for approval unless the user already approved the motion direction or
explicitly asked to implement it. If the user requested only a blueprint, stop
before editing code.

Generate a visual blueprint only when the user asks for one or when a complex
interaction is materially easier to evaluate as sequential frames. A blueprint
image is a storyboard, not a substitute for runtime verification.

## Select motion patterns

Read `references/motion-patterns.md`.

For onboarding, quizzes, personalization, or plan-building journeys, also read `references/onboarding-choreography.md`. Choreograph answers, calculations, charts, carousels, imagery, progress, and result states as one continuous journey rather than replaying a generic entrance on every screen.

Consider appropriate combinations of:

- micro-interaction;
- gesture and physics;
- scroll and sticky motion;
- transform and morph;
- navigation container;
- screen transition;
- loading and processing;
- data and progress;
- gradient and atmosphere;
- reward and completion.

Motion patterns are ingredients, not presets.

Adapt them to the app.

## Reuse strong primitives

Read `references/motion-resources.md` before implementing complex motion
infrastructure.

Prefer a mature component when it already solves difficult infrastructure such
as:

- bottom-sheet gestures;
- animated numeric values;
- reorderable lists;
- interactive graphs;
- collapsing headers;
- marquees;
- shader primitives.

Customize the product-specific choreography and appearance around the primitive.

Do not rebuild mature infrastructure merely to make it custom.

## Choose implementation

Read `references/implementation.md`.

Prefer Reanimated for interactive and continuous motion when compatible with
the project.

Use Gesture Handler for direct manipulation.

Use Skia or shader libraries only when custom GPU rendering materially improves
the concept.

Use React Native Animated or LayoutAnimation when they are sufficient and
simpler.

Do not install dependencies until compatibility with the current project has
been checked.

## Build from shared inputs

Prefer one meaningful animation input to drive multiple coordinated responses.

Examples:

- scroll progress;
- gesture translation;
- press progress;
- animation progress;
- selected index;
- processing progress.

Derive related transforms, opacity, blur, scale, color, gradient, path or
content changes from that shared state.

Avoid unrelated animations firing independently when they represent one event.

## Preserve continuity

When navigating between related states, inspect whether an object, image,
title, card, control or spatial relationship can visually persist through the
transition.

Prefer meaningful continuity over arbitrary screen-slide animations.

## Keep motion interruptible

Gesture-driven and interactive animations should respond naturally when:

- the user reverses direction;
- releases early;
- crosses a threshold;
- cancels;
- navigates away;
- rapidly repeats the interaction.

Preserve velocity where appropriate.

## Performance and accessibility

Read `references/performance-accessibility.md`.

Keep continuous interaction off expensive React render paths when possible.

Respect reduced-motion preferences.

Do not remove essential feedback in reduced-motion mode; reduce distance,
rotation, parallax, looping and dramatic effects while preserving state
communication.

Verify motion on real iOS and Android devices when possible.

## Handoff

Keep the final report concise.

State:

- motion identity;
- signature interactions added;
- supporting motion added;
- libraries or primitives used;
- files changed;
- dependencies installed;
- performance/accessibility checks;
- device/platform checks still outstanding.
