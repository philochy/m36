<template>
	<div class="container-home-product">
		<ContainerSpacing>
			<ContainerTitle
				title="Product Recommendations"
				desc="High quality furniture manufacturer" />
			<div class="home-product-list">
				<ProductList :list="list" />
			</div>
			<DefaultButton href="/products" />
		</ContainerSpacing>
	</div>
</template>

<script>
export default {
	name: 'HomeProducts',
	props: {
		list: {
			type: Array,
			default: () => [],
		},
	},
};
</script>

<style lang="less" scoped>
.container-home-product {
	.home-product-list {
		margin: 20px 0;

		:deep(.container-product-list) {
			grid-template-columns: repeat(4, minmax(0, 1fr));

			.media-lg({
				grid-template-columns: repeat(2, minmax(0, 1fr));
			});
		}
	}
}
</style>
