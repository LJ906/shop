// user.js 记录 用户的信息，登录状态，退出状态，动态权限配置侧边栏，权限列表记录本地
import {user} from '@/api'

const user = {
  state: {
    userName: '', // 用户名
    status: '', //登录退出状态
    code: '',
    token: getToken(),
    nickName: '',
    avatar: '', // 头像
    introduction: '', // 个人描述
    roles: [], // 角色
    setting: {
      articlePlatform: []
    }
  },
  mutations: {

  },
  actions: {
    // 登录
    // 用户名登录
    LoginByUserName() {

    }
  }

}