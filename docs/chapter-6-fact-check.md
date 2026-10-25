# Chapter 6 (VPPs): figures to fact-check

Brief for a fact-checking pass. The chapter is `apps/06-vpp/index.html`; research notes and sources are in `docs/chapter-6-vpp-plan.md` (items marked ⚠). The chapter was written in October 2026, so check against current sources.

## What to do

For each item below:
1. Find the primary source (the program operator, regulator, utility or company report), not a news summary.
2. Say whether the figure in the chapter is **correct**, **wrong** or **can't verify**.
3. If wrong, give the corrected figure, the source URL and its date.
4. Don't edit the chapter. Report back, and Frank will decide what changes. Don't change the model math (`simulate`, `vppMoney`).

Output a table: item, claim as written, verdict, correct figure, source URL.

## High priority (stated as fact in the chapter)

| # | Claim in the chapter | Where | What to check |
|---|---|---|---|
| 1 | Google announced a deal with **Voltus** for a VPP in **PJM**; Voltus provides **~1,070 MW**, "approximately the output of a nuclear reactor". | Basics intro, line ~327 | Is the deal real? Who announced it, when, how many MW, and is that nameplate or deliverable? Is the nuclear-reactor comparison fair? **Not yet in the plan; newly added by Frank.** |
| 2 | **ecobee, summer 2025:** 108 MW from 143,000 thermostats over 11 events, about 0.75 kW each. | Basics cards, thermostat row, model constant (line ~701), diagram box | The source was Market Chameleon (Feb 11, 2026), a secondary source. Trace it to ecobee's or Generac's own report. Confirm 108 MW, 143,000 and 11 events. |
| 3 | **California, Sep 9, 2026:** about 580 MW from about 140,000 home batteries for 3 hours (≈4.1 kW each), "the largest home-battery VPP dispatch so far". Also **Jul 29, 2025:** 535 MW from 100,000+ batteries. | Basics card, Events (summer), Quiz, Value timeline | Source was MGRID and Electrek (Sep 21, 2026). Check against Sunrun, Tesla, the CEC or CPUC. Confirm the date, the MW, the battery count and the "largest" claim. |
| 4 | **PSE (Puget Sound Energy):** about 456,000 Flex enrollees. Plan §7 also found 640,000 (KIRO 7, Jul 2026) and about 700,000 auto-enrolled. | Value tab, Glossary, line ~620 | Reconcile with PSE's 2026 Demand Response RFP (Apr 2026). Which number is right, and what does each count? Also check "≈49,000 thermostats · 10,800 EVs · 800 batteries" and "23.7 → 129 → ≈500 MW". |
| 5 | **PSE Flex Batteries:** $75/kWh to sign up (up to $1,000), plus $0.50/kWh discharged (up to $500 a year). **Flex Smart thermostats:** $50 to sign up plus $20 a season. | Value tab, line ~582 (already tagged ⚠), device table | The source was a vendor page (FranklinWH). Confirm on pse.com. |
| 6 | **California DSGS:** funded only through Dec 2026, expected to end in its current form in 2027 and move to the CPUC's ELRP. Paid Powerwall owners $7–$15 per kW-month in 2026, up to about $280 a year. | Value tab, timeline, line ~586–596 | Check the current status of the 2027 budget, the ELRP transition, and the Tesla payment figures. |
| 7 | **ERCOT ADER pilot:** total cap raised to **500 MW in March 2026**; each aggregation up to 100 MW. | Events (frequency), Value tab | Check Market Notice M-A030226-01 (Mar 2, 2026) and the ERCOT ADER pilot page. We also still need the **current registered ADER MW** and one real event where ADER resources were dispatched. |
| 8 | **Washington "DALCU" requirement:** PSE must plan flexible load equal to 10% of its peak from 2030 (about 500 MW). | Glossary, Value tab | Find the exact statute or order and the correct bill number, which was never found. Confirm the 10%, the 2030 date and the 2024 year. |

## Medium priority (typical values behind the Playground and "How big is your VPP?")

| # | Claim | Where | What to check |
|---|---|---|---|
| 9 | **Water heater:** about 0.3–0.5 kW average per enrolled heater, with a 4.5 kW element. | Device table, model | Find a program evaluation (PSE Flex, BPA, Brattle, LBNL). |
| 10 | **EV:** about 1 kW average across enrolled EVs (60% plugged in × 24% charging at that hour), about 7 kW per car when charging. | Device table, model | Find a program evaluation with the same sources. |
| 11 | **Fixed fleet mix** per 100 homes: 70 thermostats, 20 water heaters, 15 EV chargers, 10 batteries, 20 solar roofs. | Model, Basics | Labeled illustrative. Check whether PSE or another real program gives a more realistic mix. |
| 12 | **Value comparison:** a new VPP costs $43/kW-yr and a gas peaker $99/kW-yr (DOE / Brattle 400 MW case, so the grid saves $56/kW-yr). | Value tab, "Grid saves" tile | Confirm both figures in the DOE VPP Liftoff report or the Brattle study. |

## Lower priority (only matters if the chapter states it)

- **Base Power:** adds about 35 MW a month. This came from a secondary source (Oilprice), so trace it to the ERCOT filing (Aug 2026).
- **Sunrun / Tesla / Renew Home:** June 2026 framework for up to 16.8 GW. It must be described as a **plan, not capacity**.
- **CTA-2045:** whether Washington's appliance standards require the port on some electric water heaters, and the dates.
- **Washington HB 1871 / SB 5727:** a residential battery incentive bill. Check whether it was enacted.
- **FERC Order 2222:** go-live dates by ISO, if the chapter names one.

## Notes

- Every figure should carry an "as of" date. If a source has newer data, say so.
- Mark any figure that comes only from a vendor or news article as secondary.
