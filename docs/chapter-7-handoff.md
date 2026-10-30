# Chapter 7 handoff: Interconnection queues (Part 1 mockup to real chapter)

Written 2026-10-30 for Claude Code. Read `docs/chapter-7-plan.md` too, but note it is out of date (see "Plan changes" below).

## What Frank wants

Chapter 7 of the Grid Field Guide is still an interconnection story, now in three parts:

1. **Power plant interconnections.** An exploration tool on Berkeley Lab "Queued Up 2026" tab 03 data. If I were acquiring generation, what should I expect? Show projects by year, type, region and MW; investment trends; what came online recently.
2. **Load interconnection with ERCOT** (large loads, mostly data centers). Not started.
3. **Both queues on one grid.** Not started.

Only Part 1 exists, as a standalone mockup. Frank reviewed it and liked the direction. The earlier diagram-heavy prototype was "too complicated a story" and is parked.

## Current state of the repo (C:\code\grid-field-guide)

- `apps/07-interconnection/part1-mock.html` is the Part 1 mockup (about 335 KB, single file, works offline). **Edit this file directly.** Its data is inlined as `<script type="application/json" id="data">` and `id="mapdata"`. The cloud template and `build-mock.py` that produced it are not in the repo; ignore them.
- `apps/07-interconnection/index.html` is still the OLD Claude Code prototype. It has not been replaced.
- `apps/07-interconnection/_parked/diagram-prototype-2026-10-30.html` is the parked diagram prototype (substation drawing, generator lane, ERCOT load lane). Parts of it may be reusable for Part 3.
- `docs/data/` (untracked): `build-ch7.py`, `ch7-queue.json`, `build-ch7-counties.py`, `ch7-county-input.json`, `build-ch7-map.js`, `ch7-map.json`.
- `shared/nav.js` already has the `07-interconnection` entry (short label "Interconnect", title "Interconnection queues"). `index.html` (home) is modified by earlier Claude Code work.

## What the mockup contains

Header, a sticky filter row (Region select, default ERCOT; Measure Gigawatts or Projects; type legend), then:

1. **What's waiting in line.** Lead sentence, three tiles, a Map/Bars toggle, legend, caption, a reconciliation table, and the hybrid-battery footnote (†).
2. **Requests by year** (2005 to 2025, stacked by type).
3. **Came online by year** (2010 to 2025; shows an EIA line when All U.S. is selected).
4. **Outcome share by request year** (built / withdrawn / active; 2021+ shaded "too soon to judge").
5. **"Your 100 projects"** is hidden (`<section id="s5" hidden>`, with `var SHOW_FORECAST = false;`). Frank may bring it back. Method: scale the region's active queue to 100 projects, apply per-type per-region success rates (national if n<100, marked *), place each at request year + 5, with already-past counted as 2026. ERCOT gives about 15 of 100, about 62 GW. Decide with Frank whether to delete it or keep it gated.

Hover tooltips on sections 1 to 4 show numbers per type with shares (`tipCard`, `regionTip`). Types, in fixed order: Solar, Solar + storage†, Storage†, Wind, Gas, Other. Everything redraws on filter change via `render()`.

Section 1 headline numbers are the **report's**, with a reconciliation: 2,061.3 GW headline, minus 196.5 estimated hybrid batteries (in the report, not in the rows), gives 1,864.8 GW in project rows; minus 5.6 undated gives 1,859.2 GW in the by-year charts. Region totals come from tab 10.

## Rebuilding the data

Source workbook is on Frank's machine only (Grid research folder, Queued Up 2026 Excel). Berkeley Lab tabs: 03 (38,201 project rows), 04 (codebook), 10 (regional active capacity with imputed hybrid batteries), 21 (EIA vs queue online by year).

```
python docs/data/build-ch7.py "<xlsx>" docs/data/ch7-queue.json
python docs/data/build-ch7-counties.py "<xlsx>" docs/data/ch7-county-input.json
cd docs/data && npm install us-atlas@3 topojson-client@3 topojson-simplify@3 d3-geo@3
node build-ch7-map.js ch7-county-input.json ch7-map.json
```

`ch7-queue.json` keys: `requests` [region, group, year (0 = undated), status, n, MW], `online`, `eia` {year: GW}, `reported` {region: GW} from tab 10, `rates` {region: {group: [n, share built by count, share built by MW]}} (2000 to 2020 requests). Groups: solar, hybrid (Solar+Battery), storage (Battery, Other Storage), wind (incl. offshore and wind+battery), gas, other. Success rates use status only, not dates, because ERCOT is missing about 51% of withdrawal dates.

The map uses us-atlas pre-projected county shapes. Each county takes the region with the most queue requests, then neighbour-majority fill, smoothing, and removal of small islands. **Region footprints are approximate, not official ISO boundaries**; the page says so. The Excel row number is the pandas index + 3.

## Design system notes

