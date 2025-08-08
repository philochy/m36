<template>
	<div class="container-product-detail">
		<Container>
			<BreadCrumb
				:nav-type="2"
				:bread-list="breadList" />
			<div class="product-detail">
				<div class="product-detail__banner">
					<template v-if="showSwiper">
						<div
							v-swiper="swiperOptions1"
							class="swiper-wrap">
							<div class="swiper-wrapper">
								<div
									v-for="(item, index) in bannerList"
									:key="index"
									class="swiper-slide">
									<template v-if="item.type && item.type == 'video'">
										<video
											controls
											:src="item.url" />
									</template>
									<template v-else>
										<img
											:src="`${item.src}`"
											:alt="item?.name || 'banner'" />
									</template>
								</div>
							</div>
						</div>
						<div class="swiper-thumbs-wrap">
							<div
								slot="button-prev"
								class="thumbs-btn thumbs-btn__prev">
								<Iconify
									class="btn-icon__prev"
									icon="tabler:chevron-up" />
							</div>
							<!-- 缩略图 -->
							<div
								id="mySwiper"
								v-swiper="swiperOptions2"
								class="swiper-thumbs">
								<div class="swiper-wrapper">
									<div
										v-for="(item, index) in bannerList"
										:key="index"
										class="swiper-slide swiper-slide__small">
										<div class="swiper-slide__image">
											<template v-if="item.type && item.type == 'video'">
												<video :src="item.url" />
											</template>
											<template v-else>
												<img
													:src="`${item.src}`"
													:alt="item?.name || 'banner'" />
											</template>
										</div>
									</div>
								</div>
							</div>
							<div
								slot="button-next"
								class="thumbs-btn thumbs-btn__next">
								<Iconify
									class="btn-icon__next"
									icon="tabler:chevron-down" />
							</div>
						</div>
					</template>
					<ImageLoading v-else />
				</div>

				<div class="product-detail__desc">
					<h1>{{ detailTitle }}</h1>
					<div
						class="product-detail__rich"
						v-html="detailDesc" />
					<div class="product-detail__share">
						<ShareList
							:desc="detailDesc"
							:image-url="detailImage"
							:show-list="true">
							<div
								slot="open"
								class="product-detail__share-button share-button"
								@click="handleClick('open')">
								<Iconify
									class="share-button__open"
									icon="tabler:share" />
							</div>
							<div
								slot="close"
								class="share-button"
								@click="handleClick('close')">
								<Iconify
									class="share-button__close"
									color="#C4C4C4"
									icon="tabler:chevron-left" />
							</div>
						</ShareList>
					</div>
					<div class="group-btn">
						<a
							class="group-btn__left"
							href="#send_inquiry">
							<span>Send Inquiry</span>
							<Iconify icon="tabler:chevron-right" />
						</a>
						<a
							class="group-btn__right"
							:download="`${downloadFileName} + '.' + ${downloadFileType}`"
							:href="downloadFileUrl">
							<span>download</span>
							<Iconify icon="tabler:cloud-download" />
						</a>
					</div>
				</div>
			</div>

			<div class="product-rich">
				<div class="product-rich__block">
					<div
						v-for="(item, index) in productsDetail"
						:key="index"
						class="product-rich__title"
						:class="[current === index ? 'product-rich__title--active' : '']"
						@click="changeCurrent(index)">
						{{ item.name }}
					</div>
				</div>
				<div
					v-if="productsDetail[current]?.content"
					class="product-rich__content"
					v-html="productsDetail[current]?.content" />
			</div>

			<template v-if="recommendList && recommendList.length > 0">
				<RecommendProductsList :list="recommendList" />
			</template>
		</Container>
	</div>
</template>

<script>
import { flatTreeData, findParentElements } from '~/utils/index.js';
export default {
	asyncData({ app, route, store }) {
		const db = app.$websiteDataHelper;
		const { product_pic: productPics = [], products = [] } = db.websitedata;

		const routeId = route.meta[0].nodeid;
		const { detail = {} } = db.getDetail('products', routeId);

		// 面包屑
		const menus = store.state.menu.filter((m) => m.type === 'products');
		const flatArray = flatTreeData(menus);
		const breadList = findParentElements(
			route.meta[0].grandId,
			flatArray,
			route.path,
			routeId,
			products,
			'productDetail',
		);

		const currentPage = products.filter((v) => v.ID === routeId)[0];
		breadList.push({
			path: currentPage.path,
			name_ch: currentPage.name,
		});

		// 轮播
		let productsImageList = [];

		if (detail.showPic && typeof detail.showPic === 'string') {
			productsImageList = [
				...productsImageList,
				{ url: detail.showPic, src: detail.showPic },
			];
		}

		const productPic = productPics
			.filter((v) => v.glid === detail.ID && v.status !== 2)
			.sort((a, b) => a.sort - b.sort);
		if (productPic.length > 0) {
			for (const i in productPic) {
				productsImageList.push({
					url: productPic[i].url,
					src: productPic[i].url,
				});
			}
		}

		if (detail.videoUrl && typeof detail.videoUrl === 'string') {
			productsImageList.push({
				src: detail.videoUrl,
				url: detail.videoUrl,
				type: 'video',
			});
		}

		// 产品详情
		const productsDetail = [];
		if (detail.glTemps && typeof detail.glTemps === 'string') {
			const glTemps = JSON.parse(detail.glTemps);

			for (const item in glTemps) {
				switch (glTemps[item].type) {
					case 'ue':
						productsDetail.push(glTemps[item]);
						break;
					case 'ck':
						productsDetail.push(glTemps[item]);
						break;
					default:
						break;
				}
			}
		}

		let fileType = '';
		if (detail.fileurl) {
			const list = detail.fileurl.split('/');
			const nameList = list[list.length - 1].split('.');
			fileType = nameList[nameList.length - 1];
		}

		if (detail?.productDes) {
			detail.productDes = detail.productDes.replace(/\n/g, '<br />');
		}

		return {
			breadList,
			productsDetail,
			detailTitle: detail?.name || '',
			detailDesc: detail?.productDes || '',
			detailImage: detail?.showPic || '',
			downloadFileName: detail?.filename || '',
			downloadFileUrl: detail?.fileurl || 'javascript:void(0);',
			downloadFileType: fileType,
			bannerList: productsImageList,
			recommendList: detail?.glProducts || [],
		};
	},
	data() {
		return {
			current: 0,
			showSwiper: false,
			swiperOptions1: {
				slidesPerView: 1,
				allowTouchMove: false,
				spaceBetween: 10,
				thumbs: {
					swiper: {
						el: '#mySwiper',
						slidesPerView: 5,
						observer: true,
						spaceBetween: 10,
						direction: 'vertical',
						observeParents: true,
						observeSlideChildren: true,
						breakpoints: {
							1024: {
								direction: 'vertical',
								spaceBetween: 10,
							},
							100: {
								spaceBetween: 10,
								direction: 'horizontal',
							},
						},
					},
				},
				navigation: {
					nextEl: '.thumbs-btn__next',
					prevEl: '.thumbs-btn__prev',
				},
			},
			swiperOptions2: {
				slidesPerView: 5,
				freeMode: true,
				watchSlidesProgress: true,
			},
			bannerList: [],
		};
	},
	mounted() {
		this.showSwiper = true;
	},
	methods: {
		handleClick(type) {
			if (type === 'open') {
				$('.share').css({
					transform: 'translateX(0)',
				});
			} else {
				$('.share').css({
					transform: 'translateX(-200%)',
				});
			}
		},
		changeCurrent(index) {
			this.current = index;
		},
	},
};
</script>

