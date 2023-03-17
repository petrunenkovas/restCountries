import Vue from 'vue'
import Router from 'vue-router'
import BaseLayout from '@/components/Layout/BaseLayout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: BaseLayout,
      children: [
        { path: '', component: () => import('../components/ContriesList/CountriesList.vue') },
        //{ path: 'details/:idProduct', component: () => import('../views/home/Details.vue') }
      ]
    }
  ]
})
