/**
 * @author chencheng
 * @date 2021-04-05 17:29
 * @description     手机短信服务api
 */


import request from '@/provider/http_base'


export function send(teacher_no,phone,type){
    return request({
        url: '/sms/send',
        data: {
            teacher_no: teacher_no,
            phone: phone,
            type: type
        }
    })
}

export function verify(phone,code,type){
    return request({
        url: '/sms/verify',
        data: {
            phone: phone,
            code: code,
            type: type
        }
    })
}