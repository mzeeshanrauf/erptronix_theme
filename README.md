# ErpTronix Theme — ERPNext v16

Professional blue theme for ERPNext v16, based on Data Value Theme structure.

---

## Install

```bash
# 1. Upload ZIP to server, extract
unzip erptronix_theme_v3.0.zip -d /home/erp/

# 2. Copy app into bench
cp -r /home/erp/erptronix_theme /home/erp/frappe-bench/apps/

# 3. Install on site
cd /home/erp/frappe-bench
bench --site YOUR-SITE install-app erptronix_theme

# 4. Symlink static assets (NO bench build needed)
ln -sf /home/erp/frappe-bench/apps/erptronix_theme/erptronix_theme/public \
        /home/erp/frappe-bench/sites/assets/erptronix_theme

# 5. Restart
bench restart
```

## Update CSS only (no reinstall needed)

```bash
cp erptronix_theme/erptronix_theme/public/css/erptronix.css \
   /home/erp/frappe-bench/apps/erptronix_theme/erptronix_theme/public/css/erptronix.css
bench restart
```

Then hard-refresh browser: `Ctrl+Shift+R`

---

## Color Customization

Edit `:root` variables at the top of `public/css/erptronix.css`:

```css
:root {
    --et-primary:       #1a73e8;   /* Main blue */
    --et-primary-hover: #1557b0;   /* Darker blue for hover */
    --et-primary-light: #e8f0fe;   /* Light blue tint */
    --et-bg:            #f8fafb;   /* Page background */
}
```
