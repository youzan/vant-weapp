import Vue from 'vue';
import Preview from './Preview.vue';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  render: h => h(Preview)
});
