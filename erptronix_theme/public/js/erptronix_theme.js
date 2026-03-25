/* ErpTronix Theme — minimal JS, favicon + logo only */
(function () {

    /* Favicon */
    function setFavicon() {
        var svg = 'data:image/svg+xml,'
            + '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">'
            + '<rect width="32" height="32" rx="7" fill="%231a73e8"/>'
            + '<text x="16" y="22" text-anchor="middle" '
            + 'font-family="Arial Black,Arial,sans-serif" '
            + 'font-weight="900" font-size="13" fill="white">ET</text></svg>';
        var link = document.querySelector("link[rel*='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = svg;
    }

    /* Replace navbar logo with ErpTronix SVG */
    function setLogo() {
        var brand = document.querySelector('.navbar-brand, .navbar a.navbar-brand');
        if (brand && !brand.dataset.et) {
            brand.dataset.et = '1';
            brand.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 38" height="32" style="display:block">'
                + '<defs><linearGradient id="etg2" x1="0%" y1="0%" x2="100%" y2="100%">'
                + '<stop offset="0%" stop-color="#4da6ff"/>'
                + '<stop offset="100%" stop-color="#1a73e8"/>'
                + '</linearGradient></defs>'
                + '<rect x="0" y="3" width="32" height="32" rx="7" fill="url(#etg2)"/>'
                + '<text x="16" y="24" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" '
                + 'font-weight="900" font-size="14" fill="white">ET</text>'
                + '<text x="42" y="26" font-family="Arial,sans-serif" font-weight="700" font-size="18" fill="#ffffff">Erp</text>'
                + '<text x="70" y="26" font-family="Arial,sans-serif" font-weight="700" font-size="18" fill="#a8d4ff">Tronix</text>'
                + '</svg>';
            brand.href = '/app';
            brand.style.cssText = 'display:flex;align-items:center;padding:0 8px;text-decoration:none;';
        }
    }

    /* Run on load */
    setFavicon();

    /* Wait for navbar to render then set logo */
    function trySetLogo(attempts) {
        var brand = document.querySelector('.navbar-brand, .navbar a.navbar-brand');
        if (brand) {
            setLogo();
        } else if (attempts > 0) {
            setTimeout(function () { trySetLogo(attempts - 1); }, 200);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { trySetLogo(20); });
    } else {
        trySetLogo(20);
    }

    /* Re-apply on page change */
    document.addEventListener('page-change', function () { trySetLogo(5); });

})();
