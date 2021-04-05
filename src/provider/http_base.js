/**
 * @author chencheng
 * @date 2021-03-12 19:25
 * @description http通信基础组件
 */

import axios from 'axios'
import { Message } from 'element-ui'
import {Notification} from "element-ui";
import {clear_token} from "@/utils/authenticate_util";
import Router from '@/router'


axios.defaults.headers.retry=3
axios.defaults.headers.retryInterval=1000

const public_route_name = ['login','register']

export const base_api_path = '/api/homeworkmanager'

const http_service=axios.create(
    {
        baseURL: base_api_path,
        timeout:10000,
        // 对后端所有请求的访问都使用post类型
        method: 'post',
        headers: {
            'Authorization': ''
        }
    }
);

// 请求发送
http_service.interceptors.request.use(config=>{
    return config;
},error => {
    return Promise.reject(error)
});

http_service.interceptors.response.use(
    // http状态码为200时的全局处理
    response => {
        // 约定后端返回json数据的格式为：
        // {errorCode:xxx,data:{}}

        // 提取返回数据
        const data = response.data
        const error_code = data.code
        if (error_code === undefined){
            return data
        }
        // 对错误码的全局处理
        // 约定错误码为0时是成功的返回
        // 不为0时，服务端服务出错或失败
        if (error_code !== 0){
            const error_desc = data.msg
            Message.error(error_desc)
            // 约定5xx的区间时服务出现异常的错误码段
            if (error_code >= 500 && error_code < 600){
                return Promise.reject()
            }else if (error_code === 403 || error_code === 405){
                // 403代表用户账号已被禁止，405代表用户登录已过期
                // 这两种情况都需要清除本地的登录token，强制用户退出到登录页面
                clear_token()
                Router.push('/homeworkmanager/login').then()
            }else {
                return Promise.reject()
            }
        }else {
            // 将服务端返回数据封装的真实的数据返回
            return data.data
        }
    },
    // http状态码不为200时的全局处理
    error => {
        if(error.response===undefined){
            if(error.code==='ECONNABORTED'){
                Notification({
                    title:'服务异常',
                    message:'服务请求超时，本次服务调用失败！',
                    type:"error",
                })
                // 请求超时直接进入超时重传处理
                return request_retry_handle(error)
            }else{
                Notification({
                    title:'服务异常',
                    message:'服务请求出错，未知错误！',
                    type:"error",
                })
            }
        }else{
            const status_code = error.response.status
            if (status_code === 500){
                Notification({
                    title:'服务异常',
                    message:'服务器发生500错误，服务调用失败！',
                    type:"error",
                })
                if (jump_necessary(Router.currentRoute.name)){
                    Router.push('/homeworkmanager/error/500').then()
                }
            }else if (status_code === 404){
                Notification({
                    title:'服务异常',
                    message:'服务未找到，404错误',
                    type:"error",
                })
                if (jump_necessary(Router.currentRoute.name)){
                    Router.push('/homeworkmanager/error/404').then()
                }
            }else{
                Notification({
                    title:'服务异常',
                    message:'服务错误码：'+ String(status_code),
                    type:"error",
                })
            }
        }
    }
)

// 请求重发处理
function request_retry_handle(res) {
    const config = res.config
    //如果配置不存在或重试属性未设置，抛出promise错误
    if (!config || !config.headers.retry){
        return Promise.reject(res);
    }
    //设置一个变量记录重新请求的次数
    config.retryCount = config.retryCount || 0;
    // 检查重新请求的次数是否超过我们设定的请求次数
    if (config.retryCount >= config.headers.retry) {
        return Promise.reject(res);
    }
    //重新请求的次数自增
    config.retryCount += 1;
    // 创建新的Promise来处理重新请求的间隙
    const back = new Promise(function (resolve) {
        console.log("接口" + config.url + "请求超时，重新请求")
        setTimeout(function () {
            resolve();
        }, config.headers.retryInterval || 1);
    });
    //返回axios的实体，重试请求
    return back.then(function() {
        return axios(config);
    });
}

function jump_necessary(current_route){
    //判断当前路由是否在注册或者登录界面，如果不在才跳转500或者404页面
    let jump_route = true
    public_route_name.every(item => {
        if (current_route.name === item){
            jump_route = false
            return false
        }else {
            return true
        }
    })
    return jump_route
}

export function set_authorization(token){
    this.http_service.headers.Authorization = token
}

export function remove_authorization(){
    this.http_service.headers.Authorization = ''
}


export default http_service