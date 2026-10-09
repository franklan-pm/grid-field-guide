# Colors in the Grid Field Guide

All colors live in `shared/theme.css` as tokens, each with a dark value and a light value. Chapters use `var(--token)` and never a hex value, so both themes stay in step. To add a color, add a token to both sets in `theme.css`.

## Core tokens

| Token | Dark | Light | Used for |
|---|---|---|---|
| `--ink-navy` | `#0B1E33` | `#eef3f8` | Page background |
| `--panel-navy`, `--panel-navy-2` | `#12314F`, `#0F2946` | `#ffffff`, `#f5f8fc` | Panels and cards |
| `--edge`, `--edge-2` | `#1D4266`, `#2A5478` | `#c9d6e3`, `#9fb4c9` | Borders, grid lines |
| `--paper` | `#EAF2F5` | `#0b2240` | Main text, demand line |
| `--muted` | `#7E9BB4` | `#557089` | Captions, chart axes |
| `--signal-amber` | `#F5A623` | `#b06800` | Primary voltage, selected tab, main buttons |
| `--line-cyan` | `#8FE0EC` | `#08809a` | Secondary voltage, telemetry, selected pills |
| `--violet` | `#B9A9F2` | `#5f4bcc` | SCADA and monitoring links, forecasts and limits |
| `--copper` | `#D98457` | `#b5592c` | Gas generation |
| `--solar` | `#F5C542` | `#9a7400` | Solar |
| `--good` | `#6FCF97` | `#1b8a4e` | Battery discharging, power delivered, correct answer |
| `--bad` | `#EB5B5B` | `#c43d3d` | Faults, outages, wrong answer, OT security zone |

Each accent also has a `-soft` tint for text on a dark panel and a `-dim` shade for inactive equipment. `--on-amber` and `--on-accent` are for text placed on a filled accent.

## What each color means, chapter by chapter

| Color | Ch 1 Power mix | Ch 2 Distribution | Ch 3 DER & microgrids | Ch 4 Grid operations |
|---|---|---|---|---|
| Amber | Time cursor | **Primary, ~12 kV** | **Utility primary, ~12 kV**; selected equipment | **Control commands** |
| Cyan | **Wind** | **Secondary, 120/240 V** | **Secondary (site voltage)**; utility-owned equipment | **Telemetry + status** |
| Violet | Battery charging | SCADA monitoring | | Forecasts, schedules, limits |
| Copper | Gas | | Site AC bus | |
| Solar yellow | Solar | | DER / DC-AC | |
| Green | Battery discharging | | Export at the meter (PCC) | Electric power |
| Pink / orchid | | Feeder tie | | Business + customer records |
| Red | Gas maximum | Faults, locked-out devices | Gateway trip, unserved load | OT security zone |

Line style already separates power from data in chapters 2 to 4: solid lines are electricity, while dotted or dashed lines are data (SCADA in chapter 2, all data flows in chapter 4). Chapter 2 also uses dashed lines for underground cable. Chapter 1 uses moving dashes for power flow direction.

## Where colors clash

1. ~~**Primary voltage:** amber in chapter 2 and on the home-page map, but cyan in chapter 3.~~ Fixed: chapter 3 now draws the feeder side of its transformer in amber, and the site side in cyan.
2. **Cyan** means wind (ch 1), secondary voltage (ch 2 and 3), utility-owned equipment (ch 3) and telemetry (ch 4).
3. **Amber** means primary voltage in chapter 2 and control commands in chapter 4.
4. **Green** means battery discharging in chapter 1 and all electric power in chapter 4.

Suggested rule going forward:

- **Electricity is drawn solid**, colored by voltage: amber for primary, cyan for secondary. Sources keep their own colors: copper gas, cyan wind, yellow solar, green battery.
- **Data is drawn dotted or dashed**, colored by type, as in chapter 4's legend.

Under that rule, the remaining overlaps are told apart by line style. In chapter 3, amber (utility primary) and copper (site AC bus) are close in hue. They meet only at the meter, where the labels tell them apart.
