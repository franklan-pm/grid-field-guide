# Chapter 7 · Interconnection queues: two lines to get onto the grid

**Grid Field Guide: module plan and research notes**
Drafted October 29, 2026 from Frank's outline, his *Queued Up* takeaways and the LBNL workbook. ERCOT's large-load process is changing month to month, so re-check anything marked ⚠ before publishing. Every figure in the app gets an "as of" date.

---

## 1. Where this chapter fits in the series

| Chapter | Question it answers | What chapter 7 borrows from it |
|---|---|---|
| 1 · Power mix | Where does the power come from? | The fuel mix. The queue shows what's coming next: solar, storage, and gas growing again. |
| 2 · Distribution | How does power get from the substation to the meter? | The substation. The point of interconnection (POI) is a substation or line tap, and network upgrades are physical equipment: transformers, breakers, lines. |
| 3 · DER & microgrids | What changes when a customer makes power too? | Interconnection at the distribution edge (IEEE 1547). Chapter 7 is the same idea at transmission scale. |
| 4 · Grid operations | How do the software systems run it all? | The ISO/RTO as an organization. Chapter 7 shows its other job: planning and studying who gets to connect. |
| 5 · Batteries | How do batteries move energy in time? | Hybrids. Adding a battery gets more value from the same grid connection (49% of active solar and storage is hybrid, 91% in CAISO). |
| 6 · Virtual power plants | How do 20,000 homes act like one power plant? | Flexibility and PSE. Flexible load is the VPP idea applied to a data center, and PSE is the example of a utility that doesn't publish a load queue. |

**Arc:** chapters 1–4 show how power moves and who runs it. Chapters 5–6 show how flexibility makes the existing wires go further. **Chapter 7 asks why the wire itself is the bottleneck.**

**Chapter 7 framing:** *To plug into the transmission grid, a power plant or a data center has to get in line. The generator line is long, public and mostly speculative: about 13% of what enters gets built, and the median build takes 5 years. The load line is newer, mostly undocumented, and filling with data centers. In Texas, the two lines are now about the same size, and each is several times the grid it wants to join.*

**Bridge from chapter 6:** "A VPP squeezes more out of the wires we have. But what happens when someone needs a new connection to those wires?"

**Note:** the interview angle (hyperscaler energy teams deal with this every day) stays in this plan. It doesn't go in the page copy.

---

## 2. Learning objectives

By the end of the chapter a learner should be able to:

1. Explain what an interconnection queue is and why a project needs studies before it connects.
2. Trace a generator's path: request (IR) → studies → interconnection agreement (IA) → construction and network upgrades → commercial operation (COD). Say where most projects drop out.
3. Explain why the queue is mostly speculative: entering is cheap and leaving is common, like applying to many colleges.
4. Read a survival funnel and a wait-time chart, and name the survivor bias in "median time to build."
5. Explain what changed under FERC Order 2023 (cluster studies, higher deposits, withdrawal penalties, readiness rules).
6. Explain why load queues are harder to see than generator queues, and give ERCOT's numbers as the one well-documented case.
7. Explain why a data center that brings its own grid-connected generation hasn't skipped a queue. It has joined the generator queue.

---

## 3. Research findings

### 3.1 Generator queues: Berkeley Lab *Queued Up*, 2026 edition

Source: LBNL with Interconnection.fyi, *Interconnection Queue Dataset & Summarized Data Files, through 2025* (May 2026), `LBNL_Ix_Queue_Data_File_thru2025.xlsx`, plus the *Queued Up 2026 Edition* PDF. Covers the 7 ISOs/RTOs and 50 non-ISO balancing areas, about 98% of installed U.S. generating capacity. Transmission-connected only: no distribution-connected or behind-the-meter projects. **No load interconnection** (methods tab).

