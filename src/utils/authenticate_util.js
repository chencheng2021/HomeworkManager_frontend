/**
 * @author chencheng
 * @date 2021-03-12 21:03
 * @description 本地授权认证工具类
 */
import {remove_authorization} from "@/provider/http_base";


const token_key = 'd2F0ZXJ0YWJsZW1vbml0b3JzeXN0ZW1vdG9rZW4='
const static_token = 'e8d4a85df8655fw8932.8s5d872g136546sfa.8561df5n4sj2k23dh5a4'
const local_storage = window.localStorage


export function verify_token(){
    let token = obtain_token()
    return token === static_token
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