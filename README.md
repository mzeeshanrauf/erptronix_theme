# ErpTronix Theme for ERPNext v16

A sleek, dark business theme for ERPNext featuring the **ErpTronix** brand identity.

**Design:** Dark navy background with electric cyan/blue gradients, glass-effect cards, and subtle glow effects.

---

## 🎨 Theme Preview

- **Background:** Deep navy `#080f20`
- **Accent:** Electric cyan `#22d3ee` → blue `#0ea5e9` → indigo `#4f46e5`
- **Typography:** Syne (headings) + DM Sans (body)
- **Cards:** Glass-morphism with backdrop blur
- **Buttons:** Gradient primary with glow shadow
- **Tables:** Clean dark with hover highlights

---

## 📦 Installation

### 1. Get the app into your bench

```bash
cd /path/to/frappe-bench

# Option A — from a local folder
bench get-app /path/to/erptronix_theme

# Option B — from GitHub (after you push it)
bench get-app https://github.com/YOUR_ORG/erptronix_theme
```

### 2. Install on your ERPNext site

```bash
bench --site your-site.com install-app erptronix_theme
```

### 3. Build assets

```bash
bench build --app erptronix_theme
```

### 4. Restart bench

```bash
bench restart
```

---

## 🔄 Updating

```bash
bench update --pull
bench build --app erptronix_theme
bench restart
```

---

## 🗑️ Uninstalling

```bash
bench --site your-site.com uninstall-app erptronix_theme
bench remove-app erptronix_theme
```

---

## 📁 File Structure

```
erptronix_theme/
├── erptronix_theme/
│   ├── __init__.py
│   ├── hooks.py                    ← App hooks (CSS/JS injection)
│   └── public/
│       ├── css/
│       │   └── erptronix.css       ← Main theme stylesheet (~800 lines)
│       └── js/
│           └── erptronix.js        ← Brand injection & UI enhancements
├── setup.py
├── pyproject.toml
├── requirements.txt
└── README.md
```

---

## ✏️ Customization

### Change colors
Edit the CSS variables at the top of `erptronix.css`:

```css
:root {
  --et-accent:    #22d3ee;   /* Main cyan accent */
  --et-accent2:   #0ea5e9;   /* Secondary blue */
  --et-bg:        #080f20;   /* Page background */
  --et-surface:   #0d1630;   /* Card/panel bg */
}
```

### Change brand name
Edit `BRAND.name` in `erptronix.js`:

```js
const BRAND = {
  name: 'ErpTronix',
  tagline: 'Intelligent ERP for Modern Business',
};
```

### Change logo
Replace the `LOGO_SVG` string in `erptronix.js` with your own SVG markup.

---

## 🛠️ Compatibility

| ERPNext | Frappe | Python |
|---------|--------|--------|
| v16.x   | v16.x  | 3.10+  |

---

## 📄 License

MIT — Free to use and modify for your business.
