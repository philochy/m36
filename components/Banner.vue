<template>
	<div
		id="container-banner"
		class="container-banner">
		<div
			id="banner-wrap"
			class="banner-wrap">
			<div
				ref="swiper1"
				v-swiper="swiperOptions"
				class="container-swiper">
				<div class="swiper-wrapper">
					<div
						v-for="(item, index) in bannerList"
						:key="index"
						class="swiper-slide">
						<img
							width="1920"
							height="850"
							class="swiper-slide-image"
							:srcset="item[0]?.srcset"
							sizes="(max-width: 1200px) 50vw, 1920px, (max-width: 768px) 100vw"
							:src="item[0]?.url"
							:alt="item[0]?.name || 'banner'" />
					</div>
				</div>
				<div
					slot="button-prev"
					class="swiper-button swiper-button__prev">
					<div class="swiper-button-arrow swiper-button-arrow__prev"></div>
				</div>
				<div
					slot="button-next"
					class="swiper-button swiper-button__next">
					<div class="swiper-button-arrow swiper-button-arrow__next"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'BannerComponent',
	props: {
		bannerList: {
			type: Object,
			default: () => {
				return {};
			},
		},
	},
	data() {
		return {
			swiperOptions: {
				loop: true,
				autoplay: {
					delay: 3000,
					disableOnInteraction: false,
				},
				navigation: {
					nextEl: '.swiper-button__next',
					prevEl: '.swiper-button__prev',
				},
				pagination: {
					clickable: true,
				},
			},
		};
	},
};
</script>

<style lang="less" scoped>
.arrow-style() {
	content: '';
	position: absolute;
	top: 50%;
	width: 140px;
	height: 2px;
	background-color: #fff;

	.media-md({
		width: 80px;
	});
}

.container-swiper {
	position: relative;

	.swiper-slide-image {
		width: 100%;
		height: auto;
		display: block;
	}
	.swiper-button {
		position: absolute;
		top: 60%;
		width: 120px;
		height: 120px;
		border: 1px dashed rgba(255, 255, 255, 0.75);
		border-radius: 50%;
		z-index: 10;
		cursor: pointer;

		.media-md({
			width: 80px;
			height: 80px;
		});

		&__prev {
			left: 100px;
			right: auto;

			.media-md({
				left: 30px;
			});
		}

		&__next {
			right: 100px;
			left: auto;

			.media-md({
				right: 30px;
			});
		}

		&-arrow {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			font-size: 20px;
			&__prev {
				right: 20%;

				&::after {
					content: '<';
					font-size: 20px;
					color: #fff;
				}

				&::before {
					.arrow-style();
				}
			}

			&__next {
				left: 20%;

				&::after {
					content: '>';
					color: #fff;
				}

				&::before {
					.arrow-style();
					right: 0;
				}
			}
		}
	}
}
</style>
