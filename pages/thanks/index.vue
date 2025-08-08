<template>
  <div class="container-thanks">
    <Container>
      <div class="thanks-wrap">
        <img src="@/assets/img/thanks.webp" alt="thanks">
        <div class="thanks-wrap-right">
          <PageTitle title="thanks！" />
          <div class="thanks-wrap-right__text">
            Sent successfully, we will contact you soon!
          </div>
          <div class="thanks-wrap-right__line" />
          <div class="group-btn">
            <a href="/products" class="group-btn__left">
              <span>View Products</span>
              <Iconify icon="tabler:chevron-right" />
            </a>
            <a href="/" class="group-btn__right">
              <span>Back To Home</span>
              <Iconify icon="tabler:chevron-right" />
            </a>
          </div>
        </div>
      </div>

      <RecommendProductsList :list="recommendList" />
    </Container>
  </div>
</template>

<script>
export default {
	name: 'Thanks',
	asyncData({ app }) {
		const db = app.$websiteDataHelper;

		const recommendList = db.getProductRandom();

		return {
			recommendList,
		};
	},
};
</script>

<style lang="less" scoped>
@import url('@/assets/css/thanks.less');
</style>