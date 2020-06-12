<template>
  <div class="card bg-white p-3 mt-3">
    <div class="card-header d-flex ai-center" :class="{'border-bottom':!plain,'pb-3':!plain}">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2">
        <strong>{{title}}</strong>
      </div>
      <i class="iconfont icon-menu1" v-if="!plain"></i>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  //当前组件接收的参数；type：类型；required：是否必填
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    plain: { type: Boolean }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss">
</style>
