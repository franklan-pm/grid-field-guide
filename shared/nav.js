/* Grid Field Guide — collection bar.
   Each chapter page loads this with:
     <script src="../../shared/nav.js" defer></script>
   It adds a slim bar at the top of the page: home link, chapter dots, prev/next.
   Styles live in a shadow root so they never touch the chapter's own CSS. */
(function () {
  var CHAPTERS = [
    { dir: '01-power-mix',       short: 'Power mix',        title: 'Power mix' },
    { dir: '02-distribution',    short: 'Distribution',     title: 'Distribution' },
    { dir: '03-der-microgrids',  short: 'DER & microgrids', title: 'DER & microgrids' },
    { dir: '04-grid-operations', short: 'Grid operations',  title: 'Grid operations' },
    { dir: '05-batteries',       short: 'Batteries',        title: 'Batteries' },
    { dir: '06-vpp',             short: 'VPPs',             title: 'Virtual power plants' },
    { dir: '07-interconnection', short: 'Interconnect',     title: 'Interconnection queues' }
  ];

  var path = location.pathname;
  var idx = -1;
  CHAPTERS.forEach(function (c, i) { if (path.indexOf('/apps/' + c.dir + '/') !== -1) idx = i; });
  if (idx === -1) return;

  var home = location.protocol === 'file:' ? '../../index.html' : '../../';
  var href = function (c) { return '../' + c.dir + '/index.html'; };
  var cur = CHAPTERS[idx], prev = CHAPTERS[idx - 1], next = CHAPTERS[idx + 1];
  var esc = function (s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); };

  // Make sure the collection fonts are available on every chapter.
  if (!document.querySelector('link[href*="Barlow+Condensed"]')) {
    var lf = document.createElement('link');
    lf.rel = 'stylesheet';
    lf.href = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=B612+Mono:wght@400;700&display=swap';
    document.head.appendChild(lf);
  }

  var MONO = 'var(--f-mono,"B612 Mono",ui-monospace,Menlo,Consolas,monospace)';
  var DISPLAY = 'var(--f-display,"Barlow Condensed","Arial Narrow",sans-serif)';
  var css = [
    ':host{all:initial;display:block;position:relative;z-index:50}',
    /* Colors and fonts come from shared/theme.css on the page (custom properties cross the shadow boundary). */
    '.bar{--n-ground:var(--ground,#0F2C4C);--n-ink:var(--ink,#EAF0F6);--n-ink-3:var(--ink-3,#93AAC1);--n-band:var(--band,#5D7EA1);--n-on-ink:var(--on-ink,#0F2C4C);--n-primary:var(--v-primary,#F59B4C);',
    '  box-sizing:border-box;display:flex;align-items:center;gap:16px;min-height:46px;',
    '  padding:6px max(16px,env(safe-area-inset-right,0px)) 6px max(16px,env(safe-area-inset-left,0px));',
    '  padding-top:calc(6px + env(safe-area-inset-top,0px));',
    '  background:var(--n-ground);border-bottom:2px solid var(--n-ink);color:var(--n-ink);',
    '  font:400 12px/1.2 ' + MONO + '}',
    'a{color:inherit;text-decoration:none}',
    'a:focus-visible,button:focus-visible{outline:2px solid var(--n-ink);outline-offset:2px}',
    '.home{display:flex;align-items:center;gap:8px;font:700 17px/1 ' + DISPLAY + ';letter-spacing:.06em;text-transform:uppercase;white-space:nowrap}',
    '.home:hover .name{text-decoration:underline;text-underline-offset:3px}',
    '.mark{width:22px;height:14px;flex:none}',
    '.where{display:flex;align-items:center;gap:12px;min-width:0;flex:1;justify-content:center}',
    '.label{color:var(--n-ink-3);text-transform:uppercase;letter-spacing:.1em;font-size:11px;white-space:nowrap}',
    '.label b{color:var(--n-ink);font:600 16px/1 ' + DISPLAY + ';letter-spacing:.05em;margin-left:8px}',
    /* progress: square markers on a rule; done = filled, current = filled and outlined */
    '.dots{display:flex;align-items:center;gap:0}',
    '.dots a{display:flex;align-items:center;padding:6px 0}',
    '.dots a + a::before{content:"";width:14px;height:1px;background:var(--n-band);display:block}',
    '.dots a.done + a::before,.dots a.on::before{background:var(--n-ink)}',
    '.dot{width:10px;height:10px;border:1px solid var(--n-ink);box-sizing:border-box;display:block;background:transparent}',
    '.dots a.done .dot{background:var(--n-ink-3);border-color:var(--n-ink-3)}',
    '.dots a.on .dot{background:var(--n-ink);outline:1px solid var(--n-ink);outline-offset:2px}',
    '.dots a:hover .dot{background:var(--n-ink)}',
    '.step{display:flex;gap:6px;white-space:nowrap}',
    '.step a{display:flex;align-items:center;gap:6px;padding:5px 10px;border:1px solid var(--n-ink);color:var(--n-ink);font:600 14px/1 ' + DISPLAY + ';letter-spacing:.06em;text-transform:uppercase}',
    '.step a:hover{background:var(--n-ink);color:var(--n-on-ink)}',
    '.step span.ghost{visibility:hidden;padding:5px 10px}',
    '.right{display:flex;align-items:center;gap:12px}',
    /* theme switch: square segmented control */
    '.theme{display:inline-flex;border:1px solid var(--n-ink)}',
    '.theme button{font:400 11px/1 ' + MONO + ';letter-spacing:.08em;text-transform:uppercase;color:var(--n-ink);background:transparent;border:0;border-radius:0;padding:6px 10px;cursor:pointer;margin:0}',
    '.theme button + button{border-left:1px solid var(--n-ink)}',
    '.theme button:hover{background:color-mix(in srgb,var(--n-ink) 10%,transparent)}',
    '.theme button[aria-pressed="true"]{background:var(--n-ink);color:var(--n-on-ink);font-weight:700}',
    '@media (max-width:820px){.step .t{display:none}.label .n{display:none}}',
    '@media (max-width:1020px){.theme .t{display:none}.theme button{padding:6px 8px}}',
    '@media (max-width:560px){.home .name{display:none}.label{display:none}.where{justify-content:flex-start}}'
  ].join('\n');

  var dots = CHAPTERS.map(function (c, i) {
    var cls = i < idx ? 'done' : i === idx ? 'on' : '';
    return '<a class="' + cls + '" href="' + href(c) + '" title="Chapter ' + (i + 1) + ': ' + esc(c.title) + '"' +
      (i === idx ? ' aria-current="page"' : '') + '><span class="dot"></span></a>';
  }).join('');

  var html =
    '<nav class="bar" aria-label="Grid Field Guide chapters">' +
      '<a class="home" href="' + home + '" title="All chapters">' +
        '<svg class="mark" viewBox="0 0 22 14" aria-hidden="true"><circle cx="7" cy="7" r="5.5" fill="none" stroke="var(--n-ink)" stroke-width="1.6"/><circle cx="14.5" cy="7" r="5.5" fill="none" stroke="var(--n-primary)" stroke-width="1.6"/></svg>' +
        '<span class="name">Grid Field Guide</span>' +
      '</a>' +
      '<div class="where">' +
        '<span class="label"><span class="n">Chapter ' + (idx + 1) + ' of ' + CHAPTERS.length + '</span><b>' + esc(cur.title) + '</b></span>' +
        '<span class="dots">' + dots + '</span>' +
      '</div>' +
      '<div class="right"><div class="step">' +
        (prev ? '<a href="' + href(prev) + '" rel="prev" aria-label="Previous chapter: ' + esc(prev.title) + '">←<span class="t">' + esc(prev.short) + '</span></a>' : '<span class="ghost">←</span>') +
        (next ? '<a class="next" href="' + href(next) + '" rel="next" aria-label="Next chapter: ' + esc(next.title) + '"><span class="t">' + esc(next.short) + '</span>→</a>'
              : '<a class="next" href="' + home + '" aria-label="Back to all chapters"><span class="t">All chapters</span>↑</a>') +
      '</div>' +
      '<div class="theme" role="group" aria-label="Color theme">' +
        '<button type="button" data-theme-set="light" aria-pressed="true">☀<span class="t"> Light</span></button>' +
        '<button type="button" data-theme-set="dark" aria-pressed="false">☾<span class="t"> Dark</span></button>' +
      '</div></div>' +
    '</nav>';

  function mount() {
    var host = document.createElement('gfg-nav');
    var root = host.attachShadow({ mode: 'open' });
    root.innerHTML = '<style>' + css + '</style>' + html;
    // Run edge to edge even when the chapter pads its <body>.
    var cs = getComputedStyle(document.body);
    host.style.margin = '-' + cs.paddingTop + ' -' + cs.paddingRight + ' ' + cs.paddingTop + ' -' + cs.paddingLeft;
    document.body.insertBefore(host, document.body.firstChild);
    if (window.GFG && GFG.theme) GFG.theme.sync();
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
