<template>
	<div class="container-footer">
		<Container>
			<div class="footer-wrap">
				<div class="footer-wrap-contact">
					<img
						:src="footerData.piclogo?.logourl"
						alt="logo" />
					<div class="footer-wrap-contact__menu">
						<FooterMenu :menu-list="footerData.menu" />
					</div>
					<div class="footer-wrap-contact__block">
						<span class="footer-wrap-contact__title">Call Us</span>
						<span class="footer-wrap-contact__tel">{{
							footerData.visitthird.phoneNumber
						}}</span>
						<div
							class="footer-wrap-contact__rich"
							v-html="footerData.bci.content" />
						<FooterShareList :share-obj="footerData?.contactShare || {}" />
					</div>
				</div>
				<div
					v-for="(item, index) in footerMenu"
					:key="index"
					class="footer-wrap-menu">
					<a
						class="footer-wrap-menu__title"
						:href="item.href">
						{{ item.title }}
					</a>
					<div class="footer-wrap-menu__list">
						<FooterMenu
							:menu-list="item.data.slice(0, 4)"
							:style="{ width: index == 0 ? '130px' : null }" />
						<FooterMenu
							:menu-list="item.data.slice(4)"
							:style="{ width: index == 0 ? '130px' : null }" />
					</div>
				</div>
			</div>
			<div class="footer-other">
				<div class="footer-other__copyright">
					{{
						footerData.visitthird?.copyright ||
						'Copyright@2024-2026 All Rights Reserved. Powered by AI Seeker Leopard'
					}}
				</div>
			</div>
		</Container>
		<FooterButtonGroup :footer-data="footerData" />
	</div>
</template>

<script>
export default {
	props: {
		footerData: {
			type: Object,
			default: () => {
				return {};
			},
		},
	},
	data() {
		return {
			footerMenu: [
				{
					href: '/',
					title: 'Quick Navigation',
					data: this.footerData.menu,
				},
				{
					href: '/products',
					title: 'Products',
					data: this.footerData.productsList,
				},
			],
		};
	},
};
</script>

<style lang="less" scoped>
.container-footer {
	background: @theme-color-primary;
	padding-top: @spacing-top;
	padding-bottom: 30px;
	color: @footer-text-color;

	.media-lg({
		padding: 30px 0;
		padding-bottom: @footer-btn-h;
	});

	.footer-wrap {
		display: flex;
		justify-content: space-between;
		gap: 20px;

		&-contact {
			width: 30%;
			word-break: break-word;

			.media-lg({
				width: 100%;
				text-align: center;
			});

			&__menu {
				display: none;

				.media-lg({
					display: block;
					padding-bottom: 20px;
					position: relative;

					&::after{
						content:'';
						position: absolute;
						bottom:0;
						left:0;
						width: 100%;
						height: 1px;
						background-color: @border-fifth;
					}
				});
			}
			&__block {
				display: grid;
				gap: 20px;
			}
			&__title {
				display: none;

				.media-lg({
					display: block;
					color: #fff;
					font-size: 22px;
					margin-top:30px;
				});
			}
			&__tel {
				font-size: 30px;
				margin-top: 30px;
				font-weight: bold;

				.media-lg({
					margin-top:0;
				});
			}
			&__rich {
				color: @footer-text-color;
			}
		}
		&-menu {
			.media-lg({
				display:none;
			});

			&__title {
				color: @footer-text-color;
				font-size: 18px;
				text-transform: uppercase;
			}

			&__list {
				display: flex;
				// flex-direction: column;
				margin-top: 30px;
				gap: 20px;

				// & > .container-footer-menu {
				// 	display: grid ;
				// 	grid-template-columns: repeat(2, minmax(0, 1fr));
				// 	grid-template-rows: repeat(5, minmax(0, 1fr));
				// }
			}

			&__item {
				margin-top: 30px;
				&:first-child {
					margin-top: 0;
				}
			}
		}
	}
	.footer-other {
		margin-top: 30px;
		border-top: 1px solid @border-fifth;
		display: flex;
		justify-content: space-between;

		.media-lg({
			margin-bottom: 30px;
		});

		&__copyright {
			margin-top: 20px;
			color: #fff;

			.media-lg({
				width: 100%;
				text-align: center;
			});
		}
		&__menu {
			margin-top: 20px;
			display: flex;
			.media-lg({
				display: none;
			});
		}
		&__item {
			border-right: 1px solid @border-fifth;
			display: block;
			padding: 0 10px;
			&:last-child {
				border-right: none;
				padding-right: 0;
			}
		}
	}
}
</style>
