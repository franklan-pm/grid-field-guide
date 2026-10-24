# Chapter 6 (VPPs): fact-check report

Checked: October 24, 2026
Scope: items in the fact-check brief for `apps/06-vpp/index.html`. No chapter or model code was changed (`simulate`, `vppMoney` untouched).

## Summary

| # | Item | Verdict | Action needed |
|---|---|---|---|
| 1 | Google–Voltus 1,070 MW | Correct | Add context (total ~1,170 MW, ramp to 2030, contracted not delivered) |
| 2 | ecobee 108 MW / 143k / 11 events / 0.75 kW | Mostly correct | **0.75 kW is wrong: measured average is 0.65 kW** |
| 3 | California 580 MW "largest so far" | Numbers correct | **"Largest" is outdated: 745 MW on Oct 6, 2026** |
| 4 | PSE 456,000 Flex enrollees | Number correct | **Relabel: it's Flex Events (opt-out behavioral) only** |
| 5 | PSE Flex incentives | Correct | Swap vendor source for pse.com |
| 6 | DSGS → ELRP in 2027 | Payments correct | **Transition is wrong: transfer to CPUC was rejected** |
| 7 | ERCOT ADER 500 MW, 100 MW per aggregation | 500 MW correct | **100 MW is a pilot-wide AS limit, not per aggregation** |
| 8 | Washington DALCU 10% by 2030 | Correct | Add bill number: ESHB 1589 (2024) |
| 9 | Water heater 0.3–0.5 kW | Plausible (resistance) | Note heat-pump heaters are lower |
| 10 | EV ~1 kW average | Can't verify, likely high | Evaluations show ~0.23–0.25 kW |
| 11 | Fleet mix per 100 homes | Illustrative | Keep label; PSE's real mix is very different |
| 12 | VPP $43 vs peaker $99 | Correct | Add caveats (one modeled utility, 2022$) |

---

## High priority

### 1. Google–Voltus VPP in PJM

**Claim:** Google announced a deal with Voltus for a VPP in PJM; Voltus provides ~1,070 MW, "approximately the output of a nuclear reactor."

**Verdict:** Correct, needs context.

**Findings:**
- Announced jointly by Voltus and Google on **Oct 22, 2026**.
- The 1,070 MW is **added** to an initial 100 MW deal signed **June 2, 2026**, so the total is ~1,170 MW. Both companies call it "1 GW" and don't reconcile the two figures.
- It's a **contracted target**, not delivered capacity. Voltus told Utility Dive it expects to ramp up over 3–4 years, then run under contract with Google through **2040**.
- Nameplate vs. deliverable: the June deal was described as "accredited distributed capacity." The October release doesn't specify.
- Resources: batteries, smart thermostats, on-site generation, industrial process adjustments.

**Nuclear comparison:** Fair as a size analogy (a large US reactor is ~1 GW), but a VPP only delivers when called during grid stress, not around the clock. Suggest wording like "about the capacity of a large nuclear reactor, available when the grid calls for it."

**Sources:**
- Voltus press release, Oct 22, 2026: https://www.voltus.co/press/google-voltus-1gw (primary)
- Voltus press release (initial 100 MW), Jun 2, 2026: https://www.voltus.co/press/voltus-google-bring-your-own-capacity-pjm (primary)
- Utility Dive / Facilities Dive, Oct 23, 2026: https://www.facilitiesdive.com/news/google-voltus-vpp-virtual-power-pjm/833816/ (secondary; source for ramp timeline and 2040 term)

---

### 2. ecobee, summer 2025

**Claim:** 108 MW from 143,000 thermostats over 11 events, about 0.75 kW each.

**Verdict:** Mostly correct. **The 0.75 kW per-device figure is wrong.**

**Findings:**
- 108 MW, 11 events, 143,000+ devices: confirmed.
- Measured **average reduction was 0.65 kW per device**, with peaks above 1 kW and 73% average participation.
- 0.75 kW is just 108 MW ÷ 143,000, which isn't how the evaluator measured it.
- The 108 MW is **aggregate capability across CAISO, ERCOT and SPP**, not one simultaneous dispatch. The largest single event was **78.1 MW in ERCOT**.
- ecobee's landing page says "145,000 customers"; the press release and evaluator say "143,000 devices." Use 143,000 devices.

