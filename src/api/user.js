import request from './ajax';

// 用户登录退出 修改等请求
export default {
  // 登录
  loginByUserName: (data)=> {
    console.log('调用了loginByUserName');
    // return request('POST', '/login/byusername', data)
  },
  // 退出
  loginOut: ()=> {
    console.log('调用了loginByUserName');
  }
}