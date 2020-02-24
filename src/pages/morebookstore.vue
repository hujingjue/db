<template>
  <div class="more-book-store-wrap">
    <div>
        <db-swiper></db-swiper>
        <db-nav></db-nav>
        <db-book-list></db-book-list>
    </div>
  </div>
</template>

<script>
import DbSwiper from 'components/morebookstore/swiper.vue'
import DbNav from 'components/morebookstore/nav.vue'
import DbBookList from 'components/morebookstore/booklist.vue'
export default {
  data () {
    return {
    }
  },
  mounted() {
    
  },
  components:{
      DbSwiper,
      DbNav,
      DbBookList
  }
}
</script>

<style scoped lang="stylus">
.more-book-store-wrap
    height 100%
    >div
      background #F7F1ED
</style>
