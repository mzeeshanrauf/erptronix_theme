"""
ErpTronix Theme — setup helpers
"""
import frappe
import subprocess
import os


def after_migrate():
    """
    After migrate: ensure static assets are symlinked into sites/assets/.
    Equivalent to running `bench setup --no-backups` just for this app.
    """
    try:
        bench_path = os.path.abspath(
            os.path.join(os.path.dirname(__file__), "..", "..", "..", "..")
        )
        subprocess.run(
            ["bench", "setup", "linkedsite", frappe.local.site],
            cwd=bench_path,
            capture_output=True,
        )
    except Exception:
        pass  # Non-fatal — assets will be available after next bench restart
