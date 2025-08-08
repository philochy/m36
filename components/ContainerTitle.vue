<template>
	<div class="container-title">
		<div class="title">
			<h2 class="title__header">
				{{ title }}
			</h2>
            <div v-if="desc" class="title__desc">{{ desc }}</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: '',
		},
        desc: {
            type: String,
            default: '',
        },
	},
};
</script>

<style lang="less" scoped>
.container-title {
	.title {
		display: block;
		position: relative;
		overflow: hidden;

		&__header {
			text-transform: uppercase;
			color: @theme-color-primary;
			font-size: 30px;
            margin: 0;

			.media-lg({
                font-size: 20px;
            });
		}

        &__desc{
            margin-top: 5px;
            color: @text-color-third;
			text-transform: uppercase;
        }
	}
}
</style>
