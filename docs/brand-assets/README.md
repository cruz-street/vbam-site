# VBAM Brand Assets — Finalized

**Source:** Ironside delivery via Dropbox (Amy Yallof, 2026-05-28). Final, approved logo files for Vero Beach Adult Medicine.

**Folder:** `Vero Beach Adult Medicine Logo - FINAL FILES/`

## What's in here

| File / Folder | Purpose |
|---|---|
| `233701 ... Logo FINAL.ai` | Adobe Illustrator source (editable) |
| `233701 ... Logo FINAL.pdf` | Print-ready PDF |
| `233701 ... Logo GUIDE.pdf` | Brand usage guide |
| `EPS/` | Vector EPS for print, signage, large-format |
| `SVG/` | Vector SVG for web, email, on-screen use |
| `PNG/` | Rasterized PNG fallback (for tools that can't render SVG) |

## Variants — naming key

Each format folder contains the same matrix:

| Color | Lockup | Background |
|---|---|---|
| **Full Color** — amber sun + navy + sea-glass (use on light backgrounds) | **Icon** — mark only (no wordmark) | **no BG** — transparent (default for web) |
| **White** — single-color reverse (use on Atlantic / dark backgrounds) | **Stacked** — wordmark under mark | **w-BG** — opaque background tile |
| **Black** — single-color black (use when print is one-color) | **Horiz** — wordmark beside mark | |

So `Full Color Icon no BG.svg` = the canonical mark in color, transparent background.

## Currently deployed on the site

| Spot on the site | Asset used |
|---|---|
| Header logo (light bg) | `Full Color Horiz no BG.svg` |
| Footer logo (Atlantic bg) | `White Horiz no BG.svg` |
| Hero mark | `Full Color Icon no BG.svg` |
| Favicon | derived from `Full Color Icon no BG.svg` |
| OpenGraph image | derived from `Full Color Stacked no BG` |
| MedicalOrganization JSON-LD `logo` field | `Full Color Icon no BG.svg` (at `/images/vbam-mark.svg`) |

The web-bound copies live in `app/public/images/`. Don't edit those directly — copy from this folder if you need to refresh.

## Brand colors (from the Ironside SVGs)

| Token | Hex | Use |
|---|---|---|
| Sun amber gradient | `#FF9200` → `#FFAE00` | Sun fill (vertical, dark at bottom) |
| Navy | `#004E6C` | Rays, upper wave, body text |
| Sea glass | `#009AB2` | Lower wave, accents |

Note: these are the **logo-specific** colors and differ slightly from the broader VBAM brand tokens in `globals.css`:

- VBAM brand atlantic: `#0A3D4A` (logo uses `#004E6C`)
- VBAM brand sea-glass: `#5FB3C0` (logo uses `#009AB2`)

The logo keeps Ironside's exact colors. Page-level UI (buttons, body text, navigation) uses the broader brand palette.

## Rules

1. **Don't edit the AI / EPS / SVG files in this folder.** They're the source-of-truth originals.
2. **If a new variant is needed**, request it from Ironside (Gavin) rather than tracing it ourselves. Recreations introduce drift.
3. **Web-bound assets** in `app/public/images/` may be reduced / cropped / re-exported for size — but always start from a file in this folder.
4. **Spacing & clear-space rules** are in `233701 ... Logo GUIDE.pdf`. Read it before placing the logo on a new surface.

**Delivered:** 2026-05-28 by Amy Yallof in `#vero-beach-pediatrics-and-adult-medicine`.
**Designer:** Ironside (Gavin).
**File code:** `233701`.
