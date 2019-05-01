// 1.获取动态路由 + 2.把动态的和静态路由合并
import Router from '@/router'
import {constantRouterMap} from '@/router'
// routerComponents组件对象，各组件都挂载为其属性，比如：LayOut = routerComponents.LayOut
import routerComponents from '@/router/routerComponents'
 
// 方法一、 后台返回路由列表
// 方法2. 后台返回用户角色，前端根据用户角色匹配 （复杂）

// 方法1. 

/**
 * 把后台传来的字符串组件名字转为组件对象。
 * @param {*} asyncRouterMap 后台传来的路由字符串
 */
function filterAsyncRouter (asyncRouterMap) { 
  // 有权限的路由 递归子路由
  const accessedRouters = asyncRouterMap.filter (route => {
    if (route.component) {
      route.component = routerComponents[route.component]
    }

    // 递归子路由
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })

  return accessedRouters
}

export default {
  state: {
    routers: [], // 最终需要显示的权限列表
    addRouters: [], // 动态获取的路由,（左侧菜单）
    // constantRouterMap: constantRouterMap
  },
  mutations: {
    // router : 动态获取的
    SET_ROUTERS: (state, routers)=> {    
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    // 拿到动态路由后调用此方法，将动态路由整合到静态路由中
    GenerateRoutes: ({commit}, data)=> {
      return new Promise(resolve => {
        const accessedRouters = filterAsyncRouter(data)
         commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}
