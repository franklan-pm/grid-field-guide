# Colors in the Grid Field Guide

The guide is drawn as an engineering drawing sheet: **vellum** (light, the default) and **blueprint** (dark). Every color lives in `shared/theme.css` as a token named by its *meaning*, with a vellum and a blueprint value. Pages use `var(--token)` and never a hex value, so both themes stay in step. To add a color, add a token to all three blocks in `theme.css` (dark `:root`, the `prefers-color-scheme: light` block, and `[data-theme="light"]`).

The rule that matters most: **one meaning per color, in every chapter.** Orange is always primary voltage, never a button or a fuel.

## Surfaces and text

| Token | Vellum | Blueprint | Use |
|---|---|---|---|
| `--ground` | `#F5F3EE` | `#0F2C4C` | Page and sheet background |
| `--sheet` | `#FFFFFF` | `#0F2C4C` | Boxes, panels, title block, quiz cards |
| `--ink` | `#18202B` | `#EAF0F6` | Main text, strong rules, borders |
| `--ink-2` | `#3F4753` | `#BFCDDB` | Secondary text |
| `--ink-3` | `#5B6270` | `#93AAC1` | Captions, axes, field labels, limit lines |
| `--band` | `#9C978C` | `#5D7EA1` | Dashed region outlines, soft dividers |
| `--grid` | `#E4E0D5` | `#1B3E63` | Drafting grid behind diagrams |
| `--on-ink` | `#F5F3EE` | `#0F2C4C` | Text on an ink-filled button or selected tab |

## Lines on diagrams

Line color is **voltage class**, in every chapter. A transformer draws each winding in its side's color (ink and orange at the substation, orange and blue at the pole).

| Token | Vellum | Blueprint | Meaning |
|---|---|---|---|
| `--v-hv` | `#18202B` | `#EAF0F6` | Generation and high voltage (same as `--ink`) |
| `--v-primary` | `#B84C0B` | `#F59B4C` | Primary distribution, ~12 kV |
| `--v-secondary` | `#1D5FA6` | `#7FB2F0` | Secondary and site voltage, 120/240 V to 480 V |
| `--data` | `#6A4BB5` | `#B9A3F5` | Data and control. Always dashed. Never power. |
| `--fault` | `#B42318` | `#FF7468` | Faults, alarms, lockouts, unserved load, wrong answers |
| `--dead` | `#A8A398` | `#4F6B88` | De-energized or open sections |

Line **style** carries the rest:

- **Solid** is electricity.
- **Dashed in a voltage color** is underground cable (chapter 2).
- **Dashed in a data color** is data. Dashes never mean power flow.
- **Double line in blue** is the DC side of an inverter (chapters 1 and 3). It's drawn as a thick blue stroke with a thinner `--ground` stroke on top, plus a "DC" label.
- **Power-flow direction** is shown with arrowheads and a travelling highlight, never marching dashes. The highlight is a tint of the line's own color, `color-mix(in srgb, <line> 30%, var(--sheet))`. Arrowheads are static, so direction survives `prefers-reduced-motion`.

## Data kinds (chapter 4, plus the SCADA and control links in chapters 2 and 5)

Where a diagram is mostly about data, each kind gets its own color **and** its own dash pattern, so color is never the only cue. All are dashed or dotted, and none is used for power.

| Token | Vellum | Blueprint | Kind | Pattern |
|---|---|---|---|---|
| `--data-tel` | `#0B7A75` | `#5CCFC6` | Telemetry and status (teal) | dotted `2 4` |
| `--data-ctl` | `#A3307A` | `#F08AC4` | Control commands (magenta) | long dash `8 4`, filled arrowheads |
| `--data-plan` | `#6A4BB5` | `#B9A3F5` | Forecasts, schedules, limits (violet, same as `--data`) | dash-dot `8 3 2 3` |
| `--data-biz` | `#566F1B` | `#B5D16A` | Business and customer records (olive) | short dash `4 2` |
| `--ink-3` | | | Comms network wiring, no direction | faint dots `1.5 4.5`, no arrowheads |

Regions in chapter 4 are told apart by soft tints, not line color:

| Token | Vellum | Blueprint | Use |
|---|---|---|---|
| `--zone-sec` | `#8A6400` | `#E8C14A` | Protective boundary: chapter 4's OT zone and DMZ (gold dash-dot, gold tint, gold label), and chapter 5's safety layer (gold-outlined boxes). Nothing here is a fault, so it isn't red |
| `--data-biz` tint | | | Enterprise IT column (olive tint, matching the business-records lines) |

