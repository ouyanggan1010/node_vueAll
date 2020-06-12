// 引用axios
import axios from "axios";
import Vue from "vue";
import router from "./router";

const http = axios.create({
  //必须是'VUE_APP'开头然后'_'加自己的变量名'API_URL'
  //在客户端一般是没有'process'这个变量，但是webpack打包vue-cli之后就会有这个'process'变量；'process.env'表示环境变量里面有'VUE_APP'这个变量
  //要改成一个不含主机名的绝对地址，这样我的域名是什么，访问的接口域名就是什么，不会限制成localhost:3000
  baseURL: process.env.VUE_APP_API_URL || "/admin/api"
  // 后台请求接口的地址
  //baseURL: "http://localhost:3000/admin/api"
});

//请求拦截，给所有请求加一个带有token的请求头
http.interceptors.request.use(
  config => {
    //Authorization可以传授权信息
    if (localStorage.token) {
        config.headers.Authorization = "Bearer " + localStorage.token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
//响应拦截；给http请求加一个拦截器；可以在npm中搜索axios查看文档
http.interceptors.response.use(
  res => {
    return res;
  },
  //大于等于400的错误状态都会进这里
  err => {
    if (err.response.data.message) {
      //elementUI加载到了Vue原型上面，与http一样，可以通过this.$http访问
      Vue.prototype.$message({
        type: "error",
        message: err.response.data.message
      });
      console.log(err.response);
      if (err.response.status === 401) {
        router.push("/login");
      }
    }
    return Promise.reject(err);
  }
);

// 输出htpp
export default http;
