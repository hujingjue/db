<template>
  <div class="like-wrap">
      <h2>猜你喜欢</h2>
      <ul class="list">
          <li 
          class="item"
          v-for="l in list"
          :key="l.id"
          >
              <img :src="'https://images.weserv.nl/?url='+l.image.substring(8)" alt="">
              <div class="content">
                <h2>{{l.title}}</h2>
                <p>{{l.desc}}</p>
                <span>￥{{l.promote_price}}</span>
              </div>
          </li>
      </ul>
      <div class="space"></div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {get} from 'utils/http.js'
import bs from 'assets/busevent.js'

export default {
  data () {
    return {
      list:[]
    }
  },
  async mounted() {
    await this.getData()
    await this.$nextTick()
    let bs=new BScroll('.cart-wrap',{
      mouseWheel:true,
      click:true
    })
  },
  methods: {
    async getData(){
      let result=await get({
        url:'/api/v2/recommend',
        params:{
          source:'cart',
          start:0,
          count:10
        }
      })
      this.list=result.data.data.products
    }
  },
  
}
</script>

<style scoped lang="stylus">
.like-wrap
  background #fff
  padding 0 .15rem
  >h2
    font-size .16rem
    color rgba(0,0,0,.9)
    margin-bottom .2rem
  .list
    display flex
    justify-content space-between
    flex-flow row wrap
    .item
      flex 1
      margin-bottom .2rem
      img 
        width 44.53333vw
        height 44.53333vw
      .content
        h2
          color rgba(0,0,0,.9)
          font-size .16rem
          font-weight normal
        p
          font-size .12rem
          color #818181
        span 
          font-size .16rem
          color #dd1944
          font-weight 700
.space
  height .5rem

</style>
