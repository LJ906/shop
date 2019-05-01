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
      <!-- 动态输出侧边栏 -->
      <el-submenu
        v-for="(level1, i) in routeMenus"
        :key="i"
        :index="level1.path">
        <template slot="title" >
          <i class="el-icon-location">{{level1.path}}</i>
          <span v-if="!level1.hideOnSideBar">{{ $t('generateTitle.'+[level1.meta.title])  }}</span>
        </template>
          <el-menu-item  
            v-for="(level2, i) in level1.children"
            :key="i"
            :index="level1.path + '/'+level2.path">
            <span>{{ $t('generateTitle.'+[level2.meta.title]) + 'path:' +level2.path}} </span>
          </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
// 引入变量样式
import variables from '@/style/variables.scss'
import { mapGetters } from 'vuex'
import {asyncRouterMap} from '@/router/data' // 模拟后台返回的动态路由表
export default {
  name: 'sidebar',
  data () {
    return {
      // 权限列表
      menus: [
        {
          "id": 101,
          "authName": "权限管理",
          "path": "/rightManage",
          meta: { title: '权限管理', icon: '' },
          "children": [
            {
              "id": 112,
              "authName": "权限列表",
              meta: { title: '权限列表', icon: '' },
              "path": "/rightManage/rightList",
              "children": []
            },
            {
              "id": 111,
              "authName": "角色列表",
              meta: { title: '角色列表', icon: '' },
              "path": "/rightManage/roleList",
              "children": []
            }             
          ]
        },
        {
          "id": 102,
          "authName": "商品管理",
          meta: { title: '商品管理', icon: '' },
          "path": "/productManage",
          "children": [
            {
              "id": 104,
              "authName": "商品列表",
              meta: { title: '商品管理', icon: '' },
              "path": "/productList",
              "children": []
            },
            {
              "id": 105,
              "authName": "分类参数",
              meta: { title: '商品管理', icon: '' },
              "path": "/categorieParams",
              "children": []
            },
            {
              "id": 106,
              "authName": "商品分类",
              meta: { title: '商品管理', icon: '' },
              "path": "/productCategories",
              "children": []
            }
          ]
        },
        {
          "id": 103,
          "authName": "订单管理",
          meta: { title: '商品管理', icon: '' },
          "path": "/order",
          "children": [
            {
              "id": 131,
              "authName": "订单列表",
              meta: { title: '商品管理', icon: '' },
              "path": "/order",
              "children": []
            }
          ]
        },
        {
          "id": 104,
          "authName": "数据统计",
          meta: { title: '商品管理', icon: '' },
          "path": "/order",
          "children": [
            {
              "id": 141,
              "authName": "数据报表",
              meta: { title: '商品管理', icon: '' },
              "path": "/order",
              "children": []
            }
          ]
        }
      ]
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
