export default {
  name: 'home',
  data() {
    return {
      // 权限列表
      menus: [
        {
          "id": 101,
          "authName": "权限管理",
          "path": "/categories",
          "children": [
            {
              "id": 111,
              "authName": "角色列表",
              "path": "/roles",
              "children": []
            },
            {
              "id": 112,
              "authName": "权限列表",
              "path": "/rights",
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
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}