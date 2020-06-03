import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Product from '../views/product.vue';
import titleProduct from '../views/title.vue';
import register from '../views/register.vue';
import login from '../views/login.vue';
import cart from '../views/cart.vue';
import ProductInCategory from '../views/productCategory.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: register,
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: cart,
  },
  {
    path: '/product/title',
    name: 'ProductTitle',
    component: titleProduct,
  },
  {
    path: '/product/:category',
    name: 'ProductInCategory',
    component: ProductInCategory,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
