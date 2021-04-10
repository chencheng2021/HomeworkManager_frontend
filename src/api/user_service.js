/**
 * @author chencheng
 * @date 2021-04-05 16:08
 * @description     用户服务api
 */
//import {encrypt} from "@/provider/common_provider";
import request from '@/provider/http_base'
import qs from 'qs'

export function login(username,password){
    // 对password进行base64加密
    //let pass = encrypt(password)
    // 如果后台需要以form-data的形式处理请求数据，必须使用qs进行处理封装
    let params = qs.stringify({
        username: username,
        password: password
    })
    return request({
        url: '/login',
        data: params,
        // 后端登录认证必须使用表单形式的请求类型
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export function logout(){
    return request({
        url: '/logout',
    })
}

export function update_pass(update_pass_form){
    return request({
        url: '/user/update/pass',
        data: {
            phone: update_pass_form.phone,
            password: update_pass_form.password,
            verify_code: update_pass_form.verify_code
        }
    })
}

export function update_phone(update_phone_form){
    return request({
        url: '/user/update/phone',
        data: {
            phone: update_phone_form.phone,
            verify_code: update_phone_form.verify_code
        }
    })
}

export function get_user_info(){
    return request({
        url: '/user/info'
    })
}