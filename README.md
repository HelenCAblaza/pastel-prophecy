# The Pastel Prophecy

A mobile-first whimsical pastel tarot web app with multilingual readings.

## Live site

- https://helencablaza.github.io/pastel-prophecy/
- If you see an old version, use: https://helencablaza.github.io/pastel-prophecy/?nocache=1

## What’s in this app

- 78-card deck data (`data/cards.js`)
- Full 78-card original artwork set enabled (`assets/cards/**` SVG)
- 3-step reading flow: Begin → Shuffle → Pick 3
- Animated UI: floating cards, shimmer glow, magical shuffle
- Multilingual reading support:
  - English, Thai, and German UI / reading text
  - English is the default language
  - Card names stay in English across all languages
  - Top-right language switcher with gold ombre flag buttons
- Thai typography polish:
  - Uses the `Prompt` font when Thai is active
  - Thai text sizing is slightly reduced for better mobile readability
- Mobile layout polish:
  - Fixed top-right language controls with extra top spacing to avoid text overlap
  - Result background stays locked while the result panel scrolls internally
  - Lightened result ombre overlay for a softer reveal screen
- Result format aligned to your preference:
  - Brief summary for each of the 3 cards
  - One combined 3-card summary
  - One shared **Do** list + **Don’t** list (for all 3 together)
- Download reading as PNG (`html2canvas`)
- Updated tarot copy polish:
  - Rewritten card meanings based on original tarot correspondences
  - More tarot-authentic shared 3-card summary / guidance wording

## Project structure

- `index.html` — app screens and layout
- `style.css` — pastel visual system + animation
- `script.js` — reading logic and rendering
- `data/cards.js` — card content
- `data/localization.js` — language strings and localized reading helpers
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

If `script.js` imports a cache-busted module, bump that too, for example:
- `./data/cards.js?v=N`
- `./data/localization.js?v=N`

Then commit and push.

## Current live build notes

- Live site: https://helencablaza.github.io/pastel-prophecy/
- Multilingual build includes:
  - `style.css?v=39`
  - `script.js?v=83`
  - `data/localization.js?v=3`
