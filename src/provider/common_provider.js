/**
 * @author chencheng
 * @date 2021-03-27 01:42
 * @description     一些公共方法的提供者
 */

import {format_date_time} from "@/utils/date_time_util";

export const base_path = '/homeworkmanager'

export const unhandled = () => {}

export function link_jumping(link,jump_with_new_window){
    if (jump_with_new_window === undefined || jump_with_new_window){
        window.open(link)
    }else {
        window.location.href = link
    }
}

export function sms_max_len(){
    // 短信通知的内容长度最长为60
    return 60;
}

export function form_check(view,form_name){
    let check_flag = false
    view.$refs[form_name].validate( valid => {
        check_flag = valid
        return valid
    })
    return check_flag
}

export function form_clear(view,form_name){
    view.$refs[form_name].resetFields()
}

export function deeply_copy_obj(obj){
    return JSON.parse(JSON.stringify(obj))
}

export function get_file_upload_url(){
    return 'http://192.168.31.91:9090/api/homeworkmanager/file/upload'
}

export function encrypt(origin){
    if (typeof origin !== 'string'){
        return origin
    }
    return window.btoa(origin)
}

export function decrypt(cipher){
    if (typeof cipher !== 'string'){
        return cipher
    }
    return window.atob(cipher)
}

export function process_file_type(file_meta_data){
    file_meta_data.forEach(item=>{
        let type = item.type
        switch (type) {
            case 'jpg':
            case 'png':
            case 'jpeg':
            case 'gif':
            case 'bmp':
                item.type = type+'图片文件';break
            case 'doc':
            case 'docx':
                item.type = type+'文档';break
            case 'ppt':
            case 'pptx':
                item.type = '幻灯片文件';break
            case 'xls':
            case 'xlsx':
                item.type = type+'表格文件';break
            case 'md':
                item.type = 'markdown文件';break
            default: item.type = type+'文件';break
        }
    })
}

export function process_date_time(meta_data){
    meta_data.forEach(item=>{
        if (typeof item.createDate !== 'undefined'){
            item.createDate = format_date_time(item.createDate,true)
        }else if (typeof item.uploadDate !== 'undefined'){
            item.uploadDate = format_date_time(item.uploadDate,true)
        }
    })
}