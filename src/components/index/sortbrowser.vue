<template>
  <div class="sort-browser-wrap">
    <header>分类浏览</header>
    <div class="sort-browser-list">
      <ul>
        <li v-for="l in list" :key="l.id" @click="goDetail(l.type)">
          <a href="javascript:void(0)">{{l.name}}</a>
          <van-icon name="arrow" color="#ccc" size="14px"/>
        </li>
      </ul>
    </div>
    <footer>
      <div class="footer-wrap">
        <div>
          <img
            src="https://img3.doubanio.com/f/talion/7837f29dd7deab9416274ae374a59bc17b5f33c6/pics/card/douban-app-logo.png"
            alt
          >
          <h2>豆瓣</h2>
        </div>
        <p>去 App Store 免费下载 iOS 客户端</p>
      </div>
    </footer>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon } from "vant";

Vue.use(Icon);
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          name: "虚构类图书",
          type: "book_fiction"
        },
        {
          id: 2,
          name: "非虚构类图书",
          type: "book_nonfiction"
        },
        {
          id: 3,
          name: "名著经典",
          type: "book_classic"
        },
        {
          id: 4,
          name: "影视原著",
          type: "book_film_original"
        },
        {
          id: 5,
          name: "新书速递",
          type: "book_latest"
        },
        {
          id: 6,
          name: "高分图书",
          type: "book_score"
        },
        {
          id: 7,
          name: "热门图书",
          type: "book_hot"
        },
        {
          id: 8,
          name: "top250",
          type: "book_top250"
        }
      ]
    };
  },
  methods: {
    goDetail(type) {
      let scrollTop =document.querySelector('.index-wrap').scrollTop 
      this.$store.commit({
        type:'getPosition',
        position:scrollTop
      })
      this.$router.push('/sortbrowserdetail/'+type)
    }
  },
  mounted() {
    document.querySelector('.index-wrap').scrollTop =this.$store.state.position
  },
};
</script>

<style scoped lang="stylus">
.sort-browser-wrap
  padding-left 0.15rem
  header
    font-size 0.16rem
    margin-bottom 0.1rem
  .sort-browser-list
    margin-bottom 1rem
    ul
      display flex
      flex-flow wrap
      border-top 1px solid #eee
    li
      flex 1
      border-bottom 1px solid #eee
    li:nth-child(odd)
      border-right 1px solid #eee
    li:nth-child(even)
      padding-left 0.15rem
    a
      display inline-block
      width 40vw
      height 0.42rem
      line-height 0.42rem
      color #42bd56
      font-size 0.14rem
footer
  margin-bottom 0.5rem
.footer-wrap
  >div:first-child
    display flex
    justify-content center
    img
      width 0.48rem
      height 0.48rem
    h2
      color #191919
      font-weight 500
      font-size 0.24rem
      padding-left 0.1rem
      line-height 0.48rem
  p
    font-size 0.16rem
    color #42bd56
    margin-top 0.2rem
    text-align center
</style>
