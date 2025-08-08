<template>
	<div class="container-products-categories">
		<div class="products-categories">
			<a
				class="products-categories__item"
				:class="
					hasActiveAll($route.path) ? 'products-categories__item--active' : ''
				"
				:href="href"
				>{{ title }}</a
			>
			<a
				v-for="(item, index) in sortList"
				:key="index"
				:href="item.path"
				class="products-categories__item"
				:class="
					getCurrentPath($route.path) === item.path
						? 'products-categories__item--active'
						: ''
				">
				<h2>{{ item.name_ch }}</h2>
			</a>
		</div>
	</div>
</template>
<script>
export default {
	name: 'ProdocutCategories',
	props: {
		list: {
			type: Array,
			default: () => [],
		},
		title: {
			type: String,
			default: 'All Products',
		},
		href: {
			type: String,
			default: '/products',
		},
	},
	computed: {
		sortList() {
			const list = this.list;
			return list.sort((a, b) => a.sort - b.sort);
		},
	},
	methods: {
		getCurrentPath(path) {
			if (path.endsWith('/') || path.includes('/page')) {
				return `/${path.split('/')[1]}`;
			}
			return path;
		},
		hasActiveAll(path) {
			const includesList = ['/products', '/news', '/knowledge'];
			const _path = this.getCurrentPath(path);
			if (includesList.includes(_path)) {
				return true;
			}
			return false;
		},
	},
};
</script>

<style lang="less" scoped>
.container-products-categories {
	.products-categories {
		display: flex;
		flex-direction: column;
		gap: 40px;
		position: relative;
		padding-bottom: 40px;

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 1px;
			background-color: @border-sixth;
		}
		&__item {
			color: @text-color-secondary;

			&--active {
				color: @text-color-primary;
				font-size: 18px;
				font-weight: bold;
				.media-lg({

                });
			}
			& > h2 {
				margin: 0;
				font-size: inherit;
				font-weight: 500;
			}
		}
	}
}
</style>
