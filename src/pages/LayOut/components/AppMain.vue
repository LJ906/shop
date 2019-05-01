<template>
  <section class="app-mian">
    <transition name="fade-transform" mode="out-in">
      <!-- 需要缓存的路由  -->
      <!-- <kee-alive v-if="$route.meta.keepAlive">
        <router-view :key="key" />
      </kee-alive> -->
      <!-- 不缓存的路由 -->
      <router-view :key="$route.fullPath"/>
    </transition >
  </section>
</template>

<script>
export default {
  name: 'AppMain'
};
</script>

<style scoped>
.app-main {
  /* navbar 高度50px */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
