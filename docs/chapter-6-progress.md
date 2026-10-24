# Chapter 6 · Virtual power plants: progress note

Status as of 2026-10-15: **first full build on branch `chapter-6-vpp` (from `main`), not committed yet.** Built from the Oct 15 plan (`docs/chapter-6-vpp-plan.md`) and the updated clickable mockup (`docs/design/chapter-6-mockup.html`).

## Where the work is

- `apps/06-vpp/index.html`: loads `../../shared/theme.js`, `theme.css` and `nav.js` like every chapter.
- Quiz progress key `gfg-vpp-quiz-v1`. Theme key `gfg-theme` (shared).
- Hash deep links: `#basics`, `#playground/call|stagger`, `#diagram` (Inside the box), `#events/summer|frequency|feeder|winter|money`, `#glossary`, `#quiz`, `#value`.

## What's built

Tabs, in order: ◉ Basics · ⚡ Playground · ◇ Inside the box · ▶ Events · ≡ Glossary · ? Quiz · $ Value

- **One model.** `simulate()` and `vppMoney()` are copied unchanged from the mockup. Basics runs them for the fixed case in plan §5.0; the plan §5.0 check numbers were 21.4 MW / 7.1 MW held / $817k / $395k. **On 2026-10-24 the EV value was halved (≈1 kW → ≈0.5 kW per enrolled EV, a "typical value"; measured programs show ~0.25 kW), so the Basics numbers are now: 20,000 homes → 20.0 MW at 4 pm, 5.7 MW held, $762k/yr to customers, $319k/yr saved.** The Inside-the-box tab is hidden; its zoom labels, if restored, come from the same model.
- **Icons.** One SVG sprite at the top of `<body>` (`#i-hvac`, `#i-water`, `#i-ev`, `#i-batt`, `#i-solar`), used in the Basics picture, diagram boxes, both house grids, sliders, legends and readouts. The letter badges from the mockup are gone.
- **Playground chart.** Device textures (`#tx-hvac` lines, `#tx-water` dots, `#tx-ev` hatch; battery solid), 2px sheet gaps, direct labels in the middle of the event window, halos on labels over bands. Hover, drag or arrow keys move the time cursor; it drives the readout, the house grid and two small charts (indoor drift, fleet battery charge).
- **Events.** Gauge slides and counts from the previous step; a pulse travels each active message line once per step (skipped with reduced motion).
- **Inside the box.** "Seen in chapter X" chips are real links. Overlapping flow labels got fixed positions.
- **Quiz.** All ten on one page, chapter 5 style, saved; each explanation links to its diagram box or Events scenario.
- **Value.** National tiles, VPP vs. peaker ($99 vs. $43/kW-yr), PSE battery earnings calculator, DSGS timeline, ERCOT ADER cap bars, PSE 23.7 → 129 → ≈500 MW bars, numbered sources.

## Integration done on the branch

- `shared/theme.css`: `--dev-hvac`, `--dev-water`, `--dev-ev` in all three blocks. `docs/colors.md`: "Device colors (chapter 6)" section.
- `shared/nav.js`: chapter 6 entry. Chapters 1–5: "of 5" → "of 6".
- Chapter 4: the VPP box's detail panel ends with "Look inside → Chapter 6". Chapter 5: the rack/pack detail links to chapter 6.
- Home page: sheet is now 1600 × 742; chapter 6 zone along the bottom (a street of homes on the secondary from chapter 2's transformer, device tints, VPP software box with a data line). Sixth index row, "6 chapters" in the title block, six-chapter lede and meta description.
- README: six-chapter intro and row 6.

## Open items

- [ ] Thumbnails `assets/thumbs/06-vpp.jpg` and `06-vpp-light.jpg` (screenshots weren't reliable in this session).
- [ ] Frank to review the home-page zone (placement and the taller sheet).
- [ ] ⚠ figures from plan §7 still to verify (water heater and EV kW, ADER registered MW, DALCU bill number, DSGS 2027 status, PSE enrollment counts).
- [ ] Optional Mode C (Pick the right tool) not built.
- [ ] Commit and open a pull request when Frank is happy.
