# Bundled sound effects

16 CC0 files, 107 KB. A floor, not a palette — enough to score a film without silence while
you decide whether to synthesize or source something better. See
`references/assets-and-generation.md` for that choice.

| Folder | Files | Use for |
| --- | --- | --- |
| `click/` | `click-1…3` | a press, a selection, a cursor action |
| `land/` | `land-1…3` | an element arriving, a card dropping into place |
| `hit/` | `cut-1`, `cut-2` | a hard cut or a reveal — the safe default |
| | `payoff-1`, `payoff-2` | success, the logo, the final lockup |
| `type/` | `key-1…6` | per-character typing |

All between 0.01s and 1.5s. `payoff-1` is the longest at 1.48s — give it room.

## Two rules

**Vary the keypress.** One sound repeated per character is a machine typing, not a person.
Index into `key-1…6` from the character position so the render stays deterministic:

```js
const key = KEYS[(i * 7 + 3) % KEYS.length];   // not Math.random()
```

**Put the cue at the start of the motion**, not its resolution — click at the press, `payoff`
when the thing actually lands.

## Licence

CC0 1.0, public domain. No attribution required, though crediting is good practice.

- `click/` `land/` `hit/` — [Kenney](https://kenney.nl/)
- `type/` — [Keyboard Soundpack #1](https://opengameart.org/content/keyboard-soundpack-1-typing-and-single-keystrokes)
  by unicae_games, re-encoded from WAV to Ogg

No music is bundled: royalty-free beds vary in redistribution terms per track, so supply one
with the brief or synthesize the score.

Copy what a film uses into that project rather than referencing this directory from a render.