**For Frank:** The model constant (line ~701) uses 0.75 kW. Consider 0.65 kW. Not changed per instructions.

**Sources:**
- ecobee press release, Feb 10, 2026: https://www.ecobee.com/en-us/newsroom/press-releases/ecobees-grid-resiliency-service-unlocks-2-8-gw-of-capacity/ (primary)
- Demand Side Analytics evaluation summary: https://demandsideanalytics.com/ecobee_gr/ (primary, independent evaluator)
- ecobee Grid Resiliency page: https://www.ecobee.com/en-us/utilities/grid-resiliency/ (primary; source for 78.1 MW ERCOT event)

---

### 3. California home-battery dispatches

**Claim:** Sep 9, 2026: ~580 MW from ~140,000 batteries for 3 hours (≈4.1 kW each), "the largest home-battery VPP dispatch so far." Jul 29, 2025: 535 MW from 100,000+ batteries.

**Verdict:** Numbers correct. **"Largest so far" is outdated.**

**Findings, Sep 9, 2026:**
- Confirmed: 580 MW, 140,000+ batteries, three-hour evening window.
- Breakdown: 517 MW from 110,000 Powerwalls (55% owned/operated by Sunrun) + 63 MW from 30,000+ other batteries.
- Requested by the CEC and utilities, through **DSGS** (triggered by CAISO day-ahead price > $200/MWh) and **ELRP** (called by PG&E).
- ≈4.1 kW average is correct arithmetic (Powerwalls ≈4.7 kW; others ≈2.1 kW).
- Next evening (Sep 10), SCE called a separate dispatch: 140+ MW.

**Newer records:**

| Date | MW | Note |
|---|---|---|
| Jul 29, 2025 | 535 (avg) / 539 | Scheduled 2-hour test |
| Sep 9, 2026 | 580 | Heat wave, 3 hours |
| Oct 5, 2026 | 669 | Heat wave |
| **Oct 6, 2026** | **745** | **Current record** |

- October figures are peak MW. Neither company published MWh or exact duration. Tesla says 85,000+ Powerwalls supplied 600+ MW of the Oct 6 total.

**Jul 29, 2025:**
- 535 MW is Brattle's **two-hour average** (7–9 p.m.) from 100,000+ batteries, a scheduled test. Sunrun's later releases cite 539 MW (likely peak). Say "average" if keeping 535.
- Brattle's DSGS-only assessment gives ~476 MW for the same test (DSGS participants only), so different scopes give different numbers.

**Suggested fix:** Change "largest so far" to "the record at the time," or update to Oct 6, 2026 (745 MW).

**Sources:**
- Sunrun, Sep 21, 2026: https://investors.sunrun.com/news-events/press-releases/detail/381/sunrun-and-tesla-dispatch-580-megawatts-to-californias (primary, company)
- Sunrun, Oct 14, 2026 (GlobeNewswire copy): https://finviz.com/news/402323/sunrun-leads-record-grid-dispatch-delivering-enough-energy-to-power-every-home-in-san-francisco-and-san-jose (primary text, secondary host)
- Electrek, Oct 14, 2026: https://electrek.co/2026/10/14/tesla-powerwall-sunrun-record-745-mw-california-grid-dispatch/ (secondary; Tesla's 600 MW figure)
- Sunrun, Aug 4, 2025: https://investors.sunrun.com/news-events/press-releases/detail/349/sunrun-dispatches-a-record-amount-of-energy-to (primary, company, citing Brattle)

**Note:** All dispatch figures are company-reported. No CEC/CAISO confirmation found.

---

### 4. PSE (Puget Sound Energy) enrollment

**Claim:** ~456,000 Flex enrollees; ≈49,000 thermostats · 10,800 EVs · 800 batteries; 23.7 → 129 → ≈500 MW.

**Verdict:** Numbers correct. **456,000 is mislabeled.**

**PSE program counts (as of April 3, 2026):**

