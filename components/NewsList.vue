<template>
	<div class="container-news-list">
		<div
			v-for="(item, index) in list"
			:key="index"
			class="news-list__item">
			<CardItem
				:name="item.name"
				:path="item.path"
				:show-pic="item.newsPic"
				:create-time="item.createTime"
				show-type="news" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'NewsList',
	props: {
		list: {
			type: Array,
			default: () => [],
		},
	},
};
</script>

<style lang="less" scoped>
.container-news-list {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 30px 20px;

	.media-lg({
		grid-template-columns: repeat(1, minmax(0, 1fr));
	});
	.news-list {
		&__item {
			position: relative;

			&:hover {
				:deep(.circle-icon) {
					background-color: #fff;
					border-color: #fff;
					color: @theme-color-primary;
				}
			}
		}
	}
}
</style>
