<template>
	<div class="container-spacing">
		<Container>
			<slot />
		</Container>
	</div>
</template>

<script>
import Container from './Container.vue';
export default {
	components: {
		Container,
	},
};
</script>

<style lang="less" scoped>
.container-spacing {
	margin: @spacing-top 0;

	.media-lg({
		margin: @spacing-top-lg 0;
	});
}
</style>
