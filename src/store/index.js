/**
 * @author chencheng
 * @date 2021-03-12 20:35
 * @description vue组件全局通信模块
 */

import Vue from 'vue'
import Vuex from 'vuex'
import getter from './getter'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user
    },
    getter
})

export default store