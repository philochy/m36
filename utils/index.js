export function isMobile() {
	const ua = window.navigator.userAgent;
	return /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/.test(
		ua,
	);
}

export function getCurrentMenu(menu, currentRoute) {
	for (const m of menu) {
		if (m.name === currentRoute.meta[0]?.nodeid) {
			return m;
		}

		if (m.children) {
			const currentMenu = getCurrentMenu(m.children, currentRoute);

			if (currentMenu) {
				return currentMenu;
			}
		}
	}

	return undefined;
}

export function setHomeToRoot(menu) {
	menu.forEach((e) => {
		if (e.type === 'Home') {
			e.path = '/';
		}
	});
}

export const formatDate = (dateString, type = 1) => {
	const date = new Date(dateString);
	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];

	const day = date.getDate();
	const month = monthNames[date.getMonth()];
	const year = date.getFullYear();

	let formattedDate;

	switch (type) {
		case 1:
			formattedDate = `${month} ${day},${year}`;
			break;
		case 2:
			formattedDate = `${month} ${year}`;
			break;
		case 3:
			formattedDate = `${month} ${day}`;
			break;
		default:
			formattedDate = `${month} ${day},${year}`;
			break;
	}
	return formattedDate;
};

export const addForm = (data) => {
	return new Promise((resolve, reject) => {
		async function fn() {
			const url = new URL('https://ipadmin.aixdb.cn/ipadmin/api/ask/add');
			for (const key in data) {
				url.searchParams.append(key, data[key]);
			}
			const res = await fetch(url);
			resolve(res);
		}
		fn();
	});
};

export const getRequireStatus = (data) => {
	return new Promise((resolve, reject) => {
		async function fn() {
			const url = new URL('https://icms.aixdb.cn/api/appapi/home/get');
			for (const key in data) {
				url.searchParams.append(key, data[key]);
			}
			const res = await fetch(url);
			resolve(res.json());
		}
		fn();
	});
};

export const debounce = (func, wait) => {
	let timeout;
	return function (...args) {
		const context = this;
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func.apply(context, args);
		}, wait);
	};
};

export const LoadingImage = () => {
	const ob = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					const img = entry.target;
					img.src = img.dataset.src;
					ob.unobserve(img);
				}
			}
		},
		{
			threshold: 0,
		},
	);
	setTimeout(() => {
		const imgs = document.querySelectorAll('img[data-src]');
		imgs.forEach((img) => {
			ob.observe(img);
		});
	}, 1000);
};

export const transFormIframe = (
	sourceStr,
	searchStr = 'sandbox',
	replacement = 'sandbox="allow-scripts allow-same-origin allow-presentation"',
) => {
	const regex = new RegExp(searchStr, 'g');
	return sourceStr.replace(regex, replacement);
};

export const flatTreeData = (tree) => {
	const res = [];
	function getData(list) {
		list.forEach((item) => {
			res.push(item);
			if (item.children) {
				getData(item.children);
			}
		});
	}
	getData(tree);
	return res;
};

export const findParentElements = (
	id,
	tree,
	path,
	ID,
	products,
	type = 'normal',
) => {
	const parents = [];
	const element = tree.find((item) => {
		if (type === 'productDetail') {
			const currentMenu = products.find((v) => v.ID === ID);

			let currentPath = '';
			if (path.endsWith('/')) {
				currentPath = path.slice(0, this.$route.path.length - 1);
			} else {
				currentPath = path;
			}

			return (
				item.parentid === id &&
				currentPath.includes(item.path) &&
				item.type === 'productsclass' &&
				currentMenu.glid === item.ID
			);
		}
		return item.name === id;
	});

	if (!element) {
		return parents; // 没有找到元素
	}
	parents.push(element);
	// 查找父元素
	function findParent(parentId) {
		const parentElement = tree.find((item) => item.name === parentId);
		if (parentElement) {
			parents.push(parentElement);
			if (parentElement.parentid === 'menu-tree') {
				return parents;
			}
			findParent(parentElement.parentid); // 查找上层父元素
		}
	}
	findParent(element.parentid); // 开始从找到的元素的 parentid 开始查找
	return parents.reverse(); // 反转数组以从顶部到底部返回
};
