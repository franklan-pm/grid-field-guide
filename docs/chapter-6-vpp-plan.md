# Chapter 6 · Virtual power plants: how 20,000 homes act like one power plant

**Grid Field Guide: module plan and research notes**
Research compiled October 2026. VPP programs, enrollments and funding change fast. Re-check anything marked ⚠ before publishing, and put an "as of" date on every figure in the app.

---

## 1. Where this chapter fits in the series

| Chapter | Question it answers | What Chapter 6 borrows from it |
|---|---|---|
| 1 · Power mix | Where does the power come from? | The bus that must always balance. A VPP is one more source on that bus, and the evening ramp is when it's called on. |
| 2 · Distribution | How does power get from the substation to the meter? | Feeders and transformers have limits. That's why *where* the homes sit matters (the feeder-overload scenario). |
| 3 · DER & microgrids | What changes when a customer makes power too? | Rooftop solar, inverters, IEEE 1547 and 2030.5. A VPP is many of chapter 3's sites coordinated. |
| 4 · Grid operations | How do the software systems run it all? | The `VPP / DER Aggregator`, `DERMS`, `DRMS` and `DER + DR Head-End` boxes, and the Heat wave and Grid emergency scenarios. Chapter 6 opens the VPP box. |
| 5 · Batteries | How do batteries move energy in time? | The home battery, state of charge, and kW vs. kWh. A battery VPP is chapter 5's home battery multiplied by 100,000. |

**Chapter 6 framing:** *A gas peaker is one big machine in one place, often 50–100 MW. A virtual power plant is thousands of small machines in thousands of homes: thermostats, water heaters, EV chargers, batteries and solar. Software makes them act as one.*

**Running cast:** the home, grocery store and factory from chapter 5, plus a **neighborhood** of about 40 drawn houses that stands in for the fleet. Each drawn house represents about 500 real homes, so the fleet is 20,000 homes.

---

## 2. Learning objectives

By the end of the chapter a learner should be able to:

1. Define a VPP in one sentence and tell it apart from DERMS, demand response and a microgrid.
2. Name the devices a VPP is made of and say what each is good at: how fast it responds, how long it can hold, whether it rebounds, and what it costs the customer in comfort.
3. Trace an event from the control center to the device and back: forecast → bid or call → dispatch → device response → telemetry → measurement → payment.
4. Explain why a VPP must enroll more capacity than it promises (opt-outs, overrides, devices that are offline or already idle).
5. Explain rebound (snapback) and one way to soften it (staggering).
6. Explain why location matters: DERMS can limit or block a dispatch that would overload a feeder.
7. Give one real US data point each for California, Texas and Washington.

---

## 3. Research findings

### 3.1 National picture

