<template>
  <!-- v-if当数据没有加载进来的时候不渲染页面，否则会报错 -->
  <div class="page-article" v-if="model">
    <!-- 头部 -->
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-back text-blue" @click="$router.go(-1)"></div>
      <strong class="flex-1 text-blue pl-2">{{model.title}}</strong>
      <div class="text-grey fs-xs">{{model.createdAt | date}}</div>
    </div>
    <!-- 内容 -->
    <div class="px-3 body fs-lg" v-html="model.body"></div>
    <!-- 相关资讯 -->
    <div class="px-3 border-top py-3">
      <div class="d-flex ai-center">
        <i class="iconfont icon-menu"></i>
        <strong class="text-blue fs-lg ml-1">相关资讯</strong>
      </div>
      <div class="mt-2">
        <router-link replace class="py-2 fs-lg" tag="div" :to="`/articles/${item._id}`" v-for="item in model.related" :key="item._id">
          {{item.title}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  props: {
    id: { type: String, require: true }
  },
  //定义过滤器
  filters: {
    date(val) {
      return dayjs(val).format("YYYY-MM-DD");
    }
  },
  watch:{
    //id:"fletch",
    //相当于
    // id(){
    //   this.fetch()
    // }
  },
  data() {
    return {
      model: ""
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>
<style lang="scss">
.page-article {
  .icon-back{
    font-size: 1.6923rem;
  }
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>
