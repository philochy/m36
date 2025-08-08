<template>
	<div
		v-if="page > 1"
		class="container-pagination">
		<div
			class="pagination-page pagination-prev"
			:class="[currentPage > 1 ? 'pagination-page--active' : '']"
			@click="handleCurrentChange('prev')">
			<div
				class="pagination-page__icon"
				:class="[currentPage > 1 ? 'pagination-page__icon--active' : '']">
				<Iconify icon="tabler:chevron-left" />
			</div>
			<span>Previous Page</span>
		</div>
		<!-- <div class="pagination-self">
			<el-pagination
				layout="pager"
				:total="total"
				:current-page="currentPage"
				:page-size="pageSize"
				:pager-count="5"
				@current-change="handleCurrentChange('self', $event)" />
		</div> -->
		<div class="pagination-wrap">
			<a
				v-if="page > 0"
				:href="getPageHref(1)"
				class="pagination-wrap__pager"
				:class="[currentPage === 1 ? 'pagination-wrap__pager--active' : '']"
				>1</a
			>
			<div
				v-if="showPrevMore"
				class="pagination-wrap__more"
				@mouseenter="onMouseenter('left')"
				@mouseleave="showPrevIcon = false"
				@click="handleClick('left')">
				<div class="pagination-wrap__tool">
					<img
						v-if="showPrevIcon"
						src="@/assets/img/arrow.png"
						alt="arrow-left" />
					<img
						v-else
						src="@/assets/img/points.png"
						alt="points" />
				</div>
			</div>
			<a
				v-for="(item, index) in totalPage"
				:key="index"
				:href="getPageHref(item)"
				class="pagination-wrap__pager"
				:class="[currentPage === item ? 'pagination-wrap__pager--active' : '']"
				>{{ item }}</a
			>
			<div
				v-if="showNextMore"
				class="pagination-wrap__more"
				@mouseenter="onMouseenter('right')"
				@mouseleave="showNextIcon = false"
				@click="handleClick('right')">
				<div class="pagination-wrap__tool">
					<img
						v-if="showNextIcon"
						src="@/assets/img/arrow.png"
						class="pagination-wrap__arrow-right"
						alt="arrow-right" />
					<img
						v-else
						src="@/assets/img/points.png"
						alt="points" />
				</div>
			</div>
			<a
				v-if="page > 1"
				:href="getPageHref(page)"
				class="pagination-wrap__pager"
				:class="[currentPage === page ? 'pagination-wrap__pager--active' : '']"
				>{{ page }}</a
			>
		</div>
		<div
			class="pagination-page pagination-next"
			:class="[currentPage < page ? 'pagination-page--active' : '']"
			@click="handleCurrentChange('next')">
			<span>Next Page</span>
			<div
				class="pagination-page__icon"
				:class="[currentPage < page ? 'pagination-page__icon--active' : '']">
				<Iconify icon="tabler:chevron-right" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		total: {
			type: Number,
			default: 0,
		},
		pageSize: {
			type: Number,
			default: 12,
		},
		currentPage: {
			type: Number,
			default: 1,
		},
		path: {
			type: String,
			default: '/products',
		},
	},
	data() {
		return {
			page: null,
			showPrevMore: false,
			showNextMore: false,
			showNextIcon: false,
			showPrevIcon: false,
		};
	},
	computed: {
		totalPage() {
			// 中间显示多少个
			const pagerCount = 5;
			const halfPagerCount = (pagerCount - 1) / 2;

			const pageCount = Number(this.page);
			const currentPage = Number(this.currentPage);

			let showPrevMore = false;
			let showNextMore = false;

			if (pageCount > pagerCount) {
				if (currentPage > pagerCount - halfPagerCount) {
					showPrevMore = true;
				}

				if (currentPage < pageCount - halfPagerCount) {
					showNextMore = true;
				}
			}

			const array = [];

			if (showPrevMore && !showNextMore) {
				const startPage = pageCount - (pagerCount - 2);
				for (let i = startPage; i < pageCount; i++) {
					array.push(i);
				}
			} else if (!showPrevMore && showNextMore) {
				for (let i = 2; i < pagerCount; i++) {
					array.push(i);
				}
			} else if (showPrevMore && showNextMore) {
				const offset = Math.floor(pagerCount / 2) - 1;
				for (let i = currentPage - offset; i <= currentPage + offset; i++) {
					array.push(i);
				}
			} else {
				for (let i = 2; i < pageCount; i++) {
					array.push(i);
				}
			}
			// eslint-disable-next-line vue/no-side-effects-in-computed-properties
			this.showPrevMore = showPrevMore;
			// eslint-disable-next-line vue/no-side-effects-in-computed-properties
			this.showNextMore = showNextMore;

			return array;
		},
	},
	mounted() {
		this.page = this.getTotalPage();
	},
	methods: {
		handleCurrentChange(type, current) {
			const href = window.location.href;
			let newHref;
			if (href.includes('/page-')) {
				let page = href.split('/page-')[1] * 1;
				if (type === 'prev') {
					if (page === 1) {
						return;
					}
					page--;
					newHref = href.replace(/\/page-\d+/, `/page-${page}`);
				} else if (type === 'self') {
					newHref = href.replace(/\/page-\d+/, `/page-${current}`);
				} else {
					if (page === Math.ceil(this.total / this.pageSize)) {
						return;
					}
					page++;
					newHref = href.replace(/\/page-\d+/, `/page-${page}`);
				}
			} else {
				if (type === 'prev') {
					return;
				} else if (type === 'self') {
					newHref = `${href}/page-${current}`;
				} else {
					newHref = `${href}/page-2`;
				}
			}
			window.open(newHref, '_self');
		},
		getPageHref(item) {
			const newsHref = `${this.$store.state.headerData.origin || window.location.origin}${this.path}/page-${item}`;
			return newsHref;
		},
		getTotalPage() {
			return Math.ceil(this.total / this.pageSize);
		},

		onMouseenter(direction) {
			if (direction === 'left') {
				this.showPrevIcon = true;
			} else {
				this.showNextIcon = true;
			}
		},

		handleClick(direction) {
			const href = window.location.href;
			let newHref;
			if (href.includes('/page-')) {
				if (direction === 'left') {
					newHref = href.replace(
						/\/page-\d+/,
						`/page-${this.totalPage[0] - 1}`,
					);
				} else {
					newHref = href.replace(
						/\/page-\d+/,
						`/page-${this.totalPage[this.totalPage.length - 1] + 1}`,
					);
				}
			} else {
				if (direction === 'left') {
					newHref = `${href}/page-${this.totalPage[0] - 1}`;
				} else {
					newHref = `${href}/page-${
						this.totalPage[this.totalPage.length - 1] + 1
					}`;
				}
			}
			window.open(newHref, '_self');
		},
	},
};
</script>

