import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/getProduct.vue';
// import Product from '../views/product.vue';
import login from '../views/login.vue';
import register from '../views/register.vue';
import addProduct from '../views/addProduct.vue';
import addBanner from '../views/add-banner.vue';
import Banner from '../views/banner.vue';
import actionPage from '../views/actionProduct.vue';
import bannerActionPage from '../views/actionBanner.vue';
import bannerEditPage from '../components/bannerEditPage.vue';
import editPage from '../components/editPage.vue';
// import getProduct from '../views/getProduct.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/register',
    name: 'register',
    component: register,
  },
  {
    path: '/add',
    name: 'add',
    component: addProduct,
  },
  {
    path: '/addBanner',
    name: 'addBanner',
    component: addBanner,
  },
  {
    path: '/banner',
    name: 'Banner',
    component: Banner,
  },
  {
    path: '/banner/:id',
    name: 'banner-action',
    component: bannerActionPage,
    children: [{
      path: 'editBanner',
      name: 'editBanner',
      component: bannerEditPage,
    }],
  },
  {
    path: '/product',
    name: 'product',
    component: Home,
  },
  {
    path: '/product/:id',
    name: 'product-action',
    component: actionPage,
    children: [{
      path: 'edit',
      name: 'edit',
      component: editPage,
    }],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && to.name !== 'register' && from.name === 'register' && !localStorage.getItem('access_token')) {
    next({ name: 'register' });
  } else if ((to.name === 'login' || to.name === 'register') && localStorage.getItem('access_token')) {
    next({ name: 'product' });
  } else if (to.name !== 'login' && to.name !== 'register' && !localStorage.getItem('access_token')) {
    next({ name: 'login' });
  } else if (to.path === '/' && localStorage.getItem('access_token')) {
    next({ name: 'product' });
  } else next();
});

export default router;
