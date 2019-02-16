import axios from 'axios'

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
