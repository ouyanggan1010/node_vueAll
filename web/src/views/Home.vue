<template>
  <div>
    <swiper :options="swiperOption">
      <!-- slides -->
      <swiper-slide>
        <img class="w-100" src="../assets/images/64a677e589b001101ae530a8af9bccc1.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/af56312ba973de07737468df09c1a711.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/d32d07f551b9db250b63736c40baee5b.jpeg" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right pr-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3 py-1" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="pt-1">爆料站</div>
        </div>
      </div>
      <!-- 收起 -->
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->
    <m-list-card icon="menu" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link tag="div" :to="`/articles/${news._id}`" class="py-2 fs-lg d-flex text-grey" v-for="(news,i) in category.newsList" :key="i">
          <span>[{{news.categoryName}}]</span>
          <span class="px-1">|</span>
          <span class="flex-1 text-ellipsis text-dark pr-2">{{news.title}}</span>
          <span class="fs-sm">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>
    <!-- end of news -->
    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link tag="div" :to="`/heroes/${hero._id}`" class="p-2 text-center" style="width:20%" v-for="(hero,i) in category.heroList" :key="i">
            <img :src="hero.avatar" class="w-100" />
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  //定义过滤器
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  data() {
    return {
      swiperOption: {
        autoplay: true,
        loop: true,
        pagination: {
          el: ".pagination-home"
        }
      },
      newsCats: [],
      heroCats: []
    };
  },
  methods: {
    //获取新闻资讯数据
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    //获取英雄列表数据
    async fetchHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    }
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
  }
};
</script>
<style lang="scss">
@import "../assets/scss/_variables.scss";

.pagination-home {
  .swiper-pagination-bullet {
    border-radius: 2px;
    width: 0.6538rem;
    height: 0.6538rem;
    background-color: map-get($colors, "white");
    opacity: 1;
    &.swiper-pagination-bullet-active {
      background-color: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-left: 1px solid $border-color;
    &:nth-child(4n + 1) {
      border-left: 1px solid transparent;
    }
  }
}
</style>
