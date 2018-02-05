// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import boot from './boot'
import SideMenu from '@/components/SideMenu'

import '@/assets/base.css'
Vue.config.productionTip = false
Vue.component('side-menu', SideMenu)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: boot.router,
  methods: {
    getConfig (lang) {
      if (!lang && !boot.config.lang) {
        return boot.config
      }
      return boot.config.lang[lang]
    }
  },
  components: { App },
  template: '<App/>'
})
