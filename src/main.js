import Vue from 'vue';
import Vuex from 'vuex';
import VResource from "vue-resource";
import App from './App';
import router from './router';
import Layout from './components/layout';

import store from './store'

Vue.use(VResource);
// Vue.prototype.$eventHub= Vue.prototype.$eventHub ||  new Vue()
Vue.config.productionTip = false
new Vue({
  el: '#app',
  store,
  router,
  components: { Layout },
  template: '<Layout/>',
  data:{
    eventHub:new Vue()
  }
})
