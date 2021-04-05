/**
 * @author chencheng
 * @date 2021-04-05 17:05
 * @description     通知服务api
 */

import request from '@/provider/http_base'


export function get_notification_page(page_size,page_num){

    // todo 添加一级缓存，因为历史通知的数据是不可修改的，当新增了通知时，store中通知的所有缓存都删除

    return request({
        url: '/notification/page',
        data: {
            page_size: page_size,
            page_num: page_num
        }
    })
}

export function publish_notification(notification_publish_form){
    return request({
        url: '/notification/publish',
        data: {
            title: notification_publish_form.title,
            content: notification_publish_form.content,
            type: notification_publish_form.type,
            confirmable: notification_publish_form.confirmable,
            pidList: notification_publish_form.pidList,
            member_type: notification_publish_form.member_type,
            attachment: notification_publish_form.attachment
        }
    })
}

export function notify_member(notification_id, member_info_list){
    return request({
        url: '/notification/notify',
        data: {
            notification_id: notification_id,
            member_info_list: member_info_list
        }
    })
}