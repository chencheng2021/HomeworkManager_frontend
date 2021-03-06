/**
 * @author chencheng
 * @date 2021-03-12 19:30
 * @description vue路由组件
 */

import Vue from 'vue'
import VueRouter from "vue-router";
Vue.use(VueRouter)
import layout from '@/layout'

//项目不需要动态路由，因此直接编写静态路由
const system_router = [
    {
        path: '/',
        redirect: '/homeworkmanager',
        name: 'default_jump',
        hidden:true
    },
    {
        path: '/homeworkmanager/login',
        meta: {title:'用户登录'},
        component: () => import('@/views/login'),
        hidden: true
    },
    {
        path: '*',
        redirect: '/homeworkmanager/error/404'
    },
    {
        path: '/homeworkmanager/error/404',
        meta: {title: '404 - NotFound'},
        component: () => import('@/views/error/404'),
        hidden: true
    },
    {
        path: '/homeworkmanager/course/election',
        meta: {title: '学生选课'},
        component:() => import('@/views/template/course-election'),
        hidden: true
    },
    {
        path: '/homeworkmanager/error',
        component: layout,
        redirect: '/homeworkmanager/error/500',
        children: [
            {
                path: '500',
                name: '500',
                meta:{title: '500 - InternalError',},
                component: () => import('@/views/error/500')
            }
        ],
        hidden: true
    },
    {
        path: '/homeworkmanager',
        component: layout,
        redirect: '/homeworkmanager/home',
        children: [
            {
                path: 'home',
                name: 'home',
                meta:{title: '首页', icon: 'el-icon-s-home'},
                component: () => import('@/views/dashboard')
            }
        ]
    },
    {
        path: '/homeworkmanager/class',
        component: layout,
        name: 'class',
        redirect: '/homeworkmanager/class/list',
        meta: {title: '班级', icon: 'el-icon-tickets'},
        children: [
            {
                path: 'list',
                name: 'class_list',
                meta: {title: '班级管理', icon: 'el-icon-school'},
                component: () => import('@/views/class-manage')
            },
        ]
    },
    {
        path: '/homeworkmanager/course',
        component: layout,
        name: 'course',
        redirect: '/homeworkmanager/course/list',
        meta: {title: '课程', icon: 'el-icon-tickets'},
        children: [
            {
                path: 'list',
                name: 'course_list',
                meta: {title: '课程管理', icon: 'el-icon-reading'},
                component: () => import('@/views/course_manage')
            }
        ]
    },
    {
        path: '/homeworkmanager/notification',
        component: layout,
        name: 'notification',
        redirect: '/homeworkmanager/notification/list',
        meta: {title: '通知', icon: 'el-icon-tickets'},
        children: [
            {
                path: 'list',
                name: 'notification_list',
                meta: {title: '通知管理', icon: 'el-icon-bell'},
                component: () => import('@/views/notification-manage')
            }
        ]
    },
    {
        path: '/homeworkmanager/members',
        component: layout,
        name: 'members',
        redirect: '/homeworkmanager/members/list',
        meta: {title: '班级', icon: 'el-icon-tickets'},
        children: [
            {
                path: 'list',
                name: 'members_list',
                meta: {title: '成员管理', icon: 'el-icon-user-solid'},
                component: () => import('@/views/member-manage')
            }
        ]
    },
    {
        path: '/homeworkmanager/files',
        component: layout,
        name: 'files',
        redirect: '/homeworkmanager/members/list',
        meta: {title: '文件', icon: 'el-icon-tickets'},
        children: [
            {
                path: 'list',
                name: 'files_list',
                meta: {title: '文件管理', icon: 'el-icon-collection'},
                component: () => import('@/views/file-manager')
            }
        ]
    },
]

export default new VueRouter({
    scrollBehavior:() => ({y:0}),
    routes:system_router
})