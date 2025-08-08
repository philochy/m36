<template>
	<div class="container-menu-list">
		<ul class="menu-list__list">
			<!-- 一级 -->
			<li
				v-for="(item, index) in menu"
				:key="index"
				class="menu-list__item">
				<a
					class="menu-list__link"
					:href="item.path">
					{{ item.name_ch }}
				</a>
				<Iconify
					v-if="item.children && item.children.length > 0"
					class="menu-list__icon"
					icon="tabler:chevron-down" />
			</li>
		</ul>
		<div class="menu-line">
			<ul class="menu-child__list">
				<li
					v-for="(item, index) in secondMenu"
					:key="index"
					class="menu-child__item">
					<div>
						<a
							class="menu-child__link"
							:href="item.path">
							{{ item.name_ch }}
						</a>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MenuListComponent',
	props: {
		menu: {
			type: Array,
			default: () => {
				return [];
			},
		},
	},
	data() {
		return {
			current: -1,
			secondMenu: [],
		};
	},
	mounted() {
		const _this = this;
		$('.menu-line').hide();
		$('.menu-list__item').on({
			mouseenter: function () {
				_this.current = $(this).index();
				// 文字
				const that = this;
				// 图标
				$(this)
					.find('.menu-list__link')
					.eq(0)
					.next()
					.addClass('menu-list__icon--hover');

				_this.secondMenu = _this.menu[$(this).index()].children;

				$(() => {
					const currentMenuLine = $(this).parent().siblings('.menu-line');
					if (currentMenuLine.find('.menu-child__item').length > 0) {
						currentMenuLine.show();
					} else {
						currentMenuLine.hide();
					}
					$(that)
						.find('.menu-list__link')
						.eq(0)
						.addClass('menu-list__link--hover');
				});
			},
			mouseleave: function () {
				// 文字
				$(this).find('.menu-list__link').removeClass('menu-list__link--hover');
				// 图标
				$(this)
					.find('.menu-list__link')
					.eq(0)
					.next()
					.removeClass('menu-list__icon--hover');
			},
		});

		// 设置一级菜单样式
		$('.menu-line').on({
			mouseenter: function () {
				const link = $(this)
					.prev('.menu-list__list')
					.find('.menu-list__item')
					.eq(_this.current)
					.find('.menu-list__link');
				link.addClass('menu-list__link--hover');
				link.next().addClass('menu-list__icon--hover');
			},
			mouseleave: function () {
				const link = $(this)
					.prev('.menu-list__list')
					.find('.menu-list__item')
					.eq(_this.current)
					.find('.menu-list__link');
				link.removeClass('menu-list__link--hover');
				link.next().removeClass('menu-list__icon--hover');
			},
		});
		$('.container-menu-list').on({
			mouseleave: function () {
				$('.menu-line').hide();
			},
		});
	},
};
</script>

<style lang="less" scoped>
.menu-item() {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px 40px;
	line-height: 40px;
}

.menu-line {
	position: relative;
	&::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		width: 2px;
		height: calc(100% - 20px);
		background-color: @border-secondary;
	}
}
.container-menu-list {
	box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 15px;
	display: flex;
	background-color: #fff;

	.media-lg({
		display: none;
	});
	.menu-list {
		&__list {
			min-width: 200px;
			max-height: clamp(18.75rem, 13.75rem + 25vw, 43.75rem);
			overflow-y: auto;
			&::-webkit-scrollbar {
				width: 3px !important;
			}
		}
		&__item {
			.menu-item();
		}
		&__link {
			color: @text-color-primary;

			&--hover {
				color: @theme-color-primary;
				font-weight: bold;
			}
		}
		&__icon {
			transform: rotate(-90deg);
			transition: all 0.2s linear;
			color: #bbb;
			&--hover {
				font-weight: bold;
				transform: rotate(-270deg);
				color: @theme-color-primary;
			}
		}
	}
	.menu-child {
		&__list {
			position: relative;
			overflow: hidden;
			overflow-y: auto;
			max-height: clamp(18.75rem, 13.75rem + 25vw, 43.75rem);
			&::-webkit-scrollbar {
				width: 0;
			}
		}
		&__item {
			.menu-item();
		}
		&__link {
			color: @text-color-primary;

			&:hover {
				font-weight: bold;
				color: @theme-color-primary;
			}
		}
	}
}
</style>
