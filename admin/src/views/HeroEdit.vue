<template>
  <div>
    <h1>{{id ? "编辑" : "新建"}}英雄</h1>
    <!-- @submit.native.prevent: @submit执行form的submit事件，native表示原生的表单，prevent表示组织默认提交不要跳转页面-->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="basic">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <!-- action：上传的接口地址，这里用的它自带的ajax请求，所以需要完整的请求地址；$http.defaults.baseURL：http://localhost:3000/admin/api；on-success：成功上传之后的函数 -->
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :headers="getAuthHeaders()"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 背景图 -->
          <el-form-item label="背景">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :headers="getAuthHeaders()"
              :on-success="(res)=>{ $set(model,'banner',res.url) }"
            >
              <img v-if="model.banner" :src="model.banner" class="avatar" style="width:auto" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple placeholder="请选择">
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              style="margin-top:10px"
              v-model="model.scores.difficult"
              :max="9"
              show-score
              text-color="#ff9900"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              style="margin-top:10px"
              v-model="model.scores.skills"
              :max="9"
              show-score
              text-color="#ff9900"
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              style="margin-top:10px"
              v-model="model.scores.attack"
              :max="9"
              show-score
              text-color="#ff9900"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              style="margin-top:10px"
              v-model="model.scores.survive"
              :max="9"
              show-score
              text-color="#ff9900"
            ></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple placeholder="请选择">
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple placeholder="请选择">
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button icon="el-icon-plus" @click="model.skills.push({})">添加技能</el-button>
          <el-row :gutter="20" style="margin-top:10px;">
            <el-col :span="12" v-for="(item,index) in model.skills" :key="index" style="margin:15px 0">
              <div style="border:1px dashed #DCDFE6;padding:10px;position:relative;">
                <el-form-item label="名称" label-width="60px" style="margin-top:10px">
                  <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="图标" label-width="60px">
                  <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :headers="getAuthHeaders()"
                    :on-success="(res)=>{ $set(item,'icon',res.url) }"
                  >
                    <img v-if="item.icon" :src="item.icon" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="冷却值" label-width="60px" style="margin-top:10px">
                  <el-input v-model="item.delay"></el-input>
                </el-form-item>
                <el-form-item label="消耗" label-width="60px" style="margin-top:10px">
                  <el-input v-model="item.cost"></el-input>
                </el-form-item>
                <el-form-item label="描述" label-width="60px">
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="item.description"
                  ></el-input>
                </el-form-item>
                <el-form-item label="提示" label-width="60px">
                  <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="item.tips"></el-input>
                </el-form-item>
                <i class="el-icon-circle-close adClose" @click="model.skills.splice(index,1)"></i>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
         <el-tab-pane label="最佳搭档" name="partners">
          <el-button icon="el-icon-plus" @click="model.partners.push({})">添加英雄</el-button>
          <el-row :gutter="20" style="margin-top:10px;">
            <el-col :span="12" v-for="(item,index) in model.partners" :key="index" style="margin:15px 0">
              <div style="border:1px dashed #DCDFE6;padding:10px;position:relative;">
                <el-form-item label="英雄" label-width="60px" style="margin-top:10px">
                  <el-select filterable v-model="item.hero" placeholder="请选择">
                    <el-option v-for="hero in heroes" :key="hero._id" :label="hero.name" :value="hero._id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="描述" label-width="60px">
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="item.description"
                  ></el-input>
                </el-form-item>
                <i class="el-icon-circle-close adClose" @click="model.partners.splice(index,1)"></i>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top:30px">
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
      categories: [],
      items: [],
      heroes: [],
      model: {
        name: "",
        avatar: "",
        title: "",
        categories: [],
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0
        },
        skills: [],
        items1: [],
        items2: [],
        usageTips: "",
        battleTips: "",
        teamTips: "",
        partners: []
      }
    };
  },
  methods: {
    //保存
    async save() {
      if (this.id) {
        await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/heroes", this.model);
      }
      this.$message({
        type: "success",
        message: this.id ? "修改成功" : "保存成功"
      });
      this.$router.push("/heroes/list");
    },
    //获取某条数据
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    //图片上传成功
    afterUpload(res) {
      this.model.avatar = res.url;
    },
    //获取分类数据
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    //获取物品数据
    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    },
    //获取英雄数据
    async fetchHeroes() {
      const res = await this.$http.get(`rest/heroes`);
      this.heroes = res.data;
    }
  },
  created() {
    this.fetchItems();
    this.fetchCategories();
    this.fetchHeroes();
    this.id && this.fetch();
  }
};
</script>
<style>
</style>
