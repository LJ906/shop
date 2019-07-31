<template>
  <div >
    <!-- 默认选中的左侧菜单 1级路径 route.path  -->
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :unique-opened="false"
      :collapse-transition="false"
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
    // this.$router.addRoutes(this.addRouters)  
  },
  computed: {
    //   addRouters菜单栏需要显示的路由列表
    ...mapGetters([
      'sidebar', 
      'addRouters'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      // return this.$store.state.settings.sidebarLogo
      return true
    },

    variables () {  
      return variables
    }, 
    isCollapse () {
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
