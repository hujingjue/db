<template>
  <div class="book-item-wrap">
    <section v-if="list.length!==0">
      <div class="book-item" v-for="(d,index) in list" :key="index">
        <div
          class="bg-img"
          :style="{background:'url('+'https://images.weserv.nl/?url='+d.rectangle_pic.substring(8)+')'+' no-repeat'}"
        >
          <div>￥{{d.price}}</div>
        </div>
        <div class="book-introduce">
          <div
            class="book-img"
            :style="{background:'url('+'https://images.weserv.nl/?url='+d.square_pic.substring(8)+')'+' no-repeat'}"
          ></div>
          <div class="book-detail">
            <h2>{{d.title}}</h2>
            <p>{{d.desc}}</p>
          </div>
        </div>
      </div>
    </section>
    <img src="../../../assets/loading.jpg" alt="" v-else class="loading">
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { get } from "utils/http.js";
export default {
  data() {
    return {
      list: [],
      page: 1,
      total: 0,
      lock: true,
      bs: null
    };
  },
  async mounted() {
    console.log();
    if (this.$route.params.type !== "newbook") return;
    await this.getData(this.page);
    await this.$nextTick();
    this.bs = new BScroll(".more-book-store-wrap", {
      pullUpLoad: true,
      mouseWheel: true,
      click: true
    });
    this.bs.on("pullingUp", async () => {
      if (this.$store.state.bookStore.id === "newbook") {
        if (this.lock && this.list.length !== this.total) {
          this.lock = false;
          this.page++;
          await this.getData(this.page);
          await this.$nextTick();
          this.bs.refresh();
          this.bs.finishPullUp();
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
          type: "book"
        }
      });
      this.list = [...this.list, ...result.data.data];
      this.total = result.data.total;
    }
  }
};
</script>

<style scoped lang="stylus">
.book-item-wrap
  padding 0.15rem 0.1rem
  .book-item
    margin-bottom 0.15rem
    .bg-img
      height 42.25vw
      background url('https://img3.doubanio.com/view/freyr_page_photo/raw/public/5004.jpg') no-repeat
      background-size 100% 42.25vw !important
      position relative
      >div
        width 0.44rem
        height 0.26rem
        background #e76648
        color #fff
        text-align center
        line-height 0.26rem
        position absolute
        right 0
        bottom -0.13rem
      z-index 1
    .book-introduce
      position relative
      .book-img
        width 0.9rem
        height 1.2rem
        background url('https://img3.doubanio.com/view/freyr_page_photo/raw/public/4993.jpg') no-repeat
        background-size 0.9rem 1.2rem !important
        position absolute
        left 0.15rem
        top -0.4rem
        z-index 2
      .book-detail
        background #fff
        padding 0.2rem 0.2rem 0.2rem 1.25rem
        h2
          font-size 0.18rem
          color #494949
        p
          font-size 0.12rem
          color #9b9b9b
  .loading
    width 100%
    height 100%
      
</style>
