<template>
  <div class="menu-item">
    <ul class="menu-item__list">
      <li v-for="(item, index) in menu" :key="index" class="menu-item__item">
        <div class="menu-item__block">
          <a class="menu-item__link" :href="item.path">
            {{ item.name_ch }}
          </a>
          <Iconify
            v-if="item.children && item.children.length > 0"
            class="menu-item__icon"
            icon="tabler:chevron-down"
          />
        </div>
        <div
          v-if="item.children && item.children.length > 0"
          class="menu-item__child"
        >
          <MenuItem :menu="item.children" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
	name: 'MenuItemComponent',
	props: {
		menu: {
			type: Array,
			default: () => {
				return [];
			},
		},
	},
	data() {
		return {};
	},
	methods: {

	},
};
</script>

<style lang="less" scoped>
.menu-item {
	background-color: #fff;
	&__list {
		min-width: 200px;
		position: relative;
	}
	&__item {
		padding: 10px 40px;
		line-height: 40px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.media-lg({
			border-bottom: 1px solid @border-third;
			padding-left: 0;
		});
	}
	&__block{
		width: 100%;

		.media-lg({
			padding: 0 20px;
		});
	}
	&__link {
		white-space: nowrap;
		color: @text-color-primary;

		.media-lg({
			width: 100%;
			display: block;
			overflow: hidden;
			text-overflow: ellipsis;
		});

		&--hover {
			color: @theme-color-primary;
			font-weight: bold;
			.media-lg({
				color:inherit;
			});
		}
	}

	&__icon {
		transform: rotate(-90deg);
		transition: all 0.2s linear;

		&--hover {
			font-weight: bold;
			transform: rotate(-270deg);
			color: @theme-color-primary;
		}
	}
	&__child {
		display: none;
		height: 100%;
		overflow: hidden;
		overflow-y: auto;
		position: absolute;
		left: 100%;
		top: 0;
		background-color: #fff;
		z-index: 99;
		box-shadow: rgba(0, 0, 0, 0.2) 0 5px 15px;

		&::-webkit-scrollbar {
			width: 0;
		}
	}
}
</style>
