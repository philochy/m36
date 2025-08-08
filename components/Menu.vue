<template>
	<div class="container-menu">
		<div class="container-menu__main">
			<div
				class="main-menu__icon"
				@click="closeMenu">
				<Iconify
					class="main-menu__icon--close"
					icon="tabler:x" />
			</div>
			<ul class="container-menu__list">
				<li
					v-for="(item, index) in menu"
					:key="index"
					class="container-menu__item">
					<div
						class="container-menu__block"
						:class="
							item.path === $route.path ? 'container-menu__block--active' : ''
						">
						<a
							class="container-menu__link"
							:class="
								item.path === $route.path ? 'container-menu__link--active' : ''
							"
							:href="item.path"
							>{{ item.name_ch }}</a
						>
						<div
							v-if="item.children.length > 0 && getHiddenChildrenMeun(item)"
							class="container-menu__icon">
							<Iconify
								class="container-menu__icon--down"
								:class="
									item.path === $route.path
										? 'container-menu__icon--active'
										: ''
								"
								icon="tabler:chevron-down" />
						</div>
					</div>
					<div
						v-if="getTreeLength(item.children) > 1"
						class="container-menu__child">
						<!-- 最外层 -->
						<MenuList :menu="item.children" />
						<MenuItemMob :menu="item.children" />
					</div>
					<div
						v-else
						class="container-menu__child">
						<MenuItem
							v-if="getHiddenChildrenMeun(item)"
							:menu="item.children" />
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MenuComponent',
	props: {
		menu: {
			type: Array,
			default: () => {
				return [];
			},
		},
	},
	methods: {
		getTreeLength(tree) {
			function getMaxDepth(treeData) {
				let maxDepth = 0;

				if (!treeData || treeData.length === 0) {
					return 0; // 如果树为空，深度为0
				}

				for (const node of treeData) {
					// 计算当前节点的深度，递归获取子节点的深度
					const depth = 1 + getMaxDepth(node.children);
					maxDepth = Math.max(maxDepth, depth);
				}
				return maxDepth;
			}
			return getMaxDepth(tree);
		},
		getHiddenChildrenMeun(item) {
			const hiddenChildrenMenu = ['newsclass'];
			if (hiddenChildrenMenu.includes(item.type)) {
				return false;
			}
			return true;
		},
		// 关闭菜单
		closeMenu() {
			const oContainerMenu = $('.container-menu');
			oContainerMenu.toggleClass('show');
			$('body').toggleClass('body--hidden');
			$('');
		},
	},
};
</script>

<style lang="less" scoped>
.icon-rotate() {
	transform: rotate(-180deg);
}
.rotate {
	.icon-rotate();
}

.menu-link() {
	position: relative;
	color: @header-text-color;

	&::after {
		content: '';
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 8px;
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 0 8px 8px 8px;
		border-color: transparent transparent @header-text-color transparent;
	}
}

.container-menu {
	display: block;
	flex: 1;

	&.show {
		transform: translateX(0);
		visibility: visible;
	}
	.media-lg({
		position: fixed;
		bottom:0;
		z-index:999;
		left:0;
		transform: translateX(-100%);
		visibility: hidden;
		width: 100%;
		height: 100%;
		background-color: #fff;
		overflow-x: auto;
		transition: all 0.3s ease-in-out;
    });

	.main-menu {
		&__icon {
			display: none;
			&--close {
				width: 25px;
				height: 25px;
			}

			.media-lg({
				display: flex;
				justify-content: flex-end;
				padding: 20px;
			});
		}
	}
	&__main {
		display: flex;
		.media-lg({
			height: 100%;
			width: 100%;
			flex-direction: column;
		});
	}
	&__list {
		display: flex;
		.media-lg({
			height: 100%;
			width: 100%;
			flex-direction: column;
			box-sizing: border-box;
		});
	}
	&__item {
		// display: flex;
		// justify-content: center;
		// align-items: center;
	}
	&__block {
		padding: 0 15px;
		display: flex;
		align-items: center;
		&--active {
			.media-lg({
				background-color: @theme-color-primary;
			});
		}
		.media-lg({
			padding: 0 20px;
			justify-content: space-between;
			border-bottom: 1px solid @border-third;
		});
	}

	&__link {
		color: @header-text-color;

		.media-lg({
			flex:1;
			color: @theme-color-primary;
		});
		&--hover {
			.menu-link();
			color: @header-text-hover-color;

			&::after{
				border-bottom-color: @header-text-hover-color;
			}
			.media-lg({
				color: #fff;
			});
		}

		&--active {
			.menu-link();
			color: @header-text-hover-color;

			&::after{
				border-bottom-color: @header-text-hover-color;
			}
			.media-lg({
				background-color: @theme-color-primary;

				&::after{
					content: none;
				}
			});
		}
	}

	&__icon {
		color: @header-text-color;

		.media-lg({
			width:30px;
			text-align: center;
			color: #bbb;
		});
		&--down {
			transition: all 0.3s linear;
		}
		&--hover {
			&:extend(.rotate all);
			color: @header-text-hover-color;

			.media-lg({
				color: #fff;
			});
		}
		&--active {
			color: @header-text-color;

			.media-lg({
				color: #bbb;
			});
		}
	}

	&__child {
		position: absolute;
		top: 100%;
		display: none;
		padding: 10px 0;

		& > .menu-item {
			box-shadow: rgba(0, 0, 0, 0.2) 0 5px 15px;
		}

		.media-lg({
			position: relative;
			top:0;
			padding:0 20px;
			& > .menu-item {
				box-shadow: none;
			}
		});
	}
}
</style>
