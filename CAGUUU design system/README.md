# CAGUUU Design System

> **CAGUUU** is a Japan-market furniture cross-border e-commerce site
> (Headless 独立站). It is a channel brand offering high-cost-performance,
> easy-to-coordinate furniture for modern living. The brand voice is
> **authoritative, considered, and reassuring** — "you made the smart choice"
> — built on a deep green palette (#1F6862) and a calm, warm-cream neutral.
>
> Brand pillars: **デザイン性 × 実用性 × 快適さ** (design × practicality × comfort).
> Categories: リビング / ベッドルーム / ダイニング / 収納.

This folder is the canonical source for designing **anything** in the CAGUUU
brand — production code, throwaway prototypes, slides, presentations, and
marketing assets.

---

## Sources reviewed

| Source                                  | Where to find it                                                                       |
| --------------------------------------- | -------------------------------------------------------------------------------------- |
| Figma: **CAGUUU 独立站-無頭.fig**       | Attached as a mounted virtual filesystem (this chat). Pages: `Fix-Design`, `Draft`, `Design-Library`, `page`. Key frames: `/Design-Library/Mobile-Color`, `/Design-Library/Mobile-Typography`, `/Design-Library/Mobile---Components`, `/Design-Library/PC---Components`, `/Fix-Design/PC/PC`. |
| Brand guideline PDF (`ブランドガイドライン-A.pdf`) | Attached upload. **Caveat:** could not be parsed by tooling due to non-ASCII filename encoding (NFD Japanese). Color/voice direction extracted from Figma + user notes. |
| User brief                              | "深绿色（#1F6862）為主、多种深浅绿色為輔、強調品牌提供高質價比和設計感。" |

---

## Index of this folder

| File / Folder                | What it is                                                                  |
| ---------------------------- | --------------------------------------------------------------------------- |
| `README.md`                  | This file — brand context, fundamentals, iconography.                       |
| `SKILL.md`                   | Agent-Skill entrypoint when this folder is used as a Claude skill.          |
| `colors_and_type.css`        | Source-of-truth CSS variables (color tokens, type tokens, spacing, radii).  |
| `assets/`                    | Logos, hero/product photography lifted from Figma.                          |
| `preview/`                   | Small HTML cards that populate the Design System review tab.                |
| `ui_kits/website/`           | Pixel-fidelity recreation of the CAGUUU storefront (PC + mobile components).|
| `brand-guideline-text.md`    | Extracted text from the brand-guideline PDF (when parseable).               |

---

## CONTENT FUNDAMENTALS

CAGUUU's copy is **Japanese-first**, written for adult shoppers furnishing
their first or second home. The voice combines department-store politeness
with the directness of a discount channel.

### Tone

- **Authoritative but warm.** Statements of fact, not enthusiasm. Avoid
  exclamation marks except in promotional banners.
- **Reassuring expertise.** Lean on numbers, badges, and category guarantees
  ("送料無料 ¥9,800〜", "30日間返品保証", "#1 ベストセラー") rather than
  adjectives. Specificity is the brand.
- **No first person.** Copy speaks *to* the user using polite forms
  (お客様 / ご注文 / 〜いただけます) — never "we" or 私たち as a narrator.
- **The shopper is "お客様"**, not あなた.

### Casing & punctuation

- Headlines are **Title-style Japanese** with **English nouns left in Latin**
  (e.g. "新生活の SALE", "おすすめ ITEM"). Latin is uppercase for catchphrases.
- Numerals and prices are always **half-width** (`¥9,800`, not `￥９,８００`).
- Use `〜` (full-width tilde) for ranges: `¥9,800〜`.
- **No emoji.** The brand uses iconography (line + filled SVG) instead. Never
  substitute emoji for an icon in product copy or UI.
- Unicode glyphs used inline: `×` (collaboration: `CAGUUU × 本田圭佑`), `#` for
  rankings, `★` reserved for review stars (component, not character).
- Sentence endings are usually full-stop omitted in UI; long-form copy uses 「。」.

### Example phrases lifted from the Figma

| Surface          | Copy                                            |
| ---------------- | ----------------------------------------------- |
| Search placeholder | `キーワードサジェスト` / `キーワード`           |
| Nav items        | `商品を探す` `おすすめ` `SALE` `ベストセラー` `店舗リスト` `サポート` `サービス` `法人様向け` |
| Promo tag        | `特急` (express shipping)                       |
| Best-seller tag  | `#1 ベストセラー`                               |
| Cover headline   | `Headless独立站项目` (internal — not customer-facing) |
| Collaboration    | `CAGUUU × 本田圭佑`                             |

When inventing new copy, **stay in this register**: short Japanese phrases,
Latin tokens for marketing labels, numerals for promise-keeping.

---

## VISUAL FOUNDATIONS

### Color

- **Primary green `#1F6862`** anchors the brand. It appears as button fills,
  outline accents on inputs (`#399E96` border on focus), and large
  marketing-frame backgrounds (the Figma "Cover" frame uses `#399E96`).
- **Two-tone green system**: a deep `#1F6862 → #1D5657` gradient for shadow
  zones, and a mint `#EBF7F5 → #C0DED8` gradient for soft surfaces.
- **Warm cream `#F3EADB`** is the only non-green brand surface — used behind
  hero photography so wood-toned furniture reads correctly.
- **Sale red `#F52A34`** is the single accent for price emphasis and SALE tags.
  Never used as a brand color, only as a CTA accent. Best-seller uses gold
  `#B07604` / `#FFFCE6` instead.
- **Grayscale is cool** (`#232424` text, `#F2F5F5` surface, no warm grays).
- **Cover scrims** at 45/65/80% black are pre-defined for photo overlays.

### Typography

- **Japanese:** **LINE Seed JP** — Rg (400) body, Bd (700) emphasis,
  Eb (800) display. Hiragino Sans fallback on systems without the brand
  font. Body default **14px / 1.5 line-height**.
- **Latin & numerals:** **ITC Avant Garde Gothic** — Book (400) inline,
  Demi (600) labels, Bold (700) prices/wordmark; ExtraLight (200) reserved
  for editorial display moments.
- **Display moments:** The wordmark uses ITC Avant Garde Gothic Bold,
  uppercase, with `0.08–0.12em` letter-spacing. Avoid serif faces and
  avoid script display fonts.
- **Use case map** (from Figma): 20px Bold = Heading1; 18px Bold = Heading2;
  16px Bold = Label; 14px Regular/Bold = body & UI label; 12px Regular = caption;
  10–11px = micro / tag interior text.

### Backgrounds & imagery

- **No gradients in chrome.** Backgrounds are either solid white, the cool
  `#F2F5F5`, the warm `#F3EADB` (hero), or full-bleed photography.
- **Imagery is warm, naturally lit interior photography.** Wood tones,
  off-white walls, beige textiles. No grain, no b&w, no heavy filters. Photos
  bleed to the edge of their card; aspect ratios are mostly square (1:1) or
  wide (4:3).
- **Decorative shapes are absent.** No noise textures, no hand-drawn
  illustrations, no abstract blobs. Brand mark + product photo do the work.
- **Cover scrims** appear on hero promos — a flat black at 65% is the canonical
  "text-over-photo" overlay.

### Animation

- Movement is restrained. Hover and press states are **color shifts**, not
  motion. Where motion exists (carousels, drawers), it's a 200–300ms
  `ease-out` slide. **No bounces, no parallax, no marquee.**

### Hover / press / focus

- **Hover (PC):** primary buttons darken from `#1F6862` to `#1B4D48`; line
  buttons fill in with `#E9F7F7` and keep their `#399E96` border.
- **Press:** scale stays at 1.0; instead, the fill drops one shade further
  (`#0F3E3A`) for 100ms.
- **Focus:** 1px solid `#399E96` border (visible on inputs in the Figma
  search bar).
- **Link/text-button hover:** color shift to `--brand-500` with no underline
  flash; underline appears only on `<a>` inside long-form copy.

### Borders & dividers

- Card stroke is `1px solid #E9EBEB` (almost-white hairline). Stronger
  separators use `#D7D9D9`.
- **Top-level page sections separate with whitespace, not rules.** Rules
  appear only inside dense lists (account, settings, line items).

### Shadow system

- The site is **flat**. Cards use stroke + a tiny `0 2px 8px rgba(31,104,98,0.08)`
  brand-tinted shadow when they lift. Toasts and popovers get `--shadow-3`.
- **No outer drop shadows on buttons.** Brand CTA uses `--shadow-brand` only
  in marketing hero contexts (PC banners).

### Layout

- **PC grid:** 1440 frame, 1280 content. Common section widths: 1280, 1200,
  960. Header is sticky 60px.
- **SP grid:** 375 frame, 12–16px gutter. Sticky header is 44–56px.
- The footer is heavyweight and dense — payment logos, region picker, ISO
  badges — never minimal.

### Transparency & blur

- Avoid backdrop-blur in the chrome. The only translucent surface is the
  black cover scrim over hero photos.

### Corner radii

- **Tags / badges: 2px.** Small, sharp, like a print sticker.
- **Buttons:** fully pill (`9999px`) — primary, line, sale, ghost variants
  all share the same rounded shape.
- **Cards: 5–10px** depending on density; **hero cards: 20px**.
- The brand never uses 12px or 16px radii — the system steps from 10 to 20.

### Cards

Cards = `1px solid #E9EBEB` stroke + `10px` radius + white fill + image-led
content. No drop shadow at rest. On hover, a tiny lift via `--shadow-card`.

---

## ICONOGRAPHY

CAGUUU uses a **single proprietary SVG icon set** of ~120 glyphs, organised
in the Figma file under `/Design-Library/Mobile-Icons/` and
`/Design-Library/components/<Name>/`. Categories:

- `direction-*` — chevrons, arrows, sort markers, expand/shrink.
- `general-*` — domain glyphs (`cart`, `account`, `home`, `truck`, `shop`,
  `gift`, `coupon`, `crown`, `vrroom`, `mycoordi`, etc.). Most have both a
  **line** and a **fill** variant (`*Fill` suffix).
- `tips-*` — info/check/close/quiz feedback icons.
- `interactive-button/*` — `heart`, `star`, `star-fill`, `star-half`, `share`,
  `more`, `eye` — anything the user can tap.

**Style:** 2px stroke, rounded line ends, **24×24 default**, **20/18/16/14/12/10**
size variants exist as wrapper components (`Size24`, `Size20`, …). Icons are
single-color and inherit currentColor; never multi-color, never gradient.

- **No icon font.** Glyphs ship as standalone SVG files referenced by name.
- **No emoji.** If you need a glyph that isn't in the set, copy the closest
  Lucide line icon at the same stroke weight and flag the substitution.
- **Unicode characters used as glyphs:** only `×` (close/collab marker) and
  `#` (ranking). Stars use the `interactive-button/star-fill` SVG, not `★`.

When prototyping outside the Figma context, **Lucide line icons** (CDN:
`https://unpkg.com/lucide-static@latest/`) are the closest visual match —
2px stroke, rounded line caps. Substitute and document.

---

## Caveats

- The brand-guideline PDF could not be auto-parsed (filename encoding); brand
  voice direction is taken from the user brief + Figma surfaces.
- Brand fonts (**LINE Seed JP**, **ITC Avant Garde Gothic**) are self-hosted
  as `.otf` in `fonts/` and shipped via `@font-face` in `colors_and_type.css`.
  Hiragino Sans / system sans-serif are the fallbacks.
- The wordmark logo in the Figma is composed of 6 individual letter vectors,
  not a single SVG. The system stores one canonical "U" path and renders the
  wordmark as text using `t-wordmark`.
