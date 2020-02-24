<template>
  <div class="active-wrap">
    <ul>
      <section v-if="list.length!==0">
        <li class="active-item" v-for="(l,index) in list" :key="index+10" @click="goActiveDetail(l.url)">
          <div
            class="bg-img"
            :style="{background:'url('+'https://images.weserv.nl/?url='+l.share_pics_rectangle.substring(8)+')'+' no-repeat'}"
          >
            <div class="center-wrap">
              <h2>#{{l.title}}#</h2>
              <p>{{l.share_title}}</p>
            </div>
          </div>
          <div class="bottom-wrap">
            <p>{{l.share_content}}</p>
            <div class="bottom">
              <van-icon name="contact" color="#F6D47F"/>
              <span>{{l.partake_counts}} 人参与</span>
              <span>已结束</span>
            </div>
          </div>
        </li>
      </section>
      <img src="../../../assets/loading.jpg" alt="" v-else class="loading">
    </ul>
  </div>
</template>

<script>
import { get } from "utils/http.js"
import BScroll from "better-scroll"
import bus from 'assets/busevent.js'
import Vue from "vue";
import { Icon } from "vant";

Vue.use(Icon);

export default {
  data() {
    return {
      page: 1,
      list: [],
      total: 0,
      lock: true
    };
  },
  async mounted() {
    await this.getData();
    let bs = new BScroll(".more-book-store-wrap", {
      pullUpLoad: true,
      mouseWheel: true,
      click: true
    });
    bs.on("pullingUp", async () => {
      if (this.$store.state.bookStore.id === "active") {
        if (this.lock && this.list.length !== this.total) {
          this.lock = false;
          this.page++;
          await this.getData(this.page);
          await this.$nextTick();
          bs.refresh();
          bs.finishPullUp();
          this.lock = true;
        }
      }
    });
  },
  methods: {
    async getData(page) {
      let result = await get({
        url: "/api/freyr/books",
        params: {
          page,
          page_size: 18,
          type: "activity"
        }
      });
      this.list = [...this.list, ...result.data.data];
      this.total = result.data.total;
    },
    async goActiveDetail(url){
      
      this.$router.push('/activedetail')
      await this.$nextTick()
      bus.$emit('url',url)
    }
  }
};
</script>

<style scoped lang="stylus">
.active-wrap
  padding 0.15rem 0.1rem
  ul
    .active-item
      margin-bottom 0.15rem
      .bg-img
        height 1.21rem
        background url('https://img9.doubanio.com/view/freyr_page_photo/raw/public/2286.jpg') no-repeat
        background-size 100% 1.21rem !important
        .center-wrap
          width 100%
          height 100%
          background-color rgba(0, 0, 0, 0.2)
          color #fff
          display flex
          flex-direction column
          justify-content center
          h2
            font-size 0.22rem
            font-weight 500
            text-align center
          p
            font-size 0.14rem
            text-align center
      .bottom-wrap
        padding 0.15rem 0.2rem
        background #fff
        >p
          font-size 0.14rem
          color #9b9b9b
        .bottom
          margin-top 0.2rem
          span
            display inline-block
          span:nth-child(2)
            font-size 0.14rem
            color #333
            padding 0 0.1rem
          span:nth-child(3)
            font-size 0.14rem
            color #fff
            width 0.58rem
            height 0.18rem
            background #ccc
            text-align center
            line-height 0.18rem
            border-radius 0.03rem
  .loading
    width 100%
    height 100%
      
</style>