<style lang="less" scoped>
.container-pagination {
	display: flex;
	align-items: center;
	justify-content: space-between;
	:deep(.el-pager li) {
		color: @text-color-secondary;
	}
	:deep(.el-pager li:hover) {
		color: @theme-color-primary;
	}
	:deep(.el-pager li.active) {
		color: @theme-color-primary;
	}
	.media-md({
        gap: 0 20px;
    });
	.pagination-page {
		display: flex;
		align-items: center;
		gap: 0 10px;
		cursor: pointer;

		.media-md({
            flex:1;
            padding: 30px 0;
            justify-content: center;
            border: 2px solid @border-fourth;
        });

		&__icon {
			width: 20px;
			height: 20px;
			border-radius: 50%;
			background: @theme-color-third;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			&--active {
				background: @theme-color-primary;
			}
		}

		&--active {
			border-color: @theme-color-primary;
			.media-md({
                color: @theme-color-primary;
            });
		}
	}
	.pagination-self {
		.media-md({
            display: none;
        });
	}

	.pagination-wrap {
		display: flex;
		align-items: center;
		gap: 20px;
		font-size: 14px;
		font-weight: bold;

		.media-lg({
			display: none;
		});

		&__more {
			display: flex;
			align-items: center;
		}

		&__pager {
			color: @text-color-secondary;
			&:hover {
				color: @text-color-primary;
			}
			&--active {
				color: @text-color-primary;
			}
		}

		&__tool {
			width: 15px;
			height: 15px;
		}

		&__arrow {
			&-right {
				transform: rotate(-180deg);
			}
		}
	}
}
</style>
