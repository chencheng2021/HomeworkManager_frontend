/**
 * @author chencheng
 * @date 2021-03-12 19:30
 * @description vue路由组件
 */

import Vue from 'vue'
import VueRouter from "vue-router";
Vue.use(VueRouter)

//项目不需要动态路由，因此直接编写静态路由
const system_router = []

export default new VueRouter({
    scrollBehavior:() => ({y:0}),
    routes:system_router
})