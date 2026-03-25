/*
 * ErpTronix Theme — ERPNext v16 Injector
 * Uses MutationObserver to safely inject into v16's rendered DOM
 */

/* ── Wait for an element to appear in DOM ─────────────────────────── */
function et_wait_for(selector, callback, timeout) {
    var el = document.querySelector(selector);
    if (el) { callback(el); return; }
    var obs = new MutationObserver(function () {
        var el = document.querySelector(selector);
        if (el) { obs.disconnect(); callback(el); }
    });
    obs.observe(document.body || document.documentElement, { childList: true, subtree: true });
    if (timeout) setTimeout(function () { obs.disconnect(); }, timeout);
}

/* ── ErpTronix Logo SVG (inline, no image file needed) ─────────────── */
var ET_LOGO = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 44" height="34" style="display:block">'
    + '<defs><linearGradient id="etLg" x1="0%" y1="0%" x2="100%" y2="100%">'
    + '<stop offset="0%" stop-color="#14a6ef"/><stop offset="100%" stop-color="#0e7bc2"/>'
    + '</linearGradient></defs>'
    + '<rect x="0" y="2" width="40" height="40" rx="9" fill="url(#etLg)"/>'
    + '<text x="20" y="28" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" '
    + 'font-weight="900" font-size="16" fill="white">ET</text>'
    + '<text x="50" y="30" font-family="Arial,sans-serif" font-weight="700" font-size="20" fill="#1a2332">Erp</text>'
    + '<text x="80" y="30" font-family="Arial,sans-serif" font-weight="700" font-size="20" fill="url(#etLg)">Tronix</text>'
    + '</svg>';

var ET_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28" style="display:block">'
    + '<defs><linearGradient id="etIg" x1="0%" y1="0%" x2="100%" y2="100%">'
    + '<stop offset="0%" stop-color="#14a6ef"/><stop offset="100%" stop-color="#0e7bc2"/>'
    + '</linearGradient></defs>'
    + '<rect width="32" height="32" rx="7" fill="url(#etIg)"/>'
    + '<text x="16" y="22" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" '
    + 'font-weight="900" font-size="13" fill="white">ET</text>'
    + '</svg>';

/* ── Color map ──────────────────────────────────────────────────────── */
var ET_COLORS = {
    'Blue':   '#14a6ef', 'Green': '#43a047', 'Red':    '#e53935',
    'Orange': '#fb8c00', 'Yellow':'#ffca28', 'Pink':   '#ec407a', 'Violet':'#ab47bc'
};
var ET_COLORS_HOVER = {
    'Blue':   '#108bc9', 'Green': '#2a7e2e', 'Red':    '#be2724',
    'Orange': '#d07706', 'Yellow':'#deae1b', 'Pink':   '#b92a5a', 'Violet':'#773183'
};

/* ── Set favicon ────────────────────────────────────────────────────── */
function et_set_favicon() {
    var svg = 'data:image/svg+xml,'
        + '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">'
        + '<rect width="32" height="32" rx="7" fill="%2314a6ef"/>'
        + '<text x="16" y="22" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" '
        + 'font-weight="900" font-size="13" fill="white">ET</text></svg>';
    var link = document.querySelector("link[rel*='icon']");
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
    link.href = svg;
}

/* ── Apply color ────────────────────────────────────────────────────── */
function et_apply_color(name) {
    var c = ET_COLORS[name] || ET_COLORS['Blue'];
    var h = ET_COLORS_HOVER[name] || ET_COLORS_HOVER['Blue'];
    var s = document.getElementById('et-color-style');
    if (!s) { s = document.createElement('style'); s.id = 'et-color-style'; document.head.appendChild(s); }
    s.textContent = ':root {'
        + '--primary:' + c + ';--primary-hover:' + h + ';--primary-color:' + c + ';'
        + '--btn-primary:' + c + ';--brand-color:' + c + ';--blue:' + c + ';'
        + '--invert-neutral:' + h + ';}';
    try { localStorage.setItem('et_color', name); } catch(e) {}
}

/* ── Replace logo in v16 navbar ─────────────────────────────────────── */
function et_inject_logo() {
    // v16 navbar brand selector
    var brand = document.querySelector('.navbar-brand, .navbar .navbar-brand');
    if (brand && !brand.dataset.etLogo) {
        brand.dataset.etLogo = '1';
        brand.innerHTML = ET_LOGO;
        brand.style.cssText = 'display:flex;align-items:center;padding:0 8px;text-decoration:none;';
        if (!brand.href) brand.href = '/app';
    }
    // Also replace any img with datavalue/kenz logos
    document.querySelectorAll('img[src*="datavalue"], img[src*="kenz"], img[src*="data-value"]').forEach(function(img) {
        img.outerHTML = ET_ICON;
    });
}

