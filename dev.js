/* ============================================================
   DEVELOPMENT SHORTCUT — REMOVE BEFORE GO-LIVE
   Open any page with ?dev=climb-dev-2611 to switch on development mode
   in this browser: every module, lesson and quiz page opens without
   login, payment or quizzes, and a bar at the bottom links between them.
   ?dev=off switches it off again. This is a convenience for building the
   course, not a lock: delete this file and every reference to CI_DEV
   (grep "CI_DEV") before the course goes live.
   ============================================================ */
(function () {
  var KEY = 'ciDevMode', TOKEN = 'climb-dev-2611';
  try {
    var q = new URLSearchParams(location.search).get('dev');
    if (q === TOKEN) localStorage.setItem(KEY, '1');
    else if (q === 'off') localStorage.removeItem(KEY);
    window.CI_DEV = localStorage.getItem(KEY) === '1';
  } catch (e) { window.CI_DEV = false; }
  if (q === 'off') { alertOff(); }
  if (!window.CI_DEV) return;

  var TOTAL = 7;
  var up = location.pathname.indexOf('/lessons/') !== -1 ? '../' : '';
  var m = /module-0(\d)/.exec(location.pathname);
  var n = m ? parseInt(m[1], 10) : 0;
  var pad = function (x) { return '0' + x; };

  function build() {
    var links = ['<a href="' + up + 'dashboard.html">Dashboard</a>'];
    if (n) {
      links.push('<a href="' + up + 'module-' + pad(n) + '.html">Module ' + n + '</a>');
      links.push('<a href="' + up + 'lessons/module-' + pad(n) + '.html">Lesson</a>');
      links.push('<a href="' + up + 'module-' + pad(n) + '-quiz.html">Quiz</a>');
      if (n > 1) links.push('<a href="' + up + 'module-' + pad(n - 1) + '.html">&larr; Module ' + (n - 1) + '</a>');
      if (n < TOTAL) links.push('<a href="' + up + 'module-' + pad(n + 1) + '.html">Module ' + (n + 1) + ' &rarr;</a>');
    }
    links.push('<a href="' + location.pathname + '?dev=off">Exit dev mode</a>');
    var bar = document.createElement('div');
    bar.id = 'ciDevBar';
    bar.setAttribute('style', 'position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#d9764a;color:#fff;' +
      'font:600 13px/1.4 Inter,system-ui,sans-serif;padding:10px 16px;display:flex;flex-wrap:wrap;gap:6px 18px;' +
      'align-items:center;justify-content:center;box-shadow:0 -2px 12px rgba(0,0,0,.15)');
    bar.innerHTML = '<span>Development mode (no login, all modules open)</span>' +
      links.map(function (l) { return l.replace('<a ', '<a style="color:#fff;text-decoration:underline" '); }).join('');
    document.body.appendChild(bar);
    document.body.style.paddingBottom = '56px';
  }
  function alertOff() {
    document.addEventListener('DOMContentLoaded', function () {
      var d = document.createElement('div');
      d.setAttribute('style', 'position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#1b2a3a;color:#fff;font:600 13px Inter,system-ui,sans-serif;padding:10px 16px;text-align:center');
      d.textContent = 'Development mode is off in this browser.';
      document.body.appendChild(d);
      setTimeout(function () { d.remove(); }, 4000);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
