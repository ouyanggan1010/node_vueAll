import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

import './assets/scss/main.scss'

import router from './router'

// swiper
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper)

// iconfont
import "./assets/iconfont/iconfont.css";

//全局引用Card组件
import Card from "./components/Card.vue";
Vue.component("m-card", Card);
//全局引用ListCard组件
import ListCard from "./components/ListCard.vue";
Vue.component("m-list-card", ListCard);

//axios
import http from "./http.js";
// 将http加载到Vue原型上面，则可以在任意页面使用this.$http来访问数据请求接口
Vue.prototype.$http = http;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
