# Motion Patterns

Use these as interaction families, not copy-paste presets.

Combine patterns when they describe one coherent user interaction.

## Micro interaction

Use for immediate feedback:

- press compression;
- icon morph;
- toggle;
- favorite;
- checkbox;
- selected state;
- focus;
- contextual action;
- counter change.

Motion should begin immediately and settle quickly.

## Scroll and sticky

Use scroll as a continuous input.

Patterns include:

- collapsing hero;
- large title → compact title;
- sticky header;
- sticky CTA;
- sticky filter;
- progressive blur;
- progressive background change;
- parallax;
- card depth;
- scroll-aware navigation;
- section locking;
- scroll-linked progress.

A collapsing header is one movement, not two headers.

Identify what persists between the expanded and compact states — usually an
image, a title, an avatar or a control — and travel, scale and recolor the
same element into its compact slot.

Supporting content such as subtitles, stats and secondary actions is the only
part that should be allowed to leave.

Let the surface resolve underneath the persisting elements, with background,
border, blur and depth arriving as the collapse completes.

Anchor navigation controls in place and animate only their tint, so the back
affordance is never lost.

Let overscroll stretch the hero rather than reveal a gap behind it.

Do not cross-fade an expanded header out and a compact header in.

Sticky motion should preserve hierarchy and continuity, not merely show off an
interpolation.

## Gesture and physics

Patterns include:

- drag;
- swipe;
- overscroll;
- pull;
- stretch;
- resistance;
- magnetic attraction;
- threshold;
- snap;
- velocity continuation;
- recoil;
- reorder.

The visual response should follow the finger continuously.

Preserve release velocity when it contributes to believable motion.

## Transform and morph

Use when one state logically becomes another:

- card → detail;
- image → viewer;
- button → sheet;
- compact → expanded;
- selection → editor;
- thumbnail → full content;
- morphing controls;
- masking;
- reveal;
- split;
- merge;
- fold;
- 3D perspective.

Prefer spatial continuity over arbitrary screen replacement.

## Navigation container

Use when a surface and the content behind it move as one spatial system:

- drawer;
- side navigation;
- bottom sheet;
- expandable panel;
- modal surface;
- stacked card;
- peek and commit.

Derive translation, scale, corner radius, clipping, overlay, depth and
supporting content from one shared interaction progress.

The background is not a backdrop. It is the other half of the same movement.

Prefer direct manipulation. The surface should follow the gesture continuously.

Preserve velocity, thresholds, interruption and reversal.

Supporting content such as navigation items, headers and controls should enter
as a window on the same progress, not as a sequence played after opening.

Do not reduce an interactive container to a canned slide-in animation.

## Transition

Treat navigation transitions as interaction design.

Ask what persists between source and destination.

Coordinate shared:

- imagery;
- title;
- surface;
- position;
- scale;
- visual hierarchy.

Do not use the same slide transition for every relationship.

## Loading and processing

Waiting should communicate what the product is doing.

Patterns include:

- shimmer;
- scan sweep;
- processing gradient;
- progress ring;
- skeleton;
- staged reveal;
- transformation;
- animated status;
- completion transition.

Avoid replacing every waiting state with a spinner.

## Data and progress

Patterns include:

- rolling numbers;
- graph interpolation;
- scrubbed graphs;
- progress rings;
- timeline motion;
- live status;
- counters;
- streak advancement;
- progress bars.

Data animation should improve comprehension, not obscure exact values.

## Gradient motion

Gradients may be functional motion.

Use:

- responsive gradient;
- animated mesh;
- moving highlight;
- border gradient;
- state transition gradient;
- processing sweep;
- atmospheric background.

Tie gradient motion to product state when possible.

Do not make every premium interface an aurora.

## Atmospheric motion

Potential ingredients:

- shader ripple;
- liquid distortion;
- light rays;
- subtle glow movement;
- grain;
- blur;
- particles;
- fluid surfaces;
- slow breathing fields.

Use atmospheric motion primarily for identity or hero moments.

It should not compete with content.

## Reward and completion

Combine:

- transition;
- progress update;
- haptic;
- subtle particle or shape response;
- next-state focus.

Celebration intensity should match the importance of the achievement.

## Pattern rule

Do not ask:

"Which animation looks cool?"

Ask:

"Which motion behavior explains or strengthens this interaction?"