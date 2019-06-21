import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import routes from './router';
import VantDoc from '@vant/doc';

Vue.use(VueRouter).use(VantDoc);

const router = new VueRouter({
  mode: 'hash',
  routes: routes()
});

const ua = navigator.userAgent.toLowerCase();
const isMobile = /ios|iphone|ipod|ipad|android/.test(ua);

router.beforeEach((route, redirect, next) => {
  if (isMobile) {
    location.replace('https://youzan.github.io/vant/mobile.html?weapp=1');
  }

  next();
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});

Vue.config.productionTip = false;

new Vue({ // eslint-disable-line
  render: h => h(App),
  router,
  el: '#app'
});
