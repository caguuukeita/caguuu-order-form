# CAGUUU Design System — Agent Skill

> Use this skill whenever you are designing **anything** for the CAGUUU brand:
> the storefront, marketing pages, slide decks, banners, app screens,
> packaging mocks. This folder is the canonical source of truth.

## What CAGUUU is

CAGUUU is a Japan-market furniture cross-border e-commerce site (Headless
独立站). The brand promise is **デザイン性 × 実用性 × 快適さ**
(design × practicality × comfort) at a high price-to-performance ratio.
The voice is authoritative, considered, and reassuring — never excited or
peppy. The brand color is a deep green `#1F6862`.

## Where to start

1. **Read `README.md` in this folder fully.** It defines content fundamentals
   (Japanese-first, polite forms, no emoji, half-width numerals), visual
   foundations (color, type, spacing, radii, shadows, layout), and
   iconography conventions.
2. **Link `colors_and_type.css`** in any HTML deliverable — it ships all
   tokens as CSS custom properties (`--brand-700`, `--font-jp`, `--radius-lg`,
   etc.) plus semantic text classes (`.t-h1`, `.t-body`, `.t-price`).
3. **Reference `ui_kits/website/index.html`** as the pixel-fidelity example.
   It composes the real CAGUUU layout patterns: utility bar, sticky header
   with search pill, warm-cream hero, promo strip, category grid, SALE
   product cards, best-seller rail on `--brand-900`, brand-promise band,
   editorial bento, dense footer.
4. **Browse `preview/*.html`** for individual component cards: buttons,
   tags, inputs, product cards, color and type scales, spacing, radii,
   shadows, icons, logo. Each is a small self-contained HTML file you can
   copy from.
5. **Use SVGs in `assets/icons/`** for iconography. The set is 24×24,
   2px stroke, single-color `currentColor`. If you need a glyph that isn't
   here, copy the closest **Lucide line icon** at the same stroke weight
   and flag the substitution. Do not invent emoji substitutes.

## Hard rules

- **Japanese-first copy.** Headlines like "新生活の SALE", "おすすめ ITEM".
  Latin nouns stay uppercase for marketing tokens. No first person ("we",
  "私たち"). The shopper is "お客様", never "あなた".
- **Half-width numerals and prices.** `¥9,800`, never `￥９,８００`.
- **No emoji in production UI.** The icon system replaces them.
- **Greens, cream, sale-red — that's the palette.** Don't introduce new
  hues. SALE red `#F52A34` is reserved for price emphasis. Best-seller is
  gold (`#E5B812` / `#FFFCE6`), not red.
- **Flat surfaces, hairline strokes.** Cards use `1px solid #E9EBEB` + 10px
  radius + white fill. Only marketing heroes use a tinted shadow
  (`--shadow-card` / `--shadow-brand`).
- **Radii step 2 → 3 → 5 → 10 → 20 → pill.** Never 12 or 16.
- **No gradients in chrome.** Backgrounds are solid: white, `#F2F5F5`,
  `#F3EADB` (hero), or full-bleed photo with a 65% black scrim.
- **Restrained motion.** 200–300ms ease-out slides. No bounces, no parallax.

## Common deliverables

| Deliverable             | Anchor file                                          |
| ----------------------- | ---------------------------------------------------- |
| Storefront / e-commerce | `ui_kits/website/index.html`                         |
| Marketing slide / deck  | tokens via `colors_and_type.css`; pull hero + tag patterns from the UI kit |
| Mobile / SP layout      | use 375 frame, 12–16px gutter; same tokens           |
| Banner / hero promo     | `--warm-cream` background, JP+Latin headline, `--brand-700` CTA |

## When something is missing

- **Icon not in `assets/icons/`** → use closest Lucide line icon, document.
- **Fonts:** Brand fonts **LINE Seed JP** (Japanese) and **ITC Avant Garde
  Gothic** (Latin/numerals) are self-hosted in `fonts/` and loaded via
  `@font-face` in `colors_and_type.css`. Hiragino / system sans-serif are
  the fallbacks.
- **Brand guideline PDF (`ブランドガイドライン-A.pdf`)** could not be auto-
  parsed (filename encoding); voice direction is taken from the Figma file
  and the user brief.
