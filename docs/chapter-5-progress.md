# Chapter 5 · Batteries: progress note

Status as of 2026-10-10: **standalone draft, not integrated, not deployed.**
Plan and research: `docs/chapter-5-batteries-plan.md`. Preview: https://claude.ai/artifact/RgpDqzRFUCvwTzTSh65iJE

## Where the work is

- `apps/05-batteries/index.html` on branch `chapter-5-batteries` (not `main`, so GitHub Pages doesn't serve it).
- The page is fully self-contained. The shared theme (`theme.css`, `theme.js`) is inlined between two `STANDALONE` comments, and a stand-in chapter bar sits at the top of `<body>`, marked the same way.
- Theme key `gfg-theme` (shared with the guide). Quiz progress key `gfg-batt-quiz-v1`.
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
- Electrons in Basics are amber; ions use the battery teal.
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

1. Replace the `STANDALONE` block in `<head>` with `<script src="../../shared/theme.js"></script>` and `<link rel="stylesheet" href="../../shared/theme.css">`, and add `<script src="../../shared/nav.js" defer></script>`.
2. Delete the stand-in `.iso-bar` at the top of `<body>` and its CSS.
3. Add `{ dir: '05-batteries', short: 'Batteries', title: 'Batteries' }` to `CHAPTERS` in `shared/nav.js`.
4. Change "Chapter n of 4" to "of 5" in chapters 1–4.
5. Add a fifth chapter card (and map zone, if it fits) to the home page `index.html`, with dark and light thumbnails.
6. Add chapter 5 colors to `docs/colors.md` (Li⁺ = battery teal, electrons = amber, flow dashes = paper).
7. Merge `chapter-5-batteries` into `main`.
