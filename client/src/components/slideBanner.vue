<template>
    <b-carousel-slide :img-src="banner.image_url" class="carouselSize">
      <h1>{{ banner.name }}</h1>
    </b-carousel-slide>
</template>

<script>
export default {
  props: ['banner'],
};
</script>

<style scoped>
.carouselSize {
  max-width: 100rem;
  max-height: 30rem;
  background-size: contain;
}
</style>
