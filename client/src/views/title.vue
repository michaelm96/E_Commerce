<template>
    <div>
        <h1>Search: {{ this.$route.query.keyword }} </h1>
        <h5>Found: {{ this.$store.state.products.length }} items</h5>
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
    };
  },
  components: {
    productCard,
  },
  created() {
    this.$store.state.products = [];
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
