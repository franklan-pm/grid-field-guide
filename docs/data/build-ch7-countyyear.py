"""County x year x type aggregates for the chapter 7 advanced map. Reads tab 03 of the Berkeley Lab
workbook and writes docs/data/ch7-countyyear-input.json:
  fips -> {name, state,
           y:  type group -> {request year -> {status -> [projects, MW]}},
           on: type group -> {year it came online (proposed date if no in-service date) -> [projects, MW]}}
  _meta -> counts of built projects left out for lack of any online date or a county, and how many use the proposed date
Status is a active, o operational (built), w withdrawn, s suspended, as in build-ch7.py. The page
filters on it. Requests with no request date or no county are skipped and reported; so are built
projects with no online date. Then run build-ch7-map.js with the extra arguments to turn it into
ch7-map-years.json."""
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
STATUS = {"active": "a", "operational": "o", "withdrawn": "w", "suspended": "s"}
df["s"] = df.q_status.map(STATUS)
df["fips"] = df.fips_code.map(lambda f: str(int(f)).zfill(5) if pd.notna(f) else None)
d = df[df.fips.notna() & df.q_year.notna() & df.s.notna()].copy()
d["yr"] = d.q_year.astype(int)
built = df[df.s == "o"].copy()
# year it came online: the in-service date, or the proposed online date when that is missing
# (same year as the in-service date for 77% of projects that have both). Dates after 2025 are
# not real in-service dates, so those projects count as undated.
built["when"] = built.on_date.fillna(built.prop_date)
built["proposed"] = built.on_date.isna() & built.prop_date.notna()
built.loc[pd.to_datetime(built.when).dt.year > 2025, "when"] = pd.NaT
b = built[built.when.notna() & built.fips.notna()].copy()
b["yr"] = pd.to_datetime(b.when).dt.year.astype(int)
res = {}
def entry(f, x):
    if f not in res:
        nm = x.county.dropna(); stt = x.state.dropna()
        res[f] = {"name": str(nm.mode().iat[0]) if len(nm) else "", "state": str(stt.mode().iat[0]) if len(stt) else "", "y": {}, "on": {}}
    return res[f]
for f, x in d.groupby("fips"):
    e = entry(f, x)
    for (g, yr, stat), z in x.groupby(["g", "yr", "s"]):
        e["y"].setdefault(g, {}).setdefault(int(yr), {})[stat] = [int(len(z)), round(float(z.mw.sum()), 1)]
for f, x in b.groupby("fips"):
    e = entry(f, x)
    for (g, yr), z in x.groupby(["g", "yr"]):
        e["on"].setdefault(g, {})[int(yr)] = [int(len(z)), round(float(z.mw.sum()), 1)]
res["_meta"] = {"builtTotal": int(len(built)), "builtNoDate": int(built.when.isna().sum()),
                "builtNoCounty": int((built.when.notna() & built.fips.isna()).sum()),
                "builtProposed": int(b.proposed.sum())}
json.dump(res, open(out, "w"), separators=(",", ":"))
print(len(res) - 1, "counties;", len(df), "rows;", int(df.fips_code.isna().sum()), "without a county;",
      int(df.q_year.isna().sum()), "without a request year;", len(d), "used,", round(float(d.mw.sum()) / 1000, 1), "GW;",
      "built:", res["_meta"])
