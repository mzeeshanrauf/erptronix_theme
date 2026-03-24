/* ErpTronix Theme JS v1.1 — static file, no bundler required */
(function () {
  'use strict';

  var BRAND = {
    name: 'ErpTronix',
    tagline: 'Intelligent ERP for Modern Business',
  };

  /* ── Favicon ─────────────────────────────────────────────────── */
  function setFavicon() {
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>"
      + "<defs><linearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'>"
      + "<stop offset='0%25' stop-color='%2322d3ee'/>"
      + "<stop offset='100%25' stop-color='%234f46e5'/>"
      + "</linearGradient></defs>"
      + "<rect width='32' height='32' rx='7' fill='url(%23g)'/>"
      + "<text x='16' y='22' text-anchor='middle' font-family='sans-serif' "
      + "font-weight='900' font-size='13' fill='white'>ET</text></svg>";

    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'shortcut icon';
      document.head.appendChild(link);
    }
    link.type = 'image/svg+xml';
    link.href = 'data:image/svg+xml,' + svg;
  }

  /* ── Page title ─────────────────────────────────────────────── */
  function patchTitle() {
    if (document.title && !document.title.includes(BRAND.name)) {
      document.title = document.title
        .replace(/Frappe/g, BRAND.name)
        .replace(/\bERPNext\b/g, BRAND.name);
    }
  }

  /* ── Brand: mark body so CSS can target it ─────────────────── */
  function initTheme() {
    document.body.classList.add('erptronix-theme');
    document.documentElement.setAttribute('data-et-brand', 'erptronix');
  }

  /* ── Animate number cards on load ──────────────────────────── */
  function animateNumbers() {
    var els = document.querySelectorAll(
      '.number-card-value, .widget .number, .number-card .number'
    );
    els.forEach(function (el) {
      if (el.dataset.etAnimated) return;
      el.dataset.etAnimated = '1';
      var raw = parseFloat(el.textContent.replace(/[^0-9.-]/g, ''));
      if (isNaN(raw) || raw === 0) return;
      var prefix = el.textContent.match(/^[^0-9-]*/)?.[0] || '';
      var suffix = el.textContent.match(/[^0-9.]*$/)?.[0] || '';
      var dur = 800, t0 = performance.now();
      (function tick(now) {
        var p = Math.min((now - t0) / dur, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        var v = raw * ease;
        el.textContent = prefix + (Number.isInteger(raw)
          ? Math.floor(v).toLocaleString()
          : v.toFixed(2)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }

  /* ── Button ripple effect ───────────────────────────────────── */
  function addRipple() {
    var style = document.createElement('style');
    style.textContent = '@keyframes et-ripple{to{transform:scale(1);opacity:0}}';
    document.head.appendChild(style);

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.btn');
      if (!btn) return;
      var old = btn.querySelector('.et-ripple');
      if (old) old.remove();
      var r = document.createElement('span');
      r.className = 'et-ripple';
      var rect = btn.getBoundingClientRect();
      var sz = Math.max(rect.width, rect.height) * 2;
      r.style.cssText = 'position:absolute;border-radius:50%;pointer-events:none;'
        + 'background:rgba(255,255,255,0.18);transform:scale(0);'
        + 'animation:et-ripple 0.45s ease-out forwards;'
        + 'width:' + sz + 'px;height:' + sz + 'px;'
        + 'left:' + (e.clientX - rect.left - sz / 2) + 'px;'
        + 'top:' + (e.clientY - rect.top - sz / 2) + 'px;';
      if (getComputedStyle(btn).position === 'static') btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(r);
      setTimeout(function () { r.remove(); }, 500);
    });
  }

  /* ── Watch for Frappe router page changes (SPA) ─────────────── */
  function watchRouter() {
    var observer = new MutationObserver(function () {
      patchTitle();
      setTimeout(animateNumbers, 300);
    });
    observer.observe(document.body, { childList: true, subtree: false });
  }

  /* ── Login page branding ─────────────────────────────────────── */
  function brandLoginPage() {
    var head = document.querySelector('.page-card-head, .login-content .text-center');
    if (!head || head.dataset.etBranded) return;
    head.dataset.etBranded = '1';

    var wrap = document.createElement('div');
    wrap.style.cssText = 'text-align:center;margin-bottom:24px;';
    wrap.innerHTML = ''
      + '<div style="width:60px;height:60px;margin:0 auto 14px;border-radius:14px;'
      + 'background:linear-gradient(135deg,#22d3ee,#0ea5e9,#4f46e5);'
      + 'display:flex;align-items:center;justify-content:center;'
      + 'font-family:Syne,sans-serif;font-weight:900;font-size:18px;color:#fff;'
      + 'box-shadow:0 6px 24px rgba(34,211,238,0.3);">ET</div>'
      + '<h2 style="font-family:Syne,sans-serif;font-weight:800;font-size:1.6rem;'
      + 'margin:0 0 4px;letter-spacing:-0.03em;color:var(--text-color,#0f172a);">'
      + 'Erp<span style="background:linear-gradient(135deg,#22d3ee,#4f46e5);'
      + '-webkit-background-clip:text;-webkit-text-fill-color:transparent;'
      + 'background-clip:text;">Tronix</span></h2>'
      + '<p style="font-size:0.8rem;color:var(--text-muted,#475569);margin:0;">'
      + BRAND.tagline + '</p>';
    head.insertBefore(wrap, head.firstChild);
  }

  /* ── Init ────────────────────────────────────────────────────── */
  function init() {
    initTheme();
    setFavicon();
    patchTitle();
    addRipple();
    brandLoginPage();
    setTimeout(animateNumbers, 400);
    watchRouter();

    // Hook into Frappe router if available
    if (window.frappe && frappe.router) {
      frappe.router.on && frappe.router.on('change', function () {
        setTimeout(function () {
          patchTitle();
          animateNumbers();
        }, 300);
      });
    }

    console.log(
      '%c ErpTronix %c v1.1 ',
      'background:linear-gradient(135deg,#22d3ee,#4f46e5);color:#fff;'
        + 'padding:3px 8px;border-radius:4px 0 0 4px;font-weight:bold;font-family:monospace;',
      'background:#0d1630;color:#22d3ee;padding:3px 8px;'
        + 'border-radius:0 4px 4px 0;font-family:monospace;'
        + 'border:1px solid #22d3ee;'
    );
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
