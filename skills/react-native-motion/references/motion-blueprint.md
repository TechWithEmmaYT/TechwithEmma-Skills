# Motion Blueprint

Use this reference after inspecting the app and before changing code.

The blueprint should make the intended experience easy to approve without
becoming a long animation specification.

## Concise report

Show:

- **Motion identity:** three or four qualities inferred from the product.
- **Attention moment:** the one product moment that most deserves motion.
- **Signature interaction:** one short sequence from user intent to resolved state.
- **Supporting motion:** no more than three restrained supporting interactions.
- **Implementation:** the likely primitive or library and why it fits.
- **Reduced motion:** how hierarchy, state and feedback remain clear with less movement.

State any dependency or native-build consequence before installation.

Do not provide frame-by-frame numbers, easing tables or long code samples unless
the user asks for them.

## Visual blueprint

Create a visual blueprint only when requested or when sequential frames make a
complex motion materially easier to judge.

If an image-capable model is available, use this skill directly with the
inspected app and its real screenshots or designs. Do not first expose a long
generated prompt. Direct skill use preserves more product and motion context.

Create one clean storyboard board with four to six sequential keyframes:

1. resting state;
2. user input or gesture;
3. continuous response;
4. threshold or transformation;
5. resolved state;
6. optional interruption or reverse state.

Keep the same device, interface, content and visual identity across frames.
Use short labels, arrows or a progress line only when they clarify timing or
continuity. Show what changes and what remains spatially anchored.

Do not redesign the app, invent unrelated screens, copy a reference product's
visual skin, or present decorative motion as the signature interaction.

When direct image generation is unavailable, recommend using the skill in an
image-capable model. If that is impossible, provide one concise external prompt
that carries the same storyboard constraints.

## Approval boundary

If the user asked only for the report or blueprint image, stop after delivery.
Otherwise, wait for approval unless implementation of the proposed direction
was already explicitly requested.
