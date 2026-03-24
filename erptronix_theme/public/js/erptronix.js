/**
 * ERPTRONIX THEME — JavaScript
 * Dynamic branding, UI enhancements, and micro-interactions
 */

(function() {
  'use strict';

  /* ── Brand Config ── */
  const BRAND = {
    name: 'ErpTronix',
    shortName: 'ET',
    tagline: 'Intelligent ERP for Modern Business',
    primaryColor: '#22d3ee',
    secondaryColor: '#0ea5e9',
    accentColor: '#4f46e5',
  };

  /* ── Logo SVG (inline) ── */
  const LOGO_SVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 32" fill="none">
      <defs>
        <linearGradient id="etGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#22d3ee"/>
          <stop offset="50%" stop-color="#0ea5e9"/>
          <stop offset="100%" stop-color="#4f46e5"/>
        </linearGradient>
      </defs>
      <!-- Icon box -->
      <rect x="0" y="2" width="28" height="28" rx="6" fill="url(#etGrad)"/>
      <!-- ET letters -->
      <text x="14" y="20" text-anchor="middle" font-family="Syne, sans-serif"
            font-weight="800" font-size="12" fill="white" letter-spacing="-0.5">ET</text>
      <!-- Brand name -->
      <text x="36" y="21.5" font-family="Syne, sans-serif" font-weight="800"
            font-size="15" fill="#e2e8f0" letter-spacing="-0.4">Erp</text>
      <text x="62" y="21.5" font-family="Syne, sans-serif" font-weight="800"
            font-size="15" fill="url(#etGrad)" letter-spacing="-0.4">Tronix</text>
    </svg>
  `;

  /* ── Wait for DOM ── */
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  /* ── Replace brand name text nodes ── */
  function replaceBrandText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent.includes('Frappe') || node.textContent === 'ERPNext') {
        node.textContent = node.textContent
          .replace(/Frappe/g, BRAND.name)
          .replace(/ERPNext/g, BRAND.name);
      }
    } else {
      // Skip script/style tags
      if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.nodeName)) return;
      node.childNodes.forEach(replaceBrandText);
    }
  }

  /* ── Inject brand logo ── */
  function injectLogo() {
    const brand = document.querySelector('.navbar-brand, .brand');
    if (brand) {
      // Replace text content with SVG
      const existing = brand.querySelector('.erptronix-logo');
      if (!existing) {
        const logoWrap = document.createElement('span');
        logoWrap.className = 'erptronix-logo';
        logoWrap.style.cssText = 'display:inline-flex;align-items:center;height:28px;';
        logoWrap.innerHTML = LOGO_SVG;
        brand.innerHTML = '';
        brand.appendChild(logoWrap);
      }
    }

    // Update page title
    if (document.title && !document.title.includes(BRAND.name)) {
      document.title = document.title
        .replace(/Frappe|ERPNext/g, BRAND.name);
      if (!document.title.includes(BRAND.name)) {
        document.title = BRAND.name + ' — ' + document.title;
      }
    }
  }

  /* ── Favicon ── */
  function injectFavicon() {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'shortcut icon';
      document.head.appendChild(link);
    }
    // SVG favicon
    const svgFav = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
      <defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stop-color='%2322d3ee'/><stop offset='100%' stop-color='%234f46e5'/>
      </linearGradient></defs>
      <rect width='32' height='32' rx='7' fill='url(%23g)'/>
      <text x='16' y='22' text-anchor='middle' font-family='sans-serif'
            font-weight='900' font-size='14' fill='white'>ET</text>
    </svg>`;
    link.type = 'image/svg+xml';
    link.href = 'data:image/svg+xml,' + svgFav;
  }

  /* ── Add ErpTronix badge to page header ── */
  function injectPageBadge() {
    const pageHead = document.querySelector('.page-head');
    if (pageHead && !pageHead.querySelector('.et-powered-badge')) {
      const badge = document.createElement('div');
      badge.className = 'et-powered-badge';
      badge.style.cssText = `
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 3px 10px;
        border-radius: 20px;
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        background: rgba(34,211,238,0.08);
        border: 1px solid rgba(34,211,238,0.15);
        color: #22d3ee;
        font-family: 'Syne', sans-serif;
        margin-left: 12px;
        vertical-align: middle;
      `;
      badge.innerHTML = `<span style="width:6px;height:6px;border-radius:50%;background:#22d3ee;
        animation:et-pulse 2s ease infinite;display:inline-block;"></span> ${BRAND.name}`;
      const title = pageHead.querySelector('.page-title, h1');
      if (title) title.appendChild(badge);
    }
  }

  /* ── Add pulse keyframes if not added ── */
  function injectKeyframes() {
    if (!document.querySelector('#et-keyframes')) {
      const style = document.createElement('style');
      style.id = 'et-keyframes';
      style.textContent = `
        @keyframes et-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.85); }
        }
        @keyframes et-glow-ring {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,211,238,0); }
          50%       { box-shadow: 0 0 0 4px rgba(34,211,238,0.15); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /* ── Enhance buttons with ripple ── */
  function addRipple() {
    document.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn');
      if (!btn) return;
      const existing = btn.querySelector('.et-ripple');
      if (existing) existing.remove();

      const ripple = document.createElement('span');
      ripple.className = 'et-ripple';
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      ripple.style.cssText = `
        position: absolute;
        left: ${e.clientX - rect.left - size/2}px;
        top: ${e.clientY - rect.top - size/2}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255,255,255,0.15);
        transform: scale(0);
        animation: et-ripple 0.5s ease-out forwards;
        pointer-events: none;
      `;

      if (getComputedStyle(btn).position === 'static') btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });

    // Inject ripple animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes et-ripple {
        to { transform: scale(1); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  /* ── Observe DOM for dynamic changes (SPA) ── */
  function observeDOM() {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length > 0) {
          // Re-apply branding when Frappe renders new pages
          injectLogo();
          injectPageBadge();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  /* ── Enhance number cards with count-up animation ── */
  function animateNumbers() {
    const numEls = document.querySelectorAll(
      '.number-card-value, .widget .number, .stats-value'
    );

    numEls.forEach(el => {
      if (el.dataset.animated) return;
      el.dataset.animated = '1';

      const raw = parseFloat(el.textContent.replace(/[^0-9.-]/g, ''));
      if (isNaN(raw) || raw === 0) return;

      const prefix = el.textContent.match(/^[^0-9-]*/)?.[0] || '';
      const suffix = el.textContent.match(/[^0-9.]*$/)?.[0] || '';
      const duration = 800;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = raw * ease;
        el.textContent = prefix + (Number.isInteger(raw)
          ? Math.floor(current).toLocaleString()
          : current.toFixed(2).toLocaleString()
        ) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  /* ── Init tooltips for icon buttons ── */
  function enhanceTooltips() {
    document.querySelectorAll('[title]:not([data-et-tip])').forEach(el => {
      el.dataset.etTip = '1';
    });
  }

  /* ── Add theme class to body ── */
  function initTheme() {
    document.body.classList.add('erptronix-theme');
    document.documentElement.setAttribute('data-theme', 'erptronix');
  }

  /* ── Login page enhancements ── */
  function enhanceLogin() {
    const loginPage = document.querySelector('#page-login, .login-page');
    if (!loginPage) return;

    // Add background grid pattern
    loginPage.style.cssText += `
      background-image:
        linear-gradient(rgba(34,211,238,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(34,211,238,0.03) 1px, transparent 1px);
      background-size: 32px 32px;
    `;

    // Replace ERPNext logo/text on login
    const head = loginPage.querySelector('.page-card-head');
    if (head) {
      const existing = head.querySelector('.erptronix-login-brand');
      if (!existing) {
        const brand = document.createElement('div');
        brand.className = 'erptronix-login-brand';
        brand.style.cssText = `
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 24px;
        `;
        brand.innerHTML = `
          <div style="
            width:64px;height:64px;
            background:linear-gradient(135deg,#22d3ee,#0ea5e9,#4f46e5);
            border-radius:16px;
            display:flex;align-items:center;justify-content:center;
            font-family:Syne,sans-serif;font-weight:900;font-size:20px;
            color:#fff;letter-spacing:-1px;
            box-shadow:0 8px 32px rgba(34,211,238,0.3);
            margin-bottom:16px;
          ">ET</div>
          <h1 style="
            font-family:Syne,sans-serif;font-weight:800;font-size:1.75rem;
            color:#e2e8f0;letter-spacing:-0.03em;margin:0 0 4px;
          ">Erp<span style='background:linear-gradient(135deg,#22d3ee,#4f46e5);
            -webkit-background-clip:text;-webkit-text-fill-color:transparent;
            background-clip:text;'>Tronix</span></h1>
          <p style="
            font-family:DM Sans,sans-serif;font-size:0.82rem;
            color:#64748b;margin:0;letter-spacing:0.02em;
          ">${BRAND.tagline}</p>
        `;
        head.insertBefore(brand, head.firstChild);
      }
    }
  }

  /* ── Main init ── */
  ready(function() {
    initTheme();
    injectKeyframes();
    injectFavicon();
    injectLogo();
    enhanceLogin();
    addRipple();
    observeDOM();

    // Delayed enhancements (wait for Frappe to render)
    setTimeout(function() {
      injectPageBadge();
      animateNumbers();
      enhanceTooltips();
    }, 300);

    // Re-run on Frappe page change events
    if (window.frappe) {
      frappe.router && frappe.router.on && frappe.router.on('change', function() {
        setTimeout(function() {
          injectLogo();
          injectPageBadge();
          animateNumbers();
        }, 250);
      });
    }

    console.log(
      '%c ErpTronix Theme %c v1.0 ',
      'background:linear-gradient(135deg,#22d3ee,#4f46e5);color:#fff;' +
      'padding:4px 8px;border-radius:4px 0 0 4px;font-family:monospace;font-weight:bold;',
      'background:#0d1630;color:#22d3ee;padding:4px 8px;' +
      'border-radius:0 4px 4px 0;font-family:monospace;border:1px solid #22d3ee;'
    );
  });

})();
