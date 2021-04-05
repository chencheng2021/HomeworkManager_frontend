/**
 * @author chencheng
 * @date 2021-04-05 17:25
 * @description     文件服务api
 */

import request from '@/provider/http_base'


export function get_file_page(page_size,page_num){
    return request({
        url: '/file/page',
        data: {
            page_size: page_size,
            page_num: page_num
        }
    })
}

export function update_file_name(file_id,file_name){
    return request({
        url: '/file/update',
        data: {
            file_id: file_id,
            file_name: file_name
        }
    })
}

export function delete_file(file_id){
    return request({
        url: '/file/delete',
        data: {
            file_id: file_id
        }
    })
}