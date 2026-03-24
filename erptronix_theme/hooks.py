from . import __version__ as app_version

app_name        = "erptronix_theme"
app_title       = "ErpTronix Theme"
app_publisher   = "ErpTronix"
app_description = "Professional ErpTronix theme for ERPNext v16"
app_email       = "hello@erptronix.com"
app_license     = "MIT"

# ── Static assets (no esbuild bundling needed) ─────────────────────────────
app_include_css = [
    "/assets/erptronix_theme/css/erptronix.css"
]

app_include_js = [
    "/assets/erptronix_theme/js/erptronix.js"
]

# ── Web / portal pages ─────────────────────────────────────────────────────
web_include_css = [
    "/assets/erptronix_theme/css/erptronix.css"
]

web_include_js = [
    "/assets/erptronix_theme/js/erptronix.js"
]

# ── Favicon ────────────────────────────────────────────────────────────────
website_context = {
    "favicon": "/assets/erptronix_theme/images/favicon.svg",
}
