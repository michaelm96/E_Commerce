<template>
  <div>
    <span v-if="this.$store.state.checkoutMsg || this.$store.state.unCartMsg">
    <b-alert
      :show="dismissCountDown"
      variant="success"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p>{{ this.$store.state.checkoutMsg }}</p>
      <p>{{ this.$store.state.unCartMsg }}</p>
    </b-alert>
    </span>
    <span v-if="this.$store.state.failCheckout">
    <b-alert
      :show="dismissCountDown"
      variant="danger"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p>{{ this.$store.state.failCheckout }}</p>
    </b-alert>
    </span>
    <div class="position">
      <productCard
        v-for="(product, index) in this.$store.state.products"
        :key="index"
        :product="product"
        class="productCard"
      ></productCard>
    </div>
  </div>
</template>

<script>
import productCard from '../components/productCard.vue';

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
        this.$store.state.checkoutMsg = null;
        this.$store.state.unCartMsg = null;
        this.$store.state.failCheckout = null;
      }
    },
  },
  components: {
    productCard,
  },
  created() {
    this.$store.state.products = [];
    this.$store.dispatch('getProduct');
    this.dismissCountDown = this.dismissSecs;
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
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
