/**
 * @author chencheng
 * @date 2021-04-05 17:59
 * @description     全屏加载遮罩
 */

import {Loading} from "element-ui";
import Vue from "vue";

/*
* 当组件初始化时以及某些操作需要开启全屏加载时，
* 都需要开启全屏加载灯罩，因此直接在这将整个js文件注册为
* 一个全局函数，并做main.js中引入并注册使用
* 以下就是在vue中注册全局函数的步骤
* */

/**
 * 开启全屏加载灯罩
 * @param loadingText       加载提示文本
 */
const startLoading=(loadingText) => {
    Loading.service({
        lock:true,
        text:loadingText,
        background:'rgba(0, 0, 0, 0.7)'
    })
};

/**
 * 关闭全屏加载灯罩
 */
const endLoading=() => {
    Loading.service({}).close();
};

/**
 * 组件数据初始化时开启默认加载画面
 */
const initLoading=() => {
    Loading.service({
        lock:true,
        text:'数据加载中...',
        background:'rgba(255, 255, 255, 0.7)'
    })
};

/*
* 将上面的方法注册到vue中并默认导出
* */
export default function () {
    Vue.prototype.$fsloading={
        startLoading,
        endLoading,
        initLoading,
    }
}