# ErpTronix Theme v1.1 — ERPNext v16

Custom **light + dark** brand theme for ERPNext. Electric cyan / navy palette with Syne + DM Sans typography.

---

## ⚡ Quick Install (correct method — no esbuild needed)

This is a **static CSS/JS theme**. It does NOT need `bench build` to compile anything.  
Use these steps exactly to avoid the `ERR_INVALID_ARG_TYPE paths[0]` error:

```bash
# 1. Copy the app folder into your bench apps directory
cp -r erptronix_theme /home/erp/frappe-bench/apps/

# 2. Install the app on your site
cd /home/erp/frappe-bench
bench --site YOUR-SITE-NAME install-app erptronix_theme

# 3. Symlink static assets (this is what makes CSS/JS available — NO build step)
bench setup --no-backups

# 4. Restart
bench restart
```

> ⚠️ **Do NOT run** `bench build --app erptronix_theme` — this app has no JS bundles to build and will error. The `bench setup` step above copies the static files correctly.

---

## 🔄 Updating / Reinstalling

```bash
# Pull latest changes then re-link assets
bench setup --no-backups
bench restart
```

---

## 🗑️ Uninstalling

```bash
bench --site YOUR-SITE-NAME uninstall-app erptronix_theme
bench remove-app erptronix_theme
bench setup --no-backups
bench restart
```

---

## 🎨 Customizing Colors

Edit `erptronix_theme/public/css/erptronix.css`.

**Light mode** — change values under the `body, [data-theme="light"]` block:
```css
body {
  --bg-color: #f0f4f8;   /* page background */
  --fg-color: #ffffff;   /* card / panel bg */
}
```

**Dark mode** — change values under the `[data-theme="dark"]` block:
```css
[data-theme="dark"] {
  --bg-color: #080f20;
  --fg-color: #0d1630;
}
```

**Brand gradient** (buttons, stat values, logo):
```css
:root {
  --et-grad: linear-gradient(135deg, #22d3ee 0%, #0ea5e9 50%, #4f46e5 100%);
}
```

After any CSS change, run `bench setup --no-backups && bench restart`.

---

## 📁 File Structure

```
erptronix_theme/
├── erptronix_theme/
│   ├── __init__.py
│   ├── hooks.py          ← asset injection + brand HTML
│   ├── setup.py          ← after_migrate helper
│   └── public/
│       ├── css/
│       │   └── erptronix.css   ← full theme (light + dark)
│       └── js/
│           └── erptronix.js    ← favicon, title patch, ripple, count-up
├── setup.py
├── pyproject.toml
├── requirements.txt
└── README.md
```

---

## 🛠️ Compatibility

| ERPNext | Frappe | Python |
|---------|--------|--------|
| v16.x   | v16.x  | 3.10+  |

---

## ❓ Why not `bench build`?

ERPNext's `bench build` uses **esbuild** to bundle JS files declared in `build.json`.  
This theme has no `build.json` because it ships pure pre-written CSS/JS — no transpilation or bundling is needed.  
`bench setup --no-backups` creates the symlink from `/apps/erptronix_theme/public/` → `/sites/assets/erptronix_theme/`, which is all that's required.
