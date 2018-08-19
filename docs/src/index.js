import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import routes from './router';
import VantDoc, { progress } from 'vant-doc';
import { syncPath } from './utils';

Vue.use(VueRouter).use(VantDoc);

const router = new VueRouter({
  mode: 'hash',
  routes: routes()
});

router.beforeEach((route, redirect, next) => {
  progress.start();
  next();
});

router.afterEach(() => {
  progress.done();
  window.scrollTo(0, 0);
  syncPath(router.history.current.path);
});

Vue.config.productionTip = false;

new Vue({ // eslint-disable-line
  render: h => h(App),
  router,
  el: '#app'
});
