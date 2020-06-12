<template>
  <div>
    <h1>{{id ? "编辑" : "新建"}}管理员</h1>
    <!-- @submit.native.prevent: @submit执行form的submit事件，native表示原生的表单，prevent表示组织默认提交不要跳转页面-->
    <el-form label-width="120px" @submit.native.prevent="save">
       <el-form-item label="用户名">
        <el-input placeholder="请输入用户名" v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input placeholder="请输入密码" v-model="model.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <!-- native-type表示按钮的原生type属性 -->
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  //接收一个参数id，表示这个页面尽可能的与路由进行解耦
  props: {
    id: { type: String }
  },
  data() {
    return {
      model: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    //保存
    async save() {
      if (this.id) {
        await this.$http.put(`rest/admin_users/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/admin_users", this.model);
      }
      this.$message({
        type: "success",
        message: this.id ? "修改成功" : "保存成功"
      });
      this.$router.push("/admin_users/list");
    },
    //获取某条数据
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>
