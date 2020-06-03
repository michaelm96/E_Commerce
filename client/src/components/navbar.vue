<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#" @click.prevent="toHome">M96 Bookstore</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link to="/product" class="navBar">
            <li>Product</li>
          </router-link>
        </b-navbar-nav>

        <form @submit.prevent="search">
          <div class="form-row">
            <b-navbar-nav class="searchBar col-10">
              <b-form-input v-model="title" placeholder="Search Item"></b-form-input>
            </b-navbar-nav>
            <b-button size="md" variant="primary" class="mb-2 search" type="submit">
              <b-icon icon="search" aria-label="Help"></b-icon>
            </b-button>
          </div>
        </form>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="this.$store.state.loggedIn">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <strong>Option</strong>
            </template>
            <b-dropdown-item href="#" >
             <router-link class="cart" :to="{ path: `/cart`}">Shopping Cart</router-link>
            </b-dropdown-item>
            <b-dropdown-item href="#" @click.prevent="signOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-if="!this.$store.state.loggedIn">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <strong>User</strong>
            </template>
              <b-dropdown-item href="#">
                <router-link :to="{ path: `/register`}">Register</router-link>
              </b-dropdown-item>
              <b-dropdown-item href="#">
                <router-link :to="{ path: `/login`}">Login</router-link>
              </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: null,
    };
  },
  methods: {
    toHome() {
      this.$router.push('/');
      this.title = null;
    },
    signOut() {
      this.$store.dispatch('signOut');
      this.$router.push('/');
    },
    search() {
      this.$store.dispatch('getProductByTitle', { title: this.title });
      this.$router.push(`/product/title?keyword=${this.title}`);
    },
  },
};
</script>

<style scoped>
.navBar {
  color: white;
  text-decoration: none;
}
.searchBar {
  margin: 0.6rem 1rem 0 auto;
  width: 50rem;
}
.search {
  margin-top: 0.6rem;
  margin-right: 2rem;
}
.cart{
  text-decoration: none;
  color: black;
}
</style>
