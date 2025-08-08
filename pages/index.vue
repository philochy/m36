<template>
	<div class="container">
		<div class="container-banner-wrap">
			<Banner :banner-list="bannerList" />
		</div>
		<HomeAbout />
		<HomeFeatured :list="hotProductList" />
		<HomeProduct :list="productList" />
		<HomeCustom />
		<HomeBlog :list="hotTopKnowledges" />
		<HomeChoose />
	</div>
</template>

<script>
import HomeAbout from '@/components/Home/About.vue';
import HomeFeatured from '@/components/Home/Featured.vue';
import HomeProduct from '@/components/Home/Product.vue';
import { defHotProducts } from '@/static/js/staticData.js';

const defaultBanner = {
	1: [
		{
			url: require('@/assets/img/banner1.webp'),
			name: 'banner1',
		},
	],
	2: [
		{
			url: require('@/assets/img/banner2.webp'),
			name: 'banner2',
		},
	],
	3: [
		{
			url: require('@/assets/img/banner3.webp'),
			name: 'banner3',
		},
	],
};
const defaultProduct = [];
export default {
	name: 'IndexPage',
	components: {
		HomeAbout,
		HomeFeatured,
		HomeProduct,
	},
	asyncData({ app }) {
		// banner
		const banner = app.$websiteDataHelper.getpcbanner();
		let bannerList = {};
		if (Array.isArray(banner) && banner.length > 0) {
			for (const key in banner) {
				if (!bannerList[banner[key].sort]) {
					bannerList[banner[key].sort] = [];
				}
				bannerList[banner[key].sort].push(banner[key]);
			}
			for (const key in bannerList) {
				bannerList[key][0].srcset = bannerList[key]
					.map((v) => `${v.url} ${v.width}w`)
					.join(', ');
			}
		} else {
			bannerList = defaultBanner;
		}

		// homeProducts
		const hotProducts = app.$websiteDataHelper.hotProducts || [];
		const hotProductList =
			hotProducts.length > 0
				? hotProducts.sort((a, b) => a.sort - b.sort).splice(0, 2)
				: defHotProducts;

		// homeKnowledge
		const knowledges = app.$websiteDataHelper.websitedata.knowledge || [];
		const filterLabels = ['hot'];
		const includesAll = (arr, labels) => arr.every((v) => labels.includes(v));
		const hotTopKnowledges =
			knowledges.length > 0
				? knowledges.filter(
						(v) => v.labels && includesAll(filterLabels, v.labels),
				)
				: [];

		const products = app.$websiteDataHelper.websitedata.products || [];
		const productList = products.length > 0 ? products.slice(0, 8) : defaultProduct;
		return {
			bannerList,
			hotProductList,
			productList,
			hotTopKnowledges,
		};
	},
};
</script>
<style lang="less" scoped>
.container {
	margin-top: @header-h;
	.media-lg({
		margin-top:0;
	});
}
</style>
