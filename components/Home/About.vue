<template>
	<div class="container-home-about">
		<ContainerSpacing>
			<div class="home-about__wrap">
				<div class="home-about__images">
					<img
						src="@/assets/img/home-about1.webp"
						alt="homeAbout1" />
					<img
						src="@/assets/img/home-about2.png"
						alt="homeAbout2" />
				</div>
				<div class="home-about__info">
					<h2 class="about-info__title">
						Grid flexibility will be key to handle increasing complexities
					</h2>
					<div class="about-info__content">
						We focus on improving customer operations with our rich experience
						and professional knowledge. We always focus on utilizing our
						technical knowledge to add valves to our customers and maximize our
						effectiveness. Ensure that our customers continuously improve in
						terms of cost, performance, and safety, and operate smoothly.
					</div>
					<a
						class="about-info__link"
						href="/about-us">
						<CircleIcon />
					</a>
					<div class="about-info__btn">
						<DefaultButton href="/products" />
					</div>
				</div>
			</div>
		</ContainerSpacing>
	</div>
</template>

<script>
export default {
	name: 'HomeAbout',
};
</script>

<style lang="less" scoped>
.container-home-about {
	margin: @page-my 0;

	.media-lg({
        margin: @page-my-lg 0;
    });

	.home-about {
		&__wrap {
			display: flex;
			justify-content: space-between;

			.media-lg({
                flex-direction: column;
            });
		}

		&__images {
			display: flex;
			align-items: flex-end;
			width: 60%;

			.media-lg({
                width: 100%;
            });

			& > img {
				object-fit: contain;
				&:first-child {
					width: 30%;
					margin-right: 30px;

					.media-lg({
                        margin-right: 10px;
                    });
				}

				&:last-child {
					width: calc(70% - 30px);
					margin-right: 30px;

					.media-lg({
                        width: calc(70% - 10px);
                        margin-right: 0;
                    });
				}
			}
		}

		&__info {
			width: calc(40% - 55px);
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			padding-bottom: @page-my;

			.media-lg({
                width: 100%;
                padding: 0;
            });

			.about-info {
				&__title {
					font-size: 30px;
					text-transform: uppercase;
				}
				&__content {
					font-size: 18px;
					color: @text-color-secondary;
					margin-bottom: 20px;
				}
				&__link {
					.media-lg({
						display: none;
					})
				}
				&__btn{
					display: none;

					.media-lg({
						display: block;
					})
				}
			}
		}
	}
}
</style>