- **Size today:** DOE's *Pathways to Commercial Liftoff: Virtual Power Plants 2025 Update* puts US VPP capacity at roughly **30–33 GW**. It sets a goal of **80–160 GW by 2030**, which is 10–20% of peak load, worth about **$10 billion a year** in savings. US peak demand is about 800 GW (2024), projected to reach about 900 GW by 2030. ([Renewable Energy World on DOE](https://www.renewableenergyworld.com/solar/vpp-adoption-is-growing-in-the-us-but-not-nearly-fast-enough-2/); [Oilprice](https://oilprice.com/Energy/Energy-General/Virtual-Power-Plants-The-Grid-Capacity-Nobody-Had-to-Build.html))
- **Growth:** Wood Mackenzie counts **37.5 GW of VPP capacity in North America** in 2025, up 13.7% from a year earlier. Deployments, buyers and monetized programs each grew by a third or more. The market is "broadening faster than it is deepening": more programs, but each is still small. PJM and ERCOT used VPPs the most. ([Utility Dive, Jan 2026](https://www.utilitydive.com/news/in-2026-virtual-power-plants-must-scale-or-risk-being-left-behind/810321/))
- **Where:** California, Texas, New York and Massachusetts account for 37% of deployments. Residential customers make up just over 10% of VPP capacity in wholesale markets; most is commercial and industrial load. ([Oilprice](https://oilprice.com/Energy/Energy-General/Virtual-Power-Plants-The-Grid-Capacity-Nobody-Had-to-Build.html))
- **Industry plan (not built):** in June 2026 Sunrun, Tesla and Renew Home announced a framework for up to 16.8 GW of flexible capacity: about 7.8 GW of home batteries and more than 9 GW of smart thermostats. (same source) ⚠ Present this as a plan, not capacity.
- **"Can you tell it from a peaker?"** EnergyHub's *Huels test*, modeled on the Turing test, asks whether a grid operator could tell a VPP from a gas peaker. To pass, a VPP must:
  - send telemetry to the control room at least every 5 minutes
  - follow a shaped schedule (build up before the event, hold flat, recover gradually)
  - be available year-round for 4–6 hours at a time

  Its maturity model runs from Level 0, manual demand response events limited to about 20 a year, to Level 4, a "grid-adaptive" VPP. The best VPPs today are around Level 2. ([Utility Dive, Dec 2025](https://www.utilitydive.com/news/turing-test-inspired-tool-compares-virtual-power-plants-to-gas-peakers/808162/)) **This makes a good frame for the Diagram tab:** each part of the drawing is one of the things a VPP needs to look like a power plant.
- **Market access:** FERC Order 2222 (2020) requires ISOs and RTOs to let aggregations of DERs into wholesale markets. Rollout is slow and different in each market, and as of early 2026 no state has a complete framework for how utilities and aggregators coordinate. ([PNNL, Jan 2026](https://www.pnnl.gov/publications/ferc-order-2222-der-policy-and-implementation-report-january-2026)) ⚠ Check each ISO's go-live date before naming one.
- **Value signal:** in PJM's 2027–28 capacity auction, the accredited value (ELCC) of demand-side resources rose from 69% to 92%. ([Utility Dive, Jan 2026](https://www.utilitydive.com/news/in-2026-virtual-power-plants-must-scale-or-risk-being-left-behind/810321/))

### 3.2 California: the battery VPP benchmark

- **Program:** Demand Side Grid Support (**DSGS**), run by the California Energy Commission. It started in 2022 and added home batteries in 2023, with about **700 MW enrolled** by 2025. It dispatches when CAISO day-ahead prices go above **$200/MWh**, or in emergencies. ([Latitude Media](https://www.latitudemedia.com/news/running-the-numbers-on-tesla-and-sunruns-massive-california-vpp-test/))
- **July 29, 2025 test:** **535–539 MW** (sources differ slightly) from **more than 100,000 home batteries**, held flat for **two hours (7–9 pm)** at CAISO's net peak. That's about 1.9% of net peak demand. Brattle found the fleet "performed like a traditional power plant." Sunrun managed 361 MW, and Tesla equipment made up 85% of fleet capacity. ([Latitude Media](https://www.latitudemedia.com/news/running-the-numbers-on-tesla-and-sunruns-massive-california-vpp-test/); [Brattle](https://www.brattle.com/wp-content/uploads/2025/08/Assessing-VPP-Performance-Impacts-of-a-Test-Event-in-California-1.pdf); [PG&E](https://www.pge.com/en/newsroom/currents/future-of-energy/power-to-the-people--california-s-biggest-battery-test-ever-just.html))
- **September 9, 2026 record:** **580 MW for three hours** from **more than 140,000 home batteries**: 517 MW from about 110,000 Powerwalls and 63 MW from about 30,000 batteries of other brands. The next day SCE dispatched more than 140 MW through the Emergency Load Reduction Program (ELRP). ([MGRID](https://mgrid.org/2026/09/21/sunrun-and-tesla-push-580-mw-from-140000-home-batteries-into-californias-evening-peak/); [Electrek](https://electrek.co/2026/09/21/sunrun-tesla-580-mw-california-grid-record/))
  - **Per home:** 580 MW ÷ 140,000 ≈ **4.1 kW per battery**. Powerwalls averaged about 4.7 kW, other brands about 2.1 kW. This is the playground's real-world anchor.
  - **Scale check:** California had **21,112 MW** of grid batteries in August 2026 (same source), so the record home-battery VPP was about 3% of that. The VPP is big, but grid-scale batteries are much bigger.
- **Value:** Brattle estimates DSGS could save up to **$206 million** in net system costs by 2028 and grow to 1.3 GW. ([Utility Dive](https://www.utilitydive.com/news/californias-virtual-power-plant-could-save-206m-by-2028-brattle/758145/))
- **Funding risk (teaching point):** DSGS is funded only through December 2026 ($27 million moved in from another program in summer 2026). The final 2026–27 budget added no 2027 money, and the plan to move the program from the CEC to the CPUC was left out. No successor is funded; a legislator's office said it could be taken up early 2027. ([Canary Media, Sep 1, 2026](https://www.canarymedia.com/articles/virtual-power-plants/california-guts-biggest-virtual-power-plant); earlier proposal: [MGRID, Apr 2026](https://mgrid.org/2026/04/07/california-budget-threatens-dsgs-virtual-power-plant-program-in-2027/)). The Oct 5–6, 2026 dispatches were called by both DSGS and ELRP ([MGRID, Oct 14, 2026](https://mgrid.org/2026/10/14/sunrun-and-tesla-push-a-record-745-mw-of-home-batteries-into-californias-grid-but-sunrun-gives-no-company-split/)). Re-check before publishing, since early 2027 may bring a new decision. *Lesson: a VPP depends on a program that pays for it.*
- **Earlier example:** Sunrun's CalReady (16,000+ homes) delivered up to 32 MW to PG&E in summer 2023 and more than 50 MW in a July 2024 heat wave. ([DOE via Renewable Energy World](https://www.renewableenergyworld.com/solar/vpp-adoption-is-growing-in-the-us-but-not-nearly-fast-enough-2/))

### 3.3 Texas: VPPs in an energy-only market

- **Program:** ERCOT's Aggregated Distributed Energy Resource (**ADER**) pilot, under PUCT Project 53911. The first two VPPs, both made of Tesla Powerwalls in the CenterPoint (Houston) and Oncor (Dallas) areas, qualified in **August 2023**. Eligible devices include batteries, generators, smart thermostats, controllable EV chargers and smart water heaters. ([Utility Dive, Aug 2023](https://www.utilitydive.com/news/tesla-virtual-power-plants-vpp-ercot-puc-texas-grid/691713/); [ERCOT ADER page](https://www.ercot.com/mktrules/pilots/ader))
- **Pilot cap growth (good chart):** **80 MW** at launch (each aggregation under 1 MW) → **200 MW** → **500 MW** on March 2, 2026, because registrations were nearing the cap. The ancillary-service limit stayed at 100 MW. ([ERCOT notice M-A030226-01](https://www.ercot.com/services/comm/mkt_notices/M-A030226-01))
- **Base Power:** puts a 25 kWh / 11.4 kW battery at each home, owned by Base. It has a 100 MW deal with CoServ in North Texas (March 2026) and told ERCOT in August 2026 it was adding about **35 MW a month**. ([Energy-Storage.news](https://www.energy-storage.news/?p=96657); [Oilprice](https://oilprice.com/Energy/Energy-General/Virtual-Power-Plants-The-Grid-Capacity-Nobody-Had-to-Build.html)) ⚠ The 35 MW/month figure comes from a secondary source; trace it to the ERCOT filing.
- **Teaching angle:** ADER lets a VPP sell **energy and fast ancillary services** (like frequency response), not just peak shaving. That makes it the natural home for the "Frequency dip" scenario.
- ⚠ Still needed: current ADER registered MW (from ERCOT's monthly ADER reports or the "Limits of Participation Tracking" sheet), and one ERCOT event where ADER resources were dispatched.

### 3.4 Washington: Puget Sound Energy (PSE)

PSE is the best example in the chapter of a **winter-peaking**, thermostat-heavy VPP, and it's local to many readers.

- **Why it's growing:** Washington's 2024 **Decarbonization Act for Large Combination Utilities (DALCU)** requires PSE to plan a **load-flexibility portfolio equal to 10% of peak load starting in 2030**. PSE estimates that's about **500 MW available year-round by 2030**. It has **129 MW** of demand response today, and its 2026 RFP asks vendors for at least 50 MW each. ([PSE 2026 DR RFP](https://www.pse.com/-/media/PDFs/001-Energy-Supply/003-Acquiring-Energy/2026-Demand-Response-Request-for-Proposals/2026-DR-RFP.pdf)) ⚠ Confirm the bill number (believed to be HB 1589, 2024).
- **Track record:** the original 2021 Clean Energy Implementation Plan target was 23.7 MW by 2025. PSE later contracted 86 MW, and now has 129 MW. (same source)
- **Winter is the hard season:** PSE's winter peak was higher than its summer peak every year from 2019 to 2025. (same, Appendix B) *Teaching point: California VPPs fight summer evenings, while PSE's fight cold mornings and evenings.*
- **The Flex family (enrolled customers, April 3, 2026):**

| Program | Type | Launched | Enrolled |
|---|---|---|---|
| Flex Events / Peak Time Savings | Behavioral, opt-out (customers asked to cut use) | Aug 2023 | 456,000 |
| Flex Rewards | Behavioral, opt-in | Nov 2023 | 53,000 |
| Flex Smart | Automated, smart thermostats | Aug 2023 | 40,400 |
| Ecobee Grid Resilience | Automated, thermostats | Sep 2025 | 8,336 |
| Flex EV | Automated, EV charging | Mar 2024 | 10,800 |
| Flex Batteries | Automated, home batteries | Aug 2024 | 800 |
| Flex Water Heaters (pilot) | Automated | May 2025 | 422 |
| Flex C&I / Flex Business | Business demand response | Nov 2023 / Dec 2025 | 528 / 244 |

  Source: [PSE 2026 DR RFP](https://www.pse.com/-/media/PDFs/001-Energy-Supply/003-Acquiring-Energy/2026-Demand-Response-Request-for-Proposals/2026-DR-RFP.pdf). KIRO 7 reported 640,000 customers in Peak Time Savings in July 2026, and PSE says it auto-enrolled about 700,000. ([KIRO 7](https://www.kiro7.com/news/local/pse-flex-program-faces-first-real-test-heat-hits-puget-sound/3QVKQBSMPVBB5AZGCGYIGEH3LU/)) ⚠ Reconcile with the RFP before quoting.

  **Teaching point straight from this table:** most of PSE's enrollment is *behavioral* (customers get a text asking them to cut use), while the *automated* part (thermostats, EVs, batteries) is much smaller but more dependable. Only the automated part is a VPP in the strict sense. This belongs in the mix-ups table.

- **Real PSE events (for the winter scenario):**
  - **Jan 12, 2024, 4–8 pm, cold snap:** about 260,000 customers alerted. Flex Smart **pre-heated homes a few minutes ahead, then lowered thermostats 2–3°F** for the event and restored them afterward. Customers could override at any time without penalty. ([MyNorthwest](https://mynorthwest.com/local/puget-sound-energy-flex-smart-event-affects-260000-customers-amid-cold-spell/3946409))
  - **Jan 17, 2024:** more than 273,000 participants. The event followed an outage at the Jackson Prairie gas storage facility. **Feb 2024, 7–10 am:** a morning test with no extreme weather, "to see what we can learn when things aren't in the extreme ranges." ([MyNorthwest](https://mynorthwest.com/local/another-puget-sound-energy-flex-event-why-this-is-different/3949866))
  - **Jul 21, 2026, 5–8 pm:** the first summer Peak Time Savings event, with bill credits of $0.25–$3. ([KIRO 7](https://www.kiro7.com/news/local/pse-flex-program-faces-first-real-test-heat-hits-puget-sound/3QVKQBSMPVBB5AZGCGYIGEH3LU/))
- **Platform:** in 2023 PSE and AutoGrid set a goal of a 100 MW VPP by 2025, starting with thermostats and heat-pump water heaters and later adding EVs and batteries. ([Utility Dive, Nov 2023](https://www.utilitydive.com/news/puget-sound-energy-autogrid-pse-virtual-power-plant-vpp/700806/)) Today's Flex programs run on Uplight, Oracle Opower, ChargePoint and Enel (RFP table).
- **Flex Batteries incentives:** $75/kWh up to $1,000 at enrollment, plus $0.50/kWh discharged in events, up to $500 a year. ([FranklinWH summary](https://www.franklinwh.com/homeowner-incentives/puget-sound-energy-flex-batteries-program/); [PSE Flex Batteries](https://www.pse.com/en/rebates/PSE-flex/flex-batteries)) ⚠ Confirm on pse.com.
- **State policy to watch:** HB 1871 / SB 5727 (2025–26) would create a residential battery incentive (up to $450/kWh, or $765/kWh for low- and moderate-income households, capped at 18 kWh). To qualify, the battery must be on time-of-use rates or in a utility VPP. ([House bill report](https://lawfilesext.leg.wa.gov/biennium/2025-26/Htm/Bill%20Reports/House/1871%20HBR%20FIN%2025.htm)) ⚠ Last seen passing House committees; check whether it was enacted.

### 3.5 Device "personality cards" (illustrative)

These drive the click-a-device cards and **one shared model** used by Basics and the Playground (see 5.0), so the same fleet gives the same MW on every tab. Battery and thermostat figures come from real events (3.2 and the ecobee report). The rest are typical values. ⚠ Find a program evaluation for each before publishing (PSE or BPA evaluations, Brattle, LBNL).

| Device (token) | kW per home in an event | Response time | Can hold | Rebound | Customer cost | Best for |
|---|---|---|---|---|---|---|
| Thermostat + AC / heat pump (`--dev-hvac`) | **0.75 kW at 95°F** (ecobee 2025: 108 MW ÷ 143,000); winter heat pump ~1–2 kW ⚠ | minutes | 1–3 h, fades as the house drifts | **large** | room drifts 2–3°F | peak shaving, both seasons |
| Water heater (`--dev-water`) | ~0.3–0.5 kW average ⚠ (4.5 kW element, cycles on and off) | seconds to minutes | 2–6 h (the tank is a heat battery) | medium | almost none | shifting, winter mornings |
| EV charger (`--dev-ev`) | 0 or ~7 kW per car; **≈1 kW average** across enrolled EVs (60% plugged in × 24% charging at that hour) ⚠ | seconds | hours (pause charging) | medium (charging resumes) | car is ready later | overnight shifting, evening peak |
| Home battery (`--fuel-battery`) | **4.1 kW** (CA 2026: 580 MW ÷ 140,000) | **under a second** | **≈3 h** at full output (12 kWh usable) | recharges later (can be scheduled) | less backup reserve | evening peak, frequency |
| Rooftop solar (`--fuel-solar`) | can be curtailed, not increased | seconds | as long as the sun is up | none | lost export credit | midday over-supply only |

Takeaway for the playground: **no single device is a power plant.** Batteries are fast but few. Thermostats are many but fade and rebound. Water heaters are steady but small. Mixing them gives the flattest output.

### 3.6 Protocols and software (name them, don't teach them)

- **OpenADR 2.0:** utility or aggregator → device cloud, for demand response events. (Already in chapter 4.)
- **IEEE 2030.5:** utility → inverters and other DERs; required by California Rule 21. (Chapter 3.)
- **IEEE 1547-2018:** inverter grid-support functions. (Chapter 3.)
- **CTA-2045:** a plug-in port standard for water heaters and other appliances. Washington's appliance standards require it on some electric water heaters. ⚠ Verify scope and dates.
- **OEM clouds:** Tesla, Enphase, ecobee, Google Nest and carmakers. Most home devices are reached **through the manufacturer's cloud**, not directly by the utility. (Chapter 4's DER + DR head-end note.)

### 3.7 Honest caveats (good teaching points)

- **Programs aren't permanent:** DSGS funding (3.2).
- **Enrollment isn't capacity:** PSE has about 450,000 behavioral enrollees but only 129 MW of total demand response.
- **Opt-outs and overrides** are normal and allowed. Programs plan for them.
- **Baselines are estimates:** "what you would have used" is never measured. It's modeled, usually from similar recent days.
- **Location matters:** 1 MW spread across a city doesn't relieve one overloaded feeder.

---

## 4. Design rules for this chapter

### 4.1 Device colors (new chart-only tokens)

Add these as **chart and device-identity tokens**, like the fuel colors: a soft tint and a solid left bar on device boxes, plus fills in charts. **Never on a line** (lines stay voltage class and data kind). Battery and solar reuse the existing fuel tokens, so a home battery is the same green in chapters 5 and 6.

| Token | Vellum | Blueprint | Device | Why this hue |
|---|---|---|---|---|
| `--dev-hvac` | `#0195CA` | `#0096AF` | Thermostat + AC / heat pump (space heating and cooling) | Sky / air |
| `--dev-water` | `#B46187` | `#D95B7F` | Water heater | Warm rose (hot water), clearly not fault red |
| `--dev-ev` | `#53458D` | `#7C89F6` | EV + charger | Indigo, the "electric car" color, away from the other two |
| `--fuel-battery` | `#2F7D55` | `#8FD6B4` | Home battery | (existing) |
| `--fuel-solar` | `#A88000` | `#F2C94C` | Rooftop solar | (existing) |

**Why one HVAC color, not separate thermostat and heat pump colors:** the thermostat is the *controller* and the AC or heat pump is the *load*. They're one resource in a VPP. Show "AC" vs. "heat pump" with the icon and the season, not a sixth color.

**Validation** (dataviz skill validator, OKLab ΔE×100, Machado CVD sim, all pairs across the five device colors):
- **Vellum on `--sheet` #FFFFFF:**
  - lightness band PASS, CVD PASS (worst 8.2), normal vision PASS (worst 16.2)
  - contrast PASS: every color ≥ 3:1 on both `--sheet` and `--ground`; the lowest is HVAC at 3.08 on `--ground`
- **Blueprint on #0F2C4C:**
  - new colors: CVD PASS (worst 9.6), contrast PASS (≥ 3.87)
  - the only FAILs come from the *existing* `--fuel-battery` / `--fuel-solar` pastels (lightness, chroma, and a 14.9 normal-vision gap between the two). These are guide-wide tokens and out of scope here. Note it in `docs/colors.md`.
- **Nearest existing token:** `--dev-ev` vellum is ΔE 7.6 from `--data-plan` violet. That's acceptable because one is a box fill and the other a dash-dot line, but never put an EV fill directly behind a plan line.

**Secondary encoding (required, so color is never alone):**
- Every device gets an **icon** in diagram boxes, cards, the legend and the house grid: ❄/♨ HVAC, a tank for the water heater, a plug for EV, the battery glyph, a sun for solar. (Draw them as SVG, not emoji.)
- In stacked charts, a **2px `--sheet` gap** between bands, **direct labels** on the bands, and a **texture** per device for print and forced-colors: HVAC horizontal lines, water heater dots, EV 45° hatch, battery solid, solar 135° hatch. (Battery charging stays hatched battery green, as in chapter 5.)

Chart lines: **target (the ISO's request)** = `--ink` dashed with a label. **Fleet total** = `--ink` solid 2px. **Baseline (what homes would have used)** = `--ink-3` dashed.

### 4.2 Lines on the diagram (no new styles)

Same rules as chapter 4:
- telemetry: teal dotted
- commands and setpoints: magenta long dash
- bids, schedules, forecasts and feeder limits: violet dash-dot
- enrollment, measurement and payment: olive short dash

Power inside each home and on the feeder is solid in the voltage colors (secondary blue at the home, primary orange on the feeder). Direction: arrowheads plus a travelling highlight, as in chapter 5.

### 4.3 Animation ideas, in priority order

1. **The fleet gauge.** A megawatt dial (or a stack of tiny houses filling a bar) climbs as houses respond. This is the chapter's signature visual.
2. **The house grid.** 40 houses. Each one blinks its device color when it responds. Overrides turn `--dead` grey, and offline devices show a dotted outline.
3. **Message pulses** along the dashed data lines: control down, telemetry up, bids sideways.
4. **Zoom slider:** 1 home → street → feeder → fleet. The same drawing scales out and the kW label turns into MW.
5. **Rebound wave:** when the event ends, houses light up all at once and the fleet line spikes above the baseline. A "Stagger" toggle makes them return in waves.
6. Respect `prefers-reduced-motion`: pulses become static arrowheads, and the gauge jumps to its value instead of animating.

---

## 5. Tabs

Order follows the guide's convention, **Diagram → Playground → Glossary → Quiz**, with Events beside Diagram:

**◉ Basics · ⚡ Playground · ◇ Inside the box · ▶ Events · ≡ Glossary · ? Quiz · $ Value** (revised Oct 15, 2026: the layered diagram was too much to open with, so a simpler Basics tab now opens the chapter and the diagram moved to "Inside the box")

### 5.0 ◉ Basics: the landing tab

Goal: a reader new to VPPs should get the whole idea in one screen. **Basics explains and sizes; the Playground experiments.** (Revised Oct 15, 2026: an earlier "Build your own VPP" here repeated the Playground's sliders and chart and ran a second model that disagreed with it, so Basics now has one slider and no chart.)

- **Three idea cards:** real hardware in homes → many makers' clouds → one aggregator on top.
- **One picture, four layers:** the grid → VPP software (the aggregator; for example Uplight, EnergyHub, Everyday Electric) → five device-maker clouds with real brands (thermostats: ecobee, Google Nest, Honeywell Home · water heaters: Rheem, A. O. Smith, CTA-2045 · EV charging: ChargePoint, Wallbox, carmaker apps · batteries: Tesla, Enphase, FranklinWH · solar: Enphase, SolarEdge) → icon grids of devices in homes (each icon ≈ 3,000 devices) → feeder.
- **"Send the call" animation in 4 steps:** request pulse → one request per cloud → devices light up (solar stays dark at 7 pm) → a travelling highlight on the feeder up to the grid while the MW count climbs. The power path is drawn on the wires, not through the clouds: *the software sends the signal; the power shows up on the wires.*
- **"How big is your VPP?":** one slider, **homes enrolled** (1,000–100,000, default 20,000), with a fixed typical mix per 100 homes: 70 smart thermostats, 20 water heaters, 15 EV chargers, 10 batteries, 20 solar roofs ⚠ illustrative. Four tiles:
  - **Power at 4 pm** (MW when the event starts)
  - **Held all 4 hours** (the lowest output during the event: what a planner can count on)
  - **Customers earn** a year (PSE's rates)
  - **Grid saves** a year compared with building a gas peaker of the same held MW

  One line of explanation under the tiles. There's no chart and no presets, and the lessons about fading and running out belong to the Playground. A call-to-action box ("Want to pick the devices yourself, change the season, or see the rebound?") opens the Playground.
- **Real-fleet cards:** California 580 MW / 140,000 batteries; ecobee 108 MW / 143,000 thermostats; PSE's enrolled devices, with "Try this fleet in the Playground" (opens the Playground with the PSE preset).
- **Mix-up callout:** ecobee and Nest run device clouds. They aren't the VPP and they aren't a DERMS.

**One model for the chapter.** Basics doesn't have its own math. It runs the Playground's simulation for a fixed case: a 95°F summer evening, 4–8 pm, 10% override, 5% offline, 60% of EVs plugged in, batteries not paced. Money comes from one shared function too:

| Device | Customer pay (PSE) | How the mockup counts it |
|---|---|---|
| Thermostat | $50 to sign up + $20 a season | $40 a year |
| Water heater | pilot; not published | $0 ⚠ |
| EV charger | $50 to sign up + $0.50/kWh | $0.50 × kWh shifted per event × 20 events |
| Battery | $75/kWh to sign up (up to $1,000) + $0.50/kWh (up to $500 a year) | $0.50 × kWh discharged per event × 20 events, capped at $500 |

**Grid saves** = held MW × $56/kW-yr: a new 400 MW VPP at $43/kW-yr against a new gas peaker at $99/kW-yr (DOE Liftoff, citing Brattle). Using the *held* MW rather than the starting MW is deliberately conservative, because a planner can only count on the low point.

Check: with 20,000 homes, Basics shows 21.4 MW at 4 pm, 7.1 MW held, $817k a year to customers and $395k a year saved. The same fleet entered in the Playground (summer, 95°F, 10%, 60%, no pacing) gives the same numbers.

### 5.1 ◇ Diagram: "Inside the VPP box"

An SVG in four layers, drawn like chapter 4's timing bands. The right edge has a rough-speed ruler: hours, minutes, seconds.

| Layer | Boxes (click for: what it does · if it fails · who runs it) |
|---|---|
| **Grid** | ISO/RTO (ERCOT, CAISO), utility control room (ADMS + **DERMS**), DRMS |
| **VPP platform** (software) | Enrollment and customer records · Forecasting (weather, availability) · Optimizer (who to call, how much) · Dispatch · Measurement and settlement (baseline, M&V, payments) |
| **Device clouds and gateways** | Thermostat cloud, EV / charger cloud, battery / inverter cloud · protocols on the links: OpenADR, IEEE 2030.5, CTA-2045 |
| **Homes** (hardware) | One home drawn in detail: thermostat + HVAC/heat pump, water heater, EV + charger, battery + inverter, rooftop solar, smart meter, all on the 240 V panel. Behind it, the 40-house grid on a feeder with a transformer. |

- **Huels checklist sidebar:** "To look like a power plant, a VPP needs ☐ visibility (telemetry) ☐ schedulability (follows a shape) ☐ availability (4–6 h, year-round)." Each item highlights the matching parts of the drawing.
- **"Seen in chapter X" chips:** VPP → ch 4 · DERMS → ch 4 · battery → ch 5 · inverter / 1547 → ch 3 · feeder and transformer → ch 2 · bus balance → ch 1.
- **Zoom slider** (4.3 #4) and **Idle / Event toggle**, like chapter 5's Charging / Discharging toggle.

### 5.2 ▶ Events: step-through, chapter 4 style

Same SVG as the Diagram. Each step lights up only the boxes and flows involved, with a clock, a short paragraph, and the fleet gauge. The data uses chapter 4's `SCEN` shape: `{when, title, nodes:[], flows:['a|b|kind'], text}`. Five scenarios:

1. **Summer evening peak (California-style):**
   - Day before, 2 pm: CAISO day-ahead price above $200/MWh triggers DSGS.
   - Day before, 4 pm: the VPP plans the fleet and checks availability.
   - Noon: batteries top up, homes pre-cool.
   - 3:45 pm: DERMS checks feeder limits.
   - 7 pm: dispatch; fleet holds flat at the target.
   - 9 pm: event ends; staggered return.
   - Next days: measurement, then payment.

   Anchor: "In September 2026 about 140,000 home batteries did this at 580 MW for three hours."
2. **Frequency dip (Texas-style):** a large plant trips, and frequency falls within seconds. Only batteries and inverters respond in time, because thermostats are too slow. Anchor: ERCOT ADER, which allows ancillary services up to 100 MW.
3. **Feeder overload:** the VPP wants to charge every EV at 11 pm when prices drop, and Feeder 3's transformer would overload. DERMS caps homes on Feeder 3. Lesson: location matters (chapter 2 link).
4. **Winter cold morning (PSE-style):**
   - 5:30 am: pre-heat homes and water heaters.
   - 7–10 am: thermostats down 2–3°F, water heaters off, batteries discharge.
   - Some customers override (houses turn grey).
   - 10 am: return.

   Anchor: PSE's real January and February 2024 events.
5. **Follow the money:** enrollment → baseline → event → meter data (MDMS) → performance calculated → bill credit or check. Uses chapter 4's olive business lines. Anchor: PSE Flex Batteries pays $0.50/kWh in events.

### 5.3 ⚡ Playground: "You're the VPP operator"

**Mode A: Meet the call**
- **Fleet builder:** sliders for thermostats, water heaters, EVs and batteries enrolled, plus solar homes as context. The panel shows the enrolled MW nameplate.
- **The call:** a picker for Summer evening (4–8 pm), Winter morning (7–10 am), or Frequency (10 s → 30 min). Target slider, default 10 MW.
- **Realism controls:** opt-out / override rate (0–30%), outdoor temperature, share of EVs plugged in.
- **Outputs:**
  - the house grid animating
  - a stacked fleet-response chart by device vs. the target line and baseline, with a hover readout like chapter 5's
  - indoor-temperature drift
  - fleet battery state of charge
  - a result card: "Delivered 8.7 of 10 MW · held 74% of the window · rebound peak +6 MW at 8:05 pm"
  - **money tiles** (moved here from Basics): MW held the whole window, what customers earn a year, what the grid saves a year. Same shared function as Basics. In Frequency mode they're replaced by a note: frequency response is paid as an ancillary service, not per kWh.
- **Lessons the defaults should surface:**
  - you need to enroll about 20–30% more than you promise
  - a thermostat-only fleet fades
  - a battery-only fleet is flat, then stops when it runs empty
  - a mix is best
- **Presets** include **PSE's fleet today** (≈48,750 thermostats, 10,750 EVs, 750 batteries, 500 water heaters, on a 30°F winter morning), linked from the Basics PSE card.
- **Slider ranges** widened so real fleets fit: thermostats to 60,000, water heaters and EVs to 20,000, batteries to 10,000, target to 60 MW.

**Mode B: Stagger the return** — the same event, with a slider for how many groups return and how far apart. Watch the rebound spike shrink.

(Optional **Mode C: Pick the right tool** — given a grid problem, such as "frequency in 2 seconds" or "4 hours on a cold morning," choose devices. It overlaps with the quiz, so it's lower priority.)

### 5.4 ≡ Glossary (about 32 terms, 4 categories)

- **Basics:** virtual power plant, DER, aggregator, fleet, enrollment, event, dispatch, nameplate vs. delivered, flexible load
- **How devices respond:** load shed vs. load shift, pre-cooling / pre-heating, setback, rebound / snapback, staggering, managed charging, V2G / V2H, curtailment
- **Software and signals:** DERMS, DRMS, VPP platform / optimizer, OEM cloud, telemetry, setpoint, OpenADR, IEEE 2030.5, CTA-2045, opt-out / override
- **Markets and money:** demand response, behavioral vs. automated DR, baseline, measurement and verification (M&V), capacity, ancillary services / frequency response, FERC Order 2222, ADER, DSGS, ELRP, load flexibility (DALCU)

**Common mix-ups table:**
- VPP vs. DERMS vs. DRMS vs. microgrid
- DER vs. DERMS
- behavioral DR vs. automated VPP
- enrolled vs. delivered MW
- utility VPP vs. third-party aggregator

### 5.5 ? Quiz (10 to start, answers spread across positions, each linked to diagram nodes)

1. A VPP promises the ISO 10 MW. Why does it enroll about 13 MW? → overrides, offline devices, and devices that are already idle.
2. Which device can respond to a frequency dip in under a second? → home battery (inverter).
3. What usually happens in the hour after a thermostat event ends? → rebound: many ACs or heat pumps start at once.
4. What can stop a VPP dispatch that would overload a feeder? → DERMS, using power-flow limits (chapter 4).
5. How do most home thermostats get the VPP's signal? → through the manufacturer's cloud over the internet, not directly from the utility.
6. In September 2026 California home batteries delivered about 580 MW from about 140,000 batteries. About how much per battery? → about 4 kW.
7. Why does PSE run more winter events than summer ones? → PSE's peak demand is in winter.
8. How is a VPP's performance measured? → metered use compared with an estimated baseline.
9. Which pair is a common mix-up? → DER (a device) vs. DERMS (utility software).
10. What makes water heaters useful in a VPP? → the tank stores heat, so heating can shift by hours with little comfort cost.

### 5.6 $ Value (optional extra, like chapter 5's Costs)

- A VPP vs. a gas peaker: rough $/kW-year, time to build (DOE: basic VPPs can launch in under six months), where the money goes.
- What a customer earns: PSE Flex Batteries example, a DSGS-style per-kW payment.
- **Who pays and what's at risk:** the DSGS funding story.

---

## 6. Integration checklist

1. Folder `apps/06-vpp/index.html`. Header loads `../../shared/theme.js`, `theme.css` and `nav.js`.
2. Add `{ dir: '06-vpp', short: 'VPPs', title: 'Virtual power plants' }` to `CHAPTERS` in `shared/nav.js`.
3. Change "of 5" to "of 6" wherever it's hard-coded.
4. Add the `--dev-hvac`, `--dev-water` and `--dev-ev` tokens to all three blocks in `shared/theme.css`, and add a "Device colors" section to `docs/colors.md`.
5. Home page: a sixth zone across the residential homes on the sheet. Add thumbnails `06-vpp.jpg` and `06-vpp-light.jpg`.
6. Chapter 4: add a "Look inside → Chapter 6" link to the `vpp` node's detail panel.
7. Chapter 5: link the home battery detail to chapter 6 ("100,000 of these together").
8. README chapter table: add row 6.
9. Storage keys: theme `gfg-theme` (shared); quiz `gfg-vpp-quiz-v1`.
10. Sources in the app: every figure shown in the chapter carries an "as of" date, and the Value tab ends with a Sources list drawn from section 8 (as chapter 5's Costs tab does).
11. Hash deep links: `#diagram`, `#events/summer|frequency|feeder|winter|money`, `#playground/call|stagger`, `#glossary`, `#quiz`, `#value`.

## 7. Open items

- [ ] ⚠ Device kW-per-home values in 3.5: find program evaluations (PSE Flex, BPA, Brattle, LBNL).
- [ ] ⚠ ERCOT ADER registered MW today, and one dispatched event.
- [ ] ⚠ DALCU bill number; reconcile PSE Peak Time Savings enrollment (456k vs. 640k vs. ~700k).
- [ ] ⚠ HB 1871 / SB 5727 final status.
- [ ] ⚠ DSGS 2027 status; ELRP transition.
- [ ] ⚠ CTA-2045 Washington requirement scope.
- [ ] ⚠ FERC 2222 go-live by ISO, if the chapter names one.
- [ ] Draw device icons (SVG, 24 px, 1.5 px ink stroke, square ends).
- [ ] Decide the house-grid size on phones (40 houses at 400 px wide: probably 8 × 5).

---

## 8. Sources

All accessed October 2026. Publication dates are given where the source states one. ⚠ marks a secondary or vendor source whose figures should be traced to the primary document before publishing.

### National

1. US Department of Energy, *Pathways to Commercial Liftoff: Virtual Power Plants 2025 Update* (Jan 2025), as summarized by Renewable Energy World: [VPP adoption is growing in the US, but not nearly fast enough](https://www.renewableenergyworld.com/solar/vpp-adoption-is-growing-in-the-us-but-not-nearly-fast-enough-2/). Report listing: [OurEnergyPolicy](https://www.ourenergypolicy.org/resources/pathways-to-commercial-liftoff-virtual-power-plants-2025-update/)
2. Utility Dive, [In 2026, virtual power plants must scale or risk being left behind](https://www.utilitydive.com/news/in-2026-virtual-power-plants-must-scale-or-risk-being-left-behind/810321/) (Jan 27, 2026). Wood Mackenzie figure of 37.5 GW; PJM ELCC 69% → 92%.
3. Utility Dive, [Turing test-inspired tool compares virtual power plants to gas peakers](https://www.utilitydive.com/news/turing-test-inspired-tool-compares-virtual-power-plants-to-gas-peakers/808162/) (Dec 17, 2025). EnergyHub Huels test and maturity model. Also see [EnergyHub VPP Maturity Model](https://www.energyhub.com/resource/building-trustworthy-power-plants-vpp-maturity-model).
4. Oilprice.com, [Virtual Power Plants: The Grid Capacity Nobody Had to Build](https://oilprice.com/Energy/Energy-General/Virtual-Power-Plants-The-Grid-Capacity-Nobody-Had-to-Build.html) (2026). Deployment shares; 16.8 GW industry framework; Base Power 35 MW/month. ⚠
5. PNNL, [FERC Order 2222 DER Policy and Implementation Report](https://www.pnnl.gov/publications/ferc-order-2222-der-policy-and-implementation-report-january-2026) (Jan 2026).

### California

6. Latitude Media, [Running the numbers on Tesla and Sunrun's massive California VPP test](https://www.latitudemedia.com/news/running-the-numbers-on-tesla-and-sunruns-massive-california-vpp-test/) (Aug 2025). DSGS: ~700 MW enrolled, $200/MWh trigger, July 29, 2025 event.
7. The Brattle Group, [Assessing VPP Performance: Impacts of a Test Event in California](https://www.brattle.com/wp-content/uploads/2025/08/Assessing-VPP-Performance-Impacts-of-a-Test-Event-in-California-1.pdf) (Aug 1, 2025).
8. PG&E, [Power to the People: California's Biggest Battery Test Ever Just Changed the Game](https://www.pge.com/en/newsroom/currents/future-of-energy/power-to-the-people--california-s-biggest-battery-test-ever-just.html) (2025).
9. Utility Dive, [California's virtual power plant could save $206M by 2028: Brattle](https://www.utilitydive.com/news/californias-virtual-power-plant-could-save-206m-by-2028-brattle/758145/) (2025).
10. MGRID, [Sunrun and Tesla Push 580 MW From 140,000 Home Batteries Into California's Evening Peak](https://mgrid.org/2026/09/21/sunrun-and-tesla-push-580-mw-from-140000-home-batteries-into-californias-evening-peak/) (Sep 21, 2026). September 9, 2026 record; SCE ELRP 140 MW; 21,112 MW of grid batteries. ⚠
11. Electrek, [Tesla and Sunrun's virtual power plant dispatch record 580 MW to California grid](https://electrek.co/2026/09/21/sunrun-tesla-580-mw-california-grid-record/) (Sep 21, 2026).
12. MGRID, [California Budget Threatens DSGS Virtual Power Plant in 2027](https://mgrid.org/2026/04/07/california-budget-threatens-dsgs-virtual-power-plant-program-in-2027/) (Apr 7, 2026). ⚠
13. Utility Dive, [California zeroes out funding for world's 'largest virtual power plant'](https://www.utilitydive.com/news/california-zeroes-out-funding-for-largest-virtual-power-plant/760274/) (2025). Background on DSGS funding.

### Texas

14. ERCOT, [Aggregate Distributed Energy Resource (ADER) Pilot Project](https://www.ercot.com/mktrules/pilots/ader). Governing documents, phases, monthly reports.
15. ERCOT, [Market Notice M-A030226-01: Updates to ADER Pilot Participation Limits](https://www.ercot.com/services/comm/mkt_notices/M-A030226-01) (Mar 2, 2026). Cap raised from 200 to 500 MW; ancillary-service limit 100 MW.
16. Utility Dive, [2 Tesla virtual power plants cleared to provide energy to Texas electric grid](https://www.utilitydive.com/news/tesla-virtual-power-plants-vpp-ercot-puc-texas-grid/691713/) (Aug 24, 2023). First ADERs; 80 MW cap; under 1 MW per resource.
17. Utility Dive, [Texas regulators look to expand successful 80 MW virtual power plant pilot](https://www.utilitydive.com/news/Texas-to-expand-ADER-80-mw-distributed-energy-resources/702641/) (2024).
18. Energy-Storage.news, [Base Power launches 100MW VPP programme in Texas](https://www.energy-storage.news/?p=96657) (Mar 10, 2026). 25 kWh / 11.4 kW unit; CoServ deal.

### Washington / Puget Sound Energy

19. Puget Sound Energy, [2026 Demand Response Request for Proposals](https://www.pse.com/-/media/PDFs/001-Energy-Supply/003-Acquiring-Energy/2026-Demand-Response-Request-for-Proposals/2026-DR-RFP.pdf) (Apr 2026). DALCU 10% target; ~500 MW by 2030; 129 MW today; Flex enrollment table; winter vs. summer peaks.
20. Puget Sound Energy, [Flex Batteries](https://www.pse.com/en/rebates/PSE-flex/flex-batteries) and [Demand Response Terms and Conditions](https://www.pse.com/en/rebates/PSE-flex/PSE-Demand-Response-terms-and-conditions).
21. FranklinWH, [Puget Sound Energy Flex Batteries Program](https://www.franklinwh.com/homeowner-incentives/puget-sound-energy-flex-batteries-program/). Incentive amounts. ⚠ Vendor source.
22. MyNorthwest, [January 'flex event' affects 260,000 Puget Sound Energy customers](https://mynorthwest.com/local/puget-sound-energy-flex-smart-event-affects-260000-customers-amid-cold-spell/3946409) (Jan 12, 2024).
23. MyNorthwest, [Another Puget Sound Energy flex event: why this is different](https://mynorthwest.com/local/another-puget-sound-energy-flex-event-why-this-is-different/3949866) (Feb 2024).
24. KIRO 7, [PSE Flex program faces first real test as heat hits Puget Sound](https://www.kiro7.com/news/local/pse-flex-program-faces-first-real-test-heat-hits-puget-sound/3QVKQBSMPVBB5AZGCGYIGEH3LU/) (Jul 21, 2026).
25. Utility Dive, [Puget Sound Energy, AutoGrid aim to develop a 100-MW virtual power plant by 2025](https://www.utilitydive.com/news/puget-sound-energy-autogrid-pse-virtual-power-plant-vpp/700806/) (Nov 28, 2023).
26. Washington State Legislature, [House Bill Report, 2SHB 1871](https://lawfilesext.leg.wa.gov/biennium/2025-26/Htm/Bill%20Reports/House/1871%20HBR%20FIN%2025.htm) (2025), and the companion [SB 5727](https://lawfilesext.leg.wa.gov/biennium/2025-26/Htm/Bills/Senate%20Bills/5727.htm). Residential battery incentive.

### Added Oct 15, 2026 (Basics tab)

27. Market Chameleon, [ecobee Grid Resiliency unlocks 2.8 GW capacity](https://marketchameleon.com/articles/b/2026/2/11/ecobee-grid-resiliency-generac-expansion-smart-energy-solutions) (Feb 11, 2026): 143,000 ecobee thermostats, 108 MW delivered peak reduction, summer 2025. ⚠ Secondary; trace to ecobee/Generac's report.
28. Utility Dive, [Smart thermostat aggregator rebrands, launches 'whole-home' VPP](https://www.utilitydive.com/news/smart-thermostat-aggregator-rebrands-launches-whole-home-virtual-power-p/832367/) (Oct 7, 2026): Renew Home is now Everyday Electric, with more than 8 million thermostats.
29. Canary Media, [Google Nest spinout picks Texas for 1 GW virtual power plant](https://www.canarymedia.com/articles/virtual-power-plants/google-nest-spinout-picks-texas-for-1gw-virtual-power-plant) (Nov 19, 2024): Renew Home's origins (Nest Renew + OhmConnect), and the NRG 1 GW goal.
30. EnergyHub, [First DERMS to exceed 1 million devices under management](https://www.energyhub.com/news/energyhub-becomes-the-first-derms-to-exceed-1mm-devices-under-management) (2024): 1.35 GW.
31. Renewable Energy World, [Uplight to acquire DERMS provider AutoGrid](https://www.renewableenergyworld.com/power-grid/smart-grids/uplight-to-acquire-derms-provider-autogrid/) (2024).
32. Puget Sound Energy, [Flex Smart](https://www.pse.com/rebates/PSE-flex/flex-smart), [Flex Smart with ecobee](https://pse.com/rebates/PSE-flex/flex-smart-ecobee) and [Flex EV](https://pse.com/en/rebates/PSE-flex/flex-ev): eligible brands, incentives, event rules (2–4 h, at most 15 per season, 7 am–10 pm).
33. Tesla, [California DSGS program](https://www.tesla.com/support/energy/virtual-power-plant/dsgs): 2026 capacity rates of $7–$15/kW-month, up to about $280 a year per Powerwall, events 4–9 pm.
34. SEIA, [How virtual power plants are making the grid more affordable](https://seia.org/blog/virtual-power-plants/): VPP $43/kW-yr vs. gas peaker $99/kW-yr (DOE projection for a 400 MW VPP).
35. Brattle Group, [Real Reliability: The Value of Virtual Power](https://www.brattle.com/real-reliability/) (May 2023): VPP net cost about 40–60% of the alternatives; $15–35 billion saved over 10 years for 60 GW.

### Not yet sourced (to find)

- Rheem and A. O. Smith as water-heater VPP platforms (named as typical CTA-2045 / connected brands; confirm with BPA or PSE pilot documents).

- Per-device kW figures in section 3.5 (thermostat, heat pump, water heater, EV): look for PSE Flex program evaluations, BPA demand response evaluations, LBNL and Brattle.
- CTA-2045 requirements in Washington's appliance standards.
- Current ERCOT ADER registered MW (ERCOT monthly ADER reports).
- DALCU bill number (believed to be HB 1589, 2024).
