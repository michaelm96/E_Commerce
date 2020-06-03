<template>
    <div v-if="this.$store.state.products">
      <br>
        <h3>Category: {{ this.category }}</h3>
        <div class="position">
            <productCard v-for="(product, index) in this.$store.state.products"
            :key="index"
            :product="product"
            class="productCard"></productCard>
        </div>
    </div>
</template>

<script>
import productCard from '../components/productCard.vue';

export default {
  data() {
    return {
      category: this.$route.params.category,
    };
  },
  components: {
    productCard,
  },
  created() {
    this.$store.state.products = [];
    this.$store.dispatch('getProductByCategory', { category: this.category });
  },
};
</script>

<style scoped>
    .position{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        justify-content: space-around;
    }
    .productCard{
        margin: 2rem;
    }
</style>
