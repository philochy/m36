<template>
	<div class="container-recommend-list">
		<slot name="title">
			<div class="recommend-title">YOU MAY LIKE</div>
		</slot>
		<div
			class="recommend-list"
			:class="[
				showType === 'row' ? 'recommend-list__row' : 'recommend-list__column',
			]">
			<div
				v-for="(item, index) in list"
				:key="index"
				class="recommend-list__item">
				<CardItem
					:name="item.name"
					:path="item.path"
					:show-pic="item.showPic" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: () => [],
		},
		showType: {
			type: String,
			default: 'row',
		},
	},
};
</script>

<style lang="less" scoped>
.container-recommend-list {
	.recommend-title {
		font-weight: bold;
		font-size: 22px;
		color: @text-color-primary;
	}
	.recommend-list {
		margin-top: 30px;
		gap: 20px 25px;

		&__item {
			&:hover {
				:deep(.circle-icon) {
					background-color: @theme-color-primary;
					border: @theme-color-primary;
					color: #fff;
				}
			}
		}

		&__row {
			display: grid;
			grid-template-columns: repeat(3, minmax(0, 1fr));

			.media-md({
				grid-template-columns: repeat(1, minmax(0, 1fr));
			});
		}

		&__column {
			display: flex;
			flex-direction: column;
		}
	}
}
</style>
