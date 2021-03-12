/**
 * @author chencheng
 * @date 2021-03-12 21:03
 * @description 本地授权认证工具类
 */


const token_key = 'd2F0ZXJ0YWJsZW1vbml0b3JzeXN0ZW1vdG9rZW4='
const local_storage = window.localStorage


export function verify_token(){
    let token = obtain_token()
    if (token === undefined){
        return false
    }else {
        let parts = token.split('.')
        // 约定token使用标准的jwt格式
        return parts.length === 3;
    }
}

export function clear_token(){
    local_storage.removeItem(token_key)
}

export function obtain_token(){
    return local_storage.getItem(token_key)
}

export function store_token(token){
    return local_storage.setItem(token_key,token)
}