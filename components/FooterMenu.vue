<template>
	<div class="container-footer-menu">
		<div
			v-for="item in copyMenuList"
			:key="item.id"
			class="footer-menu">
			<div class="footer-menu__text">
				<a
					class="footer-menu__link"
					:href="item.path">
					<span>
						{{ item.name_ch }}
					</span>
				</a>
				<div
					v-if="item.children && item.children.length"
					class="footer-menu__icon"
					@click="item._showChildren = !item._showChildren">
					<Iconify
						icon="tabler:chevron-down"
						:class="[item._showChildren ? '' : 'footer-menu__icon--rotate']" />
				</div>
			</div>
			<ul
				v-show="item.children && item.children.length && !item._showChildren"
				class="footer-menu__children"
				style="padding-left: 20px">
				<li>
					<FooterMenu :menu-list="item.children" />
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'FooterMenuComponent',
	props: {
		menuList: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			copyMenuList: [],
		};
	},
	mounted() {
		this.copyMenuList = JSON.parse(JSON.stringify(this.menuList));
	},
};
</script>

<style lang="less" scoped>
.container-footer-menu {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	color: @footer-text-color;

	.footer-menu {
		display: flex;
		flex-direction: column;
		cursor: pointer;
		width: 100%;
		align-items: flex-start;
		overflow: hidden;

		&__text {
			display: flex;
			align-items: center;
			width: 100%;
			height: 100%;
			margin-top: 20px;
			gap: 10px;
		}

		&__link {
			text-align: left;
			display: block;
			color: @footer-text-color;
			overflow: hidden;

			& > span {
				display: block;
				width: 100%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}

		&__icon {
			display: flex;
			align-items: center;
			&--rotate {
				transform: rotate(180deg);
			}
		}

		&__children {
			width: 100%;
			box-sizing: border-box;
			.footer-menu__link {
				width: 100%;
			}
		}
	}
}
</style>