## Charts only

These never color a **line** on a one-line diagram: lines are always voltage class. They do carry fuel identity everywhere else, so readers can follow a source from the diagram to the charts. In chapter 5, battery hardware (cell, module, rack, PCS) has the same tint and left bar, and the pipe-and-tank, cost ladder and state-of-charge charts use the battery color. In chapter 1, each source box has a soft fuel tint and a solid fuel bar down its left edge, its inverter a lighter tint, its MW reading a fuel-colored tag, and the bus sum a fuel mark before each source. Fuel colors are never used for text.

| Token | Vellum | Blueprint |
|---|---|---|
| `--fuel-gas` | `#8A5A3C` | `#C99A78` |
| `--fuel-wind` | `#6F7F8E` | `#C9D3DD` |
| `--fuel-solar` | `#A88000` | `#F2C94C` |
| `--fuel-battery` | `#2F7D55` | `#8FD6B4` |

- Demand is an `--ink` line.
- Battery charging is the battery color, hatched.
- Limits, such as gas max and gas minimum, are thin dashed `--ink-3` lines with a label.
- Curtailment is an `--ink-3` hatch. It's waste, not a fault.

### Device colors (chapter 6)

The devices in a virtual power plant get identity colors that work like the fuel colors: a soft tint and a solid left bar on device boxes, the stroke of device icons, and fills in charts. **Never on a line.** The home battery and rooftop solar reuse `--fuel-battery` and `--fuel-solar`, so a battery is the same green in chapters 5 and 6.

| Token | Vellum | Blueprint | Device |
|---|---|---|---|
| `--dev-hvac` | `#0195CA` | `#0096AF` | Thermostat + AC or heat pump (one resource: the thermostat controls, the AC or heat pump is the load) |
| `--dev-water` | `#B46187` | `#D95B7F` | Water heater (warm rose, clearly not fault red) |
| `--dev-ev` | `#53458D` | `#7C89F6` | EV + charger |

- Color is never alone: every device also has an SVG icon (dial, tank, plug, battery, sun), and stacked chart bands carry a texture (HVAC horizontal lines, water heater dots, EV 45° hatch, battery solid) with a 2px `--sheet` gap and a direct label.
- Validation (OKLab, Machado CVD) passes for all five device colors in vellum; in blueprint the new three pass, and the only failures are the existing `--fuel-battery` / `--fuel-solar` pastels (lightness and chroma, 14.9 normal-vision gap between them). Those are guide-wide tokens, left as they are.
- `--dev-ev` vellum sits ΔE 7.6 from `--data-plan`. Fine for a fill next to a dash-dot line, but never put an EV fill directly behind a plan line.
- Chart lines in chapter 6: the ISO's target is a dashed `--ink` line with a label, the fleet total a solid 2px `--ink` line, and the baseline (what homes would have used) a dashed `--ink-3` line.

## UI

- `--ok` (`#1B7A45` / `#7FD3A0`): correct quiz answers and success states only. `--ok-bg` and `--fault-bg` are its quiz-option tints.
- `--hover-fill`: the hover tint on buttons, tabs and rows.
- **UI never borrows a line color:**
  - Selected tabs and primary buttons are ink-filled with `--on-ink` text.
  - Secondary buttons have a 2px ink outline.
  - Focus rings are 2px `--ink` with a 2px offset.
  - The chapter 1 time cursor is ink.
  - Selecting equipment on a diagram thickens its strokes instead of recoloring it.
- **Red only when something is wrong.** The one red control is chapter 2's Insert Fault, because it creates a fault.

## Contrast

Every text pairing is checked against its background at 4.5:1 or better (3:1 for lines and text 24px and up). Two of the handoff's vellum values failed and were darkened: `--v-primary` from `#C2510C` to `#B84C0B`, and `--fuel-solar` from `#B88A00` to `#A88000`. Re-check after any tweak.

## Type and shape

- Display, headings, buttons, tab labels: Barlow Condensed (`--f-display`).
- Body: IBM Plex Sans (`--f-body`).
- Labels, values, diagram text: B612 Mono (`--f-mono`).
- Square corners everywhere (`--radius: 0`), 1–2px ink rules, and no shadows or glows.
- Uppercase lettering is for drawing-sheet furniture and diagram device labels only.
