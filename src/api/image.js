/**
 * 处理图片素材的api
 */
import request from '@/utils/request'
/**
 * 图片上传
 */
export const uploadImage = data => {
  return request({
    method: 'post',
    url: '/mp/v1_0/user/images',
    // 一般文件上传的接口都会要求吧请求头中的Content-Type设置为multipart/form-data，
    // 但是当使用ajax上传文件时不需要手动设置，只需要给data配置一个FormData对象即可
    // new FormData()
    data
  })
}

// 获取全部素材列表
export const getImageList = params => {
  return request({
    method: 'get',
    url: '/mp/v1_0/user/images',
    params
  })
}

// 图片收藏
export const celectImage = (id, collect) => {
  return request({
    method: 'put',
    url: `/mp/v1_0/user/images/${id}`,
    data: {
      collect
    }
  })
}

// 图片删除
export const deleteImage = id => {
  return request({
    method: 'delete',
    url: `/mp/v1_0/user/images/${id}`
  })
}
