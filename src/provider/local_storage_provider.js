/**
 * @author chencheng
 * @date 2021-04-04 01:29
 * @description
 */

const provider = window.localStorage

const key_saver = 'key_saver'

export function save_collect(collect_key,item){
    let collect = obtain_collect(collect_key)
    collect.push(item)
    provider.setItem(collect_key,JSON.stringify(collect))
}

export function save_collect_item(collect_key,item){
    let collect = obtain_collect(collect_key)
    let new_collect = []
    collect.forEach( c => {
        if (c.key === item.key ){
            new_collect.push(item)
        }else {
            new_collect.push(c)
        }
    })
    save(collect_key,new_collect,true)
}

export function obtain_collect(collect_key){
    let collect = provider.getItem(collect_key);
    console.log(collect)
    if (check_not_null(collect)){
        return JSON.parse(collect)
    }else {
        return []
    }
}

export function obtain_collect_item(collect_key,item_key){
    let collect = obtain_collect(collect_key)
    if (check_not_null(collect)){
        return collect.find( c => {
            return c.key === item_key
        })
    }else {
        return null
    }
}

function check_not_null(item){
    return item !== null
}

export function save(key,val,is_obj){
    if (is_obj){
        val = JSON.stringify(val)
    }
    provider.setItem(key,val)
}

export function save_key(key){
    let saver = provider.getItem(key_saver);
    if (saver === null){
        saver = []
        saver.push(key)
    }else {
        saver.push(key)
    }
    provider.setItem(key_saver,JSON.stringify(saver))
}

export function obtain(key){
    provider.getItem(key)
}

export function remove(key){
    provider.removeItem(key)
}

export function remove_collect_item(collect_key,item_key){
    let collect = obtain_collect(collect_key)
    let new_collect = []
    collect.forEach( c => {
        if (c.key !== item_key){
            new_collect.push(c)
        }
    })
    save(collect_key,new_collect,true)
}

export function clear(){
    let saver = provider.getItem(key_saver);
    if (saver !== null){
        let key_arr = JSON.parse(saver)
        key_arr.forEach( key => {
            provider.removeItem(key)
        })
    }
}