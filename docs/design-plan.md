# The Pastel Prophecy Implementation Plan

> **For Hermes:** Use this plan as the build checklist for the first mobile-friendly prototype.

**Goal:** Build a mobile-first soft watercolor 78-card oracle/tarot-inspired app where the user shuffles, chooses three cards, receives Heart / Path / Magic explanations, gets a combined prophecy, and downloads the reading as a PNG.

**Architecture:** Static GitHub Pages app using vanilla HTML/CSS/JS. Card content lives in `data/cards.js`; UI logic lives in `script.js`; animations and mobile layout live in `style.css`. No backend, accounts, or saved journal for v1.

**Tech Stack:** HTML, CSS, vanilla JavaScript, html2canvas CDN for PNG export, GitHub Pages.

---

## Decisions Locked

- Name: **The Pastel Prophecy**
- Style: soft watercolor, pastel, magical
- Deck: 78 original tarot-inspired cards
- Spread: **Heart / Path / Magic**
- Shuffle: magical swirl/fan animation before picking
- Selection: show 24 face-down mini cards on mobile, mapped from a shuffled 78-card deck
- Animation: card container effects only — flip, glow, shimmer, sparkles, floating
- Save: **Download reading as PNG image only**
- Layout: mobile-first, max app width ~430px, no horizontal scroll

## Build Checklist

1. Create static file structure.
2. Implement 78-card data file.
3. Build home, shuffle, pick, reveal/result screens.
4. Add mobile-first CSS with `100dvh`, 430px max app width, vertical result layout.
5. Add shuffle animation and 24-card selection grid.
6. Add reveal animation for Heart, Path, Magic.
7. Add summary generation from selected card keywords.
8. Add `html2canvas` download button targeting a high-resolution export card.
9. Verify locally on a phone-sized viewport.
10. Initialize git and commit.
11. Create GitHub repo and enable Pages when ready.
