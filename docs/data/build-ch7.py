"""Build the chapter 7 (part 1) data from Berkeley Lab's queue workbook.

Usage: python build-ch7.py "<path>/LBNL_Ix_Queue_Data_File_thru2025.xlsx" out.json

Reads tab "03. Complete Queue Data" (and tab 21 for EIA online totals) and writes
small aggregates. Source: LBNL / Interconnection.fyi, Queued Up 2026 data file
(data through end of 2025)."""
import sys, json
import pandas as pd, numpy as np

src, out = sys.argv[1], sys.argv[2]
df = pd.read_excel(src, sheet_name="03. Complete Queue Data", header=1)
# Requests with no request date keep year 0, so totals match the project rows;
# the by-year charts skip year 0.
df["q_year"] = df.q_year.fillna(0).astype(int)
df["mw"] = df[["mw_1", "mw_2", "mw_3"]].sum(axis=1, min_count=1).fillna(0)

def group(t):
    if t == "Solar": return "solar"
    if t == "Solar+Battery": return "hybrid"
    if t in ("Battery", "Other Storage"): return "storage"
    if t in ("Wind", "Offshore Wind", "Wind+Battery"): return "wind"
    if isinstance(t, str) and t.startswith("Gas"): return "gas"
    return "other"
df["g"] = df.type_clean.map(group)
STATUS = {"active": "a", "operational": "o", "withdrawn": "w", "suspended": "s"}
df = df[df.q_status.isin(STATUS)]
df["s"] = df.q_status.map(STATUS)
REGIONS = ["CAISO", "ERCOT", "ISO-NE", "MISO", "NYISO", "PJM", "SPP", "Southeast", "West"]

# A. requests: region, group, request year, status -> [count, MW]
rq = df.groupby(["region", "g", "q_year", "s"]).agg(n=("mw", "size"), mw=("mw", "sum")).reset_index()
requests = [[r.region, r.g, int(r.q_year), r.s, int(r.n), round(float(r.mw), 1)] for r in rq.itertuples()]

# B. came online: operational projects with an in-service date
op = df[(df.s == "o") & df.on_date.notna()].copy()
op["y"] = op.on_date.dt.year.astype(int)
oa = op.groupby(["region", "g", "y"]).agg(n=("mw", "size"), mw=("mw", "sum")).reset_index()
online = [[r.region, r.g, int(r.y), int(r.n), round(float(r.mw), 1)] for r in oa.itertuples()]

# C. EIA national online totals (tab 21), transmission-connected, LBNL footprint
t21 = pd.read_excel(src, sheet_name="21. Operational Volume Trend", header=None)
eia = {}
for row in t21.itertuples(index=False):
    if isinstance(row[0], (int, float)) and not pd.isna(row[0]) and 1999 < row[0] < 2030:
        eia[int(row[0])] = round(float(row[2]), 1)

# C2. The report\'s own regional totals of active capacity (tab 10), which include
#     Berkeley Lab\'s estimates for hybrid batteries that the project rows leave out.
t10 = pd.read_excel(src, sheet_name="10. Queues vs. Installed", header=None)
reported = {}
for ri in range(len(t10)):
    row = list(t10.iloc[ri])
    if "Active Capacity GW" in row:
        ci, cr = row.index("Active Capacity GW"), row.index("Region")
        for rj in range(ri + 1, len(t10)):
            reg = t10.iat[rj, cr]
            if isinstance(reg, str) and reg in REGIONS: reported[reg] = round(float(t10.iat[rj, ci]), 1)
        break

# D. history: of requests made 2000-2020 (old enough to have mostly resolved), what
#    share was built by the end of 2025, by region and group. Counts, and MW.
#    Status only, no dates, so regions with missing withdrawal dates aren't biased.
h = df[df.q_year.between(2000, 2020)]
rates = {}
for reg in ["US"] + REGIONS:
    x = h if reg == "US" else h[h.region == reg]
    rates[reg] = {}
    for g in ["all", "solar", "hybrid", "storage", "wind", "gas", "other"]:
        y = x if g == "all" else x[x.g == g]
        n = len(y); m = float(y.mw.sum())
        rates[reg][g] = [n, round(float((y.s == "o").mean()), 3) if n else None,
                         round(float(y[y.s == "o"].mw.sum() / m), 3) if m else None]
json.dump({"source": "LBNL / Interconnection.fyi, Queued Up 2026 data file (through end of 2025), tab 03; EIA totals from tab 21",
           "fields": {"requests": "region, group, request year, status (a active, o operational, w withdrawn, s suspended), projects, MW",
                      "online": "region, group, in-service year, projects, MW (operational projects with a date only)",
                      "reported": "region -> active GW as reported by Berkeley Lab (tab 10), incl. estimated hybrid batteries",
                      "rates": "region -> group -> [requests made 2000-2020, share built by count, share built by MW]"},
           "requests": requests, "online": online, "eia": eia, "reported": reported, "rates": rates},
          open(out, "w"), separators=(",", ":"))
print("rows", len(requests), len(online), "bytes", len(open(out).read()))
for k, v in rates.items(): print(k, v)
