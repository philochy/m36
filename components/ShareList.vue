<template>
	<div class="container-share">
		<slot name="open" />
		<div
			class="share"
			:style="{
				transform: showList ? '' : 'translateX(-200%)',
			}">
			<a
				v-for="(item, index) in shareList"
				:key="index"
				:href="item.href"
				target="_blank"
				rel="nofollow"
				class="share__link"
				:style="{
					background: item.bg,
				}">
				<Iconify
					class="share__icon"
					color="#fff"
					:icon="item.class" />
			</a>
			<slot name="close" />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		showList: {
			type: Boolean,
			default: false,
		},
		imageUrl: {
			type: String,
			default: '',
		},
		desc: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			shareList: [
				{
					bg: '#459dff',
					name: 'FaceBook',
					class: 'tabler:brand-facebook-filled',
				},
				{
					bg: '#00b4ff',
					name: 'Twitter',
					class: 'tabler:brand-twitter-filled',
				},
				{
					bg: '#0076b4',
					name: 'Linkedin',
					class: 'tabler:brand-linkedin-filled',
				},
				{
					bg: '#c82329',
					name: 'Pinterest',
					class: 'tabler:brand-pinterest-filled',
				},
				{
					bg: '#18c537',
					name: 'WhatsApp',
					class: 'tabler:brand-whatsapp-filled',
				},
				{
					bg: '#00b0ef',
					name: 'Skype',
					class: 'tabler:brand-skype',
				},
				{
					bg: '#1972ba',
					name: 'Email',
					class: 'tabler:mail',
				},
			],
		};
	},
	mounted() {
		const pageUrl = window.location.href;
		const pageTitle = document.title;

		const imageUrl = this.imageUrl
			? `${window.location.href}${this.imageUrl}`
			: null;

		const urls = {
			FaceBook: `https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&u=${encodeURIComponent(
				pageUrl,
			)}`,
			Twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
				pageTitle,
			)}&url=${encodeURIComponent(pageUrl)}`,
			Linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
				pageUrl,
			)}&title=${encodeURIComponent(pageTitle)}`,
			Skype: `https://web.skype.com/share?url=${encodeURIComponent(
				pageUrl,
			)}&text=${encodeURIComponent(this.desc)}`,
			WhatsApp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
				this.desc,
			)}`,
			Email: `mailto:?subject=${encodeURIComponent(
				pageTitle,
			)}&body=${encodeURIComponent(this.desc)}  ${encodeURIComponent(pageUrl)}`,
			Pinterest: `http://pinterest.com/pin/create/button/?url=${encodeURIComponent(
				pageUrl,
			)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(
				this.desc,
			)}`,
		};

		this.shareList = this.shareList.map((item) => {
			item.href = urls[item.name] || '#';
			return item;
		});
	},
};
</script>

<style lang="less" scoped>
.container-share {
	display: flex;

	.share {
		background: #fff;
		display: flex;
		align-items: center;
		transition: all 0.3s ease-in-out;
		&__link {
			width: 35px;
			height: 35px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			margin-right: 15px;

			&:last-child {
				margin-right: 0;
			}

			.media-md({
				width: 25px;
				height: 25px;
				margin-right: 10px;
			});
		}

		&__icon {
			font-size: 20px;
			.media-md({
				font-size: 16px;
			});
		}
	}
}
</style>
