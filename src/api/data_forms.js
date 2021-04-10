/**
 * @author chencheng
 * @date 2021-04-05 23:28
 * @description
 */


export function class_meta_data(){
    return {
        id: 0,
        name: '',
        class_code:'',
        total_student_num: 0,
        create_date:'',
        member_data: [],
        class_files:[],
        member_parent_data:[]
    }
}

export function member_data(){
    return {
        student_no: 0,
        name: '',
        gender: 1,
        contact: '1',
        email: '',
        social_account: '',
        class_name: ''
    }
}

export function class_file(){
    return {
        id:0,
        name: '',
        url: ''
    }
}

export function member_parent(){
    return {
        id: 0,
        student_name: '',
        name: '',
        relation: '',
        contact: ''
    }
}

export function course_meta_data(){
    return {
        id: 0,
        name: '小学数学',
        credit: 0,
        class_time: '',
        course_period: 0,
        create_date: '',
        course_election_data: [],
        course_files: []
    }
}

export function course_election(){
    return {
        student_no: 0,
        student_name: '',
        class_name: '',
        gender: '',
        contact: ''
    }
}

export function course_files(){
    return {
        id:0,
        name: '',
        url: ''
    }
}

export function notification_create_form(){
    return{
        title: 0,
        content: '',
        type: 0,
        confirmable: false,
        member_type: 'student',
        contact_data_list: [
            {
                publish_id: 0,
                name: '',
                contact: ''
            }
        ],
        attachments: [
            {
                id: 0,
                name: '',
                url: ''
            }
        ]
    }
}