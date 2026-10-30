"""County x request-year x type aggregates for the chapter 7 advanced map. Reads tab 03 of the
Berkeley Lab workbook and writes docs/data/ch7-countyyear-input.json:
  fips -> {name, state, y: type group -> {request year -> [projects, MW]}}
All statuses count (it shows what was asked for each year, not what is still waiting). Requests with
no request date or no county are skipped and reported. Then run build-ch7-map.js with the extra
arguments to turn it into ch7-map-years.json."""
import sys, json
import pandas as pd
src, out = sys.argv[1], sys.argv[2]
df = pd.read_excel(src, sheet_name="03. Complete Queue Data", header=1)
df["mw"] = df[["mw_1", "mw_2", "mw_3"]].sum(axis=1, min_count=1).fillna(0)
def group(t):
    if t == "Solar": return "solar"
    if t == "Solar+Battery": return "hybrid"
    if t in ("Battery", "Other Storage"): return "storage"
    if t in ("Wind", "Offshore Wind", "Wind+Battery"): return "wind"
    if isinstance(t, str) and t.startswith("Gas"): return "gas"
    return "other"
df["g"] = df.type_clean.map(group)
d = df[df.fips_code.notna() & df.q_year.notna()].copy()
d["fips"] = d.fips_code.astype(int).astype(str).str.zfill(5)
d["yr"] = d.q_year.astype(int)
res = {}
for f, x in d.groupby("fips"):
    nm = x.county.dropna(); st = x.state.dropna()
    y = {}
    for (g, yr), z in x.groupby(["g", "yr"]):
        y.setdefault(g, {})[int(yr)] = [int(len(z)), round(float(z.mw.sum()), 1)]
    res[f] = {"name": str(nm.mode().iat[0]) if len(nm) else "", "state": str(st.mode().iat[0]) if len(st) else "", "y": y}
json.dump(res, open(out, "w"), separators=(",", ":"))
print(len(res), "counties;", len(df), "rows;", int(df.fips_code.isna().sum()), "without a county;",
      int(df.q_year.isna().sum()), "without a request year;", len(d), "used,",
      round(float(d.mw.sum()) / 1000, 1), "GW")
