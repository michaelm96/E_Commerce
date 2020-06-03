<template>
  <div id="productCard">
    <b-card
      :title="product.name"
      :img-src="product.image_url"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 15rem; height: 30rem; max-height: max-content; font-weight:bold;"
      class="mb-2"
    >
      <div class="cat">
        <b-card-text>Category:  {{ product.category }} </b-card-text>
      </div>
      <div v-if="product.stock > 0">
        <b-card-text>Stock: {{ product.stock }}</b-card-text>
      </div>
      <div v-if="this.$store.state.loggedIn && product.stock > 0">
        <input type='number'
        v-model="buy"
        :max="product.stock"
        :min="1"
        @keyup="key($event)"
        @keypress="key($event)"/>
      </div>
      <div v-if="product.stock <= 0">
        <b-card-text>Stock: Out of stock</b-card-text>
      </div>
      <div class="desc">
        <b-card-text>Price:
        <br>
        Rp. {{ product.price }} / book
        </b-card-text>
      </div>
      <div class="buyBtn" v-if="product.stock > 0 && this.$store.state.loggedIn">
        <b-button href="#" variant="primary" @click.prevent="addToCart">Add To Cart</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buy: 1,
    };
  },
  props: ['product'],
  watch: {
    buy(newValue) {
      if (newValue > this.product.stock) {
        this.buy = this.product.stock;
      } else if (Number(newValue) === 0) {
        this.buy = '';
      } else if (newValue === '') {
        this.buy = '';
      } else if (newValue < 0) {
        this.buy = 1;
      } else {
        this.buy = newValue;
      }
      return this.buy;
    },
  },
  methods: {
    async addToCart() {
      await this.$store.dispatch('addToCart', {
        name: this.product.name,
        image_url: this.product.image_url,
        stock: this.product.stock,
        price: this.product.price,
        category: this.product.category,
        buy: this.buy,
      });
      this.buy = 0;
      this.$router.push('/cart');
    },
    key($event) {
      if ($event.keyCode === 43
          || $event.keyCode === 69
          || $event.keyCode === 45
          || $event.keyCode === 101
          || $event.keyCode === 187
          || $event.keyCode === 189) {
        this.buy = -1;
      }
      return this.buy;
    },
  },
};
</script>

<style scoped>
    .desc{
      margin-top: 1rem;
    }
    .card-title{
        height: 3rem;
    }
    .buyBtn{
      display: none;
    }
    #productCard:hover .buyBtn, .buyBtn:hover {
      display: block;
    }
    .cat{
      display: inline;
    }
</style>
