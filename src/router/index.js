// lj router
import Vue from 'vue'
import Router from 'vue-router'

import routerComponents from './routerComponents'
const Login = () => import('@/pages/login')
// const I18n = () => import('@/pages/myself/i18n')
// const RichText = () => import('@/pages/myself/richText')
// const Mself = () => import('@/pages/myself')
const Page404 = () => import('@/pages/errorPage/404')
// const Page401 = () => import('@/pages/errorPage/401')

const Layout = () => import('@/pages/LayOut/layout')
const RightList = () => import('@/pages/RightManage/rightList')
const EmitDemo = () => import('@/pages/emitDemo')
Vue.use(Router)

/**
 * hidden: true   是否隐藏左侧的菜单sideBar， false即显示， true 隐藏。 默认false即不写显示菜单
 * 
 */
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: Login
  },
  {
    path: '/',
    component: routerComponents.Layout,
    hidden: true,
    redirect: '/rightManage/rightList'
  },
  {
    path: '/rightManage',
    component: routerComponents.Layout,
    redirect: 'rightList',
    name: 'rightManage',
    meta: {
      title: 'rightManage',
      icon: ''
    },
    children: [
      {
        path: 'rightList',
        component: routerComponents.RightList,
        name: 'rightList',
        meta: { title: 'rightList' , icon: ''} // title 写成 rightList 在i18n中配置具体的中英文
      },
      
    ]
  },
  {
    path: '/emitDemo',
    component: EmitDemo,
    name: 'EmitDemo',
    meta: { title: 'EmitDemo', icon: '' } // title 写成 rightList 在i18n中配置具体的中英文
  },
  // {
  //   path: '/myself',
  //   name: 'myselft',
  //   component: routerComponents.Mself,
  //   hidden: true,
  //   meta: { title: 'myselft', icon: '' },
  //   children: [
  //     {
  //       path: 'i18n',
  //       name: 'i18n',
  //       component: routerComponents.I18n,
  //       meta: { title: 'myselft', icon: '' },
  //     },
  //     {
  //       path: 'richText',
  //       name: 'richText',
  //       component: routerComponents.RichText,
  //       meta: { title: 'myselft', icon: '' },
  //     }
  //   ]
  // },
  // 404页面
  {
    path: '/404',
    name: 'Page404',
    hidden: true,
    component: Page404
  },
  {
    path: '*', // 放到最后
    redirect: '/404',
    hidden: true,
  },
]
export default new Router({
  routes: constantRouterMap
})

// 后续获取到动态路由后contact 到 constantRouterMap中
