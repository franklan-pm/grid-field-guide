# Chapter 5 · Batteries: what they are, why we need them, how long they last, what they cost

**Grid Field Guide — module plan and research notes**
Research compiled October 2026. Prices, incentives and deployment figures change quickly; re-check anything marked ⚠ before publishing, and put an "as of" date on every cost figure in the app.

---

## 1. Where this chapter fits in the series

| Chapter | Question it answers | What Chapter 5 borrows from it |
|---|---|---|
| 1 · Power mix | Where does the power come from? | The town, the 24-hour day, the bus that must always balance. The battery in Ch 1 currently uses perfect forecasts; Ch 5 explains what that battery actually *is*. |
| 2 · Distribution | How does power get from the substation to the meter? | The feeder the factory and shops sit on. SAIDI/SAIFI give a way to value backup power. |
| 3 · DER & microgrids | What changes when a customer makes power too? | The 750 kW / 1,500 kWh municipal BESS, the SOC taper, islanding, and the cost table. |
| 4 · Grid operations | How do the software systems run it all? | The control layers: BMS → PCS → site controller/EMS → SCADA. Fast layers protect, slow layers plan. |

**Chapter 5 framing:** *Solar and wind generate on nature's schedule, not ours. Batteries let us use the cheapest energy when we actually need it — so daytime sunlight can still light homes in the evening.*

**Running cast (same town as Ch 1):**
- **A home** on the residential feeder
- **A grocery store** on Main Street (commercial)
- **A small factory** at the edge of town (industrial)
- *Cameo:* the town's grid-scale battery from Ch 1

---

## 2. Learning objectives

By the end of the chapter a learner should be able to:

1. Explain in one sentence why a grid with lots of solar and wind needs storage.
2. Tell the difference between **power (kW)** and **energy (kWh)**, and define **duration** (kWh ÷ kW).
3. Name the main components of a battery system, from cell to container.
4. Name the two dominant lithium-ion chemistries and say why LFP has taken over stationary storage.
5. Explain what a **charge cycle** is and estimate a battery's life in years from its cycle rating.
6. Size a battery for a simple goal using a four-step method.
7. Explain why the same kWh of storage costs roughly ten times more at a home than in a factory-built pack.
8. Compare a home, commercial, and industrial battery on purpose, size, payback, and ownership.
9. Describe the layers of protection that keep battery systems safe, and the recent safety trend.

---

## 3. Research findings

### 3.1 Why batteries are needed

