<template>
<!-- 右边 上部的导航条： 三部分 
  hamburger 用户切换左侧菜单栏的折叠 | 展开 
  breadcrumb 面包屑 
  右边工具栏 -  搜索 退出 个人中心
 -->
  <div class="navbar">
    <!-- 菜单展开 添加 isActive -->
    <hamburger class="hamburger-container" :isActive="sidebar.opened" :toggle-click="toggleSideBar"/>
    <breadcrumb/>
  </div>
</template>

<script>
import Hamburger from '@/components/hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import {mapGetters} from 'vuex'

export default {
  name: 'navbar', 
  components: {
    Hamburger,
    Breadcrumb
  },
  computed: {
    ...mapGetters(['sidebar', 'device'])
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }
  }
</style>
