/**
 * @author chencheng
 * @date 2021-03-23 18:47
 * @description
 */

import {Message} from "element-ui";

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

export function get_phone_checker(){
    return (rule,value,callback) => {
        if (value === ''){
            return callback(new Error('请输入手机号码'))
        }else if (!(/^1[3456789]\d{9}$/.test(value))){
            return callback(new Error('请输入正确的手机号码'))
        }else {
            return callback()
        }
    }
}

export function get_code_checker(){
    return (rule,value,callback)=>{
        if(value===''){
            return callback(new Error('短信验证码不能为空'))
        }else if(!/^\d{6}$/.test(value)) {
            return callback(new Error('短信验证码为6位数字值'))
        }else{
            return callback()
        }
    }
}

export function validate_student_imported_data(item) {
    // 在导入数据时，如果不存在定义的列，会为其生成默认的‘undefined’值，因此这里需要直接检查值是否为 ‘undefined’
    if (item.student_no === "undefined" || typeof item.student_no !== 'number'){
        Message.error('学生学号必须是数值')
    }else if (item.name === 'undefined'){
        Message.error('表格数据必须包含 [姓名] 属性的列')
    }else if (item.gender === 'undefined'){
        Message.error('表格数据必须包含 [性别] 属性的列')
    }else if (item.contact === 'undefined'){
        Message.error('表格数据必须包含 [联系方式] 属性的列')
    }else if (item.email === 'undefined'){
        Message.error('表格数据必须包含 [邮箱] 属性的列')
    }else if (item.social_account === 'undefined'){
        Message.error('表格数据必须包含 [社交账号] 属性的列')
    }else if (item.father_name === 'undefined'){
        Message.error('表格数据必须包含 [父亲] 属性的列')
    }else if (item.mother_name === 'undefined'){
        Message.error('表格数据必须包含 [母亲] 属性的列')
    }else if (item.father_contact === 'undefined'){
        Message.error('表格数据必须包含 [父亲手机] 属性的列')
    }else if (item.mother_name === 'undefined'){
        Message.error('表格数据必须包含 [母亲手机] 属性的列')
    }else {
        return true
    }
    return false
}