<template>
	<div class="container-home-blog">
		<ContainerSpacing>
			<ContainerTitle
				title="Blog recommendations"
				desc="High quality furniture manufacturer" />
			<div class="home-blog-list">
				<BlogList :list="list" />
			</div>
			<DefaultButton href="/knowledge" />
		</ContainerSpacing>
	</div>
</template>

<script>
export default {
	name: 'HomeBlog',
	props: {
		list: {
			type: Array,
			default: () => [],
		},
	},
};
</script>

<style lang="less" scoped>
.container-home-blog {
	.home-blog-list {
		margin: 20px 0;
	}
}
</style>
