import axios from 'axios'

// axios.baseURL='api'

// 添加请求拦截器（配置token）
axios.interceptors.request.use(function (config) {
  // 多有的请求都添加token记录本地？存在vuex里
  config.headers['Authorization'] =  localStorage.getItem('TOKEN')
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器 （响应返回固定错误的code的时候 跳转某个页面
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  return Promise.reject(error);
});

// 封装get请求和post请求
export default function request (type = 'GET',url = '', params = {}, responseType='json' ) {
 let promise,
  return new Promise ((resolve, reject)=> {
    // get请求参数转换成字符串拼接
    if (type === 'GET') {
    //   let paramsStr = ''
    //   Object.keys(params).forEach(key => {
    //     paramsStr += key + '=' + params[key] + '&'
    //   })
    //   // 去除最后一个 &
    //   if (paramsStr !== '') {
    //     paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'))
    //   }
    //   url += '?' + paramsStr
      promise = axios({
        url: url,
        method: type,
        params: params,
        timeout: 5000,
        responseType: responseType        
      }) 

    } else if (type === 'POST') {
      promise = axios({
        url: url,
        method: type,
        data: params,
        timeout: 5000,
        responseType: responseType        
      }) 
    }

     // 返回请求的结果
      promise.then((res)=>{
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
  })
}
