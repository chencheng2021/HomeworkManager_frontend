/**
 * @author chencheng
 * @date 2021-04-05 16:54
 * @description     班级服务api
 */

import request from '@/provider/http_base'


export function get_course_list(){
    return request({
        url: '/course/list'
    })
}

export function create_course(course_create_form){
    return request({
        url: '/course/create',
        data: {
            name: course_create_form.name,
            credit: course_create_form.credit,
            class_time: course_create_form.class_time,
            course_period: course_create_form.course_period
        }
    })
}

export function update_course(course_update_form){
    return request({
        url: '/course/update',
        data: {
            id: course_update_form.id,
            name: course_update_form.name,
            class_time: course_update_form.class_time,
            course_period: course_update_form.course_period
        }
    })
}

export function delete_course(course_id){
    return request({
        url: '/course/delete',
        data: {
            course_id: course_id
        }
    })
}