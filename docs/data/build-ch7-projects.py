"""Project-level records for the chapter 7 county click-through. Reads tab 03 of the Berkeley Lab
workbook (38,201 requests) and writes apps/07-interconnection/data/ch7-projects.json:
  {"cols": [...], "dict": {col: [strings]}, "rows": [[...], ...]}
Each row follows "cols"; columns listed in "dict" hold an index into that list (null = blank).
"rid" is the row number in the Excel file (pandas index + 3), since q_id repeats across utilities.
Dates are YYYY-MM-DD. "g" is the chapter's type group; "mw" is the sum of the listed parts, as in the
other build scripts. Usage:  python build-ch7-projects.py <workbook.xlsx> <out.json>"""
import sys, json
import pandas as pd
src, out = sys.argv[1], sys.argv[2]
df = pd.read_excel(src, sheet_name="03. Complete Queue Data", header=1)
df["rid"] = df.index + 3
df["mw"] = df[["mw_1", "mw_2", "mw_3"]].sum(axis=1, min_count=1)
def group(t):
    if t == "Solar": return "solar"
    if t == "Solar+Battery": return "hybrid"
    if t in ("Battery", "Other Storage"): return "storage"
    if t in ("Wind", "Offshore Wind", "Wind+Battery"): return "wind"
    if isinstance(t, str) and t.startswith("Gas"): return "gas"
    return "other"
df["g"] = df.type_clean.map(group)
df["fips"] = df.fips_code.map(lambda f: str(int(f)).zfill(5) if pd.notna(f) else None)
for c in ["q_date", "prop_date", "on_date", "wd_date", "ia_date"]:
    df[c] = pd.to_datetime(df[c]).dt.strftime("%Y-%m-%d")

DICT = ["g", "q_status", "region", "state", "county", "type_clean", "utility", "developer", "service",
        "IA_phase_clean", "type_1", "type_2", "type_3"]
COLS = ["rid", "q_id", "fips", "g", "q_status", "region", "state", "county", "project_name", "type_clean",
        "type_1", "mw_1", "type_2", "mw_2", "type_3", "mw_3", "mw", "utility", "developer", "service",
        "poi_name", "IA_phase_clean", "q_date", "prop_date", "on_date", "wd_date", "ia_date"]
dic = {c: sorted(df[c].dropna().astype(str).unique()) for c in DICT}
pos = {c: {v: i for i, v in enumerate(dic[c])} for c in DICT}
def clean(c, v):
    if pd.isna(v): return None
    if c in DICT: return pos[c][str(v)]
    if c in ("rid",): return int(v)
    if c.startswith("mw"): return round(float(v), 2)
    if c == "q_id": return str(v)
    return str(v)
rows = [[clean(c, r[c]) for c in COLS] for r in df.to_dict("records")]
json.dump({"cols": COLS, "dict": dic, "rows": rows}, open(out, "w"), separators=(",", ":"))
import gzip
raw = open(out, "rb").read()
print(len(rows), "rows;", len(raw) // 1024, "KB raw;", len(gzip.compress(raw)) // 1024, "KB gzipped")
