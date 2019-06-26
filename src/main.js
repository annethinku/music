// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import 'vant/lib/index.css';
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.API1='/login';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
