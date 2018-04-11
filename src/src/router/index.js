import Vue from 'vue'
import Router from 'vue-router'
import compile from '@/components/compile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'compile',
      component: compile
    }
  ]
})