| Program | Type | Launched | Enrolled |
|---|---|---|---|
| Flex Events / Peak Time Savings | Opt-out behavioral (notifications) | Aug 2023 | **456,000** |
| Flex Rewards | Opt-in behavioral | Nov 2023 | 53,000 |
| Flex Smart | Thermostats (automated) | Aug 2023 | 40,400 |
| Ecobee Grid Resilience | Thermostats (automated) | Sep 2025 | 8,336 |
| Flex EV | EV/charger (automated) | Mar 2024 | 10,800 |
| Flex Batteries | Batteries (automated) | Aug 2024 | 800 |
| Flex Water Heaters (pilot) | Automated | May 2025 | 422 |
| Flex C&I | Business | Nov 2023 | 528 |
| Flex Business | Small business behavioral | Dec 2025 | 244 |
| Flex Smart+ | Subset of Flex Smart/EV (Bainbridge, Duvall) | Nov 2022 | 1,400 |

**Findings:**
- **456,000 = Flex Events only**, customers enrolled by default into event notifications. It isn't a count of controllable devices. Suggested label: "about 456,000 customers get Flex event alerts."
- **≈49,000 thermostats** = Flex Smart (40,400) + Ecobee Grid Resilience (8,336). Say so, or use 40,400 for Flex Smart alone.
- 10,800 EVs and 800 batteries: correct.
- **23.7 MW** = original DR target for 2025 filed in the Nov 2021 CEIP (a target, not achieved MW). PSE later selected vendors totaling 86 MW by 2025.
- **129 MW** = current DR portfolio (Apr 2026).
- **≈500 MW** = PSE's preliminary estimate of 10% of 2030 peak.
- **640,000 (KIRO 7) and ~700,000:** not verified. PSE's 2025 Equity Action Plan said Flex Events had ~560,000. Counts move as customers opt out, so date any figure used.

**Sources:**
- PSE 2026 Demand Response RFP, Apr 17, 2026 (filed as Exh. AAA-19, UTC Docket UE-260005, Sep 15, 2026): https://apiproxy.utc.wa.gov/cases/GetDocument?docID=4748&year=2026&docketNumber=260005 (primary)
- PSE RFP page: https://www.pse.com/en/pages/energy-supply/acquiring-energy/2026-Demand-Response-Request-for-Proposals (primary)
- PSE 2025 DR Equity Action Plan: https://apiproxy.utc.wa.gov/cases/GetDocument?docID=3545&year=2024&docketNumber=240004 (primary)

---

### 5. PSE Flex incentives

**Claim:** Flex Batteries $75/kWh to sign up (up to $1,000) + $0.50/kWh discharged (up to $500/yr). Flex Smart thermostats $50 + $20 a season.

**Verdict:** Correct. Now confirmed on pse.com (replaces the FranklinWH vendor source).

**Findings:**
- Batteries: $75 per kWh of storage, max $1,000 per battery; $0.50 per kWh provided during events, max $500 per battery per year.
- Smart thermostats (Nest, ecobee, Honeywell, Sensi, Amazon): $50 enrollment + $20 per season (winter and summer), so up to $40/yr.
- Line-voltage thermostats (Mysa, Sinopé): $20 enrollment + $10 per winter.
- PSE sometimes runs promos (e.g., $75 instead of $50 for thermostats, time-limited).

**Sources:**
- https://www.pse.com/flexbatteries (primary)
- https://www.pse.com/rebates/PSE-flex/flex-smart (primary)

---

### 6. California DSGS

**Claim:** Funded only through Dec 2026; expected to end in its current form in 2027 and move to the CPUC's ELRP. Paid Powerwall owners $7–$15/kW-month in 2026, up to ~$280/yr.

**Verdict:** Payments correct. **The ELRP transition is wrong.**

**Findings, status:**
- Final state budget (finalized late Aug 2026) gave DSGS **no money for 2027**.
- But it **excluded** Newsom's plan to move the program from the CEC to the CPUC. DSGS still exists at the CEC; it's just unfunded for 2027.
- Lawmakers transferred ~$27M from another program to keep DSGS running through 2026.
- Future depends on the next governor and legislature acting early in 2027.

**Findings, payments (Tesla, 2026 season):**

| Month | $/kW |
|---|---|
| May | 7.00 |
| June | 7.25 |
| July | 13.10 |
| August | 14.04 |
| September | 14.97 |
| October | 8.19 |

- Up to $280 per Powerwall per season.
- Payouts depend on a capped pool: $19.5M for Option 3 in 2026, allocated pro rata.

