<template>
  <div class="detail-wrap">
    <div>
      <h2>{{data.subject_collection.name}}</h2>
      <div class="book-list">
        <ul>
          <li
            class="van-hairline--bottom"
            v-for="(l,index) in data.subject_collection_items"
            :key="l.id+index"
            @click="goBookDetail(index)"
          >
            <img :src="'https://images.weserv.nl/?url='+l.cover.url.substring(8)" alt>
            <div class="right">
              <h3>{{l.title}}</h3>
              <div>
                <i v-for="(s,i) in star.star[index]" :key="i+10" :class="{emptys:s===0}"></i>
                <span>{{star.score[index]}}</span>
              </div>
              <p>{{l.info}}</p>
            </div>
          </li>
        </ul>
      </div>
      <van-loading size="24px" v-if="!lock">加载中...</van-loading>
      <div class="empty"></div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Vue from "vue";
import { Loading } from "vant";

Vue.use(Loading);
export default {
  props: ["data", "total"],
  data() {
    return {
      list: [],
      star: {
        star: [],
        score: []
      },
      lock: true,
      bs: null,
      page: 1,
      start:0,
      count:0
    };
  },
  async mounted() {
    this.getSc();
    await this.$nextTick();
    this.start=this.data.start
    this.count=this.data.count>18?18:18
    this.bs = new BScroll(".detail-wrap", {
      pullUpLoad: true,
      click: true,
      mouseWheel: true //开启鼠标滚轮
    });
    let result = null;
    this.page=this.$store.state.bookList.page
    let nextPage=0;
    this.bs.on("pullingUp", async () => {
      if (this.lock) {
        if (this.count+this.start<= this.total) {
          this.lock = false;
          this.page++;
          if(this.$store.state.bookList.sign){
            result = await this.$parent.getData(50+nextPage,18);
            nextPage+=18
          }else{
            result = await this.$parent.getData((this.page - 1) * 18,18);

          }
          this.start=result.data.start
          this.coutn=18
          this.data.subject_collection_items = [
            ...this.data.subject_collection_items,
            ...result.data.subject_collection_items
          ];
          this.getSc();
          await this.$nextTick();
          this.bs.refresh();
          this.bs.finishPullUp();
          this.lock = true;
        }
      }
    });
    
    this.bs.scrollTo(0, this.$store.state.bookList.position);
  },
  methods: {
    getSc() {
      this.star.star = [];
      this.star.score = [];
      this.data.subject_collection_items.forEach(value => {
        let sc = value.rating ? value.rating.value : "暂无评分";
        this.star.score.push(sc);
        if (sc < 8) {
          this.star.star.push(new Array(1, 1, 1, 0, 0));
        } else if (sc >= 8 && sc < 9.5) {
          this.star.star.push(new Array(1, 1, 1, 1, 0));
        } else if (sc >= 9.5) {
          this.star.star.push(new Array(1, 1, 1, 1, 1));
        } else {
          this.star.star.push([]);
        }
      });
    },
    goBookDetail(index) {
      let position = this.bs.y;
      this.$store.commit({
        type: "getBookListPosition",
        position,
        page: this.page
      });
      this.$router.push(
        "/bookdetail/" + this.data.subject_collection_items[index].id
      );
    }
  }
};
</script>

<style scoped lang="stylus">
.detail-wrap
  padding 0 0.2rem
  height 6.17rem
  h2
    margin 0.2rem 0
    font-weight normal
    font-size 0.24rem
  .book-list
    height 100%
    ul
      li
        display flex
        padding-bottom 0.2rem
        margin-bottom 0.2rem
      li::after
        border-color #ccc
      img
        width 1rem
        min-width 1rem
        height 1.42rem
      .right
        margin-left 0.15rem
        h3
          font-size 0.16rem
          color #494949
          margin-top 0.1rem
        >div
          i
            display inline-block
            width 0.1rem
            height 0.1rem
            background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAfhJREFUOBGlVD1LHFEUPXfWrzGJO2uhaIQ0iljESgKSpAjBwpXVKikEl6TzD6TwJ4gWaQMBS8WQgCRZ61QpglUgRbQUbMR1XfwodvbmvE1mdt/ssDPBC493733nnrkf7w2QQrSU29D9wY8poJAkkG6hD8O5E+IGgJsHkr8+7hTjdDpsnA0PLkHE4yK2r5iETyYUfdUkkRa96W3VOhLqXv8oFHNhgGCC/Xwc2jFKR0J0966w1IwVp/LasiNGOBTdxV24bhbqenCQRUY9qLzl2CasGEUVdbyA1M5R1wrq/gUqVxUp4tLghCX85D7VlonFksJQ9Un3w5S8c2sy8z3TGtGDRsla8op0vKe3O0UuMRBVDm9N8uX1Zg/3s8+hmU/sGS/wf8kN0UWZP/tgokJCY+jX3ENmWqJ3zNiJonoKXxalcPY9wFqExqmf3fvIuL+SM2WZNX9SCheHAZnZ2++h9FyxufdaQfG6CBznTvQshtDhSyA4jQieRmExhO2gaFBoi5OK8EkYECiqX9jdd1wauP7tbVgrw8a/TzETBpkp1nWZ96sg8+VV8j0j6VF4Dozo3sB4ix0ZypD3iO3r+QvQbfi1KVkobwcBkj//hmp5msSbXHxqlC67bCtDDr2fN/43wYvMaFkK1dOALNjlJa6Z8RuIP0vfAZfVhj/iqoy46fpKwgAAAABJRU5ErkJggg==')
            background-size 0.1rem 0.1rem
          span
            font-size 0.12rem
            color #9b9b9b
            margin-left 0.05rem
        p
          color #9b9b9b
          font-size 0.12rem
.emptys
  background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAeRJREFUOBGtlDsvBFEUx3d2djfiMbTsQ0NEwTaiQSGiRKWREDofgMJHEAqdSPSE0BC9SiEqWQWSzT4SzSbrsR7Fzo7fEXfNg9klbjI5j/s/vzn3MRMI1DFyudxaPp8/qEMa0GqJ0ul0QzgcvtM0zbAsqzMWi+X9aoJ+kzIXiUSmgLXhinZOcn6jJpDieRvA7tvSX64vMJvNdiAdV3I67c5kMkMq/s76AgHMUqTbC0Oh0II9dvvVQ0mlUs2GYbRWKpU2ij4swA3pylX0ZJrmNPn7crn8oOv6Y7FYfEgmk8+i07gOl0z24js6cUHqCU1uwbksefcfYPJCHeDFx5LpUq7DNp2GZeYPw2KrVuLx+Gp1D4GOATwEZvwGSFdv6Oe48PtSVwVKwCfWB/SEJyZxHaMAcBLYmdI6gJIEGg0Gg1e4tTqVZfawzBsFE+u5h4heyLfYRT/4LERrcs95gNwr+RI8nbsLJWa5I+68B8hbPSJ3kYq/03qAvHVYFShL7phni9hSuU/r0TqA8u9DOGArKvCZzXCKEzyL7O8o4Fs1T4ftHGKXisU6gOzfIKLIp2CnVCr1JhKJHVXAiZ4C7Ae8Ts6UPDfCsUUhJRYLrJGCa+xSNBo9ss8pH+gr/jK/tj0a2ETv2IZ35FSkS7HbzakAAAAASUVORK5CYII=') !important
  background-size 0.1rem 0.1rem !important
.empty
  height 0.5rem
.van-loading
  text-align center
  height 0.5rem
  line-height 0.5rem
</style>
