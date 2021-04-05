/**
 * @author chencheng
 * @date 2021-04-05 16:36
 * @description     班级服务api
 */

import request from '@/provider/http_base'

export function get_class_list(){
    return request({
        url: '/class/list'
    })
}

export function create_class(class_create_form){
    return request({
        url: '/class/create',
        data: {
            name: class_create_form.name,
            class_code: class_create_form.class_code,
        }
    })
}

export function update_class_info(class_update_form){
    return request({
        url: '/class/update',
        data: {
            id: class_update_form.id,
            name: class_update_form.name,
            class_code: class_update_form.class_code
        }
    })
}

export function add_class_member(class_id,member_list){
    return request({
        url: '/class/member/add',
        data: {
            class_id: class_id,
            member_list: member_list
        }
    })
}

export function delete_class(class_id){
    return request({
        url: '/class/delete',
        data: {
            class_id: class_id
        }
    })
}