<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <!-- @submit.native.prevent: @submit执行form的submit事件，native表示原生的表单，prevent表示组织默认提交不要跳转页面-->
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名" v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input placeholder="请输入密码" show-password v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <!-- native-type表示按钮的原生type属性 -->
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      //得到token，并存储
      //浏览器关闭页面后token删除
      //sessionStorage.token = res.data.token;
      //token会一直存在，只要保证是同一个网址域名
      localStorage.token = res.data.token;
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登录成功!"
      });
    }
  }
};
</script>
<style scoped>
.login-card {
  text-align: center;
  width: 450px;
  margin: 150px auto 0 auto;
}
</style>
