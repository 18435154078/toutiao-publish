/**
 * 处理有关粉丝的api
 */
import request from '@/utils/request'

// 获取粉丝列表
export const loadFans = params => {
    return request({
        url: '/mp/v1_0/followers',
        method: 'get',
        params
    })
}
