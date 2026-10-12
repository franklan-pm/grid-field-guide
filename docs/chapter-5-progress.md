# Chapter 5 · Batteries: progress note

Status as of 2026-10-11: **restyled to the drawing-sheet design on the shared theme and merged to `main` (PR #2); linked into the home page and chapter bar on branch `link-chapter-5` (2026-10-12).** The page now loads `../../shared/theme.css` and `theme.js` (the inlined theme copy is gone) and uses only role tokens. The stand-in chapter bar was removed when the chapter was added to `shared/nav.js`.
Plan and research: `docs/chapter-5-batteries-plan.md`. Preview: https://claude.ai/artifact/RgpDqzRFUCvwTzTSh65iJE

## Where the work is

- `apps/05-batteries/index.html` on branch `chapter-5-batteries` (not `main`, so GitHub Pages doesn't serve it).
- The page is fully self-contained. The shared theme (`theme.css`, `theme.js`) is inlined between two `STANDALONE` comments, and a stand-in chapter bar sits at the top of `<body>`, marked the same way.
- Theme key `gfg-theme` (shared with the guide); opens in light by default. Quiz progress key `gfg-batt-quiz-v1`.
- Tabs support hash deep links: `#basics`, `#diagram`, `#playground/sun|wear|size|pay`, `#glossary`, `#quiz`, `#costs`, `#safety`.

## What's built

Tabs, in order: ± Basics · ◇ Diagram · ⚡ Playground · ≡ Glossary · ? Quiz · $ Costs · △ Safety

- **Basics:** animated LFP cell (cathode, electrolyte, separator, graphite anode, outside wire through a charger or lamp). Charge / Discharge / Pause, state-of-charge bar, numbered charge and discharge steps, three idea cards, "from cell to battery" note.
- **Diagram:** exploded cell → module → rack + BMS → PCS → transformer → feeder, with control layer (EMS, SCADA) and safety layer (thermal, fire, enclosure). Click any part for what it does / if it fails / rough cost. Moving dashes on power and data lines, with a Discharging (evening) / Charging (midday) toggle that reverses the flow.
- **Playground:**
  - *Shift the sun:* home or town, June or December; solar, battery kWh and kW sliders; stacked 24-hour chart plus SOC chart with hover/tap/arrow-key readout of every series; four cards with calculation tooltips. The day repeats so the morning starts from the previous evening's charge.
  - *Wear it out:* LFP, NMC, sodium-ion, lead-acid; depth, cycles a day, temperature, calendar aging. Illustrative straight-line fade.
  - *Size it:* home, grocery store, factory; four numbered steps; pipe-and-tank drawing.
  - *Pay it back:* demand charges (grocery, factory), time-of-use savings, credit checkbox, missed-peak slider, 20-year payback chart. Tooltips on the time-of-use heading and sliders and on the credit checkbox. Energy shifted is capped at one full battery a day.
- **Glossary:** 37 terms in 4 categories, plus a "common mix-ups" table.
- **Quiz:** the plan's 10 questions, answers spread across positions, progress saved.
- **Costs:** cost ladder ($70 pack to ~$1,000 home), three worked examples with "Try your own numbers", incentives box dated October 2026, note reconciling Chapter 3's $350–$500/kWh, sources.
- **Safety:** layers of protection, Moss Landing context, standards, EPRI figures (≈99% lower, ≈72% early-life).

Tested in dark and light, at desktop and 400 px wide: no script errors, no sideways page scroll.

## Decisions made

- Basics is the first tab and the one that opens. This breaks the plan's tab-order convention (Diagram → Playground → Glossary → Quiz, then extras). Revisit at integration.
- Safety moved out of Diagram into its own tab (static content).
- Electrons in Basics are ink dots; Li⁺ ions use the battery fuel color (`--fuel-battery`) with `--on-ink` text, and the electrolyte carries a soft battery tint. (Was: electrons amber, ions teal. Amber now means primary voltage only.)
- Restyle mapping (see `docs/colors.md`): in the diagram the DC side of the PCS is the blue double line, AC and the 12 kV feeder follow the voltage colors, and the transformer draws blue over orange. Cell data and telemetry are teal dotted, and setpoints are magenta dashed. Thermal management and fire protection are gold-outlined (`--zone-sec`). Flow direction is arrowheads plus a travelling highlight instead of marching dashes. Charts use the fuel colors, with the grid as neutral `--ink-3`, battery charging hatched battery green, and solar left over hatched solar yellow.
- FEOC percentages removed from the incentives box until verified (the plan's "60% allowed foreign share" didn't match what Claude recalled for storage).
- "Peak minus off-peak price" renamed "Peak price gap".

## Open items

- [ ] Tooltips for Wear it out and Pay it back result cards.
- [ ] Tooltips for demand-charge controls (Demand rate, Peak shaved).
- [ ] The grey note under the credit checkbox now repeats its tooltip: remove or cut to one line.
- [ ] Quiz questions on Basics (for example, which way ions move when discharging).
- [ ] Verify the ⚠ figures in the plan (C&I installed ranges, home $/kWh, lead-acid and flow cycle ranges), FEOC thresholds and tariff status.
- [ ] Add Washington State and Avista programs and rates.
- [ ] Decide final tab order.

## Integration checklist (when ready)

1. ~~Replace the `STANDALONE` block in `<head>` with the shared theme links.~~ Done in the restyle. ~~Add the `nav.js` script.~~ Done.
2. ~~Delete the stand-in `.iso-bar` at the top of `<body>` and its CSS.~~ Done.
3. ~~Add `{ dir: '05-batteries', short: 'Batteries', title: 'Batteries' }` to `CHAPTERS` in `shared/nav.js`.~~ Done.
4. ~~Change "Chapter n of 4" to "of 5" in chapters 1–4.~~ Done.
5. ~~Add a fifth chapter card and map zone to the home page.~~ Done (the sheet's viewBox is now 1600 wide; the zone sits right of chapter 3). Still to do: dark and light thumbnails in `assets/thumbs/` (`05-batteries.jpg`, `05-batteries-light.jpg`).
6. ~~Add chapter 5 colors to `docs/colors.md`.~~ Done in the restyle.
7. ~~Merge into `main`.~~ Done (PR #2).
