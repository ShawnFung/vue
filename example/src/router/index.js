import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Page1 from '@/views/Page1'
import Page2 from '@/views/Page2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [{
        path: '',
        component: Page1
      }, {
        path: 'page2',
        component: Page2
      }]
    }
  ]
})
