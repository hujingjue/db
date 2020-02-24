<template>
  <div class="wrap">
    <div class="cart-wrap">
      <div>
        <db-header></db-header>
        <db-goods></db-goods>
        <db-like></db-like>
      </div>
    </div>
     <van-submit-bar :price="$store.state.cart.allPrice" button-text="提交订单" class="footer">
        <van-checkbox shape="square" v-model="$store.state.cart.all" checked-color="#44883e" @change="checkAllGoods">全选</van-checkbox>
      </van-submit-bar>
  </div>
</template>

<script>
import Vue from "vue";
import { Checkbox, Stepper,SubmitBar } from "vant";
Vue.use(Checkbox)
  .use(Stepper)
  .use(SubmitBar)
import DbHeader from "components/cart/header.vue";
import DbGoods from "components/cart/goods.vue";
import DbLike from "components/cart/like.vue";
export default {
  data() {
    return {
        checkAll:false,
        allPrice:0
    };
  },
  async mounted() {
    let list=this.$store.state.cart.list
    this.$store.state.cart.allPrice=0
    await this.$nextTick()
    this.$store.state.cart.arr.forEach((value,index)=>{
      if(value){
        this.$store.state.cart.allPrice+=(list[index].promote_price*list[index].count*100)
      }
    })
  },
  methods: {
    checkAllGoods(bol){
      if(bol){
        this.$store.state.cart.goodsAll=true
      }else{
         this.$store.state.cart.goodsAll=false
      }
     
    }
  },
  components: {
    DbHeader,
    DbGoods,
    DbLike
  }
};
</script>

<style scoped lang="stylus">
.wrap
    height 100%
    .cart-wrap
        background #f9f9f9
        height 100%
    .footer
        padding-left .15rem
</style>