/* ── Inject mount points that app.min.js needs ──────────────────────── */
function et_inject_mount_points() {

    // 1. #datavalue-app-logo — logo mount (rename to erptronix but also keep old id for app.min.js)
    if (!document.getElementById('datavalue-app-logo')) {
        var logo_wrap = document.createElement('div');
        logo_wrap.id = 'datavalue-app-logo';
        logo_wrap.style.display = 'none'; // hidden, we use our own logo
        document.body.appendChild(logo_wrap);
    }

    // 2. #header-navbar-user — user info mount
    if (!document.getElementById('header-navbar-user')) {
        // Find v16's navbar right area
        var navbar = document.querySelector('.navbar');
        if (navbar) {
            var ul = navbar.querySelector('.navbar-nav') || navbar.querySelector('ul.nav');
            if (!ul) {
                ul = document.createElement('ul');
                ul.className = 'navbar-nav';
                navbar.appendChild(ul);
            }
            var li = document.createElement('li');
            li.id = 'header-navbar-user';
            li.className = 'nav-item dropdown-user';
            // Pre-populate with data from frappe.boot
            var full_name = '';
            var user_type = '';
            if (window.frappe && frappe.boot) {
                full_name = frappe.boot.full_name || frappe.session && frappe.session.user || '';
                if (frappe.boot.user_info && frappe.session) {
                    var ui = frappe.boot.user_info[frappe.session.user];
                    user_type = ui ? (ui.user_type || '') : '';
                }
            }
            li.innerHTML = '<a class="nav-link" style="cursor:pointer;display:flex;align-items:center;gap:6px;">'
                + '<div style="text-align:right;line-height:1.2;">'
                + '<span class="user-name" style="font-weight:600;font-size:13px;color:var(--primary);">' + full_name + '</span>'
                + '<span class="user-status" style="font-size:11px;color:#888;display:block;">' + user_type + '</span>'
                + '</div></a>';
            ul.appendChild(li);
        }
    }

    // 3. #header-navbar-change-lang — language switcher mount
    if (!document.getElementById('header-navbar-change-lang')) {
        var navbar2 = document.querySelector('.navbar');
        if (navbar2) {
            var ul2 = navbar2.querySelector('.navbar-nav') || navbar2.querySelector('ul.nav');
            if (ul2) {
                var lang = window.frappe && frappe.boot ? (frappe.boot.lang || 'en') : 'en';
                var label = lang === 'ar' ? 'AR' : 'EN';
                var li2 = document.createElement('li');
                li2.id = 'header-navbar-change-lang';
                li2.className = 'nav-item dropdown dropdown-language';
                li2.innerHTML = '<a class="nav-link dropdown-lang-link dropdown-toggle" data-toggle="dropdown" '
                    + 'style="cursor:pointer;display:flex;align-items:center;gap:4px;">'
                    + '<span class="dv-lang-flag lang-' + lang + '" style="width:20px;height:14px;display:inline-block;'
                    + 'background:#eee;border-radius:2px;vertical-align:middle;"></span>'
                    + '<span>' + label + '</span></a>'
                    + '<ul class="dropdown-menu dropdown-menu-right" style="min-width:80px;right:0;left:auto;">'
                    + '<li><a class="dropdown-item" href="#" data-lang="en" style="cursor:pointer;">'
                    + '<span class="dv-lang-flag lang-en" style="width:18px;height:12px;display:inline-block;'
                    + 'background:#eee;border-radius:2px;margin-right:6px;vertical-align:middle;"></span>EN</a></li>'
                    + '<li><a class="dropdown-item" href="#" data-lang="ar" style="cursor:pointer;">'
                    + '<span class="dv-lang-flag lang-ar" style="width:18px;height:12px;display:inline-block;'
                    + 'background:#eee;border-radius:2px;margin-right:6px;vertical-align:middle;"></span>AR</a></li>'
                    + '</ul>';
                ul2.insertBefore(li2, ul2.firstChild);
            }
        }
    }

    // 4. #side-menu-component — side menu mount (app.min.js mounts the full Vue sidemenu here)
    if (!document.getElementById('side-menu-component')) {
        var smc = document.createElement('div');
        smc.id = 'side-menu-component';
        document.body.appendChild(smc);
    }

    // 5. #app-footer
    if (!document.getElementById('app-footer')) {
        var footer = document.createElement('footer');
        footer.id = 'app-footer';
        document.body.appendChild(footer);
    }

    // 6. Set body data attributes that app.min.js reads
    var color = 'Blue';
    try { color = localStorage.getItem('et_color') || 'Blue'; } catch(e) {}
    document.body.setAttribute('data-theme-color', color);
    document.body.setAttribute('data-theme-colorname', color.toLowerCase());
    document.body.setAttribute('data-default-workspace', '');
    document.body.setAttribute('data-close-sub-menu', '0');
    document.body.setAttribute('data-hide-language-icon', '0');
    document.body.setAttribute('data-show-help-icon', '0');
    document.body.setAttribute('data-font-family', 'Cairo');
}

