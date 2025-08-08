<template>
	<div class="products-categories-list">
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
						:title="title" />
					<div
						class="products__rich"
						v-html="productsDesc" />
					<ProductList :list="productList" />

					<Pagination
						:current-page="currentPage"
						:total="total"
						:page-size="pageSize"
						:path="path" />
				</div>
			</div>
		</Container>
	</div>
</template>

<script>
import { flatTreeData, findParentElements } from '~/utils/index.js';
export default {
	asyncData({ app, route, store }) {
		const db = app.$websiteDataHelper;
		const routeId = route.meta[0].nodeid;

		const productsCategories = db.getCategories('products', routeId) || [];
		const path = `/${route.path.split('/')[1]}`;
		const productMenus = store.state.menu.filter((m) => m.type === 'products');
		const currentVO = db.getCurrentVO(productMenus, path);

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
		const flatArray = flatTreeData(productMenus);
		const breadList = findParentElements(route.meta[0].nodeid, flatArray);

		const products = app.$websiteDataHelper.websitedata.products;
		const filterLabels = ['hot'];
		const includesAll = (arr, labels) => arr.every((v) => labels.includes(v));
		const hotProducts =
			products.length > 0
				? products
						.filter((v) => v.labels && includesAll(filterLabels, v.labels))
						.slice(0, 3)
				: [];
		return {
			productsCategories,
			title: currentVO?.name_ch || 'productsCategories',
			productList,
			total,
			pageSize,
			currentPage,
			productsDesc: currentVO?.typeDes || '',
			breadList,
			hotProducts,
			path,
		};
	},
};
</script>

<style lang="less" scoped>
.products-categories-list {
	margin: @page-my 0;
	.products {
		&-header {
			margin: @page-my 0;
			display: flex;
			gap: 70px;

			.media-lg({
				display: flex;
				flex-direction: column-reverse;
			});

			&__left {
				display: flex;
				flex-direction: column;
				width: 20%;
				gap: 60px;

				.media-lg({
					width: 100%;
				});
			}

			&__class {
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
