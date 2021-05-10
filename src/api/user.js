/**
 * 这里是用来处理用户相关的一些操作
 */
import request from '@/utils/request'

// 用户登录
export const login = data => {
  return request({
    method: 'post',
    url: '/mp/v1_0/authorizations',
    data
  })
}
// 获取用户信息
export const getUserProfile = () => {
  // const token = JSON.parse(window.localStorage.getItem('user')).token
  // console.log(token)
  return request({
    method: 'get',
    url: '/mp/v1_0/user/profile'
    // 后端要求吧需要授权的用户身份放到请求头中,
    // axios 可以通过header选项设置请求头
    // headers: {
    //   Authorization: `Bearer ${token}`
    // }
  })
}

// 修改用户头像
export const setUserAvater = data => {
  return request({
    method: 'patch',
    url: '/mp/v1_0/user/photo',
    data
  })
}

// 编辑用户资料
export const undateUserProfile = data => {
  return request({
    method: 'patch',
    url: '/mp/v1_0/user/profile',
    data
  })
}