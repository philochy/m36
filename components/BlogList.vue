<template>
	<div class="container-knowledge-list">
		<div
			v-for="(item, index) in list"
			:key="index"
			class="knowledge-list__item">
			<CardItem
				:name="item.name"
				:path="item.path"
				:show-pic="item.knowledgePic"
				:create-time="item.createTime"
				show-type="knowledge" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'KnowledgeList',
	props: {
		list: {
			type: Array,
			default: () => [],
		},
	},
};
</script>

<style lang="less" scoped>
.container-knowledge-list {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 30px 20px;

	.media-lg({
		grid-template-columns: repeat(1, minmax(0, 1fr));
	});

	.knowledge-list {
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
