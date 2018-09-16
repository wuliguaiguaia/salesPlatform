import Vue from 'vue'
import Vuex from 'vuex'
import orderList from './modules/orderList.js'
import price from './modules/price.js'

Vue.use(Vuex);
export  default new Vuex.Store({
    modules:{
        orderList,price
    }
})
