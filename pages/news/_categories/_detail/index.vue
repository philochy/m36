<template>
	<div class="container-news-detail">
		<Container>
			<BreadCrumb
				:nav-type="2"
				:bread-list="breadList" />
			<div class="news-detail">
				<div class="news-detail__cate">
					<ProductsCategories
						:list="categories"
						:title="title"
						href="/news" />
					<RecommendProductsList
						:list="hotProducts"
						show-type="colum" />
				</div>
				<div class="news-detail__content">
					<h1>{{ newsDetail.name }}</h1>
					<div class="news-detail__block">
						<div class="news-detail__time">
							{{ formatDate(newsDetail.createTime) }}
						</div>
						<div class="news-detail__share">
							<div class="news-detail__share-text">Share This Article To:</div>
							<ShareList
								:image-url="newsDetail.newsPic"
								:desc="newsDetail.name"
								:show-list="true" />
						</div>
					</div>
					<div
						class="news-detail__rich"
						v-html="newsDetail.content" />

					<div class="news-detail__share-lg">
						<ShareList
							:image-url="newsDetail.newsPic"
							:desc="newsDetail.name"
							:show-list="true" />
					</div>
					<GoPageDetail
						:next="next"
						:prev="prev" />
				</div>
			</div>
			<template v-if="recommendList && recommendList.length > 0">
				<RecommendProductsList :list="recommendList" />
			</template>
		</Container>
	</div>
</template>

<script>
import { formatDate } from '~/utils';

export default {
	asyncData({ app, route }) {
		const db = app.$websiteDataHelper;
		const routeId = route.meta[0].nodeid;
		const products = db.websitedata.products;

		const res = db.getDetail('news', routeId);

		const categories = db.getCategories('news', routeId) || [];

		// 面包屑
		const newsList = db.websitedata.news;
		const currentPage = newsList.find((v) => v.ID === routeId);
		const breadList = [];
		breadList.push(
			{
				path: '/news',
				name_ch: 'News',
			},
			{
				path: currentPage.path,
				name_ch: currentPage.name,
			},
		);

		const { prev = {}, next = {} } = db.getsblings(
			'news',
			res.detail.glid,
			routeId,
		);

		const recommendList =
			products.filter((item) =>
				JSON.stringify(res.detail?.glProductIds).includes(item.ID),
			) || [];

		const hotProducts = db.hotProducts.slice(0, 3);

		return {
			categories,
			breadList,
			newsDetail: res.detail || '',
			recommendList,
			hotProducts,
			prev,
			next,
		};
	},
	data() {
		return {
			title: 'All Types Of News',
		};
	},
	head({ newsDetail }) {
		const {
			name,
			newsPic: image = '',
			createTime: datePublished,
			updateTime: dateModified,
		} = newsDetail;
		const itemListElement = [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Home',
				item: this.$config.WEB_SITE_URL,
			},
		];
		for (const i in this.breadList) {
			itemListElement.push({
				'@type': 'ListItem',
				position: itemListElement.length + 1,
				name: this.breadList[i].name_ch,
				item: this.$config.WEB_SITE_URL + this.breadList[i].path,
			});
		}
		return {
			script: [
				{
					type: 'application/ld+json',
					json: [
						{
							'@context': 'https://schema.org',
							'@type': 'BreadcrumbList',
							itemListElement,
						},
						{
							'@context': 'https://schema.org',
							'@type': 'NewsArticle',
							headline: name,
							image: this.$config.WEB_SITE_URL + image,
							datePublished,
							dateModified,
							description: this.$route.meta?.description || '',
							keywords: this.$route.meta?.keywords || '',
						},
					],
				},
			],
		};
	},
	methods: {
		formatDate,
	},
};
</script>

<style lang="less" scoped>
.container-news-detail {
	margin: @page-my 0;
	.news {
		.page-detail();
	}
}
</style>
