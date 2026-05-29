# The Pastel Prophecy

A mobile-first whimsical pastel tarot web app.

## What’s in this scaffold

- 78-card deck data (`data/cards.js`)
- 3-step reading flow: Begin → Shuffle → Pick 3
- Animated UI: floating cards, shimmer glow, magical shuffle
- Result format aligned to your preference:
  - Brief summary for each of the 3 cards
  - One combined 3-card summary
  - One shared **Do** list + **Don’t** list (for all 3 together)
- Download reading as PNG (`html2canvas`)

## Project structure

- `index.html` — app screens and layout
- `style.css` — pastel visual system + animation
- `script.js` — reading logic and rendering
- `data/cards.js` — card content
- `assets/cards/` — detailed card artworks (SVG/PNG)
- `docs/design-plan.md` — style/design notes

## Local preview

```bash
python3 -m http.server 8000
```

Open: <http://localhost:8000>

## Deploy (GitHub Pages)

This is a static site; deploy directly from the `main` branch root.
After enabling Pages in repo settings, your URL will be:

`https://HelenCAblaza.github.io/pastel-prophecy/`

## Next production steps

1. Add first 3 polished card artworks (The Fool / The Star / The Empress or your preferred trio)
2. Replace placeholder card text with your final oracle voice
3. Add card entry/reveal micro-animations per artwork
4. Ship v1 public reading
