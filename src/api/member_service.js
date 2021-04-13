/**
 * @author chencheng
 * @date 2021-04-05 17:22
 * @description  成员服务api
 */


import request from '@/provider/http_base'


export function get_member_page(page_size,page_num){
    return request({
        url: '/member/page',
        data: {
            page_size: page_size,
            page_num: page_num
        }
    })
}

export function delete_member(class_id,member_id){
    return request({
        url: '/member/delete',
        data: {
            class_id: class_id,
            student_no: member_id
        }
    })
}

export function get_all_students(){
    return request({
        url: '/member/all'
    })
}

export function get_all_parents(){
    return request({
        url: '/member/parents'
    })
}