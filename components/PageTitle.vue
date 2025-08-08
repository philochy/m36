<template>
	<div class="container-page-title">
		<h1>{{ title }}</h1>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: '',
		},
	},
};
</script>

<style lang="less" scoped>
.container-page-title {
	position: relative;
	overflow: hidden;
	align-self: flex-start;

	h1 {
		text-transform: uppercase;
		font-size: 24px;
		margin: 0;
	}
}
</style>
