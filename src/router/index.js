import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '../pages/index.vue'
import detailsPage from '../pages/details.vue'
import analysisPage from '../pages/details/analysis.vue'
import publishPage from '../pages/details/publish.vue'
import forecastPage from '../pages/details/forecast.vue'
import countPage from '../pages/details/count.vue'
import orderListPage from '../pages/orderList.vue'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      component:indexPage,
      name:'index',
    }, 
    {
      path: '/orderList',
      component:orderListPage,
      name:'orderList',
    }, 
    {
      path: '/details',
      component:detailsPage,
      name:'details',
      redirect:'/details/analysis',
      children:[
        {
          path:'analysis',
          component:analysisPage,
        },
        {
          path:'forecast',
          component:forecastPage,
        },
        {
          path:'publish',
          component:publishPage,
        },
        {
          path:'count',
          component:countPage,
        },
      ],
    }, 
  ]
})
