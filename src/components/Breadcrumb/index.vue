<template>
  <el-breadcrumb separator="/" class="app-breadcrumb">
    <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
            <!-- 做国际化的时候用$t -->
            <!-- <span v-if="item.redirect == 'noredirect' || index == levelList.length-1">{{ $t('generateTitle.' + item.meta.title)}}</span>
            <a v-else @click.prevent="handleLink(item)">{{ $t('generateTitle.' + item.meta.title)}}</a>-->
            <span
            v-if="item.redirect == 'noredirect' || index == levelList.length-1"
            >{{item.meta.title}}</span>
            <a v-else @click.prevent="handleLink(item)">{{item.meta.title}}</a>
        </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
// 多语言i18n 调用 {{$t('user.name')}}
export default {
    name: "breadcrumb",
    data() {
        return {
        levelList: []
        };
    },
    created() {
        this.getBreadcrumb();
    },
    methods: {
        // 通过路径获取面包屑数据
        getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name);

        // 匹配路径meta中有title 的 && meta中的 breadcrumb != false
        this.levelList = matched.filter(item => {
            return item.meta && item.meta.title;
        });
        },
        // 面包屑回跳， 有redirect的跳转redirect  无跳转路由path
        handleLink(item) {
        const { redirect, path } = item;
        if (redirect) {
            this.$router.push(redirect);
            return;
        }
        this.$router.push(path);
        }
    },
    watch: {
        $route(newValue, oldValue) {
        this.getBreadcrumb();
        }
    }
};
</script>

<style rel="stlesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;
    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
}
</style>
