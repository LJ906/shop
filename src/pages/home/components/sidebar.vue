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
        v-for="level1 in menus"
        :key="level1.id"
        :index="level1.path">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ level1.authName }}</span>
        </template>
        <el-menu-item          
          v-for="level2 in level1.children"
          :key="level2.id"
          :index="level2.path">
        {{level2.authName}}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
// 引入变量样式
import variables from '@/style/variables.scss'
import { mapGetters } from 'vuex'

export default {
  name: 'sidebar',
  data () {
    return {
      // 权限列表
      menus: [
        {
          "id": 101,
          "authName": "权限管理",
          "path": "/rights",
          "children": [
            {
              "id": 112,
              "authName": "权限列表",
              "path": "/rights",
              "children": []
            },
            {
              "id": 111,
              "authName": "角色列表",
              "path": "/roles",
              "children": []
            }             
          ]
        },
        {
          "id": 102,
          "authName": "商品管理",
          "path": "/categories",
          "children": [
            {
              "id": 104,
              "authName": "商品列表",
              "path": "/categories",
              "children": []
            },
            {
              "id": 105,
              "authName": "分类参数",
              "path": "/categories",
              "children": []
            },
            {
              "id": 106,
              "authName": "商品分类",
              "path": "/categories",
              "children": []
            }
          ]
        },
        {
          "id": 103,
          "authName": "订单管理",
          "path": "/order",
          "children": [
            {
              "id": 131,
              "authName": "订单列表",
              "path": "/order",
              "children": []
            }
          ]
        },
        {
          "id": 104,
          "authName": "数据统计",
          "path": "/order",
          "children": [
            {
              "id": 141,
              "authName": "数据报表",
              "path": "/order",
              "children": []
            }
          ]
        }
      ]
    }
  }, 
  computed: {
    ...mapGetters(['sidebar']),
    variables () { // 为什么这里要用输出一下，直接用不行吗？
      return variables
    }, 
    isCollapse () {
      // 菜单栏是否需要折叠
      return !this.sidebar.opened
    }
  }
}
</script>

<style>

</style>
