from . import __version__ as app_version

app_name        = "erptronix_theme"
app_title       = "ErpTronix Theme"
app_publisher   = "ErpTronix"
app_description = "Professional ErpTronix Theme for ERPNext v16"
app_email       = "hello@erptronix.com"
app_license     = "MIT"

website_context = {
    "favicon": "/assets/erptronix_theme/images/datavlue-new-icon-xs.png",
}

app_include_css = [
    "/assets/erptronix_theme/plugins/animate.css/animate.min.css",
    "/assets/erptronix_theme/plugins/fontawesome/all.min.css",
    "/assets/erptronix_theme/plugins/tooltip/tooltip-theme-twipsy.css",
    "/assets/erptronix_theme/plugins/flat-icons/flaticon.css",
    "/assets/erptronix_theme/plugins/simple-calendar/simple-calendar.css",
    "/assets/erptronix_theme/css/datavalue_theme.bundle.css",
]

# IMPORTANT ORDER:
# 1. plugins first (vue, jquery plugins)
# 2. app.min.js (Vue app - registers listeners for 'app-loaded')
# 3. erptronix_theme.js LAST (injects DOM elements then triggers 'app-loaded')
app_include_js = [
    "/assets/erptronix_theme/plugins/vue/vue.js",
    "/assets/erptronix_theme/plugins/bootstrap4c-chosen/chosen.min.js",
    "/assets/erptronix_theme/plugins/nicescroll/nicescroll.js",
    "/assets/erptronix_theme/plugins/tooltip/tooltip.js",
    "/assets/erptronix_theme/plugins/jquery-fullscreen/jquery.fullscreen.min.js",
    "/assets/erptronix_theme/plugins/simple-calendar/jquery.simple-calendar.js",
    "/assets/erptronix_theme/js/erptronix_theme.app.min.js",
    "/assets/erptronix_theme/js/erptronix_theme.js",
]

web_include_css = [
    "assets/erptronix_theme/plugins/fontawesome/all.min.css",
    "assets/erptronix_theme/css/login.css",
    "assets/erptronix_theme/css/dv-login.css",
]

web_include_js = [
    "/assets/erptronix_theme/js/erptronix_theme.web.min.js",
]

email_brand_image = "assets/erptronix_theme/images/logo-v.png"

page_js = {
    "dashboard-view": "public/js/customizations/pages/dashboard_view.js",
}