**Suggested fix:** "DSGS has no state funding for 2027. A plan to fold it into the CPUC's ELRP was dropped, so its future depends on next year's budget."

**Sources:**
- Tesla DSGS page: https://www.tesla.com/support/energy/virtual-power-plant/dsgs (primary, company)
- CEC DSGS Program Guidelines, 5th ed., Apr 2026: https://efiling.energy.ca.gov/GetDocument.aspx?tn=269650&DocumentContentId=106742 (primary)
- Canary Media, Sep 1, 2026: https://www.canarymedia.com/articles/virtual-power-plants/california-guts-biggest-virtual-power-plant (**secondary**; reports Advanced Energy United's account)

**To check:** Canary also ran "Newsom finally says yes to virtual power plants." Several VPP bills passed the legislature in Aug 2026; their signing status wasn't verified.

---

### 7. ERCOT ADER pilot

**Claim:** Total cap raised to 500 MW in March 2026; each aggregation up to 100 MW.

**Verdict:** 500 MW correct. **"Each aggregation up to 100 MW" is wrong.**

**Market Notice M-A030226-01 (Mar 2, 2026):**
- Registered Capacity Limit: 200 → **500 MW**
- Ancillary Service Limit: **unchanged at 100 MW** (pilot-wide, not per aggregation)
- Single-QSE limit: 50% → **90%**

There's no 100 MW per-aggregation cap. The draft Phase 4 rules for the new storage aggregation type (ADESR) say there's no cap on an aggregation's injection capability, with a 1 MW minimum.

**Current registered/qualified MW:**

| Date | Qualified energy MW | ADERs | Source |
|---|---|---|---|
| Feb 2026 | ~108 | 7 | ERCOT (via secondary) |
| Aug 17, 2026 | 249 | — | ERCOT DSWG |
| **Sep 30, 2026** | **293** | **9 (+4 in progress)** | ERCOT Senate testimony |

- ECRS is fully subscribed; Non-Spin ~68% used (Oct 7, 2026).
- Phase 4 (ADESR, nodal dispatch of aggregated batteries) is targeted for a December 2026 Board vote.

**Real dispatch events:**
- Tesla (Aug 2023 PUCT filing): two Tesla ADERs participated in reserves and Non-Spin and were dispatched.
- Base Power (Aug 2026 blog): published a live SCED cycling example (July 22) in its Houston ADER; fleet within 3.3% of ERCOT's commanded power on average. **Company source.**

**Sources:**
- ERCOT Market Notice M-A030226-01, Mar 2, 2026: https://www.ercot.com/services/comm/mkt_notices/M-A030226-01 (primary)
- ERCOT ADER pilot page: https://www.ercot.com/mktrules/pilots/ader (primary)
- ERCOT Senate testimony, Sep 30, 2026: https://www.ercot.com/files/docs/2026/09/30/ERCOT-ADER-Update-Senate-Business-and-Commerce-September-30-2026.pdf (primary)
- ERCOT WMS, Oct 7, 2026: https://www.ercot.com/files/docs/2026/10/06/06.-ADER_Phase-4_WMS_10072026.pdf (primary)
- ERCOT WMWG Phase 4, Sep 25, 2026: https://www.ercot.com/files/docs/2026/09/24/ADER_Phase-4_WMWG_09252026.pdf (primary)
- Tesla filing, PUCT Project 53911, Item 55 (2023): https://interchange.puc.texas.gov/Documents/53911_55_1331785.PDF (primary, company)
- Base Power blog, Aug 2026: https://www.basepowercompany.com/blog/aggregated-ders-and-the-capacity-crunch (primary, company)

---

### 8. Washington DALCU requirement

**Claim:** PSE must plan flexible load equal to 10% of peak from 2030 (about 500 MW); 2024 law.

**Verdict:** Correct. Bill number found.