<style lang="less" scoped>
:deep(.swiper-slide-active) {
	.swiper-slide__image {
		border: 2px solid @border-primary;
	}
}
@media screen and (min-width: 1024px) {
	.swiper-slide {
		width: 100% !important;
	}
}
.container-product-detail {
	margin: @page-my 0;
	.swiper-slide {
		background: #f5f5f5;
		border-radius: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		height: auto;
		cursor: pointer;
		position: relative;
		height: 100%;
		aspect-ratio: 1 / 1;
		box-sizing: border-box;

		&__image {
			border: 2px solid transparent;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
		}
		img,
		video {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
	.swiper-thumbs-wrap {
		position: relative;
		display: flex;
		padding: 30px 0;

		.media-lg({
			padding: 0 30px;
		});
		.thumbs-btn {
			width: 100%;
			position: absolute;
			z-index: 10;
			box-sizing: border-box;
			border: 2px solid @theme-color-primary;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 18px;
			cursor: pointer;
			transition: all 0.3s ease-in-out;

			.media-lg({
				width: unset;
				height: 100%;
			});

			&:hover {
				background-color: @theme-color-primary;
				color: #fff;
			}
			&__prev {
				top: 0;
				left: 0;
			}

			&__next {
				bottom: 0;
				left: 0;

				.media-lg({
					left: unset;
					right: 0;
				});
			}
		}

		.btn-icon {
			&__prev {
				.media-lg({
					transform: rotate(-90deg);
				});
			}
			&__next {
				.media-lg({
					transform: rotate(-90deg);
				});
			}
		}
	}
	.swiper-thumbs {
		// width: 100%;

		:deep(.swiper-slide-thumb-active) {
			.swiper-slide__image {
				border-color: @theme-color-primary;
			}
		}
		.media-lg({
			width: 100%;
		});

		.swiper-wrapper {
			width: 100px;
			height: 100px;
			margin: 0;

			.media-lg({
				height: auto;
			});
		}
	}
	.product-detail {
		overflow: hidden;
		display: flex;
		margin-top: 40px;

		.media-lg({
			flex-direction: column;
		});

		&__banner {
			width: 50%;
			max-width: 700px;
			overflow: hidden;
			position: relative;
			display: flex;
			gap: 20px;
			flex-direction: row-reverse;

			.media-lg({
				width: 100%;
				max-width: 100%;
				flex-direction: column;
			});

			.swiper-wrap {
				flex: 1;

				.media-lg({
					width: 100%;
					flex: unset;
				});
			}
		}
		&__desc {
			flex: 1;
			margin-left: 50px;
			display: flex;
			flex-direction: column;

			.media-lg({
				margin-left: 0;
			});
		}

		&__rich {
			font-size: 18px;
			line-height: 24px;
		}

		&__share {
			padding: 30px 0;
			position: relative;
			display: flex;
			align-items: center;
			cursor: pointer;
			overflow: hidden;

			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 2px;
				background: @border-sixth;
			}
			&-button {
				border: 2px solid @theme-color-primary;
				padding: 15px;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 20px;

				.media-md({
					padding: 5px;
					margin-right: 10px;
				});
			}
			.share-button {
				.media-md({
					display: none;
				});

				&__open {
					color: @theme-color-primary;
					font-size: 18px;
				}
				&__close {
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 24px;
				}
			}
		}
	}

	.product-rich {
		margin: 20px 0;
		&__block {
			display: flex;
		}

		&__title {
			font-size: 18px;
			padding: 30px;
			text-transform: uppercase;
			background: @text-bg-primary;
			cursor: pointer;

			&--active {
				background: @theme-color-primary;
				color: #fff;
			}
		}

		&__content {
			word-break: break-word;
		}
	}

	.group-btn {
		margin-top: 30px;
		.group-btn();
	}
}
</style>
