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
    { dir: '04-grid-operations', short: 'Grid operations',  title: 'Grid operations' }
  ];

  var path = location.pathname;
  var idx = -1;
  CHAPTERS.forEach(function (c, i) { if (path.indexOf('/apps/' + c.dir + '/') !== -1) idx = i; });
  if (idx === -1) return;

  var home = location.protocol === 'file:' ? '../../index.html' : '../../';
  var href = function (c) { return '../' + c.dir + '/index.html'; };
  var cur = CHAPTERS[idx], prev = CHAPTERS[idx - 1], next = CHAPTERS[idx + 1];
  var esc = function (s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); };

  // Make sure the collection fonts are available (chapter 4 loads different ones).
  if (!document.querySelector('link[href*="Space+Grotesk"]')) {
    var lf = document.createElement('link');
    lf.rel = 'stylesheet';
    lf.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap';
    document.head.appendChild(lf);
  }

  var css = [
    ':host{all:initial;display:block;position:relative;z-index:50}',
    /* Colors come from shared/theme.css on the page (custom properties cross the shadow boundary). */
    '.bar{--n-ink:var(--ink-deep,#06131F);--n-edge:var(--edge,#1D4266);--n-paper:var(--paper,#EAF2F5);--n-muted:var(--muted,#7E9BB4);--n-cyan:var(--line-cyan,#8FE0EC);--n-amber:var(--signal-amber,#F5A623);',
    '  box-sizing:border-box;display:flex;align-items:center;gap:16px;min-height:44px;',
    '  padding:6px max(16px,env(safe-area-inset-right,0px)) 6px max(16px,env(safe-area-inset-left,0px));',
    '  padding-top:calc(6px + env(safe-area-inset-top,0px));',
    '  background:var(--n-ink);border-bottom:1px solid var(--n-edge);color:var(--n-paper);',
    '  font:500 13px/1.2 "IBM Plex Mono",ui-monospace,Menlo,Consolas,monospace}',
    'a{color:inherit;text-decoration:none;border-radius:6px}',
    'a:focus-visible{outline:2px solid var(--n-amber);outline-offset:2px}',
    '.home{display:flex;align-items:center;gap:8px;font:600 14px/1 "Space Grotesk",system-ui,sans-serif;letter-spacing:.01em;white-space:nowrap}',
    '.home:hover .name{color:var(--n-cyan)}',
    '.mark{width:18px;height:18px;flex:none}',
    '.where{display:flex;align-items:center;gap:10px;min-width:0;flex:1;justify-content:center}',
    '.label{color:var(--n-muted);text-transform:uppercase;letter-spacing:.08em;font-size:11px;white-space:nowrap}',
    '.label b{color:var(--n-paper);font-weight:600;text-transform:none;letter-spacing:0;font-size:13px;margin-left:6px}',
    '.dots{display:flex;align-items:center;gap:0}',
    '.dots a{display:flex;align-items:center;padding:6px 0}',
    '.dots a + a::before{content:"";width:14px;height:2px;background:var(--n-edge);display:block}',
    '.dots a.done + a::before,.dots a.on::before{background:var(--n-cyan)}',
    '.dot{width:9px;height:9px;border-radius:50%;border:2px solid var(--n-edge);box-sizing:border-box;display:block;margin-left:0}',
    '.dots a.done .dot{background:var(--n-cyan);border-color:var(--n-cyan)}',
    '.dots a.on .dot{background:var(--n-amber);border-color:var(--n-amber);box-shadow:0 0 0 3px color-mix(in srgb,var(--n-amber) 22%,transparent)}',
    '.dots a:hover .dot{border-color:var(--n-cyan)}',
    '.step{display:flex;gap:6px;white-space:nowrap}',
    '.step a{display:flex;align-items:center;gap:6px;padding:5px 9px;border:1px solid var(--n-edge);color:var(--n-muted)}',
    '.step a:hover{color:var(--n-paper);border-color:var(--n-cyan)}',
    '.step a.next{color:var(--n-paper)}',
    '.step span.ghost{visibility:hidden;padding:5px 9px}',
    '.right{display:flex;align-items:center;gap:12px}',
    '.theme{display:inline-flex;border:1px solid var(--n-edge);border-radius:999px;padding:2px;gap:2px}',
    '.theme button{font:500 12px/1 "IBM Plex Mono",ui-monospace,Menlo,Consolas,monospace;color:var(--n-muted);background:transparent;border:0;border-radius:999px;padding:5px 11px;cursor:pointer}',
    '.theme button:hover{color:var(--n-paper)}',
    '.theme button[aria-pressed="true"]{background:var(--pill-bg,#8fe3f0);color:var(--pill-fg,#0b2240);font-weight:700}',
    '.theme button:focus-visible{outline:2px solid var(--n-amber);outline-offset:2px}',
    '@media (max-width:820px){.step .t{display:none}.label .n{display:none}}',
    '@media (max-width:1020px){.theme .t{display:none}.theme button{padding:5px 8px}}',
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
        '<svg class="mark" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 9h4l2-5 2 10 2-5h4" fill="none" stroke="#F5A623" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg>' +
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
        '<button type="button" data-theme-set="light" aria-pressed="false">☀<span class="t"> Light</span></button>' +
        '<button type="button" data-theme-set="dark" aria-pressed="true">☾<span class="t"> Dark</span></button>' +
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