**Findings:**
- Law: **Engrossed Substitute House Bill 1589**, Chapter 351, Laws of 2024 ("Large Combination Utilities—Decarbonization"), effective March 28, 2024. Codified in **chapter 80.86 RCW**.
- Implementing rule, **WAC 480-96-050(1)(d)**: beginning in 2030, achieve annual demand response and demand flexibility of **at least 10% of winter and summer peak electric demand**, or show it's not technically or commercially feasible.
- It's an Integrated System Plan requirement. PSE's first ISP is due to the UTC in April 2027.
- **~500 MW** is PSE's preliminary estimate, not in the law. (For scale: PSE's 2025 winter peak was 4,629 MW.)
- "DALCU" is PSE's shorthand (Decarbonization Act for Large Combination Utilities), not the official title.

**Sources:**
- Session law: https://lawfilesext.leg.wa.gov/biennium/2023-24/Pdf/Bills/Session%20Laws/House/1589-S.SL.pdf (primary)
- Final bill report: https://lawfilesext.leg.wa.gov/biennium/2023-24/Pdf/Bill%20Reports/House/1589-S.E%20HBR%20FBR%2024.pdf (primary)
- WAC 480-96-050: https://apps.leg.wa.gov/wac/default.aspx?cite=480-96-050&pdf=true (primary)
- PSE 2026 DR RFP §1.1–1.3 (primary)

---

## Medium priority

### 9. Water heater per-unit value

**Claim:** ~0.3–0.5 kW average per enrolled heater; 4.5 kW element.

**Verdict:** Plausible for electric-resistance heaters. Too high for heat-pump water heaters.

**BPA CTA-2045 regional study:**

| Heater type | Season / window | Avg reduction |
|---|---|---|
| Resistance | Winter a.m. | 374 W |
| Resistance | Winter p.m. | 321 W |
| Resistance | Summer p.m. | 347 W |
| Heat pump | Winter a.m. | 223 W |
| Heat pump | Winter p.m. | 165 W |
| Heat pump | Summer p.m. | 85 W |

- 4.5 kW is a standard resistance element rating.
- PSE's own water heater pilot has only 422 enrollees (Apr 2026), so no PSE evaluation yet.

**Suggested:** ~0.3–0.4 kW for resistance, ~0.1–0.2 kW for heat-pump water heaters.

**Sources:**
- BPA results presented at ACEEE Hot Water Forum 2019: https://aceee.org/sites/default/files/pdf/conferences/hwf/2019/2a-eustis.pdf (secondary presentation of BPA data)
- Original BPA report (2018): bpa.gov, "20181118_CTA-2045_Final_Report.pdf" (not fetched)
- NW Regional Technical Forum, water heater DR: https://rtf.nwcouncil.org/demand-response-residential-hot-water-heaters

---

### 10. EV per-unit value

**Claim:** ~1 kW average across enrolled EVs (60% plugged in × 24% charging); ~7 kW when charging.

**Verdict:** Can't verify; **likely high** against measured programs.

**Findings:**
- Eversource off-peak charging evaluation (Guidehouse): 0.25 kW per EV average reduction during 5–8 p.m.
- East Kentucky Power M&V: 0.231 kW average shift at the PJM peak hour.
- EKPC's planning assumption (not measured) uses 1.83 kW diversified summer peak per EV.
- 7 kW when charging is a reasonable Level 2 figure.

**Note:** 1 kW sits between planning assumptions and measured results. Measured programs mostly show ~0.2–0.3 kW. Consider a range or a footnote.

**Sources:**
- Eversource, NH PUC Docket 20-170, Exh. 38 (2023): https://puc.nh.gov/Regulatory/Docketbk/2020/20-170/TRANSCRIPTS-OFFICIAL%20EXHIBITS-CLERKS%20REPORT/20-170_2023-02-08_EVERSOURCE_RR-EXH-38.PDF (primary)
- EKPC, KY PSC Case 2026-00163 (Aug 2026): https://psc.ky.gov/pscecf/2026-00163/christian.everly%40ekpc.coop/08242026054814/2026-00163_EKPCs_Responses_to_Staffs_Second_Request.pdf (primary)
- EKPC planning assumptions, KY PSC (Dec 2022): https://psc.ky.gov/trf4/uploadedFiles/1400_East_Kentucky_Power_Cooperative__Inc_/12212022083019/Exhibit_C_-_Supporting_Documents.pdf (primary)

---

### 11. Fixed fleet mix

**Claim (labeled illustrative):** Per 100 homes: 70 thermostats, 20 water heaters, 15 EV chargers, 10 batteries, 20 solar roofs.

