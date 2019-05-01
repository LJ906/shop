<template>
<!-- 右边 上部的导航条： 三部分 
  hamburger 用户切换左侧菜单栏的折叠 | 展开 
  breadcrumb 面包屑 
  右边工具栏 -  搜索 语言切换 退出/个人中心
 -->
  <div class="navbar">
    <!-- 菜单展开 添加 isActive -->
    <hamburger class="hamburger-container" :isActive="sidebar.opened" :toggle-click="toggleSideBar"/>
    <breadcrumb class="breadcrumb-container"/>
    <!-- 右边的工具栏  -->
    <div class="right-menu">
      <!-- 切换语言 -->
      <lang-select class="right-menu-item hover-effect" ></lang-select>
      <!-- 个人中心 -->
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img src="https://mpic.secooimg.com/images/2018/09/20/tou.png" class="user-avatar" >
          <!-- 动态获取用户头像 store.getter -->
          <!-- <img :src="avatar" class="user-avatar" > -->
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>{{$t('generateTitle.navUserCenter.home')}}</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>{{$t('generateTitle.navUserCenter.userCenter')}}</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block" @click="loginout">
              {{$t('generateTitle.navUserCenter.logOut')}}
            </span>
            </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Hamburger from '@/components/hamburger'
import Breadcrumb from '@/components/Breadcrumb'
// 切换语言组件
import LangSelect from '@/components/LangSelect' 

import {mapGetters} from 'vuex'

export default {
  name: 'navbar', 
  components: {
    Hamburger,
    Breadcrumb,
    LangSelect
  },
  created() {
    // console.log('options', this.$router.options);
    // console.log('options', this.$router.options.routes);
    
  },
  computed: {
    ...mapGetters(['sidebar', 'device'])
  },
  methods: {
    // 汉堡包 的切换菜单栏的折叠展开
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
    },

    // 退出
    loginout () {
      // 调用store 中的方法退出， 退出后页面重新加载 window.location.reload();

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
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

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
      
    }

  }
</style>
