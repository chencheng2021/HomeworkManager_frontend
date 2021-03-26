/**
 * @author chencheng
 * @date 2021-03-23 18:47
 * @description
 */


export function get_default_name_checker(){
    return {
        required: true,
        message: '该名称属性不能为空!',
        trigger: 'blur'
    }
}

export function get_max_length_checker(max){
    return {
        max: max,
        message: '该字段最大长度为'+max+'个字符',
        trigger: 'blur'
    }
}

export function get_min_length_checker(min){
    return {
        min: min,
        message: '该字段长度至少为'+min+'个字符',
        trigger: 'blur'
    }
}

export function get_string_checker(message){
    return {
        required: true,
        message: message,
        trigger: 'blur'
    }
}

export function get_default_number_checker(){
    return [
        {
            required: true,
            message: '数值不能为空',
            trigger: ''
        },
        {
            type: 'number',
            message: '请输入数字值'
        }
    ]
}