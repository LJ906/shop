import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import ('@/pages/login')
const I18n = () => import('@/pages/myself/i18n')
const RichText = () => import('@/pages/myself/richText')
const Mself = () => import('@/pages/myself')

const Layout = () => import('@/pages/home/layout')
const Right = () => import('@/pages/myself/richText')
Vue.use(Router)

/**
 * hidden: true   是否隐藏左侧的菜单sideBar， false即显示， true 隐藏。 默认false即不写显示菜单
 * 
 */

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      hidden: true,
      component: Login
    },
    {
      path: '/',
      redirect: '/rightManage/right',
      component: Layout
    },
    {
      path: '/rightManage',
      name: 'rightManage',
      component: Layout,
      redirect: '/rightManage/right',
      meta: {
        title: 'rightManage',
      },
      children:[
        {
          path: 'right',
          component: Right,
          name: 'rightList',
          meta: {title: 'rightList'} // title 写成 rightList 在i18n中配置具体的中英文
        }
      ]
    },
    {
      path: '/myself',
      name: 'myselft',
      component: Mself,
      hidden: true,
      children: [
        {
          path: 'i18n',
          name: 'i18n',
          component: I18n
        },
        {
          path: 'richText',
          name: 'richText',
          component: RichText
        }
      ]
    },

  ]
})
