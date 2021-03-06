/**
 * @author chencheng
 * @date 2021-04-05 22:07
 * @description
 */
import {base_path} from "@/provider/common_provider"
import router from './index'
import { verify_token} from "@/utils/authenticate_util";


// 目前只有登录页时公共页面
const login_path = base_path + '/login'

//const public_paths = [login_path]

const dev = 1
const prod = 3

const mode = prod


router.beforeEach((to, from, next) => {
    if (mode === prod){
        if (verify_token()){
            if (to.path === login_path){
                next('/')
            }else {
                next()
            }
        }else {
            if (to.path === login_path){
                next()
            }else{
                next({path: login_path})
            }

        }
    }else if (mode === dev){
        // dev环境直接放行
        next()
    }
})
