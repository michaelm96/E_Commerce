<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="5000"
      controls
      indicators
      background="#ababab"
      img-width="480"
      img-height="240"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
     <slideBanner v-for="(banner, index) in this.$store.state.banners" :key="index"
     :banner="banner"
     ></slideBanner>
    </b-carousel>
  </div>
</template>

<script>
import slideBanner from './slideBanner.vue';

export default {
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
  created() {
    this.$store.dispatch('getBanner');
  },
  components: {
    slideBanner,
  },
};
</script>
