<template>
  <div class="home">
    <banner />
    <h1>Categories</h1>
    <br />
    <b-row>
      <b-col lg="3" class="pb-2" v-for="(category, index) in this.categories" :key="index">
        <router-link :to="{ path: `/product/${ category.text }`}">
          <b-button size="lg" class="buttonCategory"
          style="font-weight: bold;">{{ category.text }}</b-button>
        </router-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import banner from '@/components/banner.vue';

export default {
  name: 'Home',
  data() {
    return {
      categories: [
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
  components: {
    banner,
  },
};
</script>

<style scoped>
.buttonCategory {
  background: transparent;
  color: black;
}
</style>
