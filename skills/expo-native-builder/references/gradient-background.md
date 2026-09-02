# Product-specific backgrounds and gradients

Choose the background from the user's direction, supplied references, existing design system, and product character. Plain semantic surfaces, photography/illustration, and restrained gradients are all valid. A gradient is optional—not a requirement for onboarding, plans, paywalls, or premium quality.

When a gradient is chosen, use one hue family and two or three neighboring stops. Put stronger color behind the hero or atmosphere and resolve toward a quieter reading/control surface. Prefer one base gradient plus at most one localized wash. Keep cards readable and primary controls solid unless a gradient control is explicitly approved.

For a connected flow, mount the approved background once in the group layout over an opaque semantic fallback and keep route scenes transparent. It may evolve subtly through internal content/state animation without flashing between routes. Content remains inside safe areas while atmosphere may extend edge to edge.

Use the project's existing primitive or `expo-linear-gradient`. Use SVG, Skia, mesh gradients, or shaders only when already supported or explicitly justified, and ask before adding dependencies.

Verify contrast, banding, theme changes, transparent scenes, loading, Reduce Motion, and lower-end Android performance. Remove a gradient that competes with content or makes the product feel generic.
