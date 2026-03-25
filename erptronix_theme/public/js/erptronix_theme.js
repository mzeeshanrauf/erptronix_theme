/*
 * ErpTronix Theme — ERPNext v16 DOM Injector
 * Injects required HTML elements into v16's native DOM so
 * the Vue app (app.min.js) can mount its components correctly.
 */

(function ($) {
    'use strict';

    /* ─── ErpTronix Logo SVG ─────────────────────────────────────── */
    var ET_LOGO_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40" height="36">'
        + '<defs><linearGradient id="etg" x1="0%" y1="0%" x2="100%" y2="100%">'
        + '<stop offset="0%" stop-color="#14a6ef"/>'
        + '<stop offset="100%" stop-color="#0e7bc2"/>'
        + '</linearGradient></defs>'
        + '<rect x="0" y="4" width="32" height="32" rx="7" fill="url(#etg)"/>'
        + '<text x="16" y="25" text-anchor="middle" font-family="Arial,sans-serif" '
        + 'font-weight="900" font-size="14" fill="white">ET</text>'
        + '<text x="42" y="27" font-family="Arial,sans-serif" font-weight="700" '
        + 'font-size="17" fill="#1a2332">Erp</text>'
        + '<text x="68" y="27" font-family="Arial,sans-serif" font-weight="700" '
        + 'font-size="17" fill="url(#etg)">Tronix</text>'
        + '</svg>';

    var ET_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">'
        + '<defs><linearGradient id="etgi" x1="0%" y1="0%" x2="100%" y2="100%">'
        + '<stop offset="0%" stop-color="#14a6ef"/>'
        + '<stop offset="100%" stop-color="#0e7bc2"/>'
        + '</linearGradient></defs>'
        + '<rect width="32" height="32" rx="7" fill="url(#etgi)"/>'
        + '<text x="16" y="22" text-anchor="middle" font-family="Arial,sans-serif" '
        + 'font-weight="900" font-size="13" fill="white">ET</text>'
        + '</svg>';

    /* ─── Set favicon ────────────────────────────────────────────── */
    function set_favicon() {
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">'
            + '<rect width="32" height="32" rx="7" fill="%2314a6ef"/>'
            + '<text x="16" y="22" text-anchor="middle" font-family="Arial,sans-serif" '
            + 'font-weight="900" font-size="13" fill="white">ET</text></svg>';
        var link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'shortcut icon';
            document.head.appendChild(link);
        }
        link.type = 'image/svg+xml';
        link.href = 'data:image/svg+xml,' + svg;
    }

    /* ─── Apply color theme ──────────────────────────────────────── */
    var COLOR_MAP = {
        'Blue':       { style: '#14a6ef', hover: '#108bc9', light: '#edf8ff' },
        'Green':      { style: '#43a047', hover: '#2a7e2e', light: '#dff0e0' },
        'Red':        { style: '#e53935', hover: '#be2724', light: '#ffd7d6' },
        'Orange':     { style: '#fb8c00', hover: '#d07706', light: '#ffe8c8' },
        'Yellow':     { style: '#ffca28', hover: '#deae1b', light: '#fff2cd' },
        'Pink':       { style: '#ec407a', hover: '#b92a5a', light: '#ffdde8' },
        'Violet':     { style: '#ab47bc', hover: '#773183', light: '#fbe0ff' }
    };

    function apply_color(color_name) {
        var c = COLOR_MAP[color_name] || COLOR_MAP['Blue'];
        var el = document.getElementById('et-color-vars');
        if (!el) {
            el = document.createElement('style');
            el.id = 'et-color-vars';
            document.head.appendChild(el);
        }
        el.innerHTML = ':root {'
            + '--primary:' + c.style + ';'
            + '--primary-hover:' + c.hover + ';'
            + '--primary-color:' + c.style + ';'
            + '--btn-primary:' + c.style + ';'
            + '--brand-color:' + c.style + ';'
            + '--border-primary:' + c.style + ';'
            + '--blue:' + c.style + ';'
            + '--invert-neutral:' + c.hover + ';'
            + '--blue-50:' + c.light + ';'
            + '}';
        localStorage.setItem('et_color', color_name);
    }

    /* ─── Inject HTML into v16 DOM ───────────────────────────────── */
    function inject_dom() {
        /* 1. Replace navbar brand with ErpTronix logo */
        var brand = document.querySelector('.navbar .navbar-brand, .navbar a.navbar-brand');
        if (brand && !brand.dataset.etDone) {
            brand.dataset.etDone = '1';
            brand.innerHTML = ET_LOGO_SVG;
            brand.href = '/app';
            brand.style.cssText = 'display:flex;align-items:center;padding:4px 10px;text-decoration:none;';
        }

        /* 2. Inject logo Vue mount point into navbar (for app.min.js) */
        if (!document.getElementById('erptronix-app-logo')) {
            var logo_el = document.createElement('span');
            logo_el.id = 'erptronix-app-logo';
            logo_el.setAttribute('data-default-workspace', '');
            var nav = document.querySelector('.navbar');
            if (nav) nav.insertBefore(logo_el, nav.firstChild);
        }

        /* 3. Inject user info mount point into navbar right */
        if (!document.getElementById('header-navbar-user')) {
            var user_html = '<li id="header-navbar-user" class="nav-item dropdown-user">'
                + '<a class="nav-link" style="display:flex;align-items:center;gap:6px;cursor:pointer;">'
                + '<div class="dv-user-info" style="text-align:right;">'
                + '<span class="user-name" style="font-weight:600;font-size:14px;color:var(--primary);">'
                + (frappe.boot.full_name || frappe.session.user || '') + '</span>'
                + '<span class="user-status" style="font-size:12px;color:#666;display:block;">'
                + (frappe.boot.user_info && frappe.boot.user_info[frappe.session.user]
                    ? frappe.boot.user_info[frappe.session.user].user_type || 'User'
                    : 'User') + '</span>'
                + '</div>'
                + '</a></li>';
            var nav_ul = document.querySelector('.navbar .navbar-nav, .navbar .nav');
            if (nav_ul) $(nav_ul).append(user_html);
        }

        /* 4. Inject language switcher mount point */
        if (!document.getElementById('header-navbar-change-lang')) {
            var current_lang = frappe.boot.lang || 'en';
            var lang_label = current_lang.toUpperCase().substring(0, 2);
            var lang_html = '<li id="header-navbar-change-lang" class="nav-item dropdown dropdown-language">'
                + '<a class="nav-link dropdown-lang-link" data-toggle="dropdown" style="cursor:pointer;">'
                + '<span class="dv-lang-flag lang-' + current_lang + '" style="width:20px;height:20px;'
                + 'display:inline-block;border-radius:50%;background:#eee;margin-right:4px;'
                + 'vertical-align:middle;"></span>'
                + '<span>' + lang_label + '</span>'
                + '</a>'
                + '<ul class="dropdown-menu" style="min-width:100px;">'
                + '<li><a class="dropdown-item" data-lang="en">'
                + '<span class="dv-lang-flag lang-en" style="width:18px;height:18px;display:inline-block;'
                + 'border-radius:50%;background:#eee;margin-right:6px;vertical-align:middle;"></span>EN</a></li>'
                + '<li><a class="dropdown-item" data-lang="ar">'
                + '<span class="dv-lang-flag lang-ar" style="width:18px;height:18px;display:inline-block;'
                + 'border-radius:50%;background:#eee;margin-right:6px;vertical-align:middle;"></span>AR</a></li>'
                + '</ul></li>';
            var nav_ul2 = document.querySelector('.navbar .navbar-nav, .navbar .nav');
            if (nav_ul2) $(nav_ul2).prepend(lang_html);
        }

        /* 5. Inject side-menu-component mount point */
        if (!document.getElementById('side-menu-component')) {
            var smc = document.createElement('div');
            smc.id = 'side-menu-component';
            document.body.appendChild(smc);
        }

        /* 6. Inject app-footer mount point */
        if (!document.getElementById('app-footer')) {
            var footer = document.createElement('footer');
            footer.id = 'app-footer';
            document.body.appendChild(footer);
        }

        /* 7. Add dv-app-theme class and data attributes to body */
        var body = document.body;
        if (!body.classList.contains('dv-app-theme-v16')) {
            body.classList.add('dv-app-theme-v16');
            var color = localStorage.getItem('et_color') || 'Blue';
            body.setAttribute('data-theme-color', color);
            body.setAttribute('data-theme-colorname', color.toLowerCase());
            body.setAttribute('data-default-workspace', '');
        }
    }

    /* ─── Handle language dropdown click ─────────────────────────── */
    function bind_language_switcher() {
        $(document).off('click.et-lang').on('click.et-lang', '#header-navbar-change-lang .dropdown-item', function (e) {
            e.preventDefault();
            var lang = $(this).data('lang') || 'en';
            var label = lang === 'ar' ? 'AR' : 'EN';
            var flag_class = 'dv-lang-flag lang-' + lang;
            $('#header-navbar-change-lang .dropdown-lang-link').html(
                '<span class="' + flag_class + '" style="width:20px;height:20px;display:inline-block;'
                + 'border-radius:50%;background:#eee;margin-right:4px;vertical-align:middle;"></span>'
                + '<span>' + label + '</span>'
            );
            frappe.call({
                method: 'erptronix_theme.api.change_language',
                args: { language: lang },
                callback: function () {
                    localStorage.setItem('active_lang', label);
                    frappe.ui.toolbar.clear_cache();
                }
            });
        });
    }

    /* ─── Color panel in Theme Settings ──────────────────────────── */
    function bind_color_panel() {
        frappe.ui && frappe.ui.form && frappe.ui.form.on('Theme Settings', {
            refresh: function (frm) {
                // Inject color buttons UI
                var $wrapper = $('[data-fieldname="theme_color"]', frm.wrapper);
                if ($wrapper.find('.et-color-btns').length) return;

                var colors_html = '<div class="et-color-btns theme-setting-colors-select" style="margin:12px 0;">'
                    + '<h4 style="font-weight:600;margin-bottom:12px;">Theme Colors</h4>'
                    + '<div style="display:flex;flex-wrap:wrap;gap:8px;">';

                Object.keys(COLOR_MAP).forEach(function (name) {
                    var active = frm.doc.theme_color === name ? 'active' : '';
                    colors_html += '<button type="button" data-color="' + name + '" '
                        + 'class="et-color-btn ' + active + '" '
                        + 'style="background:' + COLOR_MAP[name].style + ';border:0;width:80px;height:50px;'
                        + 'border-radius:6px;color:#fff;font-weight:600;font-size:13px;cursor:pointer;'
                        + 'opacity:' + (active ? '1' : '0.8') + ';position:relative;">'
                        + name
                        + (active ? '<i class="fa fa-check" style="position:absolute;top:4px;right:6px;font-size:11px;"></i>' : '')
                        + '</button>';
                });

                colors_html += '</div></div>';
                $wrapper.after(colors_html);

                // Color button click
                $(document).off('click.et-colorbtn').on('click.et-colorbtn', '.et-color-btn', function () {
                    var color = $(this).data('color');
                    frm.set_value('theme_color', color);
                    $('.et-color-btn').css('opacity', '0.8').find('.fa-check').remove();
                    $(this).css('opacity', '1').append('<i class="fa fa-check" style="position:absolute;top:4px;right:6px;font-size:11px;"></i>');
                    apply_color(color);
                });
            },
            after_save: function (frm) {
                apply_color(frm.doc.theme_color || 'Blue');

                // Apply body classes based on checkboxes
                var body = document.body;
                body.classList.toggle('layout-navbar-color-style', frm.doc.apply_on_navbar == 1);
                body.classList.toggle('layout-menu-color-style', frm.doc.apply_on_menu == 1);
                body.classList.toggle('layout-dashboard-color-style', frm.doc.apply_on_dashboard == 1);
                body.classList.toggle('layout-workspace-color-style', frm.doc.apply_on_workspace == 1);

                setTimeout(function () { frappe.ui.toolbar.clear_cache(); }, 500);
            }
        });
    }

    /* ─── Fix any unrendered Vue template vars in navbar ─────────── */
    function fix_unrendered_vue_vars() {
        // Hide any elements showing [[...]] Vue template vars
        document.querySelectorAll('.navbar *').forEach(function (el) {
            if (el.children.length === 0) {
                var txt = el.textContent.trim();
                if (txt.startsWith('[[') && txt.endsWith(']]')) {
                    el.style.display = 'none';
                    // Try to fix parent nav-item
                    var parent = el.closest('.nav-item');
                    if (parent) parent.style.display = 'none';
                }
            }
        });
    }

    /* ─── Apply saved body classes from Theme Settings ───────────── */
    function apply_saved_theme() {
        var color = localStorage.getItem('et_color') || 'Blue';
        apply_color(color);

        // Try to load from server
        frappe.call({
            method: 'erptronix_theme.api.get_theme_settings',
            callback: function (r) {
                if (!r.message) return;
                var s = r.message;
                var color_name = s.theme_color || color;
                apply_color(color_name);
                localStorage.setItem('et_color', color_name);

                var body = document.body;
                body.setAttribute('data-theme-color', color_name);
                body.setAttribute('data-theme-colorname', color_name.toLowerCase());
                body.classList.toggle('layout-navbar-color-style', s.apply_on_navbar == '1');
                body.classList.toggle('layout-menu-color-style', s.apply_on_menu == '1');
                body.classList.toggle('layout-dashboard-color-style', s.apply_on_dashboard == '1');
                body.classList.toggle('layout-workspace-color-style', s.apply_on_workspace == '1');

                if (s.dark_view == '1') {
                    body.classList.add('dv-dark-style');
                }
            }
        });
    }

    /* ─── Main init ──────────────────────────────────────────────── */
    function init() {
        set_favicon();
        inject_dom();
        fix_unrendered_vue_vars();
        bind_language_switcher();
        bind_color_panel();
        apply_saved_theme();

        console.log('%c ErpTronix Theme v1.0 ', 'background:#14a6ef;color:#fff;padding:3px 8px;border-radius:4px;font-weight:bold;');
    }

    /* ─── Hook into Frappe v16 lifecycle ─────────────────────────── */
    $(document).ready(function () {
        // Run immediately
        init();

        // Re-run on page changes (Frappe SPA)
        $(document).on('page-change', function () {
            inject_dom();
            fix_unrendered_vue_vars();
        });

        // Re-run after app fully loaded
        $(document).on('app-loaded', function () {
            inject_dom();
            fix_unrendered_vue_vars();
            apply_saved_theme();
        });
    });

    // Also run on frappe.after_ajax if available
    if (window.frappe) {
        var orig_ready = frappe.ready;
        frappe.ready = function (fn) {
            orig_ready && orig_ready(fn);
            setTimeout(function () {
                inject_dom();
                fix_unrendered_vue_vars();
            }, 200);
        };
    }

})(jQuery);
