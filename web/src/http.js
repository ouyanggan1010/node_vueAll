// 引用axios
import axios from "axios";

const http = axios.create({
  //必须是'VUE_APP'开头然后'_'加自己的变量名'API_URL'
  //在客户端一般是没有'process'这个变量，但是webpack打包vue-cli之后就会有这个'process'变量；'process.env'表示环境变量里面有'VUE_APP'这个变量
  //要改成一个不含主机名的绝对地址，这样我的域名是什么，访问的接口域名就是什么，不会限制成localhost:3000
  baseURL: process.env.VUE_APP_API_URL || "/web/api"
  // 后台请求接口的地址
  //baseURL: "http://localhost:3000/web/api"
});

// 输出htpp
export default http;
