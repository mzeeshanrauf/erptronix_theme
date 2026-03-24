"""
ErpTronix Theme — hooks.py
ERPNext v16 Custom Theme Configuration
"""

from . import __version__ as app_version

app_name = "erptronix_theme"
app_title = "ErpTronix Theme"
app_publisher = "ErpTronix"
app_description = "Custom dark navy + electric cyan brand theme for ERPNext"
app_email = "hello@erptronix.com"
app_license = "MIT"
app_version = "1.0.0"

# ── Inject CSS/JS into every ERPNext page ──────────────────────────────────────

app_include_css = [
    "/assets/erptronix_theme/css/erptronix.css"
]

app_include_js = [
    "/assets/erptronix_theme/js/erptronix.js"
]

# ── Web includes (portal pages) ───────────────────────────────────────────────

web_include_css = [
    "/assets/erptronix_theme/css/erptronix.css"
]

web_include_js = [
    "/assets/erptronix_theme/js/erptronix.js"
]

# ── Brand Name Override ────────────────────────────────────────────────────────

brand_html = """
<a class="navbar-brand" href="/app">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 36" fill="none" 
       style="height:28px;display:block;">
    <defs>
      <linearGradient id="etNavGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#22d3ee"/>
        <stop offset="50%"  stop-color="#0ea5e9"/>
        <stop offset="100%" stop-color="#4f46e5"/>
      </linearGradient>
    </defs>
    <rect x="0" y="3" width="30" height="30" rx="7" fill="url(#etNavGrad)"/>
    <text x="15" y="23" text-anchor="middle" font-family="Syne,sans-serif"
          font-weight="900" font-size="13" fill="white" letter-spacing="-0.5">ET</text>
    <text x="40" y="24" font-family="Syne,sans-serif" font-weight="800"
          font-size="16" fill="#e2e8f0" letter-spacing="-0.5">Erp</text>
    <text x="69" y="24" font-family="Syne,sans-serif" font-weight="800"
          font-size="16" fill="url(#etNavGrad)" letter-spacing="-0.5">Tronix</text>
  </svg>
</a>
"""

# ── Boot Session Info ──────────────────────────────────────────────────────────

def boot_session(bootinfo):
    """Inject brand config into the Frappe boot session."""
    bootinfo.erptronix = {
        "brand_name": "ErpTronix",
        "theme_version": "1.0.0",
        "primary_color": "#22d3ee",
        "tagline": "Intelligent ERP for Modern Business",
    }

# ── Doc Events (optional) ─────────────────────────────────────────────────────

doc_events = {}

# ── Fixtures ─────────────────────────────────────────────────────────────────

fixtures = []

# ── Scheduler Events ──────────────────────────────────────────────────────────

scheduler_events = {}
