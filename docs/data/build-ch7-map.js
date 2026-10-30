// Builds docs/data/ch7-map.json for the chapter 7 map.
//   node build-ch7-map.js ch7-county-input.json ch7-map.json [ch7-countyyear-input.json ch7-map-years.json]
// The optional last two arguments also write the advanced year-by-year map data (see build-ch7-countyyear.py).
// Needs: npm install us-atlas@3 topojson-client@3 topojson-simplify@3 d3-geo@3
//
// Region footprints are NOT official ISO boundaries. Each county takes the region that has the
// most queue requests in it (all statuses); counties with no requests take the majority region of
// their neighbours, repeated until every county has one. Good enough to show where each region's
// projects are, not to say who serves a given address.
const fs = require('fs');
const topo = require('topojson-client');
const simp = require('topojson-simplify');
const { geoPath } = require('d3-geo');
const us = JSON.parse(fs.readFileSync(require.resolve('us-atlas/counties-albers-10m.json')));
const input = JSON.parse(fs.readFileSync(process.argv[2]));
const out = process.argv[3];

let t = simp.presimplify(us);
t = simp.simplify(t, simp.quantile(t, 0.35));     // lighter geometry for a single-file page
const geoms = t.objects.counties.geometries;
const keep = geoms.map(g => !['02', '15', '72', '78', '66', '60', '69'].includes(String(g.id).padStart(5, '0').slice(0, 2)));
const idx = geoms.map((g, i) => i).filter(i => keep[i]);
const fips = geoms.map(g => String(g.id).padStart(5, '0'));
const nb = topo.neighbors(geoms);

// 1. direct assignment
const reg = new Array(geoms.length).fill(null);
idx.forEach(i => {
  const c = input[fips[i]];
  if (c) reg[i] = Object.entries(c.rc).sort((a, b) => b[1] - a[1])[0][0];
});
// 2. fill empty counties from neighbours
for (let pass = 0; pass < 60; pass++) {
  let changed = 0; const next = reg.slice();
  idx.forEach(i => {
    if (reg[i]) return;
    const cnt = {};
    nb[i].forEach(j => { if (keep[j] && reg[j]) cnt[reg[j]] = (cnt[reg[j]] || 0) + 1; });
    const top = Object.entries(cnt).sort((a, b) => b[1] - a[1])[0];
    if (top) { next[i] = top[0]; changed++; }
  });
  for (let i = 0; i < reg.length; i++) reg[i] = next[i];
  if (!changed) break;
}
// 2b. smooth ragged edges: a county follows its neighbours' majority unless it has plenty of
//     requests of its own (3 passes). Self vote = 1 + (requests / 10, capped at 3).
for (let pass = 0; pass < 3; pass++) {
  const next = reg.slice();
  idx.forEach(i => {
    const own = input[fips[i]] ? Object.values(input[fips[i]].rc).reduce((x, y) => x + y, 0) : 0;
    const v = {}; if (reg[i]) v[reg[i]] = 1 + Math.min(3, own / 10);
    nb[i].forEach(j => { if (keep[j] && reg[j]) v[reg[j]] = (v[reg[j]] || 0) + 1; });
    const top = Object.entries(v).sort((x, y) => y[1] - x[1])[0]; if (top) next[i] = top[0];
  });
  for (let i = 0; i < reg.length; i++) reg[i] = next[i];
}
// 2c. dissolve small islands (fewer than 6 counties) into the surrounding region
{
  const seen = new Set();
  idx.forEach(i => {
    if (seen.has(i) || !reg[i]) return;
    const comp = [i]; seen.add(i);
    for (let k = 0; k < comp.length; k++) nb[comp[k]].forEach(j => { if (keep[j] && !seen.has(j) && reg[j] === reg[i]) { seen.add(j); comp.push(j); } });
    if (comp.length < 6) {
      const cnt = {};
      comp.forEach(c => nb[c].forEach(j => { if (keep[j] && reg[j] && reg[j] !== reg[i]) cnt[reg[j]] = (cnt[reg[j]] || 0) + 1; }));
      const top = Object.entries(cnt).sort((x, y) => y[1] - x[1])[0];
      if (top) comp.forEach(c => { reg[c] = top[0]; });
    }
  });
}
const names = [...new Set(reg.filter(Boolean))].sort();

