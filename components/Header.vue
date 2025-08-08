<template>
	<div class="container-header" :style="{ position: $route.path === '/' ? 'fixed' : 'sticky' }">
		<header class="container-header__block">
			<Container>
				<a
					class="container-header__email"
					:href="`mailto:${headerData.visitthird.email}`"
					:title="headerData.visitthird.email"
					target="__blank"
					>{{ headerData.visitthird.email }}</a
				>
			</Container>
		</header>
		<Nav :header-data="headerData" />
	</div>
</template>

<script>
export default {
	name: 'HeaderNav',
	props: {
		headerData: {
			type: Object,
			default: () => {
				return {};
			},
		},
	},
};
</script>

<style lang="less" scoped>
.container-header {
	width: 100%;
	position: fixed;
	top:0;
	left:0;
	z-index: 101;
	.media-lg({
		position: sticky !important;
	});

	&__block {
		height: @header-h;
		line-height: @header-h;
		text-align: center;
		background-color: @header-bg;
		color: @theme-color-primary;

		.media-lg({
			background-color: @theme-color-secondary;
			color: #000;
		});
	}
	&__email {
		display: inline-block;
		color: inherit;
	}
}
</style>
