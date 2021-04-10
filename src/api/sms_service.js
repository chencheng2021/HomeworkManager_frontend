/**
 * @author chencheng
 * @date 2021-04-05 17:29
 * @description     手机短信服务api
 */


import request from '@/provider/http_base'


export function send(phone,type){
    return request({
        url: '/sms/send',
        data: {
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