// 3. counties-albers-10m is already projected (Albers USA, 975 x 610): draw it as-is and crop the view
const path = geoPath();
const conus = { type: 'FeatureCollection', features: idx.map(i => topo.feature(t, geoms[i])) };
const bb = path.bounds(conus), pad = 4;
const vx = Math.floor(bb[0][0]) - pad, vy = Math.floor(bb[0][1]) - pad, W = Math.ceil(bb[1][0] - bb[0][0]) + 2 * pad, H = Math.ceil(bb[1][1] - bb[0][1]) + 2 * pad;

// 4. region outlines: merge county shapes by region
const regions = {};
names.forEach(n => {
  const members = idx.filter(i => reg[i] === n).map(i => geoms[i]);
  regions[n] = path(topo.merge(t, members));
});

// 4b. label anchor per region: the county centre nearest the median x,y of its counties
const labels = {};
names.forEach(n => {
  const pts = idx.filter(i => reg[i] === n).map(i => path.centroid(topo.feature(t, geoms[i]))).filter(p => isFinite(p[0]));
  const med = a => a.slice().sort((x, y) => x - y)[Math.floor(a.length / 2)];
  const mx = med(pts.map(p => p[0])), my = med(pts.map(p => p[1]));
  const best = pts.sort((p, q) => Math.hypot(p[0] - mx, p[1] - my) - Math.hypot(q[0] - mx, q[1] - my))[0];
  labels[n] = [Math.round(best[0]), Math.round(best[1])];
});
// 5. bubbles: one per county with active requests, at the county centre
const counties = [];
idx.forEach(i => {
  const c = input[fips[i]]; if (!c || !Object.keys(c.act).length) return;
  const cen = path.centroid(topo.feature(t, geoms[i]));
  if (!isFinite(cen[0])) return;
  counties.push([fips[i], c.name, c.state, Math.round(cen[0] * 10) / 10, Math.round(cen[1] * 10) / 10, reg[i], c.act]);
});
// county regions for outlines of the bubbles' own project region may differ from the footprint; keep footprint
const outObj = { vb: [vx, vy, W, H], regions, labels, counties,
  note: 'Region footprints are approximate: each county takes the region with the most queue requests in it, and counties with none take their neighbours\' majority. Not official ISO boundaries.' };
fs.writeFileSync(out, JSON.stringify(outObj));
const unmapped = Object.values(input).filter(c => c.act && Object.keys(c.act).length).length - counties.length;
console.log('regions', names.join(','), 'counties with active', counties.length, 'unmapped (AK/HI/territories)', unmapped, 'bytes', fs.statSync(out).size);

// 6. optional: county x year x type data for the advanced map. Counties share the region and the
//    centre used above; rows are [county index, type group, request year, projects, MW].
if (process.argv[4] && process.argv[5]) {
  const yin = JSON.parse(fs.readFileSync(process.argv[4]));
  const ycounties = [], yrows = []; let ymin = 9999, ymax = 0;
  idx.forEach(i => {
    const c = yin[fips[i]]; if (!c) return;
    const cen = path.centroid(topo.feature(t, geoms[i]));
    if (!isFinite(cen[0])) return;
    const ci = ycounties.length;
    ycounties.push([fips[i], c.name, c.state, Math.round(cen[0] * 10) / 10, Math.round(cen[1] * 10) / 10, reg[i]]);
    Object.keys(c.y).forEach(g => Object.keys(c.y[g]).forEach(yr => {
      const v = c.y[g][yr]; yrows.push([ci, g, +yr, v[0], v[1]]); ymin = Math.min(ymin, +yr); ymax = Math.max(ymax, +yr);
    }));
  });
  fs.writeFileSync(process.argv[5], JSON.stringify({ vb: [vx, vy, W, H], years: [ymin, ymax], counties: ycounties, rows: yrows }));
  console.log('year map: counties', ycounties.length, 'rows', yrows.length, 'years', ymin + '-' + ymax, 'bytes', fs.statSync(process.argv[5]).size);
}
