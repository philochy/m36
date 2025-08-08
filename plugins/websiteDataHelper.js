import axios from 'axios';
// import * as fs from 'fs';
// console.log('websiteDataHelper: 进入websiteDataHelper.js文件了');

class WebsiteDataHelper {
	constructor() {
		this.isInit = false;
	}

	async init() {
		// console.log('websiteDataHelper: init');
		if (this.isInit) {
			return;
		}
		// 获取到website的完整数据
		const res = await axios({
			baseURL: process.env.BASE_URL,
			url: '/api/appapi/website/datasort',
			type: 'GET',
			params: {
				DynamicDbConnectName: process.env.DB_NAME,
			},
			// url: 'http://192.168.0.130:8080/data.json',
		});
		// fs.writeFileSync(
		// 	'static/data.json',
		// 	JSON.stringify(res.data.result.data),
		// 	'utf-8',
		// );
		// this.websitedata = res.data;
		this.websitedata = res.data.result.data;
		this.headerMenu = this._buildHeaderMenu();
		this.hotProducts = this.websitedata.products.filter(
			(item) => item.labels && item.labels.includes('hot'),
		);
		this.hotKnowledge = this.websitedata.knowledge.filter(
			(item) => item.labels && item.labels.includes('hot'),
		);
		this.hotNews = this.websitedata.news.filter(
			(item) => item.labels && item.labels.includes('hot'),
		);
		this.pcbanner = this.getpcbanner();
		this.homeIntro = this.websitedata.home_introduction[0];

		this.isInit = true;
	}

	// 查询分类数据
	getCategories(tablename, glid) {
		const classTable =
			tablename === 'products'
				? 'product_class'
				: tablename === 'news'
				? 'news_class'
				: 'knowledge_class';
		if (!this.websitedata[classTable]) {
			return undefined;
		}

		let data = this.websitedata[classTable].filter(
			(item) => item.parentid === glid,
		);
		// 如果glid下没有下级分类了，则取glid父亲的下属分类
		if (data.length === 0) {
			const itemGlid = this.websitedata[classTable].find(
				(item) => item.ID === glid,
			);
			data = this.websitedata[classTable].filter(
				(item) => item.parentid === itemGlid.parentid,
			);
		}
		data = data.concat(
			this.websitedata.menu.filter((item) => item.parentid === glid),
		);
		data = data.filter((item) => item);
		return data;
	}

	// 查询列表页数据
	getList(tablename, glid, currentPage = 1, pageSize = 12) {
		const menu = this.websitedata.menu;
		const menuitem = this._findmenuitem(glid, menu);
		const classids = [];
		this._gatherclassids(menuitem, classids);
		let list = [];

		list = this.websitedata[tablename]?.filter((item) =>
			classids.includes(item.glid),
		);
		if (this.websitedata[tablename]) {
			// if (tablename === 'knowledge') {
			// 	list.sort((a, b) => {
			// 		return (
			// 			new Date(b.public_time).getTime() -
			// 			new Date(a.public_time).getTime()
			// 		);
			// 	});
			// } else {
			// 	list.sort((a, b) => a.sort - b.sort);
			// }

			const res = {
				list: list.slice((currentPage - 1) * pageSize, currentPage * pageSize),
				count: list.length,
			};
			return res;
		}
		return null;
	}

	getProductRandom(num = 3) {
		const products = this.websitedata.products;
		if (products.length === 0) {
			return [];
		}
		const newProducts = [...products];
		const newArr = newProducts.map((item) => ({
			value: item,
			range: Math.random(),
		}));
		newArr.sort((a, b) => a.range - b.range);
		const randomData = newArr.map((i) => i.value);
		return randomData.slice(0, num);
	}

	// 查询上一条、下一条数据
	getsblings(tablename, glid, id) {
		const menu = this.websitedata.menu;
		const menuitem = this._findmenuitem(glid, menu);
		const classids = [];
		this._gatherclassids(menuitem, classids);
		const list = this.websitedata[tablename].filter((item) =>
			classids.includes(item.glid),
		);
		const index = list.findIndex((item) => item.ID === id);
		const res = {};
		if (list[index - 1]) {
			res.prev = list[index - 1];
		}
		if (list[index + 1]) {
			res.next = list[index + 1];
		}
		return res;
	}

	// 查询详情页数据
	getDetail(tablename, id) {
		const data = {
			detail: this.websitedata[tablename].find((item) => item.ID === id) || [],
		};
		if (tablename === 'products' || tablename === 'knowledge') {
			let glProductIds = [];
			let glKnowledgeIds = [];
			if (data.detail && data.detail.glProductIds) {
				if (
					Array.isArray(data.detail.glProductIds) &&
					data.detail.glProductIds.length > 0
				) {
					glProductIds = data.detail.glProductIds;
				} else if (typeof data.detail.glProductIds === 'string') {
					glProductIds = [...data.detail.glProductIds];
				} else {
					data.detail.glProducts = [];
				}
				if (glProductIds.length > 0) {
					data.detail.glProducts = this.websitedata.products.filter((item) =>
						glProductIds.includes(item.ID),
					);
				} else {
					data.detail.glProducts = [];
				}
			}
			if (data.detail && data.detail.glKnowledgeIds) {
				if (
					Array.isArray(data.detail.glProductIds) &&
					data.detail.glProductIds.length > 0
				) {
					glKnowledgeIds = data.detail.glKnowledgeIds;
				} else if (typeof data.detail.glKnowledgeIds === 'string') {
					glKnowledgeIds = [...data.detail.glKnowledgeIds];
				} else {
					data.detail.glKnowledges = [];
				}
				if (glKnowledgeIds.length > 0) {
					data.detail.glKnowledges = this.websitedata.knowledge.filter((item) =>
						glKnowledgeIds.includes(item.ID),
					);
				} else {
					data.detail.glKnowledges = [];
				}
			}
		}

		if (this.websitedata.product_pic) {
			data.detail.productPics = this.websitedata.product_pic.filter(
				(item) => item.glid === id,
			);
		}
		return data;
	}

