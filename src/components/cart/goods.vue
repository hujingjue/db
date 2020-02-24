<template>
  <div class="goods-wrap">
    <section class="empty" v-if="list.length===0">
      <div class="bg-img"></div>
      <p>购物车空空如也</p>
      <div class="btn">去逛逛吧</div>
    </section>
    <section class="goods-list" v-else>
      <div class="header">
        <van-checkbox
          shape="square"
          checked-color="#44883e"
          v-model="$store.state.cart.goodsAll"
          @change="handleClick"
        >豆瓣书店</van-checkbox>
      </div>
      <ul class="main">
        <van-checkbox-group v-model="result" ref="checkboxGroup">
          <li class="goods-item" v-for="(l,index) in list" :key="l.sku_id+index">
            <div class="block">
              <van-checkbox
                shape="square"
                checked-color="#44883e"
                v-model="arr[index]"
                :name="index"
                @click="chooseOne(index)"
                ref="checkbox"
              ></van-checkbox>

              <div class="left">
                <img :src="'https://images.weserv.nl/?url='+l.info.cover.url.substring(8)" alt>
              </div>
              <div class="center">
                <p class="title">{{l.title}}</p>
                <van-stepper
                  v-model="l.count"
                  input-width="30px"
                  button-size="20px"
                  :name="index"
                  @change="getCount(index)"
                />
              </div>
            </div>
            <div class="right">
              <div @click="delateGoods(index)">删除</div>
              <div>￥{{l.promote_price}}</div>
            </div>
          </li>
        </van-checkbox-group>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Vue from "vue";
import { CheckboxGroup, Checkbox, Stepper, SubmitBar } from "vant";
Vue.use(CheckboxGroup)
  .use(Checkbox)
  .use(Stepper)
  .use(SubmitBar);
export default {
  data() {
    return {
      bookStore: false,
      count: 0,
      result: [],
      allIsTrue: false
    };
  },
  created() {
    this.orderList = this.$store.state.cart.list.length;
  },
  mounted() {
    this.arr.forEach((value, index) => {
      if (value) {
        this.$refs.checkbox[index].toggle(true);
        this.count++;
         this.$store.state.cart.allPrice +=
            this.list[index].promote_price * this.list[index].count * 100;
      }
    });
    if(this.count!==this.orderList){
      this.$store.state.cart.goodsAll=false
    }
  },
  methods: {
    handleClick(bol) {
      if (bol) {
        this.$refs.checkboxGroup.toggleAll(true);
        this.$store.state.cart.allPrice = 0;
        this.arr.forEach((value, index) => {
          this.arr[index] = true;
          if (this.arr[index]) {
            this.$store.state.cart.allPrice +=
              this.list[index].promote_price * this.list[index].count * 100;
          }
        });
        this.count = this.orderList;
        this.allIsTrue = true;
        this.$store.state.cart.all = true;
      } else {
        if (this.count === this.orderList) {
          this.$refs.checkboxGroup.toggleAll();
          this.arr.forEach((value, index) => {
            this.arr[index] = false;
            this.count = 0;
          });
        }
        this.allIsTrue = false;
        this.$store.state.cart.all = false;
        this.$store.state.cart.allPrice = 0;
      }
    },
    async chooseOne(index) {
      this.arr[index] = !this.arr[index];
      this.arr[index] ? ++this.count : --this.count;
      this.$store.state.cart.goodsAll =
        this.count === this.orderList ? true : false;
      if (this.allIsTrue) {
        await this.$nextTick();
        this.arr.forEach((value, i) => {
          this.$refs.checkbox[i].toggle(true);
        });
        this.$refs.checkbox[index].toggle();
        this.$store.state.cart.goodsAll = false;
      }
      this.$store.state.cart.allPrice = 0;
      this.$store.state.cart.arr.forEach((value, index) => {
        if (value) {
          this.$store.state.cart.allPrice +=
            this.list[index].promote_price * this.list[index].count * 100;
        }
      });
    },
    getCount(index) {
      this.$store.state.cart.allPrice = 0;
      this.arr.forEach((value, index) => {
        if (value) {
          this.$store.state.cart.allPrice +=
            this.list[index].promote_price * this.list[index].count * 100;
        }
      });
    },
    delateGoods(index) {
      this.list.splice(index, 1);
      this.arr.splice(index, 1);
      this.orderList--;
      this.$store.state.cart.allPrice = 0;
      this.arr.forEach((value, index) => {
        if (value) {
          this.$store.state.cart.allPrice +=
            this.list[index].promote_price * this.list[index].count * 100;
            this.$refs.checkbox[index].toggle(true);
        }
      });
      if(this.count===this.orderList){
        this.$store.state.cart.goodsAll=true
      }
      if(this.orderList===0){
        this.$store.state.cart.all=false
      }
    }
  },
  computed: {
    ...mapState({
      list: state => state.cart.list,
      arr: state => state.cart.arr
    })
    
  }
};
</script>

<style scoped lang="stylus">
.goods-wrap
  background #f9f9f9
  .empty
    display flex
    flex-direction column
    align-items center
    .bg-img
      width 1.76rem
      height 1.41rem
      margin-top 0.9rem
      background url('data:image/png;base64,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')
      background-size 100%
    >p
      font-size 0.14rem
      color #3e3a39
      margin 0.35rem 0
    .btn
      width 1.29rem
      height 0.43rem
      padding 0 0.07rem
      color #44883e
      border 1px solid #44883e
      line-height 0.43rem
      text-align center
      margin-bottom 0.1rem
  .goods-list
    .header
      padding-left 0.15rem
      background #fff
      height 0.42rem
      margin-top 0.1rem
      display flex
      align-items center
      margin-bottom 0.05rem
    .main
      .goods-item
        display flex
        align-items center
        justify-content space-between
        padding 0.2rem 0.15rem
        background #fff
        margin-bottom 0.1rem
        .block
          display flex
          align-items center
          .left
            img
              width 0.8rem
              height 0.8rem
              margin 0 0.1rem
          .center
            .title
              font-size 0.16rem
              color rgba(0, 0, 0, 0.9)
              font-weight 700
              margin-bottom 0.1rem
        .right
          >div:first-child
            font-size 0.14rem
            color #3e3a39
            text-align right
          >div:last-child
            margin-top 0.2rem
            font-size 0.16rem
            color #dd1944
</style>
