import Vue from 'vue'
import Router from 'vue-router'
import BaseLayout from '@/layout/BaseLayout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: BaseLayout,
      children: [
        { path: '', component: () => import('../views/CountriesList.vue') },
        { path: 'details/:countryName', component: () => import('../views/CountryDetails.vue') }
      ]
    }
  ]
})
