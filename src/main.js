import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from '@/router'
import axios from "axios";
import VueAxios from 'vue-axios'
import store from "@/store";

Vue.use(ElementUI)
Vue.use(VueAxios,axios)
Vue.config.productionTip = false

/*axios全局配置*/
axios.defaults.withCredentials = true //让ajax携带cookie
axios.defaults.headers = {
  // 设置默认请求头
  'Content-Type':'application/json;charset=UTF-8'
};

/*
* 给组件动态生成其设置的title
* */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