**Checked against the workbook (Oct 29):**
- **Active queue, end of 2025:** 1,312 GW generation ✓. Storage is 749 GW in the report (tab 10: 391 GW standalone + 358 GW hybrid). The project rows sum to only 553 GW of storage, because the report adds imputed hybrid storage that the published rows leave out (codebook note). **Use the 749 GW figure with a footnote, or use 553 GW if the chart is built from rows.**
- **Total queue:** 1,312 + 749 = 2,061 GW, against an installed fleet of about 1,374 GW (EIA-860, Dec 2025).
- **Survival funnel, 2000–2020 requests (status at end of 2025), by capacity:** 12.8% operational, 75.2% withdrawn, 10.6% still active, 1.3% suspended ✓. Matches the takeaways doc (13 / 75 / 10).
- **ERCOT, active at end of 2025:** 243 GW generation + 165 GW storage = **408 GW**, against a **2025 peak load of 85.2 GW** (NERC, via tab 10) and 172.8 GW installed ✓.
- **Project count (checked Oct 29):** the report says **8,244 active projects (~2,061 GW)** (slide 7, also slide 13), and ">8,200" in the headline. The workbook's tab 03 has **8,513** rows with status `active` (8,395 `Generation`). The 269-row gap is entirely ERCOT: the rows have 1,796 active ERCOT projects against 1,527 in the report's regional table. Every other region matches exactly. ERCOT capacity matches (408.0 GW), so the gap is in how ERCOT rows are counted, not in GW. **Use the report's 8,244 / ">8,200", and don't build a project-count figure from the rows.** Capacity figures from the rows are fine.

**From the takeaways doc (check against the PDF before publishing):**
- The median project built in 2025 took **61 months** from request to operation ✓ (PDF slide 51: "61 mo. for projects completed in 2025"). The "611 months" in the takeaways doc is a typo. "Under 20 months in 2005" still needs a look at the slide 51 chart.
- At the median, request to IA took **45 months** ✓ (2025) and IA to operation **31 months** ✓ (2025; the takeaways doc rounds to 30). ⚠ **Don't add them:** 45 + 31 = 76, but the median request-to-operation is 61. Medians don't add, and the samples differ. Say "about 4 years to an agreement and about 2.5 more to operate," not "76 months total."
- Median request-to-COD by size (slide 54): under 5 MW, 20 months; 5 to under 20 MW, 34; 100 to under 200 MW, 54; **200 MW and above, 59 months** ("nearly 5 years") ✓.
- 41% of capacity that signed an IA from 2000 to 2022 later withdrew. A signed agreement isn't a guarantee.
- In 2025, 52.5 GW came online out of **2,290 GW, the active queue at the end of 2024** (slide 12; workbook tab 06: 2,290.4 GW). That's the start-of-year denominator, which is why it isn't the 2,061 GW end-of-2025 figure. Throughput is about 2%. ✓ Label it "of the queue at the start of 2025."
- **2025 turning point:** 603.3 GW added and **756.3 GW withdrawn** ✓ (tab 06). The withdrawn figure is *implied*, not reported: active 2024 + suspended 2024 + additions − online − suspended 2025 − active 2025. Say "an estimated 756 GW." The 603 GW includes about 50 GW of imputed hybrid storage. Second year in a row withdrawals beat new requests; the active queue peaked at about 2,600 GW in 2023.
- Gas capacity in queues rose 86% while solar, wind and storage fell.
- Hybrids are 49% of active solar and storage (91% of active solar in CAISO).
- Resource-adequacy fast tracks in some ISOs reach an agreement in about 3 months.
- Average solar request size grew 234% since 2015.

**License and credit (checked Oct 29):** neither the PDF nor the workbook contains "CC BY" or any Creative Commons text. Both carry only a DOE/LBNL copyright notice (Contract DE-AC02-05CH11231) saying the U.S. Government keeps a license to use the work for government purposes, plus the usual disclaimer. **The CC BY 4.0 claim is unverified.** GridTracker doesn't appear in either file. The credit is **Interconnection.fyi** ("data collection led by"), and the report's authors are Rand, Cheyette, Talley, Zhang, Gorman, Wiser, Seel, Jeong and Kahrl (LBNL and Interconnection.fyi), June 2026. ⚠ Still to do: check the terms on emp.lbl.gov/queues (not reachable from the local files). Until then, cite as "Rand et al., *Queued Up: 2026 Edition*, LBNL and Interconnection.fyi, June 2026" and don't claim a license.

