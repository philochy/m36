<template>
	<div class="container-knowledge">
		<Container>
			<BreadCrumb :bread-list="breadList" />

			<div class="wrap-header">
				<div class="wrap-header__left">
					<ProductsCategories
						class="wrap-header__class"
						:list="categories"
						:title="title"
						href="/knowledge" />
					<RecommendProductsList
						:list="hotProducts"
						show-type="colum" />
				</div>
				<div class="wrap-header__block">
					<PageTitle
						class="wrap-header__title"
						:title="title" />
					<BlogList :list="knowledgeList" />

					<Pagination
						:current-page="currentPage"
						:total="total"
						:page-size="pageSize" />
				</div>
			</div>
		</Container>
	</div>
</template>

<script>
export default {
	name: 'News',
	asyncData({ app, route }) {
		const db = app.$websiteDataHelper;

		const routeId = route.meta[0].nodeid;

		const categories = db.getCategories('knowledge', routeId) || [];

		const currentPage = route.meta[0].page || 1;
		const pageSize = 12;
		let knowledgeList = [];
		const { list = [], count: total = 0 } = db.getList(
			'knowledge',
			routeId,
			currentPage,
			pageSize,
		);

		if (Array.isArray(list)) {
			knowledgeList = list;
		}

		// 面包屑
		const breadList = [];
		breadList.push({
			path: '/knowledge',
			name_ch: 'Knowledge',
		});

		const hotProducts = db.hotProducts.slice(0, 3);

		return {
			categories,
			knowledgeList,
			total,
			pageSize,
			currentPage,
			breadList,
			hotProducts,
		};
	},
	data() {
		return {
			title: 'All Types Of Blog',
		};
	},
};
</script>

<style lang="less" scoped>
.container-knowledge {
	margin: @page-my 0;
	.wrap {
		&-header {
			margin: @page-my 0;
			display: flex;
			gap: 70px;

			&__left {
				display: flex;
				flex-direction: column;
				width: 20%;
				gap: 60px;

				.media-lg({
					display: none;
				});
			}
			&__block {
				display: flex;
				flex-direction: column;
				flex: 1;
				gap: 20px;
			}
		}
	}
}
</style>
