from __future__ import unicode_literals
import os, re, json
import frappe
from frappe.utils import flt, cint, get_time, add_to_date, cstr, nowdate, add_days, getdate, add_months, get_datetime
from frappe import _
from frappe.desk.reportview import get_filters_cond
from frappe.cache_manager import clear_user_cache

# v16 compatibility: six is not available, use str directly
string_types = str


@frappe.whitelist()
def get_module_name_from_doctype(doc_name, current_module=""):
    condition = ""
    if doc_name:
        if current_module:
            condition = "and w.`name` = {current_module} ".format(current_module=current_module)
        list_od_dicts = frappe.db.sql("""
            select w.`name` `module` from tabWorkspace w
            inner join `tabWorkspace Link` l on w.`name` = l.parent
            where link_to = '{doc_name}' {condition}
        """.format(doc_name=doc_name, condition=condition), as_dict=True)
        if list_od_dicts:
            return [{"module": list_od_dicts[0]["module"]}]


@frappe.whitelist()
def get_permitted_maps(dashboard_name):
    dashboard = frappe.get_doc("Dashboard", dashboard_name)
    return [m for m in dashboard.custom_maps if frappe.has_permission("Dashboard Map", doc=m.map)]


@frappe.whitelist()
def get_doctype_parent_module(doctype=''):
    result = frappe.db.sql(
        "select * from `tabWorkspace Link` where type='Link' and link_to='{doctype}' order by idx DESC limit 1".format(doctype=doctype),
        as_dict=True)
    if result and result[0]:
        return result[0].parent


@frappe.whitelist()
def change_language(language):
    frappe.db.set_value("User", frappe.session.user, "language", language)
    clear()
    return True


@frappe.whitelist()
def get_current_language():
    return frappe.db.get_value("User", frappe.session.user, "language")


@frappe.whitelist()
def get_company_logo():
    logo_path = ""
    current_company = frappe.defaults.get_user_default("company")
    if current_company:
        logo_path = frappe.db.get_value("Company", current_company, "company_logo")
    return logo_path


@frappe.whitelist(allow_guest=True)
def get_theme_settings():
    slideshow_photos = []
    settings_list = {}
    settings = frappe.db.sql("SELECT * FROM tabSingles WHERE doctype = 'Theme Settings';", as_dict=True)
    for setting in settings:
        settings_list[setting['field']] = setting['value']
    if settings_list.get('background_type') == 'Slideshow':
        slideshow_photos = frappe.db.sql(
            "SELECT `photo` FROM `tabSlideshow Photos` WHERE `parent` = 'Theme Settings';",
            as_dict=True)
    return {
        'enable_background':            settings_list.get('enable_background', ''),
        'background_photo':             settings_list.get('background_photo', ''),
        'background_type':              settings_list.get('background_type', ''),
        'full_page_background':         settings_list.get('full_page_background', ''),
        'transparent_background':       settings_list.get('transparent_background', ''),
        'default_workspace':            settings_list.get('default_workspace', ''),
        'slideshow_photos':             slideshow_photos,
        'dark_view':                    settings_list.get('dark_view', ''),
        'theme_color':                  settings_list.get('theme_color', ''),
        'open_workspace_on_mobile_menu':settings_list.get('open_workspace_on_mobile_menu', ''),
        'show_icon_label':              settings_list.get('show_icon_label', ''),
        'hide_icon_tooltip':            settings_list.get('hide_icon_tooltip', ''),
        'always_close_sub_menu':        settings_list.get('always_close_sub_menu', ''),
        'loading_image':                settings_list.get('loading_image', ''),
    }


@frappe.whitelist()
def update_theme_settings(**data):
    data = frappe._dict(data)
    doc = frappe.get_doc("Theme Settings")
    doc.theme_color       = data.theme_color
    doc.apply_on_menu     = data.apply_on_menu
    doc.apply_on_dashboard= data.apply_on_dashboard
    doc.apply_on_workspace= data.apply_on_workspace
    doc.apply_on_navbar   = data.apply_on_navbar
    doc.save(ignore_permissions=True)
    return doc


