/**
 * @author chencheng
 * @date 2021-04-05 23:28
 * @description
 */


export const class_meta_data = {
    id: 0,
    name: '',
    class_code:'',
    total_student_num: 0,
    create_date:'',
    member_data: [],
    class_files:[],
    member_parent_data:[]
}

export const class_file = {
    id:0,
    name: '',
    url: ''
}

export const member_parent = {
    id: 0,
    student_name: '',
    name: '',
    relation: '',
    contact: ''
}

export const course_meta_data = {
    id: 0,
    name: '小学数学',
    credit: 0,
    class_time: '',
    course_period: 0,
    create_date: '',
    course_election_data: [],
    course_files: []
}

export const course_election = {
    student_no: 0,
    student_name: '',
    class_name: '',
    gender: '',
    contact: ''
}

export const course_files = {
    id:0,
    name: '',
    url: ''
}