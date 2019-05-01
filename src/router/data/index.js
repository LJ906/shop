// @router/data/index.js 模拟后台返回的动态路由表
export const asyncRouterMap = [
  {
    path: '/myself',
    name: 'myselft',
    component: 'Mself',
    meta: { title: 'myselft', icon: '' },
    children: [
      {
        path: 'i18n',
        name: 'i18n',
        component: 'I18n',
        meta: { title: 'I18n', icon: '' },
      },
      {
        path: 'richText',
        name: 'richText',
        component: 'RichText',
        meta: { title: 'RichText', icon: '' },
      },
      {
        path: 'echarts',
        name: 'echarts',
        component: 'Echarts',
        meta: { title: 'echarts', icon: '' },
      }
    ]
  },

]

export const data = {
  "router": [
    {
      "path": "",
      "component": "Layout",
      "redirect": "dashboard",
      "children": [
        {
          "path": "dashboard",
          "component": "dashboard/index",
          "meta": {
            "title": "首页",
            "icon": "dashboard"
          }
        }
      ]
    },
    {
      "path": "/example",
      "component": "Layout",
      "redirect": "/example/table",
      "name": "Example",
      "meta": {
        "title": "案例",
        "icon": "example"
      },
      "children": [
        {
          "path": "table",
          "name": "Table",
          "component": "table/index",
          "meta": {
            "title": "表格",
            "icon": "table"
          }
        },
        {
          "path": "tree",
          "name": "Tree",
          "component": "tree/index",
          "meta": {
            "title": "树形菜单",
            "icon": "tree"
          }
        }
      ]
    },
    {
      "path": "/form",
      "component": "Layout",
      "children": [
        {
          "path": "index",
          "name": "Form",
          "component": "form/index",
          "meta": {
            "title": "表单",
            "icon": "form"
          }
        }
      ]
    },
    {
      "path": "*",
      "redirect": "/404",
      "hidden": true
    }
  ]
}