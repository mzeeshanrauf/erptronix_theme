# ErpTronix Theme — app.py
# Converted from datavalue_theme_15 for ERPNext v16
# Key v16 fixes:
#   - frappe.cache() replaced with frappe.cache (no parentheses) in v16
#   - get_user_settings import path changed in v16
#   - include_icons handled differently in v16
#   - boot JSON serialization updated

no_cache = 1

import json
import os
import re
import secrets

import frappe
import frappe.sessions
from frappe import _
from frappe.utils.jinja_globals import is_rtl

SCRIPT_TAG_PATTERN = re.compile(r"\<script[^<]*\</script\>")
CLOSING_SCRIPT_TAG_PATTERN = re.compile(r"</script\>")


def get_context(context):
    if frappe.session.user == "Guest":
        frappe.throw(_("Log in to access this page."), frappe.PermissionError)
    elif (
        frappe.db.get_value("User", frappe.session.user, "user_type", order_by=None)
        == "Website User"
    ):
        frappe.throw(_("You are not permitted to access this page."), frappe.PermissionError)

    hooks = frappe.get_hooks()

    try:
        boot = frappe.sessions.get()
    except Exception as e:
        boot = frappe._dict(status="failed", error=str(e))
        print(frappe.get_traceback())

    csrf_token = frappe.sessions.get_csrf_token()
    boot_json = frappe.as_json(boot, indent=None, separators=(",", ":"))
    boot_json = SCRIPT_TAG_PATTERN.sub("", boot_json)

    frappe.db.commit()

    # ── Get theme settings ────────────────────────────────────────────
    theme_settings_list = {}
    try:
        theme_settings = frappe.db.sql(
            "SELECT * FROM tabSingles WHERE doctype = 'Theme Settings';",
            as_dict=True
        )
        for s in theme_settings:
            theme_settings_list[s["field"]] = s["value"]

        try:
            theme_settings_list["hide_layout_pages"] = frappe.db.get_all(
                "Theme Settings Hide Layout Pages",
                filters={"parent": "Theme Settings"},
                fields=["name", "page_name"],
                pluck="page_name",
            )
        except Exception:
            theme_settings_list["hide_layout_pages"] = []
    except Exception:
        pass

    boot_json = CLOSING_SCRIPT_TAG_PATTERN.sub("", boot_json)
    boot_json = json.dumps(boot_json)

    # ── Dark/Light theme ──────────────────────────────────────────────
    desk_theme = frappe.db.get_value("User", frappe.session.user, "desk_theme") or "Light"
    theme = "dark" if desk_theme == "Dark" else "light"

    # ── Theme color ───────────────────────────────────────────────────
    # v16: get_user_settings moved — use frappe.db directly
    theme_color = (
        theme_settings_list.get("theme_color") or "Blue"
    )

    try:
        # Try to get per-user setting from User Settings doctype (v16 pattern)
        user_settings_raw = frappe.db.get_value(
            "User Settings", frappe.session.user, "data"
        )
        if user_settings_raw:
            user_settings = json.loads(user_settings_raw) or {}
            if "theme_color" in user_settings:
                theme_color = user_settings["theme_color"]
    except Exception:
        pass

    # ── Include icons (v16 uses preload_assets differently) ───────────
    include_icons = hooks.get("app_include_icons", [])
    try:
        frappe.local.preload_assets["icons"].extend(include_icons)
    except Exception:
        pass

    # ── Build context ─────────────────────────────────────────────────
    apply_on_navbar = (
        "layout-navbar-color-style"
        if theme_settings_list.get("apply_on_navbar") == "1"
        else ""
    )
    apply_on_menu = (
        "layout-menu-color-style"
        if theme_settings_list.get("apply_on_menu") == "1"
        else ""
    )
    apply_on_dashboard = (
        "layout-dashboard-color-style"
        if theme_settings_list.get("apply_on_dashboard") == "1"
        else ""
    )
    apply_on_workspace = (
        "layout-workspace-color-style"
        if theme_settings_list.get("apply_on_workspace") == "1"
        else ""
    )

    context.update(
        {
            "no_cache": 1,
            "app_version": _get_first_item(hooks.get("version", [])),
            "build_version": frappe.utils.get_build_version(),
            "build_version_dev": secrets.randbits(50),
            "include_js": hooks.get("app_include_js", []),
            "include_css": hooks.get("app_include_css", []),
            "include_icons": include_icons,
            "layout_direction": "rtl" if is_rtl() else "ltr",
            "lang": frappe.local.lang,
            "sounds": hooks.get("sounds", []),
            "boot": boot_json,
            "desk_theme": boot.get("desk_theme") or "Light",
            "csrf_token": csrf_token,
            "google_analytics_id": frappe.conf.get("google_analytics_id"),
            "google_analytics_anonymize_ip": frappe.conf.get("google_analytics_anonymize_ip"),
            "theme_settings": theme_settings_list,
            "default_workspace": frappe.db.get_value(
                "User", frappe.session.user, "default_workspace"
            ),
            "theme_color": theme_color,
            "theme_color_name": theme_color.replace(" ", "-").lower(),
            "theme_color_on_navbar": apply_on_navbar,
            "apply_on_menu": apply_on_menu,
            "apply_on_dashboard": apply_on_dashboard,
            "apply_on_workspace": apply_on_workspace,
            "dark_theme": theme,
        }
    )

    return context


def _get_first_item(array):
    if isinstance(array, list) and len(array) > 0:
        return array[0]
    return ""
