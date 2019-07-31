// @router/data/index.js 模拟后台返回的动态路由表

const Layout = () => import('@/pages/LayOut/layout')

export const asyncRouterMap = [
    
    {
        path: '/home',
        component: Layout,
        redirect: '/rightList',
        name: '第一组',
        meta: { title: '第一组', icon: 'edit' },
        children: [
            {
                path: '/rightList',
                component: () => import('@/pages/RightManage/rightList'),
                name: 'rightList',
                meta: { title: 'rightList', icon: 'icon' } // title 写成 rightList 在i18n中配置具体的中英文
            },
            {
                path: 'emitDemo',
                component: () => import('@/pages/RightManage/rightList'),
                name: 'rightList',
                meta: { title: 'rightList', icon: 'icon' } // title 写成 rightList 在i18n中配置具体的中英文
            },
        ]
    },
    {
        path:'/directive', 
        name: 'directive', 
        component: Layout, 
        meta: {title: '自定义指令', icon: 'edit'},
        children: [
            {
                path: 'emitDemo',
                component: () => import('@/pages/emitDemo'),
                name: 'EmitDemo',
                meta: { title: '自定义双向绑定指令', icon: '' }
            },
            {
                path: 'emitDemo2',
                component: () => import('@/pages/emitDemo'),
                name: 'EmitDemo2',
                meta: { title: '自定义双向绑定指令', icon: '' }
            },
        ]
    },

    {
        path: '/myself',
        name: 'myself',
        component: Layout,
        meta: { title: '测试组', icon: 'el-icon-s-tools' },
        children: [
            {
                path:'/i18n',
                name: 'i18n',
                component: () => import('@/pages/myself/i18n'),
                meta: { title: 'I18n', icon: '' },
            },
            {
                path: 'richText',
                name: 'richText',
                component: () => import('@/pages/myself/richText'),
                meta: { title: '富文本', icon: '' },
            },
        ]
    },

]