**Smaller discrepancy:** the report says "50 non-ISO balancing areas" in its data-sources slide and "47" on the active-queue slide (presumably the ones with active projects). Use "7 ISOs/RTOs and 50 non-ISO balancing areas" for coverage only.

**Also confirmed in the PDF:** 49% of active solar is hybrid (376 GW), 48% of storage (358 GW); CAISO is described as consistently above 90% of solar in hybrids; gas +86% (253 GW); average solar request size +234% since 2015; 41% of capacity with an IA (2000–2022) withdrawn; 13% operational, 75% withdrawn, 10% still active (2000–2020 requests). The report's "10% active" and the workbook's 10.6% round differently. Show one decimal or say "about 11%," and keep it consistent with the explorer default.

### 3.2 Large-load queues: ERCOT

No national dataset exists. Utilities have no standard rules for publishing load requests, and most don't, including PSE. ERCOT is the exception, so the load lane in this chapter is **ERCOT only**, cited to ERCOT's own reports.

- **Size:** about **474.7 GW** of large-load requests as of **June 2026**, of which **90.2% (420.8 GW)** are data centers. Source: ERCOT CEO Pablo Vegas, "ERCOT Update" to the Texas Senate Business & Commerce Committee, **July 29, 2026**, as reported by POWER. Later coverage (Sept 2026) still says "more than 474 GW, about 90%." A June 2026 headline gave 438 GW, an earlier snapshot.
- **Scale check:** 474.7 GW of load requests is 5.6 times ERCOT's 2025 peak (85.2 GW, from the LBNL workbook) and larger than ERCOT's 408 GW active generator queue. Governor Abbott's letter says "more than five times Texas' record peak."
- **The law:** SB 6 (signed June 2025, effective June 20, 2025) sets interconnection standards for loads of **75 MW and above**. It requires disclosure of duplicate requests, financial commitments and site control before ERCOT studies a project, plus backup-generation provisions. The PUCT must implement it by Dec. 31, 2026.
- **Batch Zero:** the PUCT approved ERCOT's batch study framework on **June 18, 2026**. Loads of 75 MW and above are studied together in one batch. About 205 GW was eligible (preliminary), with financial security of $50,000/MW due July 10.
  - Original dates: classifications Aug 7, study start by Sept 2, results April 9, 2027, agreements June 8, 2027.
- **Pause:** on **Aug 3, 2026**, Governor Abbott ordered an audit of data centers in the queue (onsite power, water use, public financial help). Projects that fail it "must be denied." ERCOT delayed Batch Zero the same day.
  - The PUCT granted good-cause exceptions to the Aug 7 deadline.
  - ERCOT plans to file the audit results by **Dec 10, 2026**.
  - ERCOT says the study will miss April 9, 2027, with no new date set.
  - About 300 projects of 75 MW or more are under review.
- **What's close to real:** 17 large loads, mostly data centers, totaling about **6.6 GW**, have cleared a stability assessment. They still face the audit and a community-impact review before they're energized. That's about 1.4% of the 474.7 GW, the load-side version of the generator funnel.
- **Smaller tier:** a separate community-impact review covers data centers and crypto facilities of 25 MW and above. An April snapshot counted 157 medium loads totaling almost 8,800 MW.

**Precise wording:** "Texas approved rules in June" should become "the PUCT approved ERCOT's Batch Zero framework in June." The formal interconnection-standards rule (Project 58481) was still in scoping in late July.

---

## 4. Chapter sections

Tab order: **Diagram → Explorer → Playground → Glossary → Quiz.** Explorer comes before Playground on purpose, because the playground needs the data's lesson first. This breaks the guide's "Playground second" pattern, so note why in the README.

