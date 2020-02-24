<template>
  <div class="book-fiction-wrap">
    <section>
      <div>
        <span v-if="block!=='bookStore'">
          <span>最受关注图书</span>
          <i>|</i>
          <span v-if="type==='book_fiction'">虚构类</span>
          <span v-if="type==='book_nonfiction'">非虚构类</span>
        </span>
        <span v-else>豆瓣书店</span>
      </div>
      <div>
        <a @click="goMoreStore(block)">更多</a>
      </div>
    </section>
    <div class="book-list" v-if="block!=='bookStore'">
      <ul v-if="show">
        <book-item
          v-for="l in list"
          :key="l.id"
          :url="l.cover.url"
          :title="l.title"
          :score="l.rating.value"
          :id="l.id"
        ></book-item>
      </ul>
      <van-loading size="24px" v-else>加载中...</van-loading>
    </div>

    <div class="bookStore-wrap" v-if="block==='bookStore'">
      <div v-if="show" class="book-list-wrap">
        <div class="bookStore-header">
          <img :src="newUrls">
          <div>
            <div>
              <h2>{{header.title}}</h2>
              <span>¥ {{header.price}}</span>
            </div>
            <p>{{header.info}}</p>
          </div>
        </div>
        <div class="bookStore-list">
          <ul>
            <book-item
              v-for="(l,index) in list"
              :key="index"
              :url="l.cover.url"
              :title="l.title"
              :price="l.price"
              :block="block"
            ></book-item>
          </ul>
        </div>
      </div>
      <van-loading size="24px" v-else>加载中...</van-loading>
    </div>
  </div>
</template>

<script>
import BookItem from "./bookitem.vue";
import BScroll from "better-scroll";
import Vue from "vue";
import { Loading } from "vant";

Vue.use(Loading);
export default {
  props: ["list", "type", "block", "header", "urls", "show"],
  data() {
    return {
      newUrl: ""
    };
  },
  computed: {
    newUrls() { 
      return (this.newUrl = "https://images.weserv.nl/?url=" + this.urls);
    }
  },

  components: {
    BookItem
  },
  methods: {
    goMoreStore(block) {
      if(block==='bookStore'){
        this.$router.push('/morebookstore/'+"newbook")
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.book-fiction-wrap
  padding-left 0.08rem
  section
    display flex
    justify-content space-between
    margin-left 0.07rem
    >div:first-child
      height 0.35rem
      font-size 0.16rem
      line-height 0.35rem
      margin-bottom 0.1rem
      i
        margin 0 0.05rem
    >div:last-child
      padding-right 0.15rem
      line-height 0.35rem
      a
        color #42bd56
  .book-list
    display flex
    overflow hidden
    .van-loading
      flex 1
      text-align center
      height 2rem
    ul
      height 2rem
      display flex
      overflow-x scroll
      >li:last-child
        padding-right 0.15rem
  .bookStore-wrap
    .van-loading
      flex 1
      text-align center
      height 3.21rem
    .book-list-wrap
      margin-bottom .2rem
      .bookStore-header
        display flex
        img
          width 1rem
          height 1.42rem
        >div
          margin-left 0.1rem
          flex 1
          div
            display flex
            justify-content space-between
            font-size 0.18rem
            h2
              font-weight normal
              flex 1
              width 49.0666vw
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
            span
              color #E76648
              font-size 0.16rem
              margin-right 0.15rem
          p
            color #9B9B9B
            font-size 0.14rem
            margin-top 0.05rem
      .bookStore-list
        overflow hidden
        ul
          display flex
          overflow-x scroll
</style>
