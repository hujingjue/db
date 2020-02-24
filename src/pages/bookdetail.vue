<template>
  <div class="bookdetail-wrap">
    <div v-if="data!==''">
      <db-head></db-head>
      <book-header
      v-if="data!==''"
      :data="data"
      :star="star"
      ></book-header>
      <db-introduction
        v-if="data.intro!==''"
        :data="data"
      ></db-introduction>
      <div class="space"></div>
      <db-short-comment
        v-if="shortComment.total!==0"
        :shortComment="shortComment"
      ></db-short-comment>
      <div class="space"></div>
      <db-discuss
        v-if="discuss.total!==0"
        :discuss="discuss"
      ></db-discuss>
    </div>
    <img src="~assets/loading.jpg" alt="" v-else>
  </div>
</template>

<script>
import DbHead from "components/head.vue";
import BookHeader from "components/bookdetail/header.vue";
import DbIntroduction from "components/bookdetail/introduction.vue";
import DbShortComment from "components/bookdetail/shortcomment.vue";
import DbDiscuss from "components/bookdetail/discuss.vue";
import {get} from 'utils/http.js'

export default {
  data() {
    return {
        data:'',
        star:'',
        shortComment:'',
        discuss:''
    };
  },
  async mounted() {
      let id=this.$route.params.id
      Promise.all([
          get({
          url:'/rexxar/api/v2/book/'+id,
          params:{
              ck:'',
              for_mobile:1
          }
      }),
      get({
          url:`/rexxar/api/v2/book/${id}/rating`,
          params:{
              ck:'',
              for_mobile:1
          }
      }),
      get({
          url:`/rexxar/api/v2/book/${id}/interests`,
          params:{
              count: 4,
              order_by: 'hot',
              start: 0,
              ck:'',
              for_mobile:1
          }
      }),
      get({
          url:`/rexxar/api/v2/book/${id}/forum_topics`,
          params:{
              count: 5,
              start: 0,
              ck:'',
              for_mobile:1
          }
      })
      ]).then((res)=>{
            this.data=res[0].data
            this.star=res[1].data
            this.shortComment=res[2].data
            this.discuss=res[3].data
      })
      
  },
  components: {
    DbHead,
    BookHeader,
    DbIntroduction,
    DbShortComment,
    DbDiscuss
  }
};
</script>

<style scoped lang="stylus">
.bookdetail-wrap
    height 100%
    overflow-y scroll
    .space
        height .1rem
        background #EFEFEF
    img
        width 100%
        height 100%
</style>
