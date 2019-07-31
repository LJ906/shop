<template>
  <div >
    <!-- 默认选中的左侧菜单 1级路径 route.path  -->
    <el-menu
      :router = "true"
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      mode="vertical"
      :active-text-color="variables.menuActiveText">
        <menu-item v-for="menu in routeMenus" :menu="menu" :key="menu.path"></menu-item>
    </el-menu> 
  </div>
</template>

<script>
// 引入变量样式
import variables from '@/style/variables.scss'
import { mapGetters } from 'vuex'
import {asyncRouterMap} from '@/router/data' // 模拟后台返回的动态路由表
import menuItem from './menuItem'

export default {
  name: 'sidebar',
  components: {
    menuItem
  },
  data () {
    return {
    }
  }, 
  created() {
    // 获取路由列表,后续转到登录成功后获取调用此方法，生成左侧菜单及
    this.$store.dispatch('GenerateRoutes', asyncRouterMap)
    this.$router.addRoutes(this.addRouters)  
  },
  computed: {
    //   addRouters菜单栏需要显示的路由列表
    ...mapGetters([
      'sidebar', 
      'addRouters'
    ]),
    variables () { // 为什么这里要用输出一下，直接用不行吗？
      return variables
    }, 
    isCollapse () {
      // 菜单栏是否需要折叠
    //   console.log('iscollapse', !this.sidebar.opened)
      return !this.sidebar.opened
    },
    routeMenus() {
      return this.addRouters.filter(route=> {
        return !route.hidden
      })
    }
  },
}
</script>

<style>
 
</style>
