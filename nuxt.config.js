import webpack from 'webpack';
import { dataHelper } from './plugins/websiteDataHelper.js';
import { routesLog } from './utils/routerFun.js';
import { sitemapRoutes } from './utils/sitemapRoutes.js';
import getRobots from './plugins/robots.js';
import { baseConfig } from './config';

// 生产环境打包地址
const distPath = `D:/somyshare/libraries/static-dist/${process.env.DOMIN}`;

// Site URL
const WEB_SITE_URL = process.env.ORIGIN?.startsWith('www')
	? `https://${process.env.ORIGIN}`
	: `https://www.${process.env.ORIGIN}`;

const sitemaps = [
	{
		path: '/sitemap.xml',
		exclude: ['/search', '/404', '/'],
		gzip: true,
		defaults: {
			changefreq: 'daily',
			lastmod: new Date(),
			priority: 0.8,
		},
		async routes(callback) {
			await dataHelper.init();
			const result = dataHelper.websitedata.menu;

			sitemapRoutes.init(result);
			const routeList = sitemapRoutes.getRoutes();
			// 调用回调函数生成 XML 文件
			callback(null, routeList);
		},
	},
	{
		path: '/sitemap-image.xml',
		exclude: ['/search', '/404', '/thanks', '**/page-**'],
		gzip: true,
		filter({ routes }) {
			return routes.filter((route) => {
				return route.img && route.img.length > 0;
			});
		},
		async routes(callback) {
			await dataHelper.init();
			const result = dataHelper.websitedata;

			sitemapRoutes.initImage(result);
			const imageList = sitemapRoutes.getImages();
			// 调用回调函数生成 XML 文件
			callback(null, imageList);
		},
	},
];

export default {
	publicRuntimeConfig: {
		BASE_URL: process.env.BASE_URL,
		UPLOAD_BASE_URL: process.env.UPLOAD_BASE_URL,
		IP_ADMIN_BASE_URL: process.env.IP_ADMIN_BASE_URL,
		ORIGIN: process.env.ORIGIN,
		DB_NAME: process.env.DB_NAME,
		GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
		NODE_ENV: process.env.NODE_ENV,
		WEB_SITE_URL,
	},
	target: 'static',
	generate: {
		cache: false,
		dir: process.env.NODE_ENV === 'production' ? distPath : 'dist',
		concurrency: 1,
	},

	head: {
		title: 'm36',
		htmlAttrs: {
			lang: 'en',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ name: 'format-detection', content: 'telephone=no' },
			{
				name: 'robots',
				content: baseConfig.allowRobots ? 'index, follow' : 'noindex, nofollow',
			},
		],
		script: [
			{ src: '/js/index.js', defer: true },
			{ src: '/js/menu.js', defer: true },
		],
	},

	css: ['~/assets/css/global.less', 'element-ui/lib/theme-chalk/index.css'],
	styleResources: {
		less: ['~/assets/css/media.less', '~/assets/css/global.less'],
	},

	plugins: [
		{
			src: '~/plugins/websiteDataHelper.js',
			mode: 'server',
		},
		{
			src: '~/plugins/Swiper.js',
			mode: 'client',
		},
		{
			src: '~/plugins/element-ui.js',
		},
		{
			src: '~/plugins/jquery.js',
			mode: 'client',
		},
		{
			src: '~/directives/debounce.js',
			mode: 'client',
		},
	],

	components: true,

	buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/style-resources'],

	modules: [
		'@nuxtjs/axios',
		'@nuxtjs/proxy',
		'@nuxtjs/sitemap',
		[
			'@nuxtjs/google-fonts',
			{
				families: {
					Rubik: true,
				},
				preload: true,
			},
		],
	],

	axios: {
		proxy: true,
	},
	server: {
		host: '0.0.0.0',
		port: 8082,
	},
	proxy: {
		'/api/': {
			target: process.env.BASE_URL,
			changeOrigin: true,
			pathRewrite: {},
		},
		'/icms/upload/': {
			target: 'https://icms.aixdb.cn',
			changeOrigin: true,
			pathRewrite: {},
		},
		'/ipadmin/': {
			target: process.env.IP_ADMIN_BASE_URL,
			changeOrigin: true,
			pathRewrite: {},
		},
	},

	build: {
		plugins: [
			new webpack.ProvidePlugin({
				$: 'jquery',
			}),
		],
		extend(config) {
			config.node = {
				fs: 'empty',
			};
			getRobots({
				$config: baseConfig,
				sitemaps,
			});
		},
		extractCSS: true,
		transpile: [/^element-ui/, 'vue-awesome-swiper', 'websiteDataHelper'],
	},
	router: {
		async extendRoutes(routes) {
			await dataHelper.init();

			routes.splice(0);
			const result = dataHelper.websitedata.menu;

			await routesLog.init(dataHelper, result);
			const routesList = routesLog.getRoutes();
			routes.push(...routesList);
		},
	},

	sitemap: {
		hostname: process.env.ORIGIN?.startsWith('www')
			? `https://${process.env.ORIGIN}`
			: `https://www.${process.env.ORIGIN}`,
		gzip: true,
		sitemaps,
	},

	hooks: {
		'generate:page': (page) => {
			const headRegex = /<head[^>]*>([\s\S]*?)<\/head>/;
			const match = page.html.match(headRegex);

			if (match) {
				let headContent = match[1];

				const utf8MetaTag = headContent.match(
					/<meta[^>]+charset="utf-8"[^>]*>/i,
				);
				let otherTags = headContent;

				if (utf8MetaTag) {
					otherTags = otherTags.replace(utf8MetaTag[0], '');
				}

				const titleTag = otherTags.match(/<title[^>]*>[\s\S]*?<\/title>/);
				const descriptionTag = otherTags.match(
					/<meta[^>]+name="description"[^>]*>/,
				);
				const keywordsTag = otherTags.match(/<meta[^>]+name="keywords"[^>]*>/);

				otherTags = otherTags
					.replace(/<title[^>]*>[\s\S]*?<\/title>/, '')
					.replace(/<meta[^>]+name="description"[^>]*>/, '')
					.replace(/<meta[^>]+name="keywords"[^>]*>/, '');

				headContent = '';

				if (utf8MetaTag) {
					headContent += utf8MetaTag[0];
				}

				if (titleTag) {
					headContent += titleTag[0];
				}

				if (descriptionTag) {
					headContent += descriptionTag[0];
				}

				if (keywordsTag) {
					headContent += keywordsTag[0];
				}

				headContent += otherTags;

				page.html = page.html.replace(headRegex, `<head>${headContent}</head>`);
			}
		},
	},
};
