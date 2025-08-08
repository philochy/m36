import * as fs from 'fs';
class SiteMapRoutes {
	constructor() {
		this.routes = [];
		this.imageList = [];
		this.sitePic = [];
		this.productPic = [];
		this.productAll = [];
		this.newsList = [];
		this.knowledgeList = [];
		this.host = process.env.ORIGIN?.startsWith('www')
			? `https://${process.env.ORIGIN}`
			: `https://www.${process.env.ORIGIN}`;
		this.txtContent = 'URL,changefreq,priority,lastmod\n';
		this.htmlContent = '<html><body>';

		this.priorityArr_1 = ['Home'];
		this.priorityArr_09 = [
			'products',
			'news',
			'contact',
			'about-us',
			'knowledge',
			'productsclass',
			'newsclass',
			'knowledgeclass',
		];
		this.priorityArr_07 = ['productsdetail', 'newsdetail', 'knowledgedetail'];
	}

	async init(data) {
		this.handleLogic(data);
		this.htmlContent += '</body></html>';
		this.imageContent += '</body></html>';
		await this.handleWriteFile('static/sitemap.txt', this.txtContent);
		await this.handleWriteFile('static/sitemap.html', this.htmlContent);
	}

	initImage({
		menu,
		site_pic: sitePic,
		product_pic: productPic,
		products,
		news,
		knowledge,
	}) {
		this.sitePic = sitePic;
		this.productPic = productPic;
		this.productAll = products;
		this.newsList = news;
		this.knowledgeList = knowledge;
		this.handleImage(menu);
	}

	handleLogic(data) {
		for (let i = 0; i < data.length; i++) {
			let item = {
				url: data[i].path,
				changefreq: 'daily',
				priority: 1,
				lastmod: new Date(),
			};
			if (data[i].type === 'Home') {
				item = { ...item, url: '' };
			} else if (this.priorityArr_09.includes(data[i].type)) {
				item = {
					...item,
					priority: 0.9,
				};
			} else if (this.priorityArr_07.includes(data[i].type)) {
				item = {
					...item,
					priority: 0.7,
				};
			} else {
				break;
			}
			this.routes.push(item);
			// 将 url 添加到 txt 文件内容
			this.txtContent += `${this.host + item.url},${item.changefreq},${
				item.priority
			},${item.lastmod}\n`;
			// sitemap.html
			this.htmlContent += `<a href="${data[i].path}">${data[i].path}</a><br>`;

			if (data[i].children) {
				this.handleLogic(data[i].children);
			}
		}
	}

	handleImage(menu) {
		for (let i = 0; i < menu.length; i++) {
			const imageItem = {
				url: menu[i].path,
				img: [],
			};
			const addImageUrl = (url, title) => {
				if (url) {
					imageItem.img.push({ url, title });
				}
			};
			switch (menu[i].type) {
				case 'Home':
					addImageUrl(this.host + this.sitePic[0]?.logourl, 'logo');
					break;
				case menu[i].type.endsWith('class') && menu[i].typePic:
					addImageUrl(this.host + menu[i].typePic, menu[i].name_ch);
					break;
				case 'about-us':
					if (menu[i].content) {
						imageItem.img = this.getContentImage(menu[i].content);
					}
					break;
				case 'productsdetail':
					if (this.productPic.length > 0) {
						const productPic = this.productPic.filter(
							(v) => v.glid === menu[i].ID && v.status !== 2,
						);
						productPic.forEach((v) => addImageUrl(v.url, v.title));
					}
					if (this.productAll.length > 0) {
						const productShowPic = this.productAll.find(
							(v) => v.ID === menu[i].ID,
						);

						addImageUrl(productShowPic?.showPic, productShowPic.name);
					}

					break;
				case 'newsdetail':
					addImageUrl(menu[i].newsPic, menu[i].name_ch);
					break;
				case 'knowledgedetail':
					addImageUrl(menu[i].knowledgePic, menu[i].name_ch);
					break;
				case 'news':
					if (this.newsList.length > 0) {
						imageItem.img = this.getTypeList(this.newsList, menu[i].name);
					}
					break;
				case 'knowledge':
					if (this.knowledgeList.length > 0) {
						imageItem.img = this.getTypeList(this.knowledgeList, menu[i].name);
					}
					break;
				default:
					break;
			}
			if (imageItem.img.length > 0) {
				this.imageList.push(imageItem);
			}
			if (menu[i].children) {
				this.handleImage(menu[i].children);
			}
		}
		// fs.writeFileSync(
		// 	'static/imgSrcs.txt',
		// 	JSON.stringify(this.imageList),
		// 	'utf-8',
		// );
	}

	getTypeList(list, id) {
		const currentItem = list.find((v) => v.ID === id);
		return currentItem && currentItem.content
			? this.getContentImage(currentItem.content)
			: [];
	}

	getContentImage(content) {
		const imageList = [];
		const imgRegex = /<img .*?title="(.*?)".*?src="(.*?)"(.*?)>/g;

		let match;
		while ((match = imgRegex.exec(content)) !== null) {
			if (match[2].startsWith('/icms')) {
				imageList.push({
					url: this.host + match[2],
					title: match[1],
				});
			}
		}

		return imageList;
	}

	handleWriteFile(filename, content) {
		return new Promise((resolve, reject) => {
			fs.writeFile(filename, content, 'utf8', (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}

	getRoutes() {
		return this.routes;
	}

	getImages() {
		return this.imageList;
	}
}

const sitemapRoutes = new SiteMapRoutes();

export { sitemapRoutes };
