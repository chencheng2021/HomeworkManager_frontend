/**
 * @author chencheng
 * @date 2021-03-27 01:42
 * @description     一些公共方法的提供者
 */

export const base_path = '/homeworkmanager'

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
    return 'http://192.168.31.90:9090/test/upload'
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