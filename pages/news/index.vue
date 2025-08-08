<template>
	<div class="container-news">
		<Container>
			<BreadCrumb :bread-list="breadList" />

			<div class="wrap-header">
				<div class="wrap-header__left">
					<ProductsCategories
						class="wrap-header__class"
						:list="productsCategories"
						title="All Types Of News"
						href="/news" />
					<RecommendProductsList
						:list="hotProducts"
						show-type="colum" />
				</div>
				<div class="wrap-header__block">
					<PageTitle
						class="wrap-header__title"
						title="All Types Of News" />
					<NewsList :list="productList" />

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

		const productsCategories = db.getCategories('news', routeId) || [];

		const currentPage = route.meta[0].page || 1;
		const pageSize = 12;
		let productList = [];
		const { list = [], count: total = 0 } = db.getList(
			'news',
			routeId,
			currentPage,
			pageSize,
		);

		if (Array.isArray(list)) {
			productList = list;
		}

		// 面包屑
		const breadList = [];
		breadList.push({
			path: '/news',
			name_ch: 'News',
		});

		const hotProducts = db.hotProducts.slice(0, 3);

		return {
			productsCategories,
			productList,
			total,
			pageSize,
			currentPage,
			breadList,
			hotProducts,
		};
	},
};
</script>

<style lang="less" scoped>
.container-news {
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
					width: 100%;
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