Use `shared/theme.css` tokens (`--ground`, `--sheet`, `--ink`, `--ink-2`, `--ink-3`, `--band`, `--grid`, `--dead`, `--fuel-*`, `--hover-fill`), vellum (light) and blueprint (dark), fonts Barlow Condensed / IBM Plex Sans / B612 Mono. Per `docs/colors.md`, fuel colors are for charts only, and withdrawn uses `--dead`, not `--fault`. Charts follow the dataviz rules: fixed category order, always a legend, hover tooltips, thin marks, no dual axis. The guide's fuel colors fail the color-vision-deficiency validator (wind vs storage etc.); labels and tooltips are the secondary encoding. Left as is.

## Known issues and open items

- **Bars view bug fixed this session:** the chart measured its width while hidden. Keep the "unhide, then measure" order if you refactor `s1()`. Unselected rows are no longer faded.
- **EIA line label** in section 3 reads "EIA count, all new plants". That is imprecise; the series (tab 21) covers transmission-connected plants in the same regions. Reword, and optionally cross-check against EIA capacity-additions data.
- **8,244 vs 8,513 active projects:** the report text says 8,244; the data file has 8,513. Unreconciled. The tile says so.
- **ERCOT hybrid sizing:** the report's ERCOT total (408.0 GW) equals the row sum, so no estimate was added. Whether ERCOT hybrid rows hold the solar size or the whole-plant size is unconfirmed. Ask Berkeley Lab (jrand@lbl.gov).
- **Hybrid-battery estimate:** the report fills in missing battery sizes from storage-to-generator ratios (slides 8, 9, 16, 17, 30) and does not publish the ratios. 1,389 of 1,716 active solar+battery requests list no battery size. The estimate is about 196.5 GW.
- **License and credit wording:** the workbook credits Interconnection.fyi and LBNL; the original outline said GridTracker / CC BY 4.0. Confirm before publishing.
- **Map:** dense in Texas and the West; labels are tiny on mobile. 1,770 rows lack a county (about 1% of capacity is not on the map).
- **Mobile:** not yet reviewed beyond a quick check.
- **ERCOT large-load facts are from secondary sources and need checking against ERCOT/PUCT primary documents** before Part 2: 474.7 GW as of June 2026, 90.2% data centers; SB 6 (75 MW threshold); Batch Zero (PUCT approved June 18, 2026); the Aug 3, 2026 directive from Governor Abbott and pause; audit due Dec 10, 2026; 17 loads (about 6.6 GW) cleared stability; about 300 projects under review. Also FERC's June 18, 2026 show-cause orders to six RTOs (not a final rule; ERCOT is not FERC-jurisdictional).

## Plan changes since `docs/chapter-7-plan.md`

The plan predates the pivot and still describes the diagram, explorer, playground and quiz structure. It needs updating for: the three-part structure; the 2,061 / 1,859 reconciliation; the hybrid-battery and ERCOT findings; the 8,244 vs 8,513 question; and the FERC show-cause orders (add to the E1 to E16 fact-check table). The Claude project copy is `claude/chapter-7-plan.md`.

## Suggested next steps

1. Replace `apps/07-interconnection/index.html` with the Part 1 mockup, wired into the site shell: nav bar, theme toggle, shared CSS, page title and meta. **Decision (Frank, 2026-10-30): the backing data lives in separate JSON files that the page fetches, not inlined in the HTML.** See "Data files" below.
2. Add the chapter card to the home page, plus thumbnails, README and nav entries. Chapter 6 still says "Chapter 6 of 6" in its eyebrow and has no "Next" card; fix both. Update the mockup eyebrow ("Chapter 7 · Part 1 of 3") once Parts 2 and 3 exist.
3. Decide with Frank whether to delete section 5 or keep it gated.
4. Do the mobile pass (map labels, bars at narrow widths, sticky filter row).
5. Part 2, then Part 3. Frank has not reviewed designs for either. Agree on the interaction with him before building.
6. Run `git status` first. `Claude outputs/`, `docs/data/` and `ideation/` are untracked and `shared/nav.js` and the home `index.html` have uncommitted changes.

## Data files (decided: separate JSON, fetched by the page)

- Commit the build scripts and generated JSON from `docs/data/`. Put the files the page loads where the site serves static files (for example `apps/07-interconnection/data/ch7-queue.json` and `ch7-map.json`), and keep the build scripts in `docs/data/` with a short README line on how to regenerate and copy them.
- In the page, replace the two inlined `<script type="application/json">` blocks (`id="data"` and `id="mapdata"`) with `fetch()` calls. Render after both resolve, and show a short "Loading" / error state if a fetch fails.
- `fetch()` does not work from a `file://` URL. Check how earlier chapters are previewed locally (dev server or otherwise) and make sure Chapter 7 works the same way. Frank has been opening mockups straight from disk, so tell him if he now needs to run a local server.
- Keep the file shapes exactly as they are now, so the existing chart code keeps working.
- Add the source and date to each data file (for example a top-level `source` and `built` field) so a number can be traced back. Parts 2 and 3 can share these files. ERCOT large-load figures should go in their own small JSON with the source document and date next to each number.
- The workbook stays on Frank's computer and is never committed.
