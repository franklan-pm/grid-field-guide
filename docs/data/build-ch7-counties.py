"""County aggregates for the chapter 7 map. Reads tab 03 of the Berkeley Lab workbook and
writes docs/data/ch7-county-input.json:  fips -> {name, state, rc: project counts by region (all
statuses, used to draw region footprints), act: type group -> [projects, MW] for active requests}.
Then run build-ch7-map.js (needs us-atlas) to turn it into ch7-map.json."""
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
d = df[df.fips_code.notna()].copy()
d["fips"] = d.fips_code.astype(int).astype(str).str.zfill(5)
res = {}
for f, x in d.groupby("fips"):
    a = x[x.q_status == "active"]
    nm = x.county.dropna(); st = x.state.dropna()
    res[f] = {"name": str(nm.mode().iat[0]) if len(nm) else "", "state": str(st.mode().iat[0]) if len(st) else "",
              "rc": {k: int(v) for k, v in x.region.value_counts().items()},
              "act": {g: [int(len(y)), round(float(y.mw.sum()), 1)] for g, y in a.groupby("g")}}
json.dump(res, open(out, "w"), separators=(",", ":"))
print(len(res), "counties;", int(df.fips_code.isna().sum()), "rows without a county;", round(sum(v[1] for r in res.values() for v in r["act"].values()) / 1000, 1), "GW active mapped")