- **The duck curve is now visible in real data.** On March 29, 2026, California's batteries delivered more than 12 GW during the evening peak, charging on midday solar and discharging as the sun set. ([eticaag.com summary of CAISO data](https://eticaag.com/battery-storage-and-the-duck-curve-march-29-event/))
- In July 2026 the CAISO fleet dispatched close to 13 GW on one evening, and Texas (ERCOT) set its own charge and discharge records the same week. ([EnergyGPS](https://www.energygps.com/Newsletter/b/Blog-Record-Breaking-Holiday-Week-3448628)) ⚠ Industry newsletter; confirm against CAISO/ERCOT data if quoted.
- One secondary source reports that the March record covered about 43% of California demand at that instant, but that batteries more typically cover 10–20% of evening demand. ⚠ Low-quality source; use only the "instantaneous peak vs. typical day" idea, not the exact numbers, unless verified.
- **US growth:** utility-scale battery capacity grew about 70% a year on average over three years, reaching nearly 52 GW by June 2026 after 8.3 GW was added in the first half of the year. Operators plan roughly 54 GW more through 2028. ([EIA Today in Energy](https://www.eia.gov/todayinenergy/detail.php?id=67925))
- Developers planned 24 GW of utility-scale batteries for 2026, versus a record 15 GW in 2025. Texas accounts for about half of 2026 additions, followed by California and Arizona. ([EIA](https://www.eia.gov/TODAYINENERGY/detail.php?id=67205))
- **The honest caveat (good teaching point):** batteries earn money from the price gap between cheap midday power and expensive evening power. As more batteries are built, they flatten that gap themselves. CAISO batteries averaged about $2.55/kW-month in June 2026, with evening peak prices down about a third year over year. Resource adequacy (being paid to be available) now makes up more than half of revenue for most CAISO batteries. ([Modo Energy, June 2026](https://modoenergy.com/research/caiso-bess-benchmark-june-2026); [Modo Energy, 8 things to watch](https://modoenergy.com/research/caiso-battery-storage-2026-things-to-watch))
- **Why 4 hours?** As solar deepens the midday trough and steepens the evening ramp, a longer battery can cover more of the expensive evening hours, which is why 4-hour systems dominate CAISO. (Modo Energy, same source)

**Teaching takeaway:** Batteries don't make energy. They move it in time: from when it's cheap and plentiful to when it's scarce and valuable.

### 3.2 Chemistries

| Chemistry | Typical cycle life (to ~80% capacity) | Where it wins | Watch-outs |
|---|---|---|---|
| **LFP** (lithium iron phosphate) | ~3,000–6,000+ | Stationary storage: homes, businesses, grid | Heavier and bulkier per kWh than NMC (doesn't matter for a box on the ground) |
| **NMC** (nickel manganese cobalt) | ~1,000–2,000 | Long-range EVs where weight matters | Shorter life, lower thermal stability, costlier metals |
| **Sodium-ion** | ~2,000–4,000 in recent tests | Emerging; cheap abundant materials, good in cold | Lower energy density; early in commercial rollout |
| **Lead-acid** ⚠ | Roughly 500–1,500 (general literature) | Legacy backup (telecom, UPS) | Short life at daily cycling; mostly replaced |
| **Flow batteries (e.g., vanadium)** ⚠ | 10,000+ (general literature) | Long-duration (4–12 h) niche projects | Higher upfront cost, large footprint |

Sources: cycle ranges for LFP/NMC/sodium-ion from [EPC Land comparison](https://epcland.com/?p=52143) and [Electronics360](https://electronics360.globalspec.com/article/22873/from-nmc-to-lfp-batteries). ⚠ Lead-acid and flow ranges are general-literature figures; verify before publishing.

Key facts:
- **LFP is lithium-ion.** "Lithium-ion vs. LFP" is a common confusion. Lithium-ion is the family, and LFP, NMC and NCA are members of it. ([Oukitel explainer](https://oukitelpower.com/blogs/blog/lfp-vs-lithium-ion-new-article))
- **LFP's market share in stationary storage:** estimates range from about 70% in 2024 ([Electronics360](https://electronics360.globalspec.com/article/22873/from-nmc-to-lfp-batteries)) to nearly 85% in 2024, citing IRENA ([Oukitel](https://oukitelpower.com/blogs/blog/lfp-vs-lithium-ion-new-article)). ⚠ Say "the large majority" rather than a precise figure.
- **Cost gap:** across all segments in 2025, LFP packs averaged about $81/kWh versus about $128/kWh for NMC. ([BNEF](https://about.bnef.com/insights/clean-energy/lithium-ion-battery-pack-prices/))
- **Why LFP is safer:** its phosphate-oxygen bond is very stable, so it resists releasing oxygen when overheated and has more margin against thermal runaway. ([SurgePV](https://www.surgepv.com/blog/lfp-vs-nmc-battery-solar-storage)) Tesla moved its Powerwall line from NMC to LFP.
- **Cold climates:** stationary LFP systems in cold regions typically use enclosure heating, which costs little energy compared with the life it protects. ([Ionworks](https://www.ionworks.com/blog/why-lithium-iron-phosphate-(lfp)-is-the-chemistry-of-choice-for-stationary-energy-storage)) Relevant for Spokane-area learners.

### 3.3 Charge cycles and lifespan

- **One cycle** = discharging the battery's full usable capacity and recharging it, whether in one go or in pieces (two half-discharges ≈ one cycle).
- **Cycles → years:** one full cycle a day is 365 cycles a year.
  - 3,000 cycles ≈ 8 years
  - 4,000 cycles ≈ 11 years
  - 6,000 cycles ≈ 16 years
- **What wears a battery out faster:**
  - **Heat.** For LFP, running around 45°C can cut cycle life by roughly 20–30%. ([SunLith Energy](https://sunlithenergy.com/blog/blog-single-author-full/page/2)) ⚠ Vendor source.
  - **Depth of discharge.** Shallower cycles extend life; some sources claim 50% depth can roughly double cycle count. ⚠ Vendor source.
  - **Calendar aging.** Batteries slowly lose capacity with time even if lightly used.
  - **Very high charge/discharge rates.**
- **End of life** usually means ~70–80% of original capacity, not a dead battery. Options include **augmentation** (adding new modules to restore capacity), **second-life** use in less demanding roles, and **recycling**.
- **Lab vs. field:** published cycle numbers vary widely because test conditions differ. NREL work cited by one industry source found LFP cells kept over 80% capacity after 3,000 full cycles at 25°C. ([SurgePV](https://www.surgepv.com/blog/lfp-vs-nmc-battery-solar-storage)) ⚠ Trace to the original NREL report before citing.

### 3.4 The main components (cell to container)

From smallest to largest:

1. **Cell** — the basic electrochemical unit (cathode, anode, separator, electrolyte). Lithium ions shuttle between the two electrodes during charge and discharge.
2. **Module** — a group of cells wired together with sensors.
3. **Rack / pack** — modules stacked with wiring, fusing and a rack-level BMS.
4. **Battery management system (BMS)** — monitors every cell's voltage, temperature and current; balances cells; estimates state of charge (SOC) and state of health (SOH); trips the system if anything goes out of range. This is the fastest protective layer (Ch 4 link).
5. **Power conversion system (PCS) / inverter** — bidirectional DC↔AC conversion. It's the box labelled DC/AC in Ch 1 and can be grid-following or grid-forming (see glossary).
6. **Transformer** — steps voltage up to the site or feeder level (same symbol as Ch 1–3).
7. **Thermal management** — HVAC or liquid cooling, plus heating in cold climates.
8. **Fire detection and suppression** — gas, smoke and heat sensors; ventilation and explosion venting; suppression systems; spacing between units.
9. **Enclosure** — wall-mounted cabinet (home), outdoor cabinet (commercial), or shipping-container-style unit (industrial and grid).
10. **Site controller / energy management system (EMS)** — decides *when* to charge and discharge based on prices, load, and goals. Talks to the utility through the DER Gateway / SCADA (Ch 3–4 link).

**Key standards to name (not explain in detail):** UL 9540 (system safety listing), UL 9540A (thermal-runaway fire test method), NFPA 855 (installation code), UL 1973 (stationary batteries), IEEE 1547 (interconnection, already in Ch 3).

### 3.5 What batteries cost

**The cost ladder** — the same kWh costs very different amounts depending on what's included and how big the project is:

| Step | What it includes | 2025–2026 figure | Source |
|---|---|---|---|
| Battery pack (stationary) | Cells, modules, rack, BMS, wiring | **~$70/kWh** global average, down 45% from 2024 | [BNEF](https://about.bnef.com/insights/clean-energy/lithium-ion-battery-pack-prices/) |
| Turnkey system, global | Pack + PCS + enclosure + integration (no construction or grid connection) | **~$117/kWh** average; ~$110/kWh for 4-hour | [Energy-Storage.news on BNEF](https://www.energy-storage.news/?p=92133) |
| Turnkey system, US | Same, US market | **~$219/kWh** (vs. ~$73 in China, ~$177 in Europe) | same |
| Large commercial/industrial, installed | Containerized system, installed | **~$180–$300/kWh** ⚠ | [mgrid.org citing IDTechEx](https://mgrid.org/2026/01/01/ci-battery-storage-market-projects-5x-growth-by-2036-as-demand-charges-drive-3-5-year-payback/) |
| Small commercial, installed | Smaller units, installed | **~$280–$580/kWh** ⚠ | same |
| Home battery, installed | Battery, gateway, electrical work, permits | **~$700–$1,300/kWh**; Powerwall 3 averages **~$998/kWh** (~$13,500) | [EnergySage](https://www.energysage.com/solar/solar-energy-storage/tesla-powerwall-home-battery/); [Jouleio](https://jouleio.com/blog/home-battery-cost-per-kwh/) ⚠ |

**Lesson for learners:** going from ~$70 to ~$1,000 per kWh is mostly *not* the battery. It's fixed costs (design, permits, electricians, interconnection) spread over a small number of kWh.

Other cost facts:
- All-segment average lithium-ion pack price was about $108/kWh in 2025, down roughly 93% since 2010. ([pv magazine India on BNEF](https://www.pv-magazine-india.com/2025/12/10/global-lithium-ion-battery-pack-prices-fall-to-108-kwh-says-bnef))
- BNEF's benchmark levelized cost for a 4-hour battery project fell to about $78/MWh in 2025, a record low. ([BNEF](https://about.bnef.com/insights/clean-energy/battery-storage-costs-hit-record-lows))
- **Tariffs:** BNEF has estimated that a 60% tariff would raise US turnkey costs by about 60%. ([Energy-Storage.news](https://www.energy-storage.news/behind-the-numbers-bnef-finds-40-year-on-year-drop-in-bess-costs/)) ⚠ Check current tariff status before publishing.

**Incentives (US, 2026) — important correction to many websites:**
- The 30% residential credit (Section 25D) **ended December 31, 2025.** Homeowners buying a battery with cash or a loan in 2026 get no federal credit. ([NuWatt](https://nuwattenergy.com/en/massachusetts/solar-battery-tax-credit-ma-2026); [Solar Permit Solutions](https://www.solarpermitsolutions.com/blog/solar-battery-tax-credit-2026))
- **Businesses** and **third-party-owned** residential systems (leases/PPAs) can still use the commercial credit (Section 48E). Storage that starts construction before 2033 remains eligible. ([pv magazine USA](https://pv-magazine-usa.com/?p=18305))
- New foreign-sourcing (FEOC) limits apply: for storage beginning construction in 2026, the allowed foreign share is 60%, falling 5 points each year to 2030. (same source)
- State and utility programs matter more now. Example: Oregon offers a separate battery storage credit; California's SGIP pays per kWh. ⚠ Check Washington-specific programs for local learners.

**Note on Chapter 3's cost table:** Ch 3 uses $350–$500/kWh for the 750 kW / 1,500 kWh site. That's above BNEF's US turnkey average, but BNEF's figure excludes construction and grid connection. Ch 3's range is probably defensible for a small 2-hour installed project, but add a footnote explaining "turnkey" vs. "installed" so the two chapters don't appear to contradict each other.

### 3.6 Safety

- **Trend:** EPRI's incident database shows the failure rate per deployed capacity fell about 99% from 2018 to 2025, as lessons from early incidents were built into designs and practices. EPRI notes the database may not capture every incident. ([EPRI Storage Wiki](https://storagewiki.epri.com/index.php/BESS_Failure_Incident_Database))
- **When failures happen:** about 72% of incidents occurred during construction, commissioning, or the first two years of operation. ([Energy-Storage.news on EPRI](https://energy-storage.news/battery-storage-failure-incident-rate-dropped-97-between-2018-and-2023))
- **Context for the public:** the Moss Landing, California fire (January 2025) was a large indoor facility using older-generation design and is the event most people have heard of. Use it as an example of why spacing, outdoor containerized design and LFP chemistry are now standard.
- **Industry framing to present neutrally:** industry groups emphasize the layered code framework (NFPA 855, UL 9540/9540A) and the improving record. ([SEIA fact sheet](https://seia.org/media/15215/bess-safety-factsheet.pdf/)) Community groups raise siting, emergency response, and runoff/air concerns. Present both.

---

## 4. The three applications

### 4.1 Side-by-side comparison

| | **Home** | **Grocery store (commercial)** | **Small factory (industrial)** |
|---|---|---|---|
| Typical size | ~10–15 kWh, 5–12 kW | ~100–200 kWh, 50–100 kW | ~300 kWh–2 MWh, 150–500 kW |
| Main job | Evening use of rooftop solar; backup during outages | Shave demand charges; keep refrigeration running in outages | Shave demand charges; protect processes from outages and voltage dips |
| Who pays the bill | Homeowner on residential rate (often time-of-use) | Business on commercial rate with demand charges | Business on industrial rate with demand charges |
| What makes money | Time-of-use savings, utility programs; mostly a resilience purchase | Demand-charge savings, TOU, backup value | Demand-charge savings, TOU, avoided production losses, possible grid-service payments |
| Sized by | Evening load and critical backup loads | Size of the peak to shave | Size and length of peaks; critical process loads |
| Typical form | Wall-mounted unit, often with integrated inverter | Outdoor cabinet(s) | Containerized system or multiple cabinets |
| Federal credit in 2026 | None if owned outright; available via lease/PPA | Yes (48E), subject to sourcing rules | Yes (48E), subject to sourcing rules |
| Ties to earlier chapters | Ch 1 (evening peak), Ch 3 (customer side) | Ch 2 (SAIDI, feeder), Ch 3 (export limit) | Ch 2 (feeder capacity), Ch 3 (interconnection, islanding), Ch 4 (EMS/SCADA) |

### 4.2 How demand charges work (needed for commercial and industrial)

- Businesses pay for **energy** ($/kWh) *and* for their **highest 15-minute peak each month** ($/kW).
- Demand charges can be a large share of a business bill; one market-research summary puts them at 30–50% for high-demand facilities. ⚠ ([mgrid.org citing IDTechEx](https://mgrid.org/2026/01/01/ci-battery-storage-market-projects-5x-growth-by-2036-as-demand-charges-drive-3-5-year-payback/))
- **Monthly savings = peak reduced (kW) × demand rate ($/kW).** ([SunLith Energy](https://sunlithenergy.com/peak-shaving-energy-costs/))
- **The catch (great teaching point):** if the battery misses the peak *once* in a month — runs empty, or the controller guesses wrong — that month's demand saving is mostly lost. Forecasting matters, which links back to Ch 1's "perfect forecast" simplification and Ch 4's forecasting layer.

### 4.3 Worked examples

All three use **illustrative** round numbers. Tell learners to plug in their own utility's rates.

**Common assumptions**
- Usable depth of discharge: 90% (some products already quote usable kWh)
- Discharge efficiency: 95%
- Degradation margin: +20% so the battery still meets the goal in later years
- Demand charge: $15/kW-month (illustrative; real rates vary widely)

#### Home

- Household uses about 29–30 kWh/day (roughly the US average). ([Jouleio citing EIA](https://jouleio.com/blog/home-battery-cost-per-kwh/)) ⚠
- Goal: cover ~10 kWh of evening use from rooftop solar, plus keep critical loads (fridge, lights, internet, furnace fan) running ~12 hours in an outage.
- Choice: **one 13.5 kWh / 11.5 kW unit** (e.g., Powerwall 3, whose 11.5 kW continuous output is well above the 5–7 kW typical of competitors). ([EnergySage](https://www.energysage.com/solar/solar-energy-storage/tesla-powerwall-home-battery/))
- Cost: ~$13,500 installed, no federal credit if bought outright.
- Savings example: shifting 10 kWh/day with a $0.20/kWh time-of-use spread ≈ $730/year → **simple payback ~18 years**.
- **Lesson:** for most homes without strong time-of-use rates or local incentives, a battery is mainly a **resilience** purchase, not an investment. ([Jouleio](https://jouleio.com/blog/tesla-powerwall-cost/)) That's a legitimate reason to buy one, and learners should know which they're buying.

#### Grocery store (commercial)

- Peak demand: 200 kW (refrigeration + HVAC on a hot afternoon). Goal: cap at 150 kW → shave **50 kW** for up to **2 hours**.
- Energy needed: 50 kW × 2 h = 100 kWh usable
- Nameplate: 100 ÷ (0.90 × 0.95) × 1.2 ≈ 140 kWh → **choose 60 kW / 150 kWh**
- Annual saving: 50 kW × $15 × 12 = **$9,000/year**
- Cost at $280–$580/kWh: **$42,000–$87,000**
- Simple payback: **~4.7–9.7 years**; with a 30% federal credit: **~3.3–6.8 years**
- Bonus value: keeping refrigeration running through a short outage protects inventory.

#### Small factory (industrial)

- Typical load 400 kW; peaks to 600 kW when compressors, motors and ovens overlap. Goal: cap at 450 kW → shave **150 kW** for up to **2 hours**.
- Energy needed: 150 kW × 2 h = 300 kWh usable
- Nameplate: 300 ÷ (0.90 × 0.95) × 1.2 ≈ 420 kWh → **choose 250 kW / 500 kWh** (extra power for motor starts and backup)
- Annual saving: 150 kW × $15 × 12 = **$27,000/year**
- Cost at $280–$580/kWh: **$140,000–$290,000**
- Simple payback: **~5.2–10.7 years**; with a 30% federal credit: **~3.6–7.5 years**
- Bonus value: avoiding a production shutdown during an outage or voltage sag can be worth more than the demand savings. A single lost shift may cost more than a year of demand charges.
- **Compare with marketing claims:** some sources advertise 3–5 year paybacks. Those generally assume high demand charges, the 30% credit, and stacking several revenue streams. The worked example shows why real paybacks are often longer. ⚠

**Feeder tie-in (Ch 2–3):** a 250 kW factory battery on a 12 kV feeder needs an interconnection review like Ch 3's site. If the factory also has solar, the export limit at the point of common coupling applies.

### 4.4 Grid-scale cameo (link back to Ch 1)

- The town's battery from Ch 1 is the same technology at a larger scale, almost always **4 hours** in solar-heavy markets.
- It earns money differently: energy arbitrage, capacity/resource adequacy, and grid services such as frequency regulation, not demand charges.
- Learners should notice that **cost per kWh keeps falling with size**, which is why most US storage capacity is utility-scale.

---

## 5. Sizing method (four steps for the app)

1. **Pick the goal.** Backup? Evening solar shifting? Shaving a peak? (Each sizes differently.)
2. **Power (kW):** how much load must the battery carry at once? → sets the inverter/PCS size.
3. **Energy (kWh):** power × hours needed → usable energy required.
4. **Adjust for reality:** divide by usable depth of discharge × efficiency, then add a degradation margin (≈20%).

> **Nameplate kWh ≈ (kW × hours) ÷ (DoD × efficiency) × 1.2**

**Duration** = kWh ÷ kW. A 13.5 kWh / 11.5 kW home battery is a ~1.2-hour battery at full output, but lasts many hours at a typical 1 kW evening load. This is a great interactive moment.

---

## 6. Module structure (matches Ch 1–4 format)

Tabs: **◇ Diagram · ⚡ Playground · ≡ Glossary · ? Quiz · $ Costs**

### 6.1 Diagram: "Inside the box"
Exploded, clickable view: cell → module → rack + BMS → PCS → transformer → site controller → utility. Each component card answers *what it does, what happens if it fails, roughly what it costs*. Highlight thermal and fire systems as their own layer.

### 6.2 Playground (four sub-tools)

1. **Shift the sun** — a 24-hour home or town profile (reuse Ch 1's chart style). Learner adds battery size and watches midday solar move into the evening. Readouts: % of evening covered, kWh curtailed, cycles used.
2. **Wear it out** — sliders for depth of discharge, temperature, cycles per day, chemistry. Readout: years to 80% capacity, with LFP and NMC side by side.
3. **Size it** — choose Home / Grocery / Factory, set the goal, and the four-step method fills in. Show kW vs kWh as "size of the pipe" vs "size of the tank."
4. **Pay it back** — demand rate, TOU spread, installed $/kWh, incentive on/off. Readout: annual savings and simple payback. Include a "missed one peak this month" toggle to show the fragility of demand savings.

### 6.3 Glossary (draft terms)
Cell · Module · Rack · BMS · PCS / inverter · Grid-following vs. grid-forming · State of charge (SOC) · State of health (SOH) · Depth of discharge (DoD) · Charge cycle · Round-trip efficiency · C-rate · Duration · Nameplate vs. usable capacity · Augmentation · Calendar aging · Thermal runaway · LFP · NMC · Sodium-ion · Demand charge · Time-of-use (TOU) · Peak shaving · Load shifting · Energy arbitrage · Resource adequacy · Frequency regulation · Turnkey vs. installed cost · Levelized cost of storage (LCOS) · UL 9540 / 9540A · NFPA 855

**Grid-forming vs. grid-following (ready-to-use definition):** a grid-following inverter measures the grid's existing voltage and frequency and injects current in sync with it, so it needs a stable grid to follow. A grid-forming inverter sets its own voltage and frequency, so it can hold up a microgrid, help restart after a blackout, and provide the stabilizing response spinning generators have traditionally given.

### 6.4 Quiz (sample questions)
1. A battery is rated 100 kW / 400 kWh. What is its duration? *(4 hours)*
2. Why has LFP overtaken NMC for stationary storage? *(Longer cycle life, better thermal stability, lower cost; weight doesn't matter for a box on the ground.)*
3. A battery rated 4,000 cycles cycles once a day. Roughly how many years? *(~11)*
4. Do batteries generate electricity? *(No; they move it in time, and lose ~10–15% doing so.)*
5. Why does a home battery cost ~$1,000/kWh when packs cost ~$70/kWh? *(Fixed installation, permitting, electrical and sales costs spread over few kWh.)*
6. The factory battery covers every peak except one 20-minute spike on the 14th. What happens to that month's demand saving? *(Most of it is lost.)*
7. Which part of a battery system reacts fastest to a fault? *(The BMS.)*
8. Where do most battery failure incidents happen in a project's life? *(Construction, commissioning, or first two years.)*
9. Can a homeowner buying a battery outright claim the 30% federal credit in 2026? *(No.)*
10. Why are most grid batteries in solar-heavy markets 4 hours? *(To cover the whole evening peak after solar drops off.)*

### 6.5 Costs tab
- The cost ladder table (§3.5) as a stepped bar chart from pack to home.
- The three worked examples (§4.3), editable.
- An incentives box with an "as of" date and a link list for state programs.
- Footnote reconciling Ch 3's $350–$500/kWh with BNEF's turnkey numbers.

---

## 7. Common misconceptions to address

| Myth | Reality |
|---|---|
| "Batteries make energy." | They store and return it, losing ~10–15% along the way. |
| "A battery can power the town for days." | Most grid batteries are 2–4 hours. Multi-day gaps need other resources. |
| "LFP isn't lithium-ion." | It is. LFP and NMC are both lithium-ion chemistries. |
| "A battery dies when it hits its cycle count." | It slowly loses capacity; 'end of life' is usually ~70–80% remaining. |
| "Home batteries always pay for themselves." | Often they don't on savings alone; they're frequently a resilience purchase. |
| "Battery fires are getting more common." | Incidents per deployed capacity have fallen sharply; total deployments have grown much faster than incidents. |
| "There's still a 30% tax credit for my home battery." | Not for homeowner-owned systems placed in service in 2026. |

---

## 8. Open items before publishing

- [ ] Replace ⚠ figures with primary sources where possible (NREL ATB 2025/2026 residential and commercial storage pages; Lazard LCOS; EIA small-scale storage data).
- [ ] Confirm current tariff status on imported batteries and cells.
- [ ] Add Washington State and local utility (e.g., Avista) battery programs and rate structures for local relevance.
- [ ] Pick a demand charge and TOU spread that reflect the learners' region, or let users enter their own.
- [ ] Add footnote reconciling Ch 3 costs with BNEF turnkey figures.
- [ ] Decide whether sodium-ion and flow batteries get full cards or a short "what's next" section.
- [ ] Date-stamp the Costs tab and incentives box.

---

## 9. Source list

**Primary / strongest**
- EIA, *Battery storage capacity averaged 70% growth over the last three years* (2026) — https://www.eia.gov/todayinenergy/detail.php?id=67925
- EIA, *Planned utility-scale capacity additions for 2026* — https://www.eia.gov/TODAYINENERGY/detail.php?id=67205
- BNEF, *2025 Lithium-Ion Battery Price Survey* — https://about.bnef.com/insights/clean-energy/lithium-ion-battery-pack-prices/
- BNEF, *Battery storage costs hit record lows* (LCOE 2026) — https://about.bnef.com/insights/clean-energy/battery-storage-costs-hit-record-lows
- Energy-Storage.news on BNEF *Energy Storage Systems Cost Survey 2025* — https://www.energy-storage.news/?p=92133
- EPRI, *BESS Failure Incident Database* — https://storagewiki.epri.com/index.php/BESS_Failure_Incident_Database
- Energy-Storage.news on EPRI root-cause analysis — https://energy-storage.news/battery-storage-failure-incident-rate-dropped-97-between-2018-and-2023
- NREL, *Cost Projections for Utility-Scale Battery Storage: 2025 Update* — https://docs.nrel.gov/docs/fy25osti/93281.pdf
- pv magazine USA, *What the budget bill means for energy storage tax credit eligibility* — https://pv-magazine-usa.com/?p=18305

**Market analysis**
- Modo Energy, *CAISO June 2026 benchmark* — https://modoenergy.com/research/caiso-bess-benchmark-june-2026
- Modo Energy, *CAISO battery storage in 2026: 8 things to watch* — https://modoenergy.com/research/caiso-battery-storage-2026-things-to-watch
- EnergyGPS, *Record-Breaking Holiday Week* (July 2026) — https://www.energygps.com/Newsletter/b/Blog-Record-Breaking-Holiday-Week-3448628
- SEIA, *BESS Safety fact sheet* — https://seia.org/media/15215/bess-safety-factsheet.pdf/

**Consumer / vendor (verify before citing)**
- EnergySage, *Tesla Powerwall 3 review 2026* — https://www.energysage.com/solar/solar-energy-storage/tesla-powerwall-home-battery/
- Jouleio, *Home battery cost per kWh 2026* — https://jouleio.com/blog/home-battery-cost-per-kwh/
- Jouleio, *Tesla Powerwall cost 2026* — https://jouleio.com/blog/tesla-powerwall-cost/
- NuWatt, *Solar battery tax credit 2026* — https://nuwattenergy.com/en/massachusetts/solar-battery-tax-credit-ma-2026
- Solar Permit Solutions, *Solar battery tax credit 2026* — https://www.solarpermitsolutions.com/blog/solar-battery-tax-credit-2026
- mgrid.org, *C&I battery storage market* (citing IDTechEx) — https://mgrid.org/2026/01/01/ci-battery-storage-market-projects-5x-growth-by-2036-as-demand-charges-drive-3-5-year-payback/
- SunLith Energy, *Peak shaving savings* — https://sunlithenergy.com/peak-shaving-energy-costs/
- EPC Land, *LFP vs NMC vs Sodium-Ion* — https://epcland.com/?p=52143
- Electronics360, *From NMC to LFP batteries* — https://electronics360.globalspec.com/article/22873/from-nmc-to-lfp-batteries
- SurgePV, *LFP vs NMC for solar 2026* — https://www.surgepv.com/blog/lfp-vs-nmc-battery-solar-storage
- Ionworks, *Why LFP is the chemistry of choice for stationary storage* — https://www.ionworks.com/blog/why-lithium-iron-phosphate-(lfp)-is-the-chemistry-of-choice-for-stationary-energy-storage
- eticaag.com, *Battery storage and the duck curve: March 29 event* — https://eticaag.com/battery-storage-and-the-duck-curve-march-29-event/

*Built for learning, not for engineering sign-off. Numbers are realistic in scale, not quotes.*
