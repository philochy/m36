<template>
	<div class="container-products">
		<Container>
			<BreadCrumb :bread-list="breadList" />

			<div class="products-header">
				<div class="products-header__left">
					<ProductsCategories
						class="products-header__class"
						:list="productsCategories" />
					<RecommendProductsList
						:list="hotProducts"
						show-type="colum" />
				</div>
				<div class="products-header__block">
					<PageTitle
						class="products__title"
						title="All products" />
					<ProductList :list="productList" />

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
	name: 'Products',
	asyncData({ app, route }) {
		const db = app.$websiteDataHelper;

		const routeId = route.meta[0].nodeid;

		// 产品分类
		const productsCategories = db.getCategories('products', routeId) || [];

		const currentPage = route.meta[0].page || 1;
		const pageSize = 12;
		let productList = [];
		const { list = [], count: total = 0 } = db.getList(
			'products',
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
			path: '/products',
			name_ch: 'Products',
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
.container-products {
	margin: @page-my 0;
	.products {
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
