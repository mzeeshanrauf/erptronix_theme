"""
ErpTronix Theme — hooks.py
ERPNext v16 | Static CSS/JS theme, no esbuild bundling required
"""

app_name        = "erptronix_theme"
app_title       = "ErpTronix Theme"
app_publisher   = "ErpTronix"
app_description = "Custom light/dark brand theme for ERPNext — electric cyan + navy"
app_email       = "hello@erptronix.com"
app_license     = "MIT"
app_version     = "1.1.0"

# ── Static asset includes (served directly, NOT processed by esbuild) ──────────
# These paths are resolved from /sites/assets/erptronix_theme/
# after running:  bench setup --no-backups  OR  bench build (which copies statics)

app_include_css = [
    "/assets/erptronix_theme/css/erptronix.css"
]

app_include_js = [
    "/assets/erptronix_theme/js/erptronix.js"
]

# Portal / web pages
web_include_css = [
    "/assets/erptronix_theme/css/erptronix.css"
]

web_include_js = [
    "/assets/erptronix_theme/js/erptronix.js"
]

# ── Brand HTML (replaces Frappe logo in navbar) ────────────────────────────────
brand_html = """
<a class="navbar-brand et-brand" href="/app" style="display:flex;align-items:center;gap:9px;text-decoration:none;">
  <span style="
    width:30px;height:30px;border-radius:7px;flex-shrink:0;
    background:linear-gradient(135deg,#22d3ee 0%,#0ea5e9 50%,#4f46e5 100%);
    display:flex;align-items:center;justify-content:center;
    font-family:Syne,sans-serif;font-weight:900;font-size:11px;
    color:#fff;letter-spacing:-0.3px;
  ">ET</span>
  <span style="
    font-family:Syne,sans-serif;font-weight:800;font-size:1.15rem;
    color:var(--text-color,#0f172a);letter-spacing:-0.025em;white-space:nowrap;
  ">Erp<span style='
    background:linear-gradient(135deg,#22d3ee,#4f46e5);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    background-clip:text;
  '>Tronix</span></span>
</a>
"""

# ── Boot session — injects theme config into Frappe JS globals ─────────────────
def boot_session(bootinfo):
    bootinfo.erptronix_theme = {
        "version": "1.1.0",
        "brand": "ErpTronix",
        "primary_color": "#0ea5e9",
        "accent_color": "#22d3ee",
    }

# ── After migrate — ensure assets are symlinked ────────────────────────────────
after_migrate = ["erptronix_theme.setup.after_migrate"]

# ── No JS bundles to build — this prevents esbuild from looking for bundles ───
# Leave build.json absent or empty; bench build will copy /public/* to assets
