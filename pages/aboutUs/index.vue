<template>
	<div class="container-about">
		<Container>
			<BreadCrumb :bread-list="breadList" />

			<div
				class="about-rich"
				v-html="aboutUsContent" />

			<RecommendProductsList :list="recommendList" />
		</Container>
	</div>
</template>

<script>
import {
	transFormIframe,
	flatTreeData,
	findParentElements,
} from '~/utils/index';

export default {
	asyncData({ app, store, route }) {
		const db = app.$websiteDataHelper;

		const aboutUsMenus = store.state.menu.filter((m) => m.type === 'about-us');
		const currentVO = db.getCurrentVO(aboutUsMenus, route.path);

		if (currentVO.content) {
			currentVO.content = transFormIframe(currentVO.content);
		}
		const flatArray = flatTreeData(aboutUsMenus);
		const breadList = findParentElements(route.meta[0].nodeid, flatArray);

		const recommendList = db.getProductRandom();
		return {
			aboutUsContent: currentVO?.content || '',
			breadList,
			recommendList,
		};
	},
};
</script>

<style lang="less" scoped>
.container-about {
	margin: @page-my 0;

	.about-rich{
		margin: 20px 0;
	}
}
</style>