**Verdict:** Illustrative; far richer than any real program today.

**PSE's actual device mix (Apr 2026):**

| Device | Enrolled | Per 100 device enrollments |
|---|---|---|
| Thermostats (Flex Smart + ecobee GR) | ~48,700 | ~80 |
| EVs | 10,800 | ~18 |
| Batteries | 800 | ~1.3 |
| Water heaters | 422 | ~0.7 |

Across ~1.1M residential customers, roughly 4 in 100 homes have an enrolled thermostat and 1 in 100 an enrolled EV.

**Suggested:** Keep the illustrative mix but add a "real PSE today" comparison, or offer it as a preset.

**Source:** PSE 2026 DR RFP (primary).

---

### 12. Value comparison

**Claim:** New VPP $43/kW-yr vs gas peaker $99/kW-yr (DOE / Brattle 400 MW case); grid saves $56/kW-yr.

**Verdict:** Correct, needs caveats.

**Findings:**
- DOE VPP Liftoff 2025 Update (p. 13): net cost of 400 MW of resource adequacy:
  - Basic VPP: **$43/kW-yr**
  - Utility-scale battery: **$69/kW-yr**
  - Gas peaker: **$99/kW-yr**
- Underlying study: Brattle, *Real Reliability: The Value of Virtual Power* (2023, prepared for Google).
- Caveats:
  - One modeled utility (50% renewables, summer and winter needs), not a national average.
  - VPP = smart thermostats, smart water heating, EV managed charging, BTM batteries.
  - Excludes emissions and resilience benefits.
  - Brattle's figures are in 2022 dollars.
- $99 − $43 = $56: arithmetic correct.

**Suggested:** Change "a new VPP" to "a VPP in one modeled utility (Brattle, 2023)." Consider showing the $69 battery too.

**Sources:**
- DOE, Pathways to Commercial Liftoff: VPPs 2025 Update (Jan 2025): https://liftoff.energy.gov/vpp/ (primary)
- Brattle, Real Reliability (2023): https://www.brattle.com/real-reliability/ (primary)

---

## Lower priority

### Base Power growth (~35 MW/month)

**Verdict:** Can't verify.
- Base's own fleet table (Aug 2026 blog) shows nameplate going from 100.1 MW (Jan 2026) to 205.5 MW (Jul 2026), roughly 10–21 MW per month.
- The same post claims Base is now energizing 2 MW per day (~60 MW/month).
- Neither matches 35 MW/month. The ERCOT filing (Aug 2026) wasn't found; Base's Aug 11, 2026 ADER update deck is at https://www.ercot.com/files/docs/2026/08/12/2026-08-11-Base-Power-Company-ADER-Updates.pdf (not read).
- Source: https://www.basepowercompany.com/blog/aggregated-ders-and-the-capacity-crunch (company)

### Sunrun / Tesla / Renew Home 16.8 GW

**Verdict:** Correct as a plan. Sunrun describes it as an initiative to unlock more than 16.8 GW of flexible capacity. Keep "plan, not capacity." Note Renew Home now goes by Everyday Electric (per Electrek, Oct 2026).

### Washington HB 1871 / SB 5727

**Verdict:** Can't verify enactment. HB 1871 reached a second substitute (2SHB 1871) in the 2025 session. No evidence of passage found. Check https://app.leg.wa.gov/billsummary?BillNumber=1871&Year=2025.

### CTA-2045 and FERC Order 2222

Not checked this pass.

---

## Dates to add in the chapter

| Figure | As of |
|---|---|
| Google–Voltus | Oct 22, 2026 |
| ecobee / DSA | Feb 10, 2026 (summer 2025 data) |
| California battery record | Oct 6, 2026 (announced Oct 14) |
| PSE enrollments | Apr 3, 2026 |
| DSGS budget status | Late Aug 2026 |
| ERCOT ADER MW | Sep 30, 2026 |

## Secondary-only figures (flag in chapter)

- DSGS 2027 budget outcome (Canary Media, reporting Advanced Energy United)
- Voltus ramp timeline and 2040 term (Utility Dive, quoting Voltus spokesperson)
- California dispatch totals (company-reported; no CEC/CAISO confirmation)
- Base Power fleet data and dispatch example (company blog)
