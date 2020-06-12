<template>
  <div>
    <h1>{{id ? "编辑" : "新建"}}测试</h1>
    <!-- @submit.native.prevent: @submit执行form的submit事件，native表示原生的表单，prevent表示组织默认提交不要跳转页面-->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.tip"></el-input>
      </el-form-item>
      <el-form-item label="套餐">
        <el-button icon="el-icon-plus" @click="model.items.push({})">添加广告</el-button>
        <el-row style="margin-top:30px">
          <el-col
            style="margin-bottom:20px"
            :span="24"
            v-for="(item,index) in model.items"
            :key="index"
          >
            <div style="border:1px dashed #DCDFE6;padding:10px;position:relative;">
              <el-form-item label="套餐名" label-width="110px" style="margin-top:10px">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="价格" label-width="110px" style="margin-top:10px">
                <el-input v-model="item.price"></el-input>
              </el-form-item>
              <el-form-item label="套餐图" label-width="110px" style="margin-top:20px">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :headers="getAuthHeaders()"
                  :on-success="(res)=>{ $set(item,'image',res.url) }"
                >
                  <img v-if="item.image" :src="item.image" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <i class="el-icon-circle-close adClose" @click="model.items.splice(index,1)"></i>
            </div>
          </el-col>
        </el-row>
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
        items: []
      }
    };
  },
  methods: {
    //保存
    async save() {
      if (this.id) {
        await this.$http.put(`rest/tests/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/tests", this.model);
      }
      this.$message({
        type: "success",
        message: this.id ? "修改成功" : "保存成功"
      });
      this.$router.push("/tests/list");
    },
    //获取某条数据
    async fetch() {
      const res = await this.$http.get(`rest/tests/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>
<style scoped>
.avatar {
  width: auto;
}
</style>
