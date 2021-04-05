/**
 * @author chencheng
 * @date 2021-04-05 17:29
 * @description     手机短信服务api
 */


import request from '@/provider/http_base'


export function send(phone){
    return request({
        url: '/sms/send',
        data: {
            phone: phone
        }
    })
}

export function verify(phone,code){
    return request({
        url: '/sms/verify',
        data: {
            phone: phone,
            code: code
        }
    })
}