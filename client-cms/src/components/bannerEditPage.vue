<template>
    <div>
    <b-form @submit.prevent="onEdit" class="editForm">
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
      <br />
      <b-button variant="warning" class="editButton" type="submit">Edit Banner</b-button>
    </b-form></div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      name: null,
      image: null,
      errMsg: '',
    };
  },
  async created() {
    await this.$store.dispatch('getBannerDataById', { id: this.id });
    this.name = this.$store.state.currentBanner.name;
    this.image = this.$store.state.currentBanner.image_url;
  },
  methods: {
    async onEdit() {
      await this.$store.dispatch('updateBanner', {
        id: this.id,
        name: this.name,
        image_url: this.image,
      });
      if (this.$store.state.errMsg) {
        this.errMsg = this.$store.state.errMsg;
      } else {
        this.$router.push('/banner');
      }
    },
  },
};
</script>

<style scoped>
.editForm {
  margin: auto 20rem;
}
.editButton {
  margin: 0 10rem;
}
.error{
    color: red;
}
</style>
