<template>
  <div class="container-wrap">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.container-wrap {
	width: 100%;
	max-width: 1920px;
	margin-left: auto;
	margin-right: auto;
	padding: 0 @spacing-main;
	height:inherit;
	box-sizing: border-box;

	.media-2xl({
		padding:0 @spacing-md;
	});
}
</style>
