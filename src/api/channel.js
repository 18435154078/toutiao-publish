/**
 * 获取频道的方法
 */
import request from '@/utils/request'
export const getChannel = () => {
  return request({
    methods: 'get',
    url: '/mp/v1_0/channels'
  })
}
