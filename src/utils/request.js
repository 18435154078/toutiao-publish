/**
 *  基于 axios 封装的请求模块
 */
import axios from 'axios'
import JSONbig from 'json-bigint'
import router from '@/router'

// 创建一个axios实例，就是复制一个axios实例，对这个实例进行配置,这样做的好处是可以同时配置多个axios，之间互不影响
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/',
  // 定义后端返回的数据的处理
  // data是后端返回的原始数据，未经任何处理
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    try {
      // console.log(data)
      // console.log(JSONbig.parse(data))
      return JSONbig.parse(data)
    } catch (err) {
      console.log(err)
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 所有请求会经过这里，config是当前请求的信息,在请求拦截器中统一设置token
  // console.log(config)
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  } else {
    if (location.href.indexOf('login') === -1) {
      history.go(0)
    }
  }
  return config
}, function (err) {
  // 失败会经过这里
  return Promise.reject(err)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 所有2xx都会进入这里
  // 必须把response 给 return 出去，不然会直接卡到这
  return response;
}, function (error) {
  // 判断当状态码是401时，清除user，并跳到登录页面
  if(error.response.status === 401){
    window.localStorage.removeItem('user')
    router.push('/login')
  }
  // 利用响应拦截器可以集中处理一公共的响应状态码
  return Promise.reject(error)
})

export default request
