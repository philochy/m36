<template>
	<div class="container-footer-share">
		<div class="footer-share">
			<a
				v-for="(item, index) in shareList"
				:key="index"
				:href="item.href"
				class="footer-share__item"
				rel="nofollow">
				<Iconify
					class="footer-share__icon"
					:icon="item.class" />
			</a>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		shareObj: {
			type: Object,
			default: () => {
				return {};
			},
		},
	},
	data() {
		return {
			shareList: [
				{
					name: 'Facebook',
					class: 'tabler:brand-facebook',
					bg: '#459dff',
				},
				{
					name: 'Twitter',
					class: 'tabler:brand-twitter',
					bg: '#00b4ff',
				},
				{
					name: 'Instagram',
					class: 'tabler:brand-instagram',
					bg: '#d4247a',
				},
				{
					name: 'YouTuBe',
					class: 'tabler:brand-youtube',
					bg: '#ff0018',
				},
				{
					name: 'TikTok',
					class: 'tabler:brand-tiktok',
					bg: '#111111',
				},
				{
					name: 'Pinterest',
					class: 'tabler:brand-pinterest',
					bg: '#c82329',
				},
				{
					name: 'Linkedin',
					class: 'tabler:brand-linkedin',
					bg: '#0076b4',
				},
			],
		};
	},
	mounted() {
		if (Object.keys(this.shareObj).length === 0) {
			return;
		}
		const obj = this.shareObj;
		this.shareList.map((v) => {
			v.href = obj[v.name] ? obj[v.name] : v.href || '#';
			return v;
		});
    this.shareList = this.shareList.filter(v => v.href !== '#');
		this.$forceUpdate();
	},
};
</script>

<style lang="less" scoped>
.container-footer-share {
	.footer-share {
		display: flex;
		align-items: center;
		.media-lg({
			justify-content: center;
		});
		&__item {
			width: 25px;
			height: 25px;
			display: block;
			border-radius: 50%;
			margin-left: 10px;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #fff;

			&:first-child {
				margin-left: 0;
			}

			.media-lg({
				margin-left: 20px;
			});
		}

		&__icon {
			display: block;
			width: 16px;
			height: 16px;
			color: #000;
		}
	}
}
</style>
