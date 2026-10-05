# Product choreography

Use for launch films and UI demonstrations. Preserve the product's identity while directing the viewer's attention.

## Show a complete task

Find the actual entry → action → result flow in the app, source components or observed demo. Centre the film on that flow rather than a succession of landing-page claims. Reuse real components and assets where possible; faithfully reconstruct observed states only when reuse is impractical. Record invented illustrative content and never invent functionality or claims.

Before choosing scenes, identify what the product does, who benefits, its strongest observable result, its visual hook and the real workflow worth demonstrating. Inspect feature routes, components and example inputs/outputs as well as the marketing page. If there is no working app, use the strongest authentic product visual instead of fabricating a workflow.

For each scene, write: initial state, action, component response, result, settled hold, next-scene connection. Animate each state from timeline time so seeking does not require live typing, a network request or prior playback.

## Plan interactions explicitly

Mark each storyboard scene with its sequential reveals and simulated interactions: what appears, in which order, what the user does, and what changes. Specify a cursor selecting a result or a file becoming an output, rather than writing only "feature reveal" and expecting the renderer to invent the demonstration. Keep marketing claims as framing around the working task.

## Layout before motion

Build each scene at its most informative, fully visible moment before adding motion. Check text wrapping, padding, clipping, hierarchy and intended overlaps at delivery size. Then derive entrances and transformations from that layout. In Canvas, use shared layout measurements and text metrics; in HTML, use the actual rendered component bounds. Do not guess where moving elements will eventually land.

## Input and component behaviour

For typing: cursor arrives → focus appears → placeholder clears → text types with a stable origin and caret → submit responds → processing → useful output → reading hold. Omit stages only when the actual interaction does not require them. Keep text clipped inside the field; define wrapping or horizontal scrolling, padding, caret position and disabled/loading states. Cursor position must match the control when it responds. Never type over a screenshot that still contains the old placeholder or duplicate text.

Build reusable scene components in the chosen renderer for the interactions the film actually needs: input, button, cursor, message, loader, result card or menu. Give each explicit time-driven states and dimensions. A text-reveal helper alone is not an input component. Test one complete interaction before repeating it throughout the film.

## Opening and continuity

Choose the audience question first. Identity, a typed request, a surprising result or a metaphor can all open a film. Develop one connected visual idea: for example, a URL grows into many links, the links become app icons, and the icons collect into a store. Reuse visual tokens across that transformation so the story remains legible.

At a transition specify the outgoing state, incoming state, shared object, its position/scale, duration and content handoff. Preserve continuity where intended. Separate outgoing and incoming text or mask it to avoid double exposure. For two busy layouts, avoid overlapping full-opacity content through a crossfade: clear the old content first, mask the handoff, or briefly pass through the background. Choose restrained fades for quiet scenes, direct cuts for sharp changes and wipes or spatial moves when they explain a relationship. Cut directly when continuity adds no meaning. Move the camera to reveal information, not merely to keep pixels moving.

## Make scenes flow into one another

Plan adjacent scenes as a continuous sequence of states before coding them separately. The transition is part of the action. For each boundary, record:

- What the viewer understands before and after it.
- Which object, shape, text fragment or spatial anchor survives.
- Its outgoing and incoming position, scale, shape and motion direction.
- What transforms, what leaves and what becomes visible; their overlap and timing.
- Where attention lands and how long the new result holds.

Use a relationship that fits the product:

- **Object continuity:** typed text becomes the submitted message in the same conversation.
- **Shape transformation:** an input pill expands into a result card while its content changes.
- **Camera reveal:** pull back from a control to show the application around it, or move into a result until it fills the frame.
- **Travelling object:** a file or card moves into the next arrangement and leads the eye there.
- **Collection and expansion:** individual items gather into a system; the system opens to reveal a selected item.
- **Action resolution:** progress becomes completion and then the output, instead of cutting to an unrelated success slide.
- **Graphic match:** a contour, colour or aligned element links two different views when a literal morph is unnecessary.

Example flow: caret types → field expands → text becomes a message → response grows below → result card opens → camera enters its content. Adapt the chain to the actual product rather than repeating this sequence in every film.

Implement a shared object once across the boundary, or match its boundary geometry and timing explicitly. Keep velocity continuous when the move is meant to continue; deliberately settle it when attention should pause. Clip or hand off text before shapes become too small to contain it. For a camera move, transform the scene coherently instead of moving each element on unrelated curves. Derive all intermediate states from timeline time so random seeks reproduce them.

Avoid independently finishing scenes and adding a random wipe afterward. Use a small, consistent transition vocabulary. Deliberate cuts can mark a new chapter, and stillness can let an outcome register. Flow means visual and narrative continuity, not constant motion or a morph at every boundary.

## Reading and review

Budget reading time after all required text has settled: approximately 0.8 seconds for a short label and 0.3 seconds per word for a sentence, adjusted for complexity. Keep the result visible long enough to understand it. Beat alignment must not shorten that hold.

Render a short motion proof of the opening, hardest interaction and one join before extending the film. Inspect a full draft animatic plus samples before, during and after joins. Check focus/caret behaviour, action-response order, text clipping, result visibility and continuity. Inspect boundary frames for duplicated objects, position/scale jumps, mismatched motion direction, blank gaps and a camera reset that breaks orientation. Compare a direct seek with sequential playback at important intermediate states. If only stills can be inspected, explicitly leave motion quality unverified. Measure sound and distinguish measurements from actual listening.
