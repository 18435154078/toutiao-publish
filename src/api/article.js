/**
 * 文章相关的请求
 */
import request from '@/utils/request'
// 获取所有文章列表
export const getArticle = (params) => {
  return request({
    method: 'get',
    url: '/mp/v1_0/articles',
    params
  })
}

// 删除指定文章
// 这里的请求路径 /mp/v1_0/articles/:target
export const deleteArticle = (id) => {
  return request({
    method: 'delete',
    url: `/mp/v1_0/articles/${id}`
  })
}

// 发表文章
// query参数用params传
// body参数用data传
// draft默认给false
export const addArticle = (data, draft = false) => {
  return request({
    method: 'post',
    url: '/mp/v1_0/articles',
    params: {
      draft // 是否存为草稿（true 为草稿）
    },
    data
  })
}

// 根据id获取指定文章
export const getOnlyArticle = (articleId) => {
  return request({
    method: 'get',
    url: '/mp/v1_0/articles/' + articleId
  })
}

// 编辑文章内容
export const updateArticle = (articleId, data, draft = false) => {
  return request({
    method: 'put',
    url: '/mp/v1_0/articles/' + articleId,
    params: {
      draft
    },
    data
  })
}