@frappe.whitelist()
def get_events(start=None, end=None, user=None, for_reminder=False, filters=None):
    if not start:
        start = getdate()
    if not end:
        end = str(getdate().year) + "-12-31"
    if not user:
        user = frappe.session.user
    if isinstance(filters, string_types):
        filters = json.loads(filters)
    filter_condition = get_filters_cond('Event', filters, [])
    tables = ["`tabEvent`"]
    if "`tabEvent Participants`" in filter_condition:
        tables.append("`tabEvent Participants`")
    events = frappe.db.sql("""
        SELECT `tabEvent`.name, `tabEvent`.subject, `tabEvent`.color,
               `tabEvent`.starts_on, `tabEvent`.ends_on, `tabEvent`.owner,
               `tabEvent`.all_day, `tabEvent`.event_type,
               `tabEvent`.repeat_this_event, `tabEvent`.repeat_on, `tabEvent`.repeat_till
        FROM {tables}
        WHERE (
            (date(`tabEvent`.starts_on) BETWEEN date(%(start)s) AND date(%(end)s))
            OR (date(`tabEvent`.ends_on) BETWEEN date(%(start)s) AND date(%(end)s))
            OR (date(`tabEvent`.starts_on) <= date(%(start)s) AND date(`tabEvent`.ends_on) >= date(%(end)s))
            OR (date(`tabEvent`.starts_on) <= date(%(start)s) AND `tabEvent`.repeat_this_event=1
                AND coalesce(`tabEvent`.repeat_till, '3000-01-01') > date(%(start)s))
        )
        {reminder_condition}
        {filter_condition}
        AND (`tabEvent`.event_type='Public' OR `tabEvent`.owner=%(user)s
             OR EXISTS(SELECT `tabDocShare`.name FROM `tabDocShare`
                       WHERE `tabDocShare`.share_doctype='Event'
                         AND `tabDocShare`.share_name=`tabEvent`.name
                         AND `tabDocShare`.user=%(user)s))
        AND `tabEvent`.status='Open'
        ORDER BY `tabEvent`.starts_on
    """.format(
        tables=", ".join(tables),
        filter_condition=filter_condition,
        reminder_condition="AND coalesce(`tabEvent`.send_reminder, 0)=1" if for_reminder else ""
    ), {"start": start, "end": end, "user": user}, as_dict=1)
    return events


@frappe.whitelist()
def get_workspace_sidebar_items():
    from frappe.desk.desktop import get_workspace_sidebar_items as _get
    return _get()


@frappe.whitelist()
def update_menu_modules(modules):
    modules_list = json.loads(modules)
    for module in modules_list:
        if frappe.db.exists("Workspace", module["name"]):
            if module.get("_is_deleted") == 'true':
                frappe.delete_doc("Workspace", module["name"], force=True)
            else:
                frappe.db.set_value("Workspace", module["name"], {
                    "custom_menu_title":      module.get('title', ''),
                    "custom_default_dashboard": module.get("custom_default_dashboard", ''),
                    "icon":                   module.get("icon", ''),
                    "sequence_id":            int(module.get("sequence_id", 0))
                })
    return True


@frappe.whitelist()
def get_form_cards(doctype):
    cards_list = []
    cards = frappe.db.get_all("Form Number Card",
        filters={"doctype_form": doctype},
        fields=["name", "idx", "number_card_name", "doctype_form", "label"],
        order_by="idx asc")
    for card in cards:
        card.card_data = frappe.db.get_value("Number Card", {"name": card.number_card_name}, ["*"], as_dict=True)
        cards_list.append(card)
    return cards_list


@frappe.whitelist()
def add_form_card(number_card_name, doctype_form, label=''):
    new_doc = frappe.new_doc("Form Number Card")
    new_doc.number_card_name = number_card_name
    new_doc.doctype_form = doctype_form
    new_doc.label = label
    new_doc.save()
    frappe.db.commit()
    return new_doc


@frappe.whitelist()
def update_form_card(cards):
    for card in json.loads(cards):
        if frappe.db.exists("Form Number Card", card["name"]):
            if card.get("_is_deleted") == 'true':
                frappe.delete_doc("Form Number Card", card["name"], force=True)
            else:
                frappe.db.set_value("Form Number Card", card["name"], {
                    "idx": card["idx"], "number_card_name": card['number_card_name'], "label": card["label"]
                })
    return True


@frappe.whitelist()
def get_report_cards(report_name):
    cards_list = []
    if report_name:
        cards = frappe.db.get_all("Report Number Card",
            filters={"report_name": report_name},
            fields=["name", "idx", "number_card_name", "report_name", "label"],
            order_by="idx asc")
        for card in cards:
            card.card_data = frappe.db.get_value("Number Card", {"name": card.number_card_name}, ["*"], as_dict=True)
            cards_list.append(card)
    return cards_list


@frappe.whitelist()
def add_report_card(number_card_name, report_name, label=''):
    new_doc = frappe.new_doc("Report Number Card")
    new_doc.number_card_name = number_card_name
    new_doc.report_name = report_name
    new_doc.label = label
    new_doc.save()
    frappe.db.commit()
    return new_doc


@frappe.whitelist()
def update_report_card(cards):
    for card in json.loads(cards):
        if frappe.db.exists("Report Number Card", card["name"]):
            if card.get("_is_deleted") == 'true':
                frappe.delete_doc("Report Number Card", card["name"], force=True)
            else:
                frappe.db.set_value("Report Number Card", card["name"], {
                    "idx": card["idx"], "number_card_name": card['number_card_name'], "label": card["label"]
                })
    return True


def clear():
    frappe.local.session_obj.update(force=True)
    frappe.local.db.commit()
    clear_user_cache(frappe.session.user)
    frappe.response['message'] = _("Cache Cleared")
