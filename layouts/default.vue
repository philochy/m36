<template>
	<div>
		<Header :header-data="$store.state.headerData" />
		<nuxt />

		<FloatMenu :float-menu="$store.state.wmkcData" />
		<InquiryForm v-if="$route.path !== '/contact-us'" />
		<Footer :footer-data="$store.state.footerData" />
		<el-backtop
			:bottom="100"
			:right="10" />
	</div>
</template>

<script>
export default {
	head() {
		const WEB_SITE_URL = this.$config.WEB_SITE_URL;
		const routePath = this.$route.path;

		const languages = [
			'ar',
			'bg',
			'hr',
			'cs',
			'da',
			'nl',
			'fi',
			'fr',
			'de',
			'el',
			'hi',
			'it',
			'ja',
			'ko',
			'no',
			'pl',
			'pt',
			'ro',
			'ru',
			'es',
			'sv',
			'ca',
			'tl',
			'iw',
			'id',
			'lv',
			'lt',
			'sr',
			'sk',
			'sl',
			'uk',
			'vi',
			'sq',
			'et',
			'gl',
			'hu',
			'mt',
			'th',
			'tr',
			'fa',
			'af',
			'ms',
			'sw',
			'ga',
			'cy',
			'be',
			'is',
			'mk',
			'yi',
			'hy',
			'az',
			'eu',
			'ka',
			'ht',
			'ur',
			'bn',
			'bs',
			'ceb',
			'gu',
			'ha',
			'hmn',
			'ig',
			'jw',
			'kn',
			'km',
			'lo',
			'mi',
			'mr',
			'mn',
			'ne',
			'pa',
			'so',
			'ta',
			'te',
			'yo',
			'zu',
			'my',
			'ny',
			'kk',
			'mg',
			'ml',
			'si',
			'st',
			'su',
			'tg',
			'uz',
			'am',
			'co',
			'haw',
			'ku',
			'ky',
			'lb',
			'ps',
			'sm',
			'gd',
			'sn',
			'sd',
			'fy',
			'eo',
			'xh',
			'la',
			'en',
		];

		const langLinks = languages.map((language) => ({
			rel: 'alternate',
			hreflang: language,
			href:
				language === 'en'
					? `${WEB_SITE_URL}${routePath}`
					: `${WEB_SITE_URL}${routePath}`.replace(/\bwww\./, `${language}.`),
		}));

		return {
			title: this.$route.meta?.title,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: this.$route.meta?.description,
				},
				{
					hid: 'keywords',
					name: 'keywords',
					content: this.$route.meta?.keywords,
				},
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: this.$store.state.favicon },
				{ rel: 'canonical', href: `${WEB_SITE_URL}${routePath}` },
				...langLinks,
			],
		};
	},
};
</script>

<style>
@import url('~/assets/rich/css/templates-build.css');
@import url('~/assets/rich/css/iconfont.css');
@import url('~/assets/rich/css/modular.css');
</style>
