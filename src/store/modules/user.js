

import {obtain, save, save_user} from "@/provider/local_storage_provider";


const user = {
    state: {
        teacher_no: 0,
        name: '',
        contact: '',
        gender: '',
        address: '',
        job_title: ''
    },

    mutations: {
        SET_USER:(state,user) => {
            state.teacher_no = user.username
            state.name = user.teacher_name
            state.contact = user.contact
            state.gender = user.gender === 1 ? '男' : '女'
            state.address = user.address
            state.job_title = user.job_title
            // 将用户数据保存到localstorage
            save_user(user.username,state)
        },
        SET_CONTACT:(state,phone) => {
            state.contact = phone
            let teacher_no = state.teacher_no;
            let teacher = obtain(teacher_no,true)
            teacher.contact = phone
            save(teacher_no,teacher,true)
        }
    },

    actions: {
        // 登录成功后需要通过该方法保存用户信息以及token
        ProcessingLogin({commit},data){
            commit('SET_USER',data.teacher_info)
        },

        UpdateContact({commit}, phone){
            commit('SET_CONTACT', phone)
        }

    }

}

export default user