<template>
	<div class="container-search">
		<Loading v-if="loading" />
		<template v-else>
			<NotFound v-if="products.length === 0" />
			<Container v-else>
				<ProductList :list="products" />
			</Container>
		</template>
	</div>
</template>

<script>
import NotFound from '@/components/NotFound.vue';
export default {
	components: {
		NotFound,
	},
	asyncData({ app }) {
		const productsAll = app.$websiteDataHelper.websitedata.products || [];
		return {
			productsAll,
		};
	},
	data() {
		return {
			loading: true,
			products: [],
		};
	},
	mounted() {
		const index = window.location.search.indexOf('?keywords=');
		if (index !== -1) {
			const keywords = window.location.search.substring(index + 10);
			this.products = this.productsAll.filter((s) =>
				s.name
					.replace(/\s/g, '')
					.toLocaleUpperCase()
					.includes(
						decodeURIComponent(keywords).replace(/\s/g, '').toLocaleUpperCase(),
					),
			);
		} else {
			this.products = [];
		}
		setTimeout(() => {
			this.loading = false;
		}, 500);
	},
};
</script>
