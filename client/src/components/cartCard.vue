<template>
  <div id="productCard">
    <b-card
      :title="product.name"
      :img-src="product.image_url"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 15rem; max-height: max-content; height: 35rem; font-weight:bold;"
      class="mb-2"
    >
      <div class="cat">
        <b-card-text>Category:  {{ product.category }} </b-card-text>
      </div>
      <div v-if="product.stock > 0">
        <b-card-text>Items: {{ product.stock }}</b-card-text>
        <input type='number' v-model="buy" :max="product.stock" :min="1" />
      </div>
      <div v-if="product.stock <= 0">
        <b-card-text>Stock: Out of stock</b-card-text>
      </div>
      <div class="desc">
        <b-card-text>Price:
        <br>
        Rp. {{ product.price }} / book
        </b-card-text>
        <b-card-text>Total:
        <br>
        Rp. {{ this.price }}
        </b-card-text>
      </div>
      <div class="buyBtn" v-if="product.stock > 0 && this.$store.state.loggedIn">
        <b-button href="#" variant="warning" @click.prevent="checkout">Checkout</b-button>
        <b-button href="#" variant="danger" @click.prevent="unCart">Un-Cart</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buy: this.product.stock,
    };
  },
  computed: {
    price() {
      return (this.buy * this.product.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.');
    },
  },
  watch: {
    buy(newValue) {
      if (newValue > this.product.stock) {
        this.buy = this.product.stock;
      } else if (newValue < 0) {
        this.buy = 0;
      } else {
        this.buy = newValue;
      }
      return this.buy;
    },
  },
  props: ['product'],
  methods: {
    async checkout() {
      if (this.buy > this.product.stock) {
        await this.$store.dispatch('failToCheckout');
        this.$router.push('/product');
      }
      await this.$store.dispatch('checkout', {
        id: this.product.id,
        name: this.product.name,
        image_url: this.product.image_url,
        stock: this.product.stock,
        price: this.product.price,
        category: this.product.category,
        buy: this.buy,
      });
      this.buy = 0;
      this.$router.push('/product');
    },
    async unCart() {
      await this.$store.dispatch('unCart', {
        id: this.product.id,
        buy: this.buy,
      });
      this.buy = 0;
      this.$router.push('/product');
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
      padding-bottom: 0px;
    }
    #productCard:hover .buyBtn, .buyBtn:hover {
      display: block;
    }
    .cat{
      display: inline;
    }
</style>
