# Premium Gradient Backgrounds

Build clean atmosphere and hierarchy, not a colourful effect. Premium usually means one hue family, controlled contrast, generous plain space, and an intentional transition into the content surface.

When a user requests a gradient without naming a component, make it the screen or flow background first. Keep controls and primary buttons solid unless a gradient control was explicitly approved.

## Compose it

1. Choose the page surface and one brand hue.
2. Decide where attention begins and where reading or controls need visual rest.
3. Create two or three neighbouring stops by adjusting the brand hue's lightness and saturation; do not introduce unrelated hues.
4. Place the strongest colour behind the hero or empty atmosphere, then resolve toward the page surface behind dense content.
5. Add a separate localized wash only when an image or fixed footer needs contrast.

Use direction to support composition: vertical for hero-to-content journeys, a restrained diagonal for directional energy, and radial or mesh treatment only when the approved brand language needs a focal glow. Do not choose an angle merely to make the gradient visible.

## Use a fitting recipe

### Clean light atmosphere

Start with a soft brand tint, pass through a lighter tint, and end at the semantic background. A useful structure is three stops near `[0, 0.45, 1]`, with the coloured field occupying roughly the upper half before disappearing into the content surface. Pair it with dark text, opaque light cards, and one solid brand CTA.

### Deep tonal atmosphere

Move between two close dark shades of one hue family. Keep the lightness difference small enough that the background reads as depth rather than stripes. Use off-white text, low-contrast dark surfaces, and one clear light or saturated CTA.

### Image-led wash

Let the image provide the colour. Overlay transparent colour near the focal subject and increase toward the base surface behind text or actions. Keep the subject clear; localize the wash to the lower or upper content zone instead of dimming the whole image.

### Sticky content fade

Use a short transparent-to-surface gradient behind a fixed CTA or toolbar so scrolling content disappears naturally. This is a functional fade, not the screen's decoration. End in an opaque semantic surface and keep the action visually separate.

## Layer with restraint

Prefer one base gradient plus at most one wash. Let artwork, typography, and spacing carry the composition. Cards should usually be opaque or softly tinted rather than glassy. Reserve the accent for selection, progress, or the primary action; do not repeat the gradient across cards, badges, icons, and buttons.

For a connected onboarding flow, mount one background in the flow layout and keep scenes transparent. The background may shift subtly with progress, but colour changes should stay within the approved palette and never flash between routes. Keep an opaque semantic fallback underneath.

## Implement and verify

Use the configured Uniwind or NativeWind approach, the project's existing primitive, or `expo-linear-gradient`. Use experimental React Native gradient styles, SVG, Skia, mesh gradients, or shaders only when the exact project supports them and the approved result needs them. Ask before adding dependencies.

Render full-bleed colour outside the safe-area content layer. Verify text and control contrast, banding, image readability, theme changes, transparent navigation scenes, loading, Reduce Motion, and lower-end Android performance. Inspect the complete flow for white flashes, abrupt stop changes, and gradients that compete with the content.
