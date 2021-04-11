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

export function get_notify_members(id){
    return request({
        url: '/notification/members',
        data: {
            id: id
        }
    })
}

export function get_notification_files(id){
    return request({
        url: '/notification/files',
        data:{
            id: id
        }
    })
}

export function publish_notification(notification_publish_form){
    console.log(notification_publish_form)
    // 由于这里后端无法将内部类进行下划线转驼峰，所以需要做特殊处理
    let contact_list = []
    notification_publish_form.contact_data_list.forEach(item=>{
        let contact_item = {
            publishId: item.publish_id,
            name: item.name,
            contact: item.contact
        }
        contact_list.push(contact_item)
    })
    return request({
        url: '/notification/publish',
        data: {
            title: notification_publish_form.title,
            content: notification_publish_form.content,
            type: notification_publish_form.type,
            confirmable: notification_publish_form.confirmable,
            contact_data_list: contact_list,
            member_type: notification_publish_form.member_type,
            attachments: notification_publish_form.attachments
        }
    })
}

export function notify_member(data_form){
    return request({
        url: '/notification/notify',
        data: data_form
    })
}