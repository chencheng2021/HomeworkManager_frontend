
import {set_authorization} from "@/provider/http_base";
import {store_token} from "@/utils/authenticate_util";
import {obtain, save} from "@/provider/local_storage_provider";


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
            state.teacher_no = user.teacher_no
            state.name = user.name
            state.contact = user.contact
            state.gender = user.gender
            state.address = user.address
            state.job_title = user.job_title
            // 将用户数据保存到localstorage
            save(user.teacher_no,user,true)
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
        process_login({commit},user,token){
            commit('SET_USER',user)
            // 保存token
            set_authorization(token)
            store_token(token)
            Promise.resolve().then()
        },

        update_contact({commit}, phone){
            commit('SET_CONTACT', phone)
        }

    }

}

export default user