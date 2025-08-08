import * as path from 'path';
class RouterFun {
	constructor() {
		this.routes = [];

		this.defaultRoutes = [
			{
				name: 'search',
				path: '/search',
				component: 'pages/search/index.vue',
			},
			{
				name: '404',
				path: '/404',
				component: 'pages/404.vue',
			},
			{
				name: 'thanks',
				path: '/thanks',
				component: 'pages/thanks/index.vue',
			},
		];
	}

	async init(dataHelper, data) {
		if (!data || data.length === 0) {
			return;
		}
		let fileName = '';

		for (let i = 0; i < data.length; i++) {
			const tdk = {
				title: data[i].title ?? '',
				description: data[i].description ?? '',
				keywords: data[i].keywords ?? '',
			};
			switch (data[i].type) {
				case 'productsdetail':
					this.amendTDK(tdk, '产品名称', data[i].name_ch);
					break;
				case 'newsdetail':
					this.amendTDK(tdk, '新闻标题', data[i].name_ch);
					break;
				case 'knowledgedetail':
					this.amendTDK(tdk, '软文标题', data[i].name_ch);
					break;
				default:
					break;
			}
			if (data[i].type.includes('class')) {
				fileName = data[i].type.substring(0, data[i].type.indexOf('class'));

				const total = await dataHelper.getList(fileName, data[i].name)?.count;

				data[i].component = path.resolve(
					'./',
					`pages/${fileName}/_categories/index.vue`,
				);

				const page = this.routesCategories(
					data[i].type,
					data[i].path,
					total,
					data[i].name,
					tdk,
				);
				this.routes.push(...page);
			} else if (data[i].type.includes('detail')) {
				fileName = data[i].type.substring(0, data[i].type.indexOf('detail'));

				let component = '';
				// 'news', 'knowledge'
				const noCategories = [];
				if (noCategories.includes(fileName)) {
					component = path.resolve('./', `pages/${fileName}/_detail/index.vue`);
				} else {
					component = path.resolve(
						'./',
						`pages/${fileName}/_categories/_detail/index.vue`,
					);
				}

				data[i].component = component;
			} else {
				if (data[i].type === 'Home') {
					data[i].path = '/';
					data[i].component = path.resolve('./', 'pages/index.vue');
				} else if (data[i].type === 'contact') {
					data[i].component = path.resolve('./', 'pages/contactUs/index.vue');
				} else if (data[i].type === 'about-us') {
					data[i].component = path.resolve('./', 'pages/aboutUs/index.vue');
				} else if (data[i].type === 'news' || data[i].type === 'knowledge') {
					data[i].component = path.resolve(
						'./',
						`pages/${data[i].type}/index.vue`,
					);
					const total = await dataHelper.getList(data[i].type, data[i].name)
						?.count;
					const page = this.routesCategories(
						data[i].type,
						data[i].path,
						total,
						data[i].name,
						tdk,
					);
					this.routes.push(...page);
				} else {
					data[i].component = path.resolve(
						'./',
						`pages/${data[i].type}/index.vue`,
					);
					const total = await dataHelper.getList(data[i].type, data[i].name)
						?.count;
					const page = this.routesPage(data[i].type, total, data[i].name, tdk);
					this.routes.push(...page);
				}
			}

			this.routes.push({
				name: data[i].name,
				path: data[i].path,
				component: data[i].component,
				meta: {
					nodeid: data[i].name,
					grandId: data[i].grandId || undefined,
					type: data[i].ID || undefined,
					name: data[i].type || undefined,
					...tdk,
				},
			});

			if (data[i].children) {
				await this.init(dataHelper, data[i].children);
			}
		}
	}

	amendTDK(tdk, a, b) {
		tdk.title = tdk.title.replaceAll(a, b);
		tdk.description = tdk.description.replaceAll(a, b);
		tdk.keywords = tdk.keywords.replaceAll(a, b);
	}

	getRoutes() {
		this.routes.push(...this.defaultRoutes);
		return this.routes;
	}

	routesPage(type, total, nodeid, tdk) {
		const size = Math.ceil(total / 12);
		const arr = [];
		for (let i = 1, len = size; i <= len; i++) {
			arr.push({
				name: type + i,
				path: `/${type}/page-${i}`,
				component: path.resolve('./', `pages/${type}/index.vue`),
				meta: {
					page: i,
					nodeid,
					...tdk,
				},
				query: {
					size,
				},
			});
		}

		return arr;
	}

	routesCategories(type, url, total, nodeid, tdk) {
		const size = Math.ceil(total / 12);
		const arr = [];
		if (type.includes('class')) {
			type = type.substring(0, type.indexOf('class'));
		}

		let component = '';
		const noCategories = ['news', 'knowledge'];
		if (noCategories.includes(type)) {
			component = path.resolve('./', `pages/${type}/index.vue`);
		} else {
			component = path.resolve('./', `pages/${type}/_categories/index.vue`);
		}

		for (let i = 1, len = size; i <= len; i++) {
			arr.push({
				name: nodeid + i,
				path: `${url}/page-${i}`,
				component,
				meta: {
					page: i,
					nodeid,
					...tdk,
				},
				query: {
					size,
				},
			});
		}

		return arr;
	}
}

const routesLog = new RouterFun();
export { routesLog };
