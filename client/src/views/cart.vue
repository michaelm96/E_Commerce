<template>
  <div v-if="this.$store.state.products">
    <br />
    <h3>Shopping Cart</h3>
    <span v-if="this.$store.state.addToCartMsg">
      <b-alert
        :show="dismissCountDown"
        variant="success"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
      >
        <p>{{ this.$store.state.addToCartMsg }}</p>
      </b-alert>
    </span>
    <div class="position">
      <cartCard
        v-for="(product, index) in this.$store.state.products"
        :key="index"
        :product="product"
        class="productCard"
      ></cartCard>
    </div>
  </div>
</template>

<script>
import cartCard from '../components/cartCard.vue';

export default {
  data() {
    return {
      dismissSecs: 3,
      dismissCountDown: 0,
    };
  },
  watch: {
    dismissCountDown(newValue, oldValue) {
      if (newValue === 0 && newValue < oldValue) {
        this.$store.state.addToCartMsg = null;
      }
    },
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
  components: {
    cartCard,
  },
  created() {
    this.$store.state.products = [];
    this.$store.dispatch('getCart');
    this.dismissCountDown = this.dismissSecs;
  },
};
</script>

<style scoped>
.position {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  justify-content: space-around;
}
.productCard {
  margin: 2rem;
}
</style>
