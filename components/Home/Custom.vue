<template>
	<div class="container-custom">
		<div class="custom-image"></div>
		<div class="custom-card">
			<div class="custom-card__title">One of the world's</div>
			<div
				v-for="(item, index) in list"
				:key="index"
				class="custom-card__content">
				{{ item.content }}
			</div>
			<a
				class="custom-card__link"
				href="">
				<CircleIcon
					:width="45"
					:height="45" />
			</a>
			<div class="custom-card__btn">
				<DefaultButton href="" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HomeCustom',
	data() {
		return {
			list: [
				{
					content:
						'The custom furniture industry belongs to the sub industry of furniture manufacturing.',
				},
				{
					content:
						'The custom furniture industry belongs to the sub industry of furniture manufacturing.',
				},
				{
					content:
						'The custom furniture industry belongs to the sub industry of furniture manufacturing.',
				},
			],
		};
	},
};
</script>

<style lang="less" scoped>
.container-custom {
	position: relative;
	padding: 40px 0;

	.custom-image {
		background: url(@/assets/img/home-custom.webp) no-repeat;
		background-size: cover;
		background-position: center center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.custom-card {
		padding: 60px @spacing-main;
		width: 35%;
		box-sizing: border-box;
		position: relative;
		z-index: 2;
		// position: absolute;
		// top: 50%;
		// left: 0;
		// transform: translateY(-50%);
		background-color: rgba(255, 255, 255, 0.6);
		display: flex;
		flex-direction: column;
		gap: 15px;

		.media-lg({
			width: 80%;
			padding: 30px @spacing-md;
		});

		&__title {
			font-size: 34px;
			font-weight: bold;
			text-transform: uppercase;

			.media-lg({
				font-size: 20px;
			});
		}

		&__link {
			.media-lg({
				display: none;
			});
		}
		&__btn {
			display: none;

			.media-lg({
				display: block;
			});
		}
	}
}
</style>
