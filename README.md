# Tanot Solutions — homepage redesign mockup

A high-fidelity, responsive prototype of an improved https://tanotsolutions.com/home2/.
It keeps the same brand, content and section order, with a consistent spacing and component system.

## Live

- Mockup: https://tanot-solutions.vercel.app/
- Review pack: https://tanot-solutions.vercel.app/review/

Every push to `main` deploys automatically on Vercel.

## Run locally

From the repository root:

```bash
python -m http.server 5173
```

Then visit:

- http://localhost:5173/ for the mockup
- http://localhost:5173/review/ for the review pack: audit, design system, what changed, before/after, live responsive frames and open questions

## Files

| Path | What it is |
| --- | --- |
| `index.html` | The homepage mockup, with all 14 live sections in their original order |
| `assets/css/tokens.css` | Design tokens: colour, type, 8-pt spacing, radii, breakpoint overrides |
| `assets/css/styles.css` | Layout primitives, components (buttons, cards, forms, tabs, accordion) and sections |
| `assets/js/main.js` | Dropdowns, mobile nav, accessible service tabs, one-open FAQ accordion, form validation |
| `review/index.html` | Client-facing review pack |
| `review/img/` | Before/after screenshots (1440px and 390px) |

## Porting notes (Elementor / WordPress)

- Map `tokens.css` to Elementor Site Settings: global colours, global fonts (Inter only), and container width 1240px (32px side padding).
- Give every top-level container the same padding preset: 80 / 72 / 60 / 48px (desktop / ≤1024 / ≤820 / ≤560). Remove per-section overrides and the stray 70px and 140px values.
- Use one heading tag per level: a single `h1` in the hero, `h2` for section titles, `h3` for card titles.
- Search for `data-todo` in `index.html` to find the links that still need real URLs.
- Images are hotlinked from tanotsolutions.com, so the mockup needs internet access to show them.
