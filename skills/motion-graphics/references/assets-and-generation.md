# Assets and generation

## Contents

- [Three tiers of asset](#three-tiers-of-asset)
- [Capture the real product](#capture-the-real-product)
- [Extract the brand](#extract-the-brand)
- [Icons and logos](#icons-and-logos)
- [The generator probe](#the-generator-probe)
- [Generate then trace](#generate-then-trace)
- [Voiceover](#voiceover)
- [Free fallbacks](#free-fallbacks)
- [The asset manifest](#the-asset-manifest)

## Three tiers of asset

Most of what appears in a code-rendered film is not an asset at all. Sort every item in the shotlist into one of three tiers before deciding anything needs generating.

**Tier 1 — drawn in code.** Device frames, browser chrome, cursors, UI panels, charts that draw themselves, loaders, toasts, command palettes, badges, coins, arrows, bursts, connector diagrams, simple mascots, gradients, grain, particles, and every piece of type. This is the majority of most films. Drawing is better than sourcing here: the result is resolution-independent, recolourable, animatable per element, and costs nothing.

**Tier 2 — fetched, no key required.** Real product screenshots, the logo, brand colours, fonts, brand icons, reference frames. All obtainable from a live URL with a browser and a few requests.

**Tier 3 — needs a generator or the user.** Photographic images, painterly or illustrated artwork, 3D renders, character sheets, live-action footage, and natural-sounding voiceover. These are the only things that genuinely cannot be produced from the tools this skill assumes.

Work down the tiers. A shot that needs Tier 3 can often be redesigned into Tier 1 without losing anything — a photographic background becomes a drawn gradient field with grain, a character becomes geometry, a stock office shot becomes the product itself.

## Capture the real product

Never redraw a product UI from imagination. An invented screen makes a launch film worthless to the person paying for it, and it is always obvious to anyone who has used the product.

```js
// node capture.mjs https://example.com
import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.goto(process.argv[2], { waitUntil: 'networkidle' });
await page.addStyleTag({ content: '*{animation:none!important;transition:none!important}' });
await page.screenshot({ path: 'assets/home.png' });
await page.locator('[data-testid="sidebar"]').screenshot({ path: 'assets/sidebar.png' });
await browser.close();
```

Capture at `deviceScaleFactor: 2` so the UI survives a camera push. Disable the site's own animations first, or a screenshot lands mid-transition. Take each surface separately as well as whole — animating a cropped panel is far more useful than animating a full page.

Behind a login, ask the user for a screen recording or a set of screenshots rather than guessing, or use a storage state file they provide. Never ask for credentials.

If the product does not exist yet, say so and build the UI from the design handoff, labelling it a concept in the deliverable. A concept film is legitimate; a concept film presented as a product demo is not.

## Extract the brand

Read the brand off the live site instead of asking the user to type hexes:

```js
const brand = await page.evaluate(() => {
  const cs = getComputedStyle(document.documentElement);
  const vars = Array.from(document.styleSheets)
    .flatMap(s => { try { return Array.from(s.cssRules); } catch { return []; } })
    .flatMap(r => Array.from(r.style || []).filter(p => p.startsWith('--')))
    .filter((v, i, a) => a.indexOf(v) === i)
    .map(v => [v, cs.getPropertyValue(v).trim()]);
  return { vars, body: getComputedStyle(document.body).fontFamily };
});
```

Fall back to quantising a screenshot's palette with ffmpeg when the site has no custom properties:

```bash
ffmpeg -i assets/home.png -vf "scale=120:-1,palettegen=max_colors=8" -y assets/palette.png
```

Pull the font family from the computed style and fetch the matching family from Google Fonts. Load it into the page and await `document.fonts.ready` before rendering, or canvas silently substitutes a system face in every frame.

## Icons and logos

The product's own logo comes from `/favicon.svg`, the `og:image`, the nav `<img>`, or a press-kit page — prefer SVG so it stays sharp under a camera push.

Third-party brand marks (model logos, platform icons, integration grids) come from Simple Icons, which ships thousands of brand SVGs with no key. General UI icons come from Lucide. Both are fetchable from a CDN and recolourable, which matters because an icon row that does not share the film's accent looks pasted in.

Respect trademark: use a brand's real mark when showing a genuine integration, and never alter it, imply a partnership that does not exist, or build a competitor comparison the user has not approved.

## The generator probe

Only Tier 3 needs this. Probe in order and stop at the first that works:

1. **A connected image or video MCP server.** Check the available tools before assuming nothing exists — many setups already have one configured. If one is configured but unreachable, say exactly that, rather than silently falling through to a worse option.
2. **API keys in `.env`.** Look for `FAL_KEY`, `REPLICATE_API_TOKEN`, `HIGGSFIELD_API_KEY`, `OPENAI_API_KEY`, `ELEVENLABS_API_KEY`, or a provider the project already uses. Read the key from the environment; never paste one into a prompt, a log, or a committed file. State a budget before spending and prefer one good generation to ten cheap ones.
3. **Free fallbacks** — see below.
4. **Redesign the shot** so the asset is not needed.
5. **Ask the user**, naming the one shot and the one missing thing, with the three options above as alternatives.

Never make a generator a hard dependency. A user with no keys and no MCP server must still get a finished film, and the plan's `<requirements>` block is where any gap gets surfaced before work starts.

## Generate then trace

When a shot needs motion that is painful to hand-code — cloth, liquid, crowds, a character turning — a video model can supply the base motion which is then redrawn in code, so the shipped film shows only the code-drawn layer.

Render the base shot, extract frames with ffmpeg, use them as position and timing reference for drawn geometry, and discard the generated footage. The result keeps a consistent, ownable look across the whole film instead of one photoreal shot sitting awkwardly among drawn ones, and it avoids shipping model output whose provenance and licensing are unclear.

This is an upgrade, never a requirement. Most films never need it.

## Voiceover

Needed only for the short-form explainer; launch films are stronger without narration.

In order of quality: the user's own recording; a TTS API with a key in `.env`; the operating system's built-in speech tool for drafts and timing. A draft voice is enough to lock pacing and caption timing, and it can be replaced later without touching the animation, provided captions are driven from a timing file rather than hardcoded.

Always offer to burn captions regardless of voice quality. Most short-form is watched muted, so the captions are the real soundtrack.

## Free fallbacks

| Need | Fallback, no key |
| --- | --- |
| Photographic background | A drawn gradient field with grain, or a blurred crop of the product's own imagery |
| Illustration or mascot | Geometry: circles, rounded rects, a two-tone palette, springs for personality |
| 3D device | A drawn device frame with the real screenshot masked in, plus a perspective transform |
| Stock photography | Unsplash or Pexels, with attribution and a licence check |
| Music | Synthesized in code, or a royalty-free track the user supplies |
| Voiceover | The operating system's speech tool for a draft, captions always |
| Reference frame | ffmpeg on a local video, or a public poster frame from the post that hosts it |

## The asset manifest

List every asset in `docs/spec.md` before animating: what it is, which tier it came from, where it lives, and whether it is real or representative.

This is the cheapest correction point in the whole production. A user looking at a list of nine filenames spots the wrong dashboard screenshot in two seconds; the same person looking at a finished render spots it after the render has been paid for.

Flag anything representative explicitly, and repeat the list at delivery so nothing invented is mistaken for real.
