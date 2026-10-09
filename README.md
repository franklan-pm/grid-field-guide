# Grid Field Guide

**Live site:** https://franklan-pm.github.io/grid-field-guide/

Four interactive chapters that follow electricity from the power plant to the customer's meter, then up into the control room that runs it. Written for program managers and other non-engineers who work around the grid.

| # | Chapter | Question | Folder |
|---|---|---|---|
| 1 | Power mix | Where does the power come from? | `apps/01-power-mix` |
| 2 | Distribution | How does power get from the substation to the meter? | `apps/02-distribution` |
| 3 | DER & microgrids | What changes when a customer makes power too? | `apps/03-der-microgrids` |
| 4 | Grid operations | How do the software systems run all of it? | `apps/04-grid-operations` |

Every page is plain HTML with no build step. Open `index.html` in a browser, or serve the folder with any static server.

- `index.html`: home page
- `shared/theme.css`: every color (dark and light sets) and font stack. Chapters use these tokens instead of hex values.
- `shared/theme.js`: light/dark switch. Saves the choice under `gfg-theme` for the whole guide. Load it in `<head>` before the stylesheet.
- `shared/nav.js`: the chapter bar at the top of every chapter, with the theme toggle. The chapter list lives here.
- `docs/colors.md`: what each color means in each chapter, and where they clash
- `assets/thumbs/`: card images for the home page, one dark and one light per chapter

Each chapter page starts with:

```html
<script src="../../shared/theme.js"></script>
<link rel="stylesheet" href="../../shared/theme.css">
<script src="../../shared/nav.js" defer></script>
```

These are learning tools, not engineering references. Values are simplified and typical.
