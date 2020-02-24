<template>
  <div class="bookorder-detail-wrap">
    <section class="block" v-if="list.detail">
      <img :src="'https://images.weserv.nl/?url='+list.detail.header.cover" alt>
      <div class="center">
        <h2>{{list.title}}</h2>
        <div>
          <div class="left">
            <img
              src="'https://images.weserv.nl/?url='+img1.doubanio.com/icon/ul143540367-7.jpg"
              alt
            >
            <span>豆瓣·書</span>
          </div>
          <div class="right">
            <span>豆瓣主页</span>
            <van-icon name="arrow"/>
          </div>
        </div>
        <p v-html="list.detail.header.desc"></p>
      </div>

      <ul class="list-wrap">
        <li class="item" v-for="(c,index) in list.detail.cards" :key="c.sku_id" @click="goDetail(c.subject_id)">
          <div class="item-detail">
            <img :src="'https://images.weserv.nl/?url='+c.info.cover.url" alt>
            <div class="item-introduce">
              <h2>{{c.info.title}}</h2>
              <p>{{c.info.meta}}</p>
              <div>
                <del>￥{{c.price}}</del>
                <span>￥{{c.promote_price}}</span>
              </div>
              <div>
                <span>立即购买</span>
                <span @click.stop="addCart(index)">加入购物车</span>
              </div>
            </div>
          </div>
          <div class="item-comment">
            <p v-html="c.desc"></p>
          </div>
        </li>
      </ul>
    </section>
    <img src="../../../assets/404.jpg" alt="" v-else class="not-fond">
    <div class="shoping-cart" @click="goCart"  v-if="listLength">
      <van-icon name="shopping-cart-o" :info="listLength" size="30"/>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon } from "vant";
import BScroll from "better-scroll";
import {mapState} from 'vuex'

Vue.use(Icon);
export default {
  data() {
    return {
      lock: true,
      list: ""
    };
  },
  async mounted() {
    this.list = this.$store.state.bookStore.detailData;
    if (this.list.detail) {
      await this.$nextTick();
      let bs = new BScroll(".bookorder-detail-wrap", {
        mouseWheel: true,
        click: true
      });
    }
  },
  methods: {
      goDetail(id){
          this.$router.push('/bookdetail/'+id)
      },
      addCart(index){
        this.$store.commit({
          type:'sendData',
          list:this.list.detail.cards[index]
        })
        
      },
      goCart(){
        this.$router.push('/cart')
      }
  },
  computed: {
    ...mapState({
      listLength:state=>state.cart.list.length
    })
  },
};
</script>

<style scoped lang="stylus">
.bookorder-detail-wrap
  position relative
  height 100%
  .block
    >img
      width 100%
      height 2.1rem
    .center
      padding 0.2rem
      >h2
        font-size 0.22rem
        color #494949
        font-weight normal
      >div
        display flex
        justify-content space-between
        align-items center
        margin 0.1rem 0
        .left
          img
            width 0.4rem
            height 0.4rem
          span
            font-size 0.14rem
            color #666
            margin-left 0.1rem
        .right
          font-size 0.14rem
          color #9b9b9b
          display flex
          align-items center
      >p
        font-size 0.14rem
        color #666
    .list-wrap
      padding 0.2rem 0.1rem 0 0.1rem
      background rgb(252, 243, 242)
      .item
        background #fff
        padding 0.2rem
        margin-bottom 0.15rem
        .item-detail
          display flex
          border-bottom 1px dashed #d4c5b1
          img
            width 0.85rem
            height 1.02rem
          .item-introduce
            margin-left 0.1rem
            h2
              font-size 0.16rem
              color #494949
              font-weight normal
            p
              font-size 0.12rem
              color #9b9b9b
              margin 0.05rem 0 0.1rem 0
            div:nth-child(3)
              del
                font-size 0.12rem
                color #9b9b9b
                margin-right 0.1rem
                text-decoration line-through
              span
                font-size 0.16rem
                color #e76648
            div:nth-child(4)
              margin 0.1rem 0 0.2rem 0
              span
                display inline-block
                padding 0.09rem 0.1rem 0.08rem 0.1rem
                font-size 0.12rem
                height 0.3rem
                line-height 0.13rem
              span:nth-child(1)
                background #f05f50
                color #fff
                border-radius 0.03rem
                margin-right 0.1rem
              span:nth-child(2)
                color #f05f50
                border 1px solid #f05f50
                border-radius 0.03rem
        .item-comment
          margin-top 0.15rem
          p
            font-size 0.14rem
            color #666
            b
              font-weight 400
              color #d39e58
  .not-fond
    width 200%
    position absolute
    left -2.2rem 
  .shoping-cart
    width .56rem
    height .56rem
    border-radius 50%
    background #42bd56
    position absolute
    left .15rem
    bottom .15rem
    display flex
    align-items center
    justify-content center
      
    
    
</style>
