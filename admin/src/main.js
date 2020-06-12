import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import './assets/css/style.css'

Vue.config.productionTip = false

import http from './http.js'
// 将http加载到Vue原型上面，则可以在任意页面使用this.$http来访问数据请求接口
Vue.prototype.$http = http

// 实现一次代码，无限复用；定义通用的过滤器或方法等
//让每一个Vue的实例都有过滤器或方法等
Vue.mixin({
  computed:{
    //定义上传的路径
    uploadUrl(){
      return this.$http.defaults.baseURL + "/upload";
    }
  },
  methods: {
    getAuthHeaders(){
      //将token放入请求头中
      return {
        Authorization: `Bearer ${localStorage.token || ""}`
      };
    }
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
