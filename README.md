# The Pastel Prophecy

A mobile-first whimsical pastel tarot web app.

## Live site

- https://helencablaza.github.io/pastel-prophecy/
- If you see an old version, use: https://helencablaza.github.io/pastel-prophecy/?nocache=1

## What’s in this scaffold

- 78-card deck data (`data/cards.js`)
- Full 78-card original artwork set enabled (`assets/cards/**` SVG)
- 3-step reading flow: Begin → Shuffle → Pick 3
- Animated UI: floating cards, shimmer glow, magical shuffle
- Result format aligned to your preference:
  - Brief summary for each of the 3 cards
  - One combined 3-card summary
  - One shared **Do** list + **Don’t** list (for all 3 together)
- Download reading as PNG (`html2canvas`)
- First detailed artwork cards enabled:
  - The First Sparkle
  - The Moonlit Unicorn
  - The Crystal Crown

## Project structure

- `index.html` — app screens and layout
- `style.css` — pastel visual system + animation
- `script.js` — reading logic and rendering
- `data/cards.js` — card content
- `assets/cards/` — detailed card artworks (SVG/PNG)
- `docs/design-plan.md` — style/design notes
- `docs/pastel-prophecy-78-card-prompts.md` — full original prompt pack
- `docs/animation-direction.md` — animation blueprint

## Local preview

```bash
python3 -m http.server 8000
```

Open: <http://localhost:8000>

## Deploy (GitHub Pages)

This static app deploys from the `main` branch root.

## Cache-busting workflow (important)

After JS/CSS updates, bump query versions in `index.html`:
- `style.css?v=N`
- `script.js?v=N`

Then commit and push.
