// lj router
import Vue from 'vue'
import Router from 'vue-router'
import {asyncRouterMap} from './data/index'
const Layout = () => import('@/pages/LayOut/layout')
Vue.use(Router)
/**
 * 是否隐藏左侧的菜单sideBar， false即显示， true 隐藏。 默认false即不写显示菜单
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
 **/

export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/pages/login')
  },
  asyncRouterMap,
  {
    path: '/404',
    name: 'Page404',
    hidden: true,
    component: () => import('@/pages/errorPage/404')
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
