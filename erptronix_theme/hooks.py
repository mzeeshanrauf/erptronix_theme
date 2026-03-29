from . import __version__ as version

app_version = version
app_name = "erptronix_theme"
app_title = "ERPTronix Theme"
app_publisher = "ErpTronix"
app_description = "Frappe 15 Theme App"
app_email = "info@erptronix.com"
app_license = "mit"
# required_apps = []

# Includes in <head>
# ------------------

website_context = {
    "favicon": "/assets/erptronix_theme/images/erptronix-icon.svg",
    "splash_image": "/assets/erptronix_theme/images/theme_splash_empty.jpg"
}

app_include_css = [
    "/assets/erptronix_theme/plugins/animate.css/animate.min.css",
    "/assets/erptronix_theme/plugins/fontawesome/all.min.css",
    "/assets/erptronix_theme/plugins/tooltip/tooltip-theme-twipsy.css",
    "/assets/erptronix_theme/plugins/flat-icons/flaticon.css",
    "/assets/erptronix_theme/plugins/simple-calendar/simple-calendar.css",
    "erptronix_theme.bundle.css"
]

app_include_js = [
    "/assets/erptronix_theme/plugins/vue/vue.js",
    "/assets/erptronix_theme/plugins/bootstrap4c-chosen/chosen.min.js",
    "/assets/erptronix_theme/plugins/nicescroll/nicescroll.js",
    "/assets/erptronix_theme/plugins/tooltip/tooltip.js",
    "/assets/erptronix_theme/plugins/jquery-fullscreen/jquery.fullscreen.min.js?ver=1",
    "/assets/erptronix_theme/plugins/simple-calendar/jquery.simple-calendar.js",
    "/assets/erptronix_theme/js/erptronix_theme.app.min.js?ver="+app_version
    # "erptronix_theme.bundle.js"
]

email_brand_image = "assets/erptronix_theme/images/erptronix-logo-vertical.svg"

# include js, css files in header of web template
web_include_css = [
    "assets/erptronix_theme/plugins/fontawesome/all.min.css",
    "assets/erptronix_theme/css/login.css",
    "assets/erptronix_theme/css/dv-login.css?ver=" + app_version
]
web_include_js = [
    "/assets/erptronix_theme/js/erptronix_theme.web.min.js?ver=" + app_version
]

# include js, css files in header of desk.html
# app_include_css = "/assets/erptronix_theme/css/erptronix_theme.css"
# app_include_js = "/assets/erptronix_theme/js/erptronix_theme.js"

# include js, css files in header of web template
# web_include_css = "/assets/erptronix_theme/css/erptronix_theme.css"
# web_include_js = "/assets/erptronix_theme/js/erptronix_theme.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "erptronix_theme/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
page_js = {
    "dashboard-view": "public/js/customizations/pages/dashboard_view.js"
}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "erptronix_theme/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
#	"methods": "erptronix_theme.utils.jinja_methods",
#	"filters": "erptronix_theme.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "erptronix_theme.install.before_install"
# after_install = "erptronix_theme.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "erptronix_theme.uninstall.before_uninstall"
# after_uninstall = "erptronix_theme.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "erptronix_theme.utils.before_app_install"
# after_app_install = "erptronix_theme.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "erptronix_theme.utils.before_app_uninstall"
# after_app_uninstall = "erptronix_theme.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "erptronix_theme.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
#	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
#	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
#	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
#	"*": {
#		"on_update": "method",
#		"on_cancel": "method",
#		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
#	"all": [
#		"erptronix_theme.tasks.all"
#	],
#	"daily": [
#		"erptronix_theme.tasks.daily"
#	],
#	"hourly": [
#		"erptronix_theme.tasks.hourly"
#	],
#	"weekly": [
#		"erptronix_theme.tasks.weekly"
#	],
#	"monthly": [
#		"erptronix_theme.tasks.monthly"
#	],
# }

# Testing
# -------

# before_tests = "erptronix_theme.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
#	"frappe.desk.doctype.event.event.get_events": "erptronix_theme.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
#	"Task": "erptronix_theme.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["erptronix_theme.utils.before_request"]
# after_request = ["erptronix_theme.utils.after_request"]

# Job Events
# ----------
# before_job = ["erptronix_theme.utils.before_job"]
# after_job = ["erptronix_theme.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
#	{
#		"doctype": "{doctype_1}",
#		"filter_by": "{filter_by}",
#		"redact_fields": ["{field_1}", "{field_2}"],
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_2}",
#		"filter_by": "{filter_by}",
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_3}",
#		"strict": False,
#	},
#	{
#		"doctype": "{doctype_4}"
#	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
#	"erptronix_theme.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
#	"Logging DocType Name": 30  # days to retain logs
# }
