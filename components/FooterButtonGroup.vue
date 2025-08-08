<template>
	<div class="container-footer-btn">
		<div class="btn-group">
			<a
				v-for="(item, index) in btnList"
				:key="index"
				rel="nofollow"
				class="btn-group__item"
				:href="item.href">
				<Iconify
					class="btn-group__icon"
					:icon="item.class" />
				<span class="btn-group__text">{{ item.name }}</span>
			</a>
		</div>
	</div>
</template>

<script>
const btnList = [
	{
		type: 'home',
		class: 'tabler:home',
		name: 'home',
		href: '/',
	},
	{
		type: 'phone',
		class: 'tabler:phone',
		name: 'phone',
		href: '',
	},
	{
		type: 'email',
		class: 'tabler:mail',
		name: 'e-mail',
		href: '',
	},
	{
		type: 'inquiry',
		class: 'tabler:help',
		name: 'inquiry',
		href: '/contact-us',
	},
];
export default {
	name: 'FooterButtonGroup',
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
			btnList,
		};
	},
	mounted() {
		this.btnList.map((v) => {
			if (v.type === 'phone') {
				v.href = `tel:${this.footerData.visitthird?.phoneNumber}`;
			} else if (v.type === 'email') {
				v.href = `mailto:${this.footerData.visitthird?.email}`;
			}
			return v;
		});
	},
};
</script>

<style lang="less" scoped>
.container-footer-btn {
	display: none;
	width: 100%;
	height: @footer-btn-h;
	background-color: @theme-color-primary;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 10;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);

	.media-lg({
        display: flex;
        align-items: center;
    });

	.btn-group {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(4, 1fr);

		&__item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}

		&__icon {
			color: #fff;
			font-size: 25px;
		}

		&__text {
			text-transform: uppercase;
			color: #fff;
			margin-top: 5px;
			cursor: pointer;
			font-size: 14px;
		}
	}
}
</style>
