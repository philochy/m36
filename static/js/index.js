function init() {
	function changeBgColor() {
		if (window.location.pathname !== '/') {
			return;
		}

		const oNav = document.querySelector('#container-nav');

		const oBanner = document.querySelector('#container-banner');

		if (oNav.offsetHeight + window.scrollY > oBanner.offsetHeight) {
			oNav.style.backgroundColor = 'var(--primary-color)';
		} else {
			if (window.innerWidth > 1024) {
				oNav.style.backgroundColor = 'transparent';
			} else {
				oNav.style.backgroundColor = 'var(--primary-color)';
			}
		}
	}

	changeBgColor();
	document.addEventListener('scroll', changeBgColor);

	function loadingImage() {
		const ob = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						const img = entry.target;
						img.src = img.dataset.src;

						const nextSibling = img.nextSibling;
						if (nextSibling) {
							img.onload = function () {
								img.nextSibling.nextSibling.style.display = 'none';
							};
							img.onerror = function () {
								// console.log('失败了');
							};
						}
						ob.unobserve(img);
					}
				}
			},
			{
				threshold: 0.5,
			},
		);
		setTimeout(() => {
			const imgs = document.querySelectorAll('img[data-src]');
			imgs.forEach((img) => {
				ob.observe(img);
			});
		}, 500);
	}

	loadingImage();

	function addListenLink() {
		const filterList = [
			{ url: 'mailto:', type: 'email' },
			{ url: 'https://web.whatsapp.com', type: 'whatsapp' },
			{ url: 'https://api.whatsapp.com', type: 'whatsapp' },
			{ url: 'skype:', type: 'skype' },
		];

		document.querySelectorAll('a').forEach((v) => {
			const link = filterList.some(
				(item) => v.href && v.href.startsWith(item.url),
			);
			if (link) {
				v.addEventListener('click', (e) => {
					const url = new URL(
						'https://ipadmin.aixdb.cn/ipadmin/api/ask/addrecord',
					);
					const filterItem = filterList.find((item) =>
						e.currentTarget.href.startsWith(item.url),
					);
					let fromVal = '';
					if (filterItem.type === 'whatsapp') {
						const regex = /phone=(\d+)/;
						fromVal = e.currentTarget.href.match(regex)[1];
					} else {
						fromVal = e.currentTarget.href;
					}
					const params = {
						pathPage: window.location.href,
						type: filterItem.type,
						from: fromVal,
						DynamicDbConnectName: this.$nuxt.context.$config.DB_NAME,
					};

					for (const i in params) {
						url.searchParams.append(i, params[i]);
					}
					fetch(url);
				});
			}
		});
	}
	addListenLink();
}

document.addEventListener('DOMContentLoaded', init);