	getCurrentVO(menus, currentPath) {
		for (const m of menus) {
			if (m.path === currentPath) {
				return m;
			}

			if (m.children) {
				const currentMenu = new WebsiteDataHelper().getCurrentVO(
					m.children,
					currentPath,
				);

				if (currentMenu) {
					return currentMenu;
				}
			}
		}

		return null;
	}

	// 查询header组件需要的全部数据
	getHeaderData(route) {
		const piclogo = this.websitedata.site_pic[0];
		const contactShare = this.websitedata.contact_share[0];
		const visitthird = this.websitedata.base_info[0];
		const type = route.meta[0] ? route.meta[0].type : '';
		// 传递语言筛选
		// 先对process.env.origin_m01进行判断，统一格式为https://
		let origin = process.env.ORIGIN?.includes('https://')
			? process.env.ORIGIN
			: `https://${process.env.ORIGIN}`;
		// 判断process.env.origin_m01中是否含有'www.'，如果有就去掉
		if (origin.includes('www.')) {
			origin = origin.split('www.')[0] + origin.split('www.')[1];
		}
		return {
			type: type || '',
			menu: this.headerMenu || '',
			piclogo: piclogo || '',
			contactShare: contactShare || '',
			origin,
			icmsdb: process.env.DB_NAME,
			pathPage: route.path ? route.path : '',
			visitthird: visitthird || '',
		};
	}

	// 查询footer组件需要的全部数据
	getFooterData() {
		const piclogo = this.websitedata.site_pic[0];
		// const menu = this.websitedata.menu;
		const bci = this.websitedata.bottom_contact[0];
		const bi = this.websitedata.home_introduction[0];
		const productsList = this.headerMenu.find(
			(item) => item.type === 'products',
		).children;
		const contactShare = this.websitedata.contact_share[0];
		const visitthird = this.websitedata.base_info[0];

		return {
			piclogo: piclogo || '',
			menu: this.headerMenu ? this.headerMenu : '',
			bci: bci || '',
			productsList: productsList || '',
			bi: bi || '',
			contactShare: contactShare || '',
			visitthird: visitthird || '',
			inquiry: process.env.DB_NAME,
		};
	}

	// 查询wmkc组件需要的全部数据
	getwmkcData(route) {
		const contactShare = this.websitedata.contact_share[0];
		return {
			contactShare: contactShare || '',
			pathPage: route.path ? route.path : '',
			icmsdb: process.env.DB_NAME,
		};
	}

	// 收集某个菜单项下的所有子菜单的id集合，根据menu树的数据进行递归查询;
	_gatherclassids(menuitem, classids) {
		if (menuitem.type.endsWith('detail')) {
			return;
		}
		classids.push(menuitem.ID);
		if (menuitem.children.length > 0) {
			for (const item of menuitem.children) {
				this._gatherclassids(item, classids);
			}
		}
	}

	// 遍历某个菜单项集合及其孩子菜单项集合，找到ID为glid的菜单项;
	_findmenuitem(glid, nodes) {
		let item = nodes.find((item1) => item1.ID === glid);
		if (item) {
			return item;
		}
		for (const item1 of nodes) {
			if (item1.type.endsWith('detail')) {
				return;
			}
			if (item1.children.length > 0) {
				item = this._findmenuitem(glid, item1.children);
				if (item) {
					return item;
				}
			}
		}
		return undefined;
	}

	_buildHeaderMenu() {
		const headerMenu = JSON.parse(JSON.stringify(this.websitedata.menu));
		this._cleareDetails(headerMenu.filter((item) => item.type === 'products'));
		this._cleareDetails(headerMenu.filter((item) => item.type === 'knowledge'));
		this._cleareDetails(headerMenu.filter((item) => item.type === 'news'));
		return headerMenu;
	}

	_cleareDetails(node) {
		for (let i = 0; i < node.length; i++) {
			node[i].children = node[i].children.filter(
				(item) => !item.type.endsWith('detail'),
			);
			for (let item of node[i].children) {
				if (item.children) {
					item = this._cleareDetails([item]);
				}
			}
		}
	}

	getpcbanner() {
		const pcbanner1 = this.websitedata.site_pic_pcbanner.filter(
			(item) => item.glid === this.websitedata.site_pic[0].ID,
		);
		pcbanner1.sort((a, b) => {
			return a.sort - b.sort;
		});
		const pcbanner2 = [];
		for (const item of pcbanner1) {
			const obj = {
				...item,
				url: item.url,
			};
			if (item.type) {
				obj.type = item.type;
			}
			pcbanner2.push(obj);
		}
		return pcbanner2;
	}
}

const dataHelper = new WebsiteDataHelper();

export { dataHelper };

// eslint-disable-next-line no-unused-vars
export default async ({ app, $config }, inject) => {
	await dataHelper.init();
	app.$websiteDataHelper = dataHelper;
};
