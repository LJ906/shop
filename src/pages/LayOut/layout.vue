<template>
  <!-- classObj 全局设置菜单栏的样式 -->
  <div class="app-wrapper" :class="classObj"> 
    <!-- 仅 小屏幕 + 显示菜单 时的遮罩层mask  -->
    <div v-if="device==='mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <app-main/>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/sidebar'
import Navbar from './components/Navbar'
import AppMain from './components/AppMain'
export default {
  name: 'layout',
  components: {
    Sidebar,
    Navbar,
    AppMain
  },
  mounted () {
    console.log(' Path', this.$route.path);
    console.log('fullPath', this.$route.fullPath);
    
  },
  computed: {
    sidebar () {
      // return this.$store.state.app.sidebar
      return this.$store.getters.sidebar
    },
    device () {
      return this.$store.state.app.device
    },
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }

  }, 
  methods: {
    handleClickOutside (){
      // 点击mask 隐藏菜单按钮且mobile状态下不显示菜单 （添加hideSidebar 类名）即改变vuex中的 sidebar.opened
      this.$store.commit('CLOSE_SIDEBAR', {withoutAnimation: false});
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/style/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

  }
 .drawer-bg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    background: #000;
  }

</style>
 
 
