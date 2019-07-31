<template>
  <div :class="{'has-logo':showLogo}">
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <!-- <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" /> -->
        <sidebar-item v-for="route in routeMenus" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/style/variables.scss'
import {asyncRouterMap} from '@/router/data' // 模拟后台返回的动态路由表

export default {
  components: { SidebarItem, Logo },
  created() {
    // 获取路由列表,后续转到登录成功后获取调用此方法，生成左侧菜单及
    this.$store.dispatch('GenerateRoutes', asyncRouterMap)
    // this.$router.addRoutes(this.addRouters)  
  },
  computed: {
    ...mapGetters([
      'addRouters',
      'sidebar'
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
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    routeMenus() {
      return this.addRouters.filter(route=> {
        return !route.hidden
      })
    }
  }
}
</script>
