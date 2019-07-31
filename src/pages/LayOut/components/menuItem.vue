<template>
  <el-submenu v-if="menu.children && menu.children.length >= 1" :index="menu.path" >
    <span slot="title">
      <i :class="menu.meta.icon"></i>
      {{ menu.meta.title}}
    </span>
   
    <menu-item v-for="item in menu.children" :key="item.path" :menu="item"></menu-item>
  </el-submenu>
  <el-menu-item
    v-else
    :key="menu.path"
    :index="menu.path"
    :route="{name: menu.name}"
    @click="handleRoute(menu)"
  >
    <!-- <i :class="menu.meta.icon"></i> -->
    <span slot="title">{{ menu.meta.title}}</span>
  </el-menu-item>
</template>

<script>
  export default {
    name: "menuItem",
    props: {
      menu: {
        type: Object,
        required: true
      }
    },
    // inject: ['reload'], 
    methods: {
      handleRoute(menu) {
      //   let path = menu.path
      //   let name = menu.name
      //   console.log('path', path)
      //   this.$router.push({name: name})
      //   // this.$router.push(path)
      }
    }
  }
</script>

<style scoped>

</style>
