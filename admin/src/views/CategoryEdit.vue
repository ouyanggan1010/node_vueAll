<template>
  <div>
    <h1>{{id ? "编辑" : "新建"}}分类</h1>
    <!-- @submit.native.prevent: @submit执行form的submit事件，native表示原生的表单，prevent表示组织默认提交不要跳转页面-->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
        name: ""
      },
      parents: []
    };
  },
  methods: {
    //保存
    async save() {
      if (this.id) {
        await this.$http.put(`rest/categories/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/categories", this.model);
      }
      this.$message({
        type: "success",
        message: this.id ? "修改成功" : "保存成功"
      });
      this.$router.push("/categories/list");
    },
    //获取某条数据
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
    },
    //获取分类数据
    async fetchParents() {
      const res = await this.$http.get("rest/categories");
      this.parents = res.data;
    }
  },
  created() {
    this.fetchParents();
    this.id && this.fetch();
  }
};
</script>
