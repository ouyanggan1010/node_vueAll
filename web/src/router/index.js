import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from "../views/Main.vue";
// ---------------首页
import Home from "../views/Home.vue";
// ---------------文章详情
import Article from "../views/Article.vue";
// ---------------英雄详情
import Hero from "../views/Hero.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: Main,
    children: [
      {
        path: "/",
        redirect: "/home"
      },
      {
        path: "/home",
        name: "home",
        component: Home
      },
      {
        path: "/articles/:id",
        name: "article",
        component: Article,
        props: true
      }
    ]
  },
  {
    path: "/heroes/:id",
    name: "hero",
    component: Hero,
    props: true
  }
];

const router = new VueRouter({
  routes
})

export default router
