import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    banners: [],
    loggedIn: false,
    access_token: null,
    errMsg: '',
    checkoutMsg: '',
    addToCartMsg: '',
    unCartMsg: '',
    failCheckout: '',
  },
  mutations: {
    loggedIn(state, payload) {
      state.loggedIn = payload;
    },
    toRegister(state, payload) {
      state.access_token = payload;
      localStorage.setItem('access_token', payload);
      state.loggedIn = true;
    },
    getAccessToken(state, payload) {
      state.access_token = payload;
      localStorage.setItem('access_token', payload);
      state.loggedIn = true;
    },
    getProduct(state, payload) {
      state.products = payload;
    },
    getProductByCategory(state, payload) {
      state.products = [payload];
    },
    getBanner(state, payload) {
      state.banners = payload;
    },
    error(state, payload) {
      state.errMsg = payload.message;
    },
    cleanErrMsg(state) {
      state.errMsg = '';
    },
    signOut(state) {
      state.loggedIn = false;
      localStorage.removeItem('access_token');
    },
    getProductByTitle(state, payload) {
      state.products = payload;
    },
    getCart(state, payload) {
      state.products = payload;
    },
    checkout(state, payload) {
      state.checkoutMsg = `Successfully checkout ${payload}`;
    },
    addToCart(state, payload) {
      state.addToCartMsg = `Successfully added ${payload} to cart`;
    },
    unCart(state, payload) {
      state.unCartMsg = `Succesfully un-Cart ${payload}`;
    },
    failToCheckout(state) {
      state.failCheckout = 'Failed to checkout';
    },
  },
  actions: {
    loggedIn(context) {
      if (localStorage.getItem('access_token') && localStorage.getItem('access_token') !== undefined) {
        context.commit('loggedIn', true);
      }
    },
    toRegister(context, payload) {
      return fetch('http://localhost:3000/customer/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.errorCode) {
            context.commit('toRegister', data.access_token);
            context.commit('cleanErrMsg');
          } else {
            context.commit('error', data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAccessToken(context, payload) {
      return fetch('http://localhost:3000/customer/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.errorCode) {
            context.commit('getAccessToken', data.access_token);
            context.commit('cleanErrMsg');
          } else {
            context.commit('error', data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getProduct(context) {
      return fetch('http://localhost:3000/productCustomer', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token'),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          context.commit('getProduct', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getBanner(context) {
      return fetch('http://localhost:3000/banner', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token'),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          context.commit('getBanner', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getProductByCategory(context, payload) {
      return fetch(`http://localhost:3000/productCustomer/category/${payload.category}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token'),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.errorCode) {
            context.commit('getProductByCategory', data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    signOut(context) {
      context.commit('signOut');
    },
    getProductByTitle(context, payload) {
      return fetch(`http://localhost:3000/productCustomer/search/${payload.title}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token'),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.errorCode) {
            context.commit('getProductByTitle', data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addToCart(context, payload) {
      console.log(payload);
      return fetch('http://localhost:3000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token'),
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then(() => {
          context.commit('addToCart', payload.name);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCart(context) {
      return fetch('http://localhost:3000/cart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token'),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.errorCode) {
            context.commit('getCart', data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkout(context, payload) {
      return fetch(`http://localhost:3000/cart/${payload.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token'),
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.errorCode) {
            context.commit('checkout', payload.name);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    unCart(context, payload) {
      return fetch(`http://localhost:3000/cart/decrease/${payload.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token'),
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.errorCode) {
            context.commit('unCart', data.name);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    failToCheckout(context) {
      return context.commit('failToCheckout');
    },
  },
  modules: {
  },
});