/* ── Hide unrendered Vue template vars ──────────────────────────────── */
function et_hide_vue_vars() {
    document.querySelectorAll('.navbar *').forEach(function(el) {
        if (!el.children.length) {
            var t = el.textContent.trim();
            if (t.indexOf('[[') === 0 && t.indexOf(']]') > -1) {
                var item = el.closest('.nav-item') || el.closest('li') || el;
                item.style.display = 'none';
            }
        }
    });
}

/* ── Language switcher click handler ────────────────────────────────── */
function et_bind_language() {
    document.addEventListener('click', function(e) {
        var item = e.target.closest('#header-navbar-change-lang .dropdown-item');
        if (!item) return;
        e.preventDefault();
        var lang = item.getAttribute('data-lang') || 'en';
        var label = lang === 'ar' ? 'AR' : 'EN';
        var link = document.querySelector('#header-navbar-change-lang .dropdown-lang-link');
        if (link) {
            link.innerHTML = '<span class="dv-lang-flag lang-' + lang + '" style="width:20px;height:14px;'
                + 'display:inline-block;background:#eee;border-radius:2px;vertical-align:middle;margin-right:4px;"></span>'
                + '<span>' + label + '</span>';
        }
        if (window.frappe) {
            frappe.call({
                method: 'erptronix_theme.api.change_language',
                args: { language: lang },
                callback: function() {
                    try { localStorage.setItem('active_lang', label); } catch(e) {}
                    frappe.ui.toolbar.clear_cache();
                }
            });
        }
    });
}

/* ── Load & apply theme settings from server ────────────────────────── */
function et_load_theme_settings() {
    if (!window.frappe || !frappe.call) return;
    frappe.call({
        method: 'erptronix_theme.api.get_theme_settings',
        callback: function(r) {
            if (!r || !r.message) return;
            var s = r.message;
            var color = s.theme_color || 'Blue';
            et_apply_color(color);
            var body = document.body;
            body.setAttribute('data-theme-color', color);
            body.setAttribute('data-theme-colorname', color.toLowerCase());
            if (s.apply_on_navbar   === '1') body.classList.add('layout-navbar-color-style');
            if (s.apply_on_menu     === '1') body.classList.add('layout-menu-color-style');
            if (s.apply_on_dashboard=== '1') body.classList.add('layout-dashboard-color-style');
            if (s.apply_on_workspace=== '1') body.classList.add('layout-workspace-color-style');
            if (s.dark_view         === '1') body.classList.add('dv-dark-style');
        }
    });
}

/* ── Trigger app-loaded so app.min.js Vue mounts ────────────────────── */
function et_trigger_app_loaded() {
    // app.min.js listens to 'app-loaded' event to mount its Vue components
    // We fire it after injecting mount points
    if (window.frappe && frappe.is_app_loaded) return;
    setTimeout(function() {
        $(document).trigger('app-loaded');
        if (window.frappe) frappe.is_app_loaded = true;
    }, 300);
}

/* ── Main init ──────────────────────────────────────────────────────── */
function et_init() {
    et_set_favicon();

    // Apply saved color immediately (no flicker)
    var saved_color = 'Blue';
    try { saved_color = localStorage.getItem('et_color') || 'Blue'; } catch(e) {}
    et_apply_color(saved_color);

    // Wait for navbar to be rendered by v16, then inject
    et_wait_for('.navbar', function() {
        et_inject_logo();
        et_inject_mount_points();
        et_hide_vue_vars();
        et_bind_language();
        et_load_theme_settings();
        et_trigger_app_loaded();
    }, 10000);
}

/* ── Boot ────────────────────────────────────────────────────────────── */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', et_init);
} else {
    et_init();
}

// Re-run on frappe page changes
document.addEventListener('page-change', function() {
    et_inject_logo();
    et_hide_vue_vars();
});

// Also hook into frappe ready if available
if (window.frappe) {
    frappe.ready && frappe.ready(function() {
        et_inject_logo();
        et_inject_mount_points();
        et_hide_vue_vars();
    });
}
