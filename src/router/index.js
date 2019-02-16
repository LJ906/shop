import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import ('@/pages/login')
const Home = () => import('@/pages/home')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }

  ]
})
