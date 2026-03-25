from . import __version__ as app_version

app_name        = "erptronix_theme"
app_title       = "ErpTronix Theme"
app_publisher   = "ErpTronix"
app_description = "ErpTronix Professional Theme for ERPNext v16"
app_email       = "hello@erptronix.com"
app_license     = "MIT"

website_context = {
    "favicon": "/assets/erptronix_theme/images/datavlue-new-icon-xs.png",
}

# CSS + minimal JS (logo/favicon only)
app_include_css = [
    "/assets/erptronix_theme/css/erptronix.css",
]

app_include_js = [
    "/assets/erptronix_theme/js/erptronix_theme.js",
]

# Login page CSS
web_include_css = [
    "assets/erptronix_theme/css/login.css",
    "assets/erptronix_theme/css/dv-login.css",
]

web_include_js = [
    "/assets/erptronix_theme/js/erptronix_theme.web.min.js",
]
