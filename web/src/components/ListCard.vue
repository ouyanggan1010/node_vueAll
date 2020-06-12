<template>
  <m-card :icon="icon" :title="title">
    <div class="nav fs-md jc-between">
      <!-- $refs.list.swiper.sildeTo(i)当点击nav-item时让swiper滚动到某个序号值 -->
      <div
        class="nav-item"
        :class="{active: active === i}"
        v-for="(category,i) in categories"
        :key="i"
        @click="$refs.list.swiper.slideTo(i)"
      >
        <div class="nav-link">{{category.name}}</div>
      </div>
    </div>
    <div class="pt-3">
      <!-- @slide-change当每个slide改变时需要执行的函数 -->
      <!-- 将组件的当前真实的索引值赋值给active -->
      <swiper :options="{autoHeight: true}" ref="list" @slide-change="()=>active = $refs.list.swiper.realIndex">
        <swiper-slide v-for="(category,i) in categories" :key="i">
            <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  //当前组件接收的参数；type：类型；required：是否必填
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    categories: { type: Array, required: true }
  },
  data() {
    return {
      active: 0
    };
  }
};
</script>
<style lang="scss">
</style>
