/* Grid Field Guide — theme switch.
   Load this in <head>, before any stylesheet, WITHOUT defer, so the right theme
   paints first:
     <script src="../../shared/theme.js"></script>
   Default is light (vellum). The reader's choice is saved under 'gfg-theme' and shared by
   every page in the guide. 'grid-theme' (the old Grid Operations key) is read once
   so an earlier choice carries over. */
(function () {
  var KEY = 'gfg-theme', OLD = 'grid-theme';
  function read() {
    try {
      var t = localStorage.getItem(KEY) || localStorage.getItem(OLD);
      return t === 'light' || t === 'dark' ? t : 'light';
    } catch (e) { return 'light'; }
  }
  function sync() {
    var t = document.documentElement.getAttribute('data-theme');
    var btns = Array.prototype.slice.call(document.querySelectorAll('[data-theme-set]'));
    var nav = document.querySelector('gfg-nav');
    if (nav && nav.shadowRoot) btns = btns.concat(Array.prototype.slice.call(nav.shadowRoot.querySelectorAll('[data-theme-set]')));
    for (var i = 0; i < btns.length; i++) btns[i].setAttribute('aria-pressed', btns[i].getAttribute('data-theme-set') === t ? 'true' : 'false');
  }
  function set(t, save) {
    document.documentElement.setAttribute('data-theme', t);
    if (save) { try { localStorage.setItem(KEY, t); } catch (e) {} }
    sync();
    try { document.dispatchEvent(new CustomEvent('gfg-theme', { detail: t })); } catch (e) {}
  }
  document.documentElement.setAttribute('data-theme', read());

  // Any button with data-theme-set="light|dark" on the page works as a toggle.
  document.addEventListener('click', function (e) {
    // composedPath() also sees buttons inside the chapter bar's shadow root.
    var path = e.composedPath ? e.composedPath() : [e.target];
    for (var i = 0; i < path.length; i++) {
      var b = path[i];
      if (b.getAttribute && b.getAttribute('data-theme-set')) { set(b.getAttribute('data-theme-set'), true); return; }
    }
  });
  document.addEventListener('DOMContentLoaded', sync);
  // Keep open tabs in step when the theme changes in another tab.
  window.addEventListener('storage', function (e) { if (e.key === KEY && (e.newValue === 'light' || e.newValue === 'dark')) set(e.newValue, false); });

  window.GFG = window.GFG || {};
  window.GFG.theme = { get: function () { return document.documentElement.getAttribute('data-theme'); }, set: set, sync: sync };
})();
