<template>
  <div class="nav-wrap">
    <div class="left">
      <van-tabs v-model="actives" color="#e76648" @click="changeTab">
        <van-tab title="活动" name="active"></van-tab>
        <van-tab title="新书" name="newbook"></van-tab>
        <van-tab title="书单" name="bookorder"></van-tab>
      </van-tabs>
    </div>
    <div class="right" @click="goCart">
      <van-icon name="shopping-cart-o" size="20" :info="$store.state.cart.list.length"/>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon, Tab, Tabs } from "vant";

Vue.use(Icon)
  .use(Tab)
  .use(Tabs);
export default {
  data() {
    return {
      actives: "newbook"
    };
  },
  mounted() {
    this.actives=this.$route.params.type
    this.$router.push("/morebookstore/" + this.actives)
    this.$store.commit({
          type: "getType",
          id: this.actives
        })
  },
  methods: {
    changeTab(name, title) {
      if (name !== this.$store.state.bookStore.id) {
        this.$router.push("/morebookstore/" + name)
        this.$store.commit({
          type: "getType",
          id: name
        });
      }
    },
    goCart(){
      this.$router.push('/cart')
    }
  }
};
</script>

<style scoped lang="stylus">
.nav-wrap
  display flex
  height 0.44rem
  background #fff
  .left
    font-size 0.16rem
    color #9b9b9b
    display flex
    width 80vw
    align-items center
    div
      flex 1
      text-align center
      height 100%
      span
        display inline-block
        height 100%
        line-height 0.5rem
  .right
    flex 1
    text-align center
    line-height 0.6rem
    i
      display inline-block
      padding-left .25rem
      height 0.24rem
      border-left 1px solid #9b9b9b
.active
  color #000
  border-bottom 3px solid #e76648
</style>
