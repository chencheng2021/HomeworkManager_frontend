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

export function publish_file(publish_id,file){
    return request({
        url: '/file/publish',
        data: {
            publish_id: publish_id,
            name: file.name,
            url: file.url,
        }
    })
}

export function update_file_name(file_id,filename){
    return request({
        url: '/file/update',
        data: {
            file_id: file_id,
            filename: filename
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