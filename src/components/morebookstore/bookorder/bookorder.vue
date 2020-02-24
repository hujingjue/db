<template>
  <div class="bookorder-wrap">
    <ul>
      <section v-if="list.length!==0"> 
        <li 
        class="bookorder-item" 
        v-for="(l,index) in list" 
        :key="l.title"
        @click='handleClick(index)'
        >
          <h2>{{l.title}}</h2>
          <p>{{l.desc}}</p>
          <div class="img-group">
            <img
              v-for="(d,index) in l.detail.cards.slice(0,3)"
              :key="index+50"
              :src="'https://images.weserv.nl/?url='+d.info.cover.url"
              alt
            >

            <span>+{{l.detail.cards.length-3}}</span>
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
    await this.getData(this.page);
    await this.$nextTick();
    let bs = new BScroll(".more-book-store-wrap", {
      pullUpLoad: true,
      mouseWheel: true,
      click: true
    });
    bs.on("pullingUp", async () => {
      if (this.$store.state.bookStore.id === "bookorder") {
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
          type: "topic"
        }
      });
      this.list = [...this.list, ...result.data.data];
      this.total = result.data.total;
    },
    handleClick(index){
      this.$router.push('/bookorderdetail')
      this.$store.commit({
        type:'getDetailData',
        detailData:this.list[index]
      })
    }
  }
};
</script>

<style scoped lang="stylus">
.bookorder-wrap
  padding 0.15rem 0.1rem
  .bookorder-item
    background #fff
    padding 0.2rem 0.2rem
    margin-bottom 0.1rem
    h2
      font-size 0.2rem
      color #494949
    >p
      font-size 0.14rem
      color #9b9b9b
      margin 0.05rem 0 0.1rem 0
    .img-group
      img
        width 0.5rem
        height 0.7rem
        margin-right 0.05rem
      span
        font-size 0.18rem
        color #e76648
        opacity 0.5
  .loading
    width 100%
    height 100%
</style>
