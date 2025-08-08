import { getCurrentMenu, setHomeToRoot } from '~/utils';

const defBlogs = [
	{
		src: '',
		title: 'Latest Machinery IndustryInformation: Enabling IndustryInformation',
		date: 'November 16,2023',
		content:
			'Everyday carry plaid hella portland prism tumblr. Salvia farm-to-table pickled shaman copper mug franzen kickstarter intelligentsia aesthetic.',
	},
	{
		src: '',
		title: 'Latest Machinery IndustryInformation: Enabling IndustryInformation',
		date: 'November 16,2023',
		content:
			'Everyday carry plaid hella portland prism tumblr. Salvia farm-to-table pickled shaman copper mug franzen kickstarter intelligentsia aesthetic.',
	},
];

export const state = () => ({
	favicon: '',
	menu: null,
	currentMenu: null,
	headerData: null,
	footerData: null,
	wmkcData: null,
	hotBlogList: [],
	allMenuList: [],
	askData: null,
	baseInfo: null,
});

export const mutations = {
	setState(data, { key, value }) {
		data[key] = value;
	},
};

export const actions = {
	nuxtServerInit({ commit }, { app, route }) {
		const [sitePic] = app.$websiteDataHelper.websitedata.site_pic;
		// 设置图标
		commit('setState', { key: 'favicon', value: sitePic?.icourl });

		// 设置菜单
		const menu = app.$websiteDataHelper.headerMenu;
		setHomeToRoot(menu);
		commit('setState', { key: 'menu', value: menu });

		// 设置当前菜单
		const currentMenu = getCurrentMenu(menu, route);
		commit('setState', { key: 'currentMenu', value: currentMenu });

		// 设置头部和底部数据
		const headerData = app.$websiteDataHelper.getHeaderData(route);
		const footerData = app.$websiteDataHelper.getFooterData();
		commit('setState', { key: 'headerData', value: headerData });
		commit('setState', { key: 'footerData', value: footerData });

		// 设置 wmkcData 数据
		const wmkcData = app.$websiteDataHelper.getwmkcData(route);
		commit('setState', { key: 'wmkcData', value: wmkcData });

		const hotBlogList = (
			app.$websiteDataHelper.hotKnowledge.length > 0
				? app.$websiteDataHelper.hotKnowledge
				: defBlogs
		).slice(0, 2);
		commit('setState', { key: 'hotBlogList', value: hotBlogList });

		const allMenu = app.$websiteDataHelper.websitedata.menu;
		commit('setState', { key: 'allMenuList', value: allMenu });

		// 设置询盘校验字段
		const [askData] = app.$websiteDataHelper.websitedata.ask_setting;
		commit('setState', { key: 'askData', value: askData });

    const [baseInfo] = app.$websiteDataHelper.websitedata.base_info;
		commit('setState', { key: 'baseInfo', value: baseInfo });
	},
};
