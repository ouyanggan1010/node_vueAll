<template>
  <div>
    <h1>{{id ? "编辑" : "新建"}}物品</h1>
    <!-- @submit.native.prevent: @submit执行form的submit事件，native表示原生的表单，prevent表示组织默认提交不要跳转页面-->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <!-- action：上传的接口地址，这里用的它自带的ajax请求，所以需要完整的请求地址；$http.defaults.baseURL：http://localhost:3000/admin/api；on-success：成功上传之后的函数 -->
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :headers="getAuthHeaders()"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
        name: "",
        icon: ""
      }
    };
  },
  methods: {
    //保存
    async save() {
      if (this.id) {
        await this.$http.put(`rest/items/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/items", this.model);
      }
      this.$message({
        type: "success",
        message: this.id ? "修改成功" : "保存成功"
      });
      this.$router.push("/items/list");
    },
    //获取某条数据
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    },
    //图片上传成功
    afterUpload(res){
      this.model.icon = res.url
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>
<style>
  
</style>
