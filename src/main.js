import Vue from 'vue';
import VResource from "vue-resource";
import router from './router';
import Layout from './components/layout';
import store from './store';
import "./components/global.JS"

Vue.use(VResource);
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
