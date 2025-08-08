<template>
	<div class="container-product-list">
		<div
			v-for="(item, index) in list"
			:key="index"
			class="product-list__item">
			<CardItem
				:name="item.name"
				:path="item.path"
				:show-pic="item.showPic" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'ProductList',
	props: {
		list: {
			type: Array,
			default: () => [],
		},
	},
};
</script>

<style lang="less" scoped>
.container-product-list {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 30px 20px;

	.media-lg({
		grid-template-columns: repeat(2, minmax(0, 1fr));
	});

	.product-list {
		&__item {
			position: relative;

			&:hover {
				:deep(.circle-icon) {
					background-color: @theme-color-primary;
					border: @theme-color-primary;
					color: #fff;
				}
			}
		}
	}
}
</style>
