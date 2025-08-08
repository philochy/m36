<template>
  <div class="container-thanks">
    <Container>
      <div class="thanks-wrap">
        <img src="@/assets/img/404.webp" alt="404">
        <div class="thanks-wrap-right">
          <PageTitle
            title="Sorry, no products were found matching your selection."
          />
          <div class="thanks-wrap-right__text">
            You can contact us or view the product list.
          </div>
          <div class="thanks-wrap-right__line" />
          <div class="group-btn">
            <a href="/contact-us" class="group-btn__left">
              <span>Contact Us</span>
              <Iconify icon="tabler:chevron-right" />
            </a>
            <a href="/products" class="group-btn__right">
              <span>View products</span>
              <Iconify icon="tabler:chevron-right" />
            </a>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script>
export default {
	name: 'Error',
};
</script>

<style lang="less" scoped>
@import url('@/assets/css/thanks.less');
</style>