### 4.1 Diagram: two lines into one substation

- **Top (one-line drawing, the site's sheet style):** a solar-plus-battery plant and a data center both connect at the same transmission substation (the POI). Network upgrades are drawn as the actual equipment: a new transformer, a breaker bay, a line reconductor. This keeps chapter 7 an equipment chapter, not just a flowchart.
- **Below (process lanes):**
  - **Generator lane:** IR → cluster study (FERC Order 2023) → facilities study → IA → construction and upgrades → COD. A withdrawal exit at each step, sized by the share that leaves there (tab 26, "Withdrawn Ix. Phase").
  - **Load lane (ERCOT):** request → Batch Zero study → stability assessment → audit and community review → energization, labeled "ERCOT's process; other utilities differ and mostly don't publish."
- **Hover stops:** what each step decides, who pays for upgrades, and a typical duration (45 months to IA, about 30 to COD).
- **Colors (`docs/colors.md`):**
  - Withdrawn exits use `--dead` (grey), not `--fault`, because withdrawals aren't faults.
  - Don't use orange or blue for the lanes, since those mean voltage class. Separate the lanes by label and shape.
  - Lines in the one-line drawing follow the normal voltage rules.

### 4.2 Explorer (Lane B showcase)

1. **Survival funnel.** For projects entering in a chosen year range: operational / withdrawn / still active / suspended, by capacity, filterable by region and resource type.
   - Always show "still active." Recent cohorts haven't resolved yet, and hiding them makes the completion rate look worse than it is.
   - Default: 2000–2020, all regions, about 13 / 75 / 11.
2. **Wait times.** Median, with p25–p75 bands, from request to IA and from IA to COD, by COD year, filterable by region, type and size.
   - Caption: "Only projects that were built have a time-to-build. The 75% that withdrew aren't in this chart."
   - Option: show request-to-withdrawal times next to it (tab 28).
3. **What's in the queue today:** folded into the region selector rather than a third view. Active GW by type next to installed GW and 2025 peak (tab 10). The ERCOT card adds the load bar (474.7 GW, ERCOT source and date) as a separate, labeled source.

**Data build:**
- A script in the repo (`docs/data/build-ch7.py`) reads tab 03 and writes small aggregates (funnel by entry year × region × type; durations by COD year × region × type × size bucket; active by region × type).
- Embed the output in `index.html` as a `<script type="application/json">` block, not a fetch, so opening the file locally still works, as the README promises.
- Commit the script, not the 15 MB workbook.
- Storage uses the report's 749 GW (decided, section 7). Footnote the imputed hybrid storage on the page.

### 4.3 Playground: "Site a 300 MW data center"

- **Inputs:** region; connection approach (grid only, grid + flexible load, onsite gas that's grid-connected, colocate with an existing plant); size (100–1,000 MW, default 300).
- **Data-backed outputs (generator side):**
  - If the plan includes grid-connected onsite generation, show the real median wait for that type and size in that region (tabs 30–40).
  - Lesson: bringing your own power moves you into the generator queue, where gas projects of 200 MW or more take about 5 years.
  - Show the region's queue depth against its peak.
- **Qualitative outputs (load side):** for ERCOT, where the project sits under Batch Zero (75 MW and above; in the batch study, now paused for the audit). For other regions: "load queues aren't published here; timelines are typical values." Flexible load and colocation are shown as levers with "typical" labels and an as-of date, never as invented month counts.
- Reuse the chapter 5/6 disclaimer ("values are typical … a teaching model, not an engineering one") and the ⚠ convention.

### 4.4 Glossary and quiz

About 15 terms, including:

- the six from the outline: IR, IA, COD, cluster study, network upgrades, ERIS vs. NRIS
- POI
- withdrawal
- readiness deposit and withdrawal penalty
- FERC Order 2023
- hybrid / co-located
- large load
- Batch Zero
- resource-adequacy fast track
- surplus interconnection

The quiz should include at least one survivor-bias question and one ERCOT scale question (load requests against peak).

---

## 5. ERCOT fact-check list

Check each item against an ERCOT or PUCT primary document, not news coverage, and record the document name and date in the methodology note. Status is as of Oct 29, 2026.

| # | Claim | Current best source | Status | To do |
|---|---|---|---|---|
| E1 | 474.7 GW of large-load requests as of June 2026 | POWER, citing Vegas's "ERCOT Update" to Senate B&C, July 29, 2026 | Confirmed (secondary) | Get the ERCOT slide deck. Check whether a newer figure exists (ERCOT monthly reports, board updates) and use the latest one with its date. |
| E2 | 90.2% (420.8 GW) data centers | Same chart caption | Confirmed (secondary) | Same deck. Check how ERCOT classifies "data center" vs. crypto and other industrial loads. |
| E3 | June 2026 snapshot of 438 GW | Utility Dive headline | Conflicts with E1 | Find out whether 438 GW was an earlier June snapshot or a different count (e.g., officer letters only). Don't show both without explaining. |
| E4 | PUCT approved the Batch Zero framework June 18, 2026 | ERCOT link cited by Utility Dive; POWER | Confirmed (secondary) | Get the PUCT order or open-meeting record and project number. |
| E5 | Batch study covers loads of 75 MW and above | POWER; SB 6 | Confirmed | Cite SB 6 and the ERCOT Batch Zero overview. |
| E6 | About 205 GW eligible for Batch Zero; $50,000/MW security | POWER, "preliminary ERCOT overview" | ⚠ Preliminary | Replace with the final classification count from ERCOT's Batch Zero update (Sept 11, 2026 board materials). |
| E7 | About 300 projects under review | MGRID, Sept 5, 2026 | ⚠ Secondary | Confirm in ERCOT's Batch Zero update. |
| E8 | Aug 3, 2026 directive and Batch Zero delay | Utility Dive; ERCOT market notices M-A080326-01 to -04 | Confirmed | Cite the market notices. |
| E9 | PUCT good-cause exceptions to the Aug 7 deadline | MGRID; Octus | Confirmed (secondary) | Cite the PUCT order from the Aug 20 open meeting. |
| E10 | Audit results due Dec 10, 2026; April 9, 2027 study date will be missed, no new date | MGRID, Sept 5, 2026 | ⚠ Will change | **Re-check after Dec 10.** Update the diagram's load lane and the playground's ERCOT note. |
| E11 | 17 large loads, about 6.6 GW, cleared a stability assessment | MGRID | ⚠ Secondary | Confirm in ERCOT materials. Find out whether any have been energized since. |
| E12 | 157 medium loads (25 MW+), almost 8,800 MW, April snapshot | MGRID | ⚠ Secondary | Confirm or drop. Not essential. |
| E13 | SB 6 provisions (75 MW, duplicate disclosure, site control, backup generation) | POWER | Confirmed (secondary) | Cite the enrolled bill text. The backup-generation provision is easy to misstate, so quote it. |
| E14 | Interconnection-standards rule (Project 58481) still in scoping | POWER, late July 2026 | ⚠ Will change | Check PUCT docket status. |
| E15 | ERCOT 2025 peak 85.2 GW | LBNL tab 10, from NERC | Confirmed (workbook) | Note that ERCOT's own record-peak figure may differ slightly. Use one source consistently. |
| E16 | "Most utilities, including PSE, don't publish load queues" | Frank's knowledge | ⚠ Unsourced | Find a source (a report on load-queue transparency) or soften the wording to "most utilities don't publish a queue the way ERCOT does." Check PSE's IRP and OASIS pages first. |

**Generator-side items (checked Oct 29, results in section 3.1):**
- ✓ Project count: use the report's 8,244 (">8,200"). The rows' 8,513 differs only in ERCOT (+269).
- ✓ 2,290 GW: the end-of-2024 active queue. Label it that way.
- ✓ 61 months is right; "611" was a typo. Don't add 45 + 31.
- ⚠ License: CC BY 4.0 not found in either file. Check emp.lbl.gov/queues. Credit is Interconnection.fyi, not GridTracker.
- ✓ Storage: 749 GW (decided).
- ⚠ Open: why ERCOT has 269 more active rows than the report's regional count; "under 20 months in 2005" on slide 51; the "10%" vs. 10.6% rounding.

---

## 6. Integration checklist

- [ ] `apps/07-interconnection/index.html` with the standard head (`theme.js`, `theme.css`, `nav.js`)
- [ ] `shared/nav.js`: add `{ dir: '07-interconnection', short: 'Interconnect', title: 'Interconnection queues' }`
- [ ] Home page: chapter card, a zone on the sheet (the transmission segment and POI), hover treatment, light and dark thumbs in `assets/thumbs/`, and any copy that says "six chapters"
- [ ] README: chapter table, and the opening sentence that lists the chapters
- [ ] End of chapter 6: a "Next" bridge card
- [ ] `docs/colors.md`: add any new chart colors for chapter 7
- [ ] Storage keys namespaced `gfg-queue-…`
- [ ] `docs/chapter-7-progress.md` and a fact-check report, as for chapters 5 and 6
- [ ] Methodology note: LBNL citation and license, ERCOT source and date, "load queues have no standard transparency rules"
- [ ] Test both themes, all tabs, no sideways scroll at 400px, no page errors

---

## 7. Decisions (settled Oct 29, 2026)

- **Folder and short name:** `07-interconnection`, short name **"Interconnect"**. The nav entry is `{ dir: '07-interconnection', short: 'Interconnect', title: 'Interconnection queues' }`.
- **Storage figure:** the report's **749 GW** (391 standalone + 358 hybrid). Footnote on the page that it includes imputed hybrid storage the published rows leave out (the rows sum to 553 GW). Total queue is 1,312 + 749 = 2,061 GW.
- **Explorer scope for v1:** **funnel + wait times only**. "What's in the queue today" is folded into the region card.
- **Playground load side:** **qualitative only**. Levers get "typical" labels and as-of dates, never invented month counts.
- **Dec 10 ERCOT audit:** **publish before it**, with an "as of" date on every ERCOT figure. After Dec 10, re-check E10, E11 and E14 and update the diagram's load lane and the playground's ERCOT note.

---

## Sources

- LBNL / Interconnection.fyi, *Interconnection Queue Dataset & Summarized Data Files, through 2025* (May 2026) and *Queued Up 2026 Edition*: emp.lbl.gov/queues
- POWER, [Abbott Orders Full Audit of Texas Data Center Interconnection Queue](https://www.powermag.com/abbott-orders-full-audit-of-texas-data-center-interconnection-queue-threatens-to-deny-grid-access/)
- Utility Dive, [Facing an estimated 474 GW of interconnection requests, Texas hits pause on data centers](https://www.utilitydive.com/news/texas-hits-pause-data-center-interconnections/827046/)
- MGRID, [ERCOT targets December 10 for Abbott's data center audit, drops the April 2027 Batch Zero study date](https://mgrid.org/2026/09/05/ercot-december-10-abbott-data-center-audit-batch-zero-april-2027/) (Sept 5, 2026)
- ERCOT market notices [M-A080326-01](https://www.ercot.com/services/comm/mkt_notices/M-A080326-01) through -04 (Aug 3, 2026)
- ERCOT, [Batch Zero Verification and Audit, PUCT presentation](https://www.ercot.com/files/docs/2026/08/20/Batch-Zero-Verification-and-Audit-PUCT-Presentation.pdf) (Aug 20, 2026) and [Batch Zero Update](https://www.ercot.com/files/docs/2026/09/11/14-Batch-Zero-Update.pdf) (Sept 11, 2026)
- Octus, [PUCT approves ERCOT's Batch Zero deadline extensions](https://octus.com/resources/articles/public-utility-commission-of-texas-approves-ercots-batch-zero-deadline-extensions/)
