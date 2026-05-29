# Pastel Prophecy — Animation Direction

## Global motion style
- Slow, floaty, magical (no fast/snappy motion)
- 3D-ish softness: tiny scale breathing + glow pulse
- Keep readability first

## Reveal sequence (3-card spread)
1. Card back shimmer (400ms)
2. Soft flip (600ms)
3. Glow bloom (500ms)
4. Sparkle drift loop (subtle, continuous)

## Per-card subtle loops
- Major Arcana: stronger aura pulse + occasional star twinkle
- Wands: warm ember sparkle drift
- Cups: water ripple highlight sweep
- Swords: faint wind ribbon pass
- Pentacles: soft leaf/coin glint

## Timing tokens
- --dur-float: 5.5s
- --dur-pulse: 3.2s
- --dur-twinkle: 4.4s
- --easing-magic: cubic-bezier(0.22, 0.8, 0.2, 1)

## Accessibility
- Respect prefers-reduced-motion
- Keep motion amplitude low on mobile

## Export note
For downloaded PNG, freeze animation states before capture to avoid blur artifacts.
