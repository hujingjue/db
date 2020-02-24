<template>
  <div class="header-wrap">
    <div class="left">
      <span>豆瓣</span>
      <i></i>
      <span>豆品</span>
    </div>
    <div class="right">
      <van-icon name="wap-home-o"/>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon } from "vant";

Vue.use(Icon);
export default {
  data() {
    return {};
  }
};
</script>

<style scoped lang="stylus">
.header-wrap
  display flex
  background #fff
  height 0.6rem
  padding 0 0.15rem
  align-items center
  justify-content space-between
  .left
    font-size 0.22rem
    color #3D7454
    font-weight 500
    display flex
    align-items center
    span
      display inline-block
      padding 0 0.05rem
    >i
      display inline-block
      width 0.01rem
      height 0.25rem
      background #ccc
  .right
    font-size 0.22rem
</style>
