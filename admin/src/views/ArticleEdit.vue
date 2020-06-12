<template>
  <div>
    <h1>{{id ? "编辑" : "新建"}}文章</h1>
    <!-- @submit.native.prevent: @submit执行form的submit事件，native表示原生的表单，prevent表示组织默认提交不要跳转页面-->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <!-- useCustomImageHandler：自己处理图片上传，而不是使用默认转换为Base64 
        image-added：当useCustomImageHandler为true且将照片添加到编辑器时发出-->
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <!-- native-type表示按钮的原生type属性 -->
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
  //接收一个参数id，表示这个页面尽可能的与路由进行解耦
  props: {
    id: { type: String }
  },
  //使用子组件
  components:{
    VueEditor
  },
  data() {
    return {
      model: {
        title: "",
        categories:[],
        body:""
      },
      categories: []
    };
  },
  methods: {
    //保存
    async save() {
      if (this.id) {
        await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/articles", this.model);
      }
      this.$message({
        type: "success",
        message: this.id ? "修改成功" : "保存成功"
      });
      this.$router.push("/articles/list");
    },
    //获取某条数据
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    //获取分类数据
    async fetchCategories() {
      const res = await this.$http.get("rest/categories");
      this.categories = res.data;
    },
    //富文本上传图片
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      //要上传文件，需要提交表单数据
      const formData = new FormData();
      //后台接收的字段名是file
      formData.append("file", file);
      const res = await this.$http.post('upload',formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      //重置上传器
      resetUploader();
    }
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  }
};
</script>
