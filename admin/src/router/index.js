import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
//-------------登录页
import Login from "../views/Login.vue";
//-------------分类的路由
import CategoryEdit from "../views/CategoryEdit.vue";
import CategoryList from "../views/CategoryList.vue";
// -------------物品
import ItemEdit from "../views/ItemEdit.vue";
import ItemList from "../views/ItemList.vue";
// -------------英雄
import HeroEdit from "../views/HeroEdit.vue";
import HeroList from "../views/HeroList.vue";
// -------------文章
import ArticleEdit from "../views/ArticleEdit.vue";
import ArticleList from "../views/ArticleList.vue";
// -------------广告位
import AdEdit from "../views/AdEdit.vue";
import AdList from "../views/AdList.vue";
// -------------管理员
import AdminUserEdit from "../views/AdminUserEdit.vue";
import AdminUserList from "../views/AdminUserList.vue";
// -------------测试
import TestEdit from "../views/TestEdit.vue";
import TestList from "../views/TestList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    //该参数表示只有登录页可以随意访问，其他的则需要登录才能访问
    meta: {
      isPublic: true
    }
  },
  {
    path: "/",
    name: "Main",
    component: Main,
    children: [
      {
        path: "/",
        redirect: "/categories/create"
      },
      // -------------分类
      {
        path: "/categories/create",
        component: CategoryEdit
      },
      // 有一个参数id，props:true表示将所有路径中的参数都注入到CategoryEdit.vue这个组件中
      {
        path: "/categories/edit/:id",
        component: CategoryEdit,
        props: true
      },
      {
        path: "/categories/list",
        component: CategoryList
      },
      // -------------物品
      {
        path: "/items/create",
        component: ItemEdit
      },
      // 有一个参数id，props:true表示将所有路径中的参数都注入到CategoryEdit.vue这个组件中
      {
        path: "/items/edit/:id",
        component: ItemEdit,
        props: true
      },
      {
        path: "/items/list",
        component: ItemList
      },
      // -------------英雄
      {
        path: "/heroes/create",
        component: HeroEdit
      },
      // 有一个参数id，props:true表示将所有路径中的参数都注入到CategoryEdit.vue这个组件中
      {
        path: "/heroes/edit/:id",
        component: HeroEdit,
        props: true
      },
      {
        path: "/heroes/list",
        component: HeroList
      },
      // -------------文章
      {
        path: "/articles/create",
        component: ArticleEdit
      },
      // 有一个参数id，props:true表示将所有路径中的参数都注入到CategoryEdit.vue这个组件中
      {
        path: "/articles/edit/:id",
        component: ArticleEdit,
        props: true
      },
      {
        path: "/articles/list",
        component: ArticleList
      },
      // -------------广告位
      {
        path: "/ads/create",
        component: AdEdit
      },
      // 有一个参数id，props:true表示将所有路径中的参数都注入到CategoryEdit.vue这个组件中
      {
        path: "/ads/edit/:id",
        component: AdEdit,
        props: true
      },
      {
        path: "/ads/list",
        component: AdList
      },
      // -------------管理员
      {
        path: "/admin_users/create",
        component: AdminUserEdit
      },
      // 有一个参数id，props:true表示将所有路径中的参数都注入到CategoryEdit.vue这个组件中
      {
        path: "/admin_users/edit/:id",
        component: AdminUserEdit,
        props: true
      },
      {
        path: "/admin_users/list",
        component: AdminUserList
      },
      // -------------测试
      {
        path: "/tests/create",
        component: TestEdit
      },
      // 有一个参数id，props:true表示将所有路径中的参数都注入到CategoryEdit.vue这个组件中
      {
        path: "/tests/edit/:id",
        component: TestEdit,
        props: true
      },
      {
        path: "/tests/list",
        component: TestList
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

// 导航守卫
router.beforeEach((to, from, next) => {
  //to:即将要进入的目标，路由对象；
  //from:当前导航正要离开的路由；
  //next:进行管道的下一个钩子，必须调用，参数时要跳转的路径
  if (!to.meta.isPublic && !localStorage.token) {
    return next("/login");
  }
  next();
});

export default router;
