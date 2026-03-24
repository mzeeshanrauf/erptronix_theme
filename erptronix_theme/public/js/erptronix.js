/* ErpTronix Theme JS v3.0 */
(function () {
	'use strict';

	function setFavicon() {
		var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>"
			+ "<rect width='32' height='32' rx='6' fill='%231a73e8'/>"
			+ "<text x='16' y='22' text-anchor='middle' font-family='sans-serif' "
			+ "font-weight='900' font-size='13' fill='white'>ET</text></svg>";
		var link = document.querySelector("link[rel~='icon']");
		if (!link) {
			link = document.createElement('link');
			link.rel = 'shortcut icon';
			document.head.appendChild(link);
		}
		link.type = 'image/svg+xml';
		link.href = 'data:image/svg+xml,' + svg;
	}

	function init() {
		setFavicon();
		console.log(
			'%c ErpTronix Theme v3.0 ',
			'background:#1a73e8;color:white;padding:3px 8px;border-radius:4px;font-weight:bold;'
		);
	}

	if (document.readyState !== 'loading') init();
	else document.addEventListener('DOMContentLoaded', init);
})();
