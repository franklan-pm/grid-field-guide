# Grid Field Guide

**Live site:** https://franklan.net/

Seven interactive chapters that follow electricity from the power plant, through the queue to connect it, to the customer's meter, up into the control room that runs it, into the batteries that store it, and out to the thousands of homes that act together as a virtual power plant. Written for anyone interested in the grid, no engineering degree required.

| # | Chapter | Question | Folder |
|---|---|---|---|
| 1 | Power mix | Where does the power come from? | `apps/power-mix` |
| 2 | Interconnection queues | Who is waiting to connect to the grid, and what gets built? | `apps/interconnection` |
| 3 | Distribution | How does power get from the substation to the meter? | `apps/distribution` |
| 4 | DER & microgrids | What changes when a customer makes power too? | `apps/der-microgrids` |
| 5 | Batteries | How do batteries move energy in time? | `apps/batteries` |
| 6 | Virtual power plants | How do 20,000 homes act like one power plant? | `apps/vpp` |
| 7 | Grid operations | How do the software systems run all of it? | `apps/grid-operations` |

Folders have no numbers, so the order can change without breaking URLs. The order lives in `shared/nav.js`. The old numbered paths (`apps/01-power-mix` and so on) are small redirect pages that forward to the new folders.

The guide is styled as an engineering drawing sheet: vellum (light, the default) and blueprint (dark). Every page is plain HTML with no build step. Open `index.html` in a browser, or serve the folder with any static server.

- `index.html`: home page, drawn as the sheet: the one-line diagram with zone markers, line legend, notes and title block, then the sheet index of chapters
- `shared/theme.css`: every color as a token named by meaning (vellum and blueprint values), the font stacks, and the shared components (tabs, buttons, pills, panels, cards, quiz). Chapters use these tokens instead of hex values.
- `shared/theme.js`: light/dark switch. Opens in light unless the reader chose otherwise; saves the choice under `gfg-theme` for the whole guide. Load it in `<head>` before the stylesheet.
- `shared/nav.js`: the chapter bar at the top of every chapter, with the theme toggle. The chapter list lives here.
- `assets/thumbs/`: 640×360 detail views of each chapter's region of the home-page sheet, one blueprint (dark) and one vellum (`-light`) per chapter. Not shown on the home page itself.

Each chapter page starts with:

```html
<script src="../../shared/theme.js"></script>
<link rel="stylesheet" href="../../shared/theme.css">
<script src="../../shared/nav.js" defer></script>
```

## History

Each chapter started as its own repo. They were imported here with their full commit history (`git log -- apps/distribution` shows a chapter's history). The old repos now forward to their chapter:

| Old repo | Now |
|---|---|
| [grid-and-renewables](https://github.com/franklan-pm/grid-and-renewables) | `apps/power-mix` |
| [electric-distribution-trainer](https://github.com/franklan-pm/electric-distribution-trainer) | `apps/distribution` |
| [der-microgrid-sim](https://github.com/franklan-pm/der-microgrid-sim) | `apps/der-microgrids` |
| [grid-mod-operations](https://github.com/franklan-pm/grid-mod-operations) | `apps/grid-operations` |

These are learning tools, not engineering references. Values are simplified and typical.

## License

- **Code** (JavaScript, CSS, and the script and style blocks in the pages): [MIT](LICENSE)
- **Content** (chapter text, quiz and glossary text, diagrams, images): [CC BY-NC-ND 4.0](LICENSE-CONTENT.md)
- **Name and branding** ("Grid Field Guide", franklan.net, the drawing-sheet title block): not licensed for reuse, see [TRADEMARK.md](TRADEMARK.md)

If you fork this project, use your own name, domain and content.
