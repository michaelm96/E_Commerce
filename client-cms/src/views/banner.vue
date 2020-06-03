<template>
    <div class="table-responsive whiteTable">
      <h1 class="productTitle">Banner List</h1>
      <table class="table table-bordered" v-if="!editTable">
        <thead class="tableHead">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Image Url</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <list-banner
            v-for="(item,index) in this.$store.state.banners"
            :key="index"
            :item="item"
            :index="index"
          />
        </tbody>
      </table>
    </div>
</template>

<script>
import listBanner from '../components/listBanner.vue';

export default {
  data() {
    return {
      editTable: false,
    };
  },
  created() {
    this.$store.dispatch('getBanner');
  },
  components: {
    'list-banner': listBanner,
  },
};
</script>

<style scoped>
.whiteTable {
  background-color: white;
  opacity: 0.88;
  border-radius: 1.5rem;
}
.tableHead {
  color: azure;
  background-color: dimgrey;
}
.productTitle {
  text-align: center;
  background: transparent;
}
</style>
