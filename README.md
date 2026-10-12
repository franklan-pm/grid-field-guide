# Grid Field Guide

**Live site:** https://franklan.net/

Five interactive chapters that follow electricity from the power plant to the customer's meter, up into the control room that runs it, and into the batteries that store it. Written for program managers and other non-engineers who work around the grid.

| # | Chapter | Question | Folder |
|---|---|---|---|
| 1 | Power mix | Where does the power come from? | `apps/01-power-mix` |
| 2 | Distribution | How does power get from the substation to the meter? | `apps/02-distribution` |
| 3 | DER & microgrids | What changes when a customer makes power too? | `apps/03-der-microgrids` |
| 4 | Grid operations | How do the software systems run all of it? | `apps/04-grid-operations` |
| 5 | Batteries | How do batteries move energy in time? | `apps/05-batteries` |

The guide is styled as an engineering drawing sheet: vellum (light, the default) and blueprint (dark). Every page is plain HTML with no build step. Open `index.html` in a browser, or serve the folder with any static server.

- `index.html`: home page, drawn as the sheet: the one-line diagram with zone markers, line legend, notes and title block, then the sheet index of chapters
- `shared/theme.css`: every color as a token named by meaning (vellum and blueprint values), the font stacks, and the shared components (tabs, buttons, pills, panels, cards, quiz). Chapters use these tokens instead of hex values.
- `shared/theme.js`: light/dark switch. Opens in light unless the reader chose otherwise; saves the choice under `gfg-theme` for the whole guide. Load it in `<head>` before the stylesheet.
- `shared/nav.js`: the chapter bar at the top of every chapter, with the theme toggle. The chapter list lives here.
- `docs/colors.md`: the fixed color mapping (one meaning per color in every chapter), line styles, data kinds, chart colors and contrast notes
- `docs/design/`: the home-page mockups for the drawing-sheet design
- `assets/thumbs/`: 640×360 detail views of each chapter's region of the home-page sheet, one blueprint (dark) and one vellum (`-light`) per chapter. Not shown on the home page itself.

Each chapter page starts with:

```html
<script src="../../shared/theme.js"></script>
<link rel="stylesheet" href="../../shared/theme.css">
<script src="../../shared/nav.js" defer></script>
```

## History

Each chapter started as its own repo. They were imported here with their full commit history (`git log -- apps/02-distribution` shows a chapter's history). The old repos now forward to their chapter:

| Old repo | Now |
|---|---|
| [grid-and-renewables](https://github.com/franklan-pm/grid-and-renewables) | `apps/01-power-mix` |
| [electric-distribution-trainer](https://github.com/franklan-pm/electric-distribution-trainer) | `apps/02-distribution` |
| [der-microgrid-sim](https://github.com/franklan-pm/der-microgrid-sim) | `apps/03-der-microgrids` |
| [grid-mod-operations](https://github.com/franklan-pm/grid-mod-operations) | `apps/04-grid-operations` |

These are learning tools, not engineering references. Values are simplified and typical.
