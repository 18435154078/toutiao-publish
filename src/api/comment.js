import request from '@/utils/request'
/**
 * 修改评论状态
 */
export const undateCommentStatus = (article_id, allow_comment) => {
    return request({
        method: 'put',
        url: '/mp/v1_0/comments/status',
        params: {
            article_id
        },
        data: {
            allow_comment
        }
    })
}
