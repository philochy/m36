<template>
	<div class="container-knowledge-detail">
		<Container>
			<BreadCrumb
				:nav-type="2"
				:bread-list="breadList" />
			<div class="knowledge-detail">
				<div class="knowledge-detail__cate">
					<ProductsCategories
						:list="categories"
						:title="title"
						href="/knowledge" />
					<RecommendProductsList
						:list="hotProducts"
						show-type="colum" />
				</div>
				<div class="knowledge-detail__content">
					<h1>{{ knowledgeDetail.name }}</h1>
					<div class="knowledge-detail__block">
						<div class="knowledge-detail__time">
							{{ formatDate(knowledgeDetail.createTime) }}
						</div>
						<div class="knowledge-detail__share">
							<div class="knowledge-detail__share-text">
								Share This Article To:
							</div>
							<ShareList
								:image-url="knowledgeDetail.knowledgePic"
								:desc="knowledgeDetail.name"
								:show-list="true" />
						</div>
					</div>
					<div
						class="knowledge-detail__rich"
						v-html="knowledgeDetail.content" />

					<div class="knowledge-detail__share-lg">
						<ShareList
							:image-url="knowledgeDetail.knowledgePic"
							:desc="knowledgeDetail.name"
							:show-list="true" />
					</div>
					<GoPageDetail
						:next="next"
						:prev="prev" />
				</div>
			</div>
			<template v-if="recommendList && recommendList.length > 0">
				<RecommendProductsList :list="recommendList">
					<div slot="title">
						<PageTitle title="Related blogs" />
					</div>
				</RecommendProductsList>
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

		const res = db.getDetail('knowledge', routeId);

		const categories = db.getCategories('knowledge', routeId) || [];

		// 面包屑
		const blogList = db.websitedata.knowledge;
		const currentPage = blogList.find((v) => v.ID === routeId);
		const breadList = [];
		breadList.push(
			{
				path: '/knowledge',
				name_ch: 'Knowledge',
			},
			{
				path: currentPage.path,
				name_ch: currentPage.name,
			},
		);

		const { prev = {}, next = {} } = db.getsblings(
			'knowledge',
			res.detail.glid,
			routeId,
		);

		let { glProducts: recommendList = [] } = res.detail;
		if (typeof recommendList === 'string') {
			recommendList = [...recommendList];
		}

		const hotProducts = db.hotProducts.slice(0, 3);

		return {
			categories,
			breadList,
			knowledgeDetail: res.detail || '',
			recommendList,
			hotProducts,
			prev,
			next,
		};
	},
	data() {
		return {
			title: 'All Types Of Blog',
		};
	},
	head({ knowledgeDetail }) {
		const {
			name,
			knowledgePic: image = '',
			createTime: datePublished,
			updateTime: dateModified,
		} = knowledgeDetail;
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
							'@type': 'BlogPosting',
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
.container-knowledge-detail {
	margin: @page-my 0;
	.knowledge {
		.page-detail();
	}
}
</style>
