<template>
  <div class="whiteTable">
  <h1 class="title">Add Product</h1>
    <b-form @submit.prevent="onAdd" class="addForm">
      <label for="name">Name:</label>
      <input v-model="name" type="text" class="form-control" />
      <p class="error" v-if="errMsg.name">
          {{ this.errMsg.name }}
      </p>
      <label for="image">Image url:</label>
      <input v-model="image" type="url" class="form-control" />
      <p class="error" v-if="errMsg.image_url">
          {{ this.errMsg.image_url }}
      </p>
      <label for="price">Price:</label>
      <input v-model="price" type="number" class="form-control" />
      <p class="error" v-if="errMsg.price">
          {{ this.errMsg.price }}
      </p>
      <label for="stock">Stock:</label>
      <input v-model="stock" type="number" class="form-control" />
      <p class="error" v-if="errMsg.stock">
          {{ this.errMsg.stock }}
      </p>
      <label for="category">Category:</label>
      <b-form-select v-model="category" :options="options"></b-form-select>
      <p class="error" v-if="errMsg.category">
          {{ this.errMsg.category }}
      </p>
      <br />
      <br />
      <b-button variant="success" class="addButton" type="submit">Add Product</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: null,
      image: null,
      price: null,
      stock: null,
      category: null,
      errMsg: '',
      options: [
        { value: 'Psikologi', text: 'Psikologi' },
        { value: 'Romance', text: 'Romance' },
        { value: 'Komik', text: 'Komik' },
        { value: 'Sains', text: 'Sains' },
        { value: 'Finansial', text: 'Finansial' },
        { value: 'Bisnis & Ekonomi', text: 'Bisnis & Ekonomi' },
        { value: 'Anak-Anak', text: 'Anak-Anak' },
        { value: 'Lifestyle', text: 'Lifestyle' },
        { value: 'Kamus', text: 'Kamus' },
        { value: 'Agama', text: 'Agama' },
        { value: 'Kuliner', text: 'Kuliner' },
        { value: 'Seni & Desain', text: 'Seni & Desain' },
        { value: 'Komputer', text: 'Komputer' },
        { value: 'Sastra', text: 'Sastra' },
        { value: 'Ilmu Sosial', text: 'Ilmu Sosial' },
        { value: 'Hukum', text: 'Hukum' },
      ],
    };
  },
  methods: {
    async onAdd() {
      await this.$store.dispatch('toAddProduct', {
        name: this.name,
        image_url: this.image,
        price: this.price,
        stock: this.stock,
        category: this.category,
      });
      if (this.$store.state.errMsg) {
        this.errMsg = this.$store.state.errMsg;
      } else {
        this.$router.push('/');
      }
    },
  },
};
</script>

<style scoped>
.title{
    text-align: center;
}
.addForm {
  margin: auto 20rem;
}
.addButton {
  margin: 0 10rem;
}
.error{
    color: red;
}
.whiteTable{
  background-color: white;
  opacity: 0.88;
  border-radius: 1.5rem;
  padding: 1rem;
}
</style>
