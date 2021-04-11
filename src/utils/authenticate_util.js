/**
 * @author chencheng
 * @date 2021-03-12 21:03
 * @description 本地授权认证工具类
 */
import {remove_authorization} from "@/provider/http_base";


const token_key = 'd2F0ZXJ0YWJsZW1vbml0b3JzeXN0ZW1vdG9rZW4='
const local_storage = window.localStorage


export function verify_token(){
    let token = obtain_token()
    if (token !== null){
        return token.split('\\.')
    }else {
        return false
    }
}

export function clear_token(){
    local_storage.removeItem(token_key)
    remove_authorization()
}

export function obtain_token(){
    return local_storage.getItem(token_key)
}

export function store_token(token){
    local_storage.setItem(token_key,token)
}