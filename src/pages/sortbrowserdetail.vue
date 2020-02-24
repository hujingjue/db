<template>
  <div class="wrap">
    <db-head></db-head>
    <detail-list v-if="listData.length" :data="listData[0]" :total="total"></detail-list>
    <van-loading size="24px" v-else>加载中...</van-loading>
  </div>
</template>

<script>
import { get } from "utils/http.js";
import DetailList from "components/sortbrowserdetail/detaillist.vue";
import DbHead from "components/head.vue";

import Vue from "vue";
import { Loading } from "vant";

Vue.use(Loading);
export default {
  props: ["type"],
  data() {
    return {
      listData: [],
      total: ""
    };
  },
  async mounted() {
    let page=this.$store.state.bookList.page
    let result=null
    if ( page> 1) {
      let count=page * 18
      
      if(count>50){
        result = await this.getData(0,50);
        this.$store.state.bookList.sign=true
      }else{
        result = await this.getData(0,count);
      }
    }else{
      result = await this.getData(0,18);
      
    }
    this.listData.push(result.data);
    this.total = result.data.total;
    
    
  },
  methods: {
    async getData(start, count) {
      let result = await get({
        url: `/rexxar/api/v2/subject_collection/${this.type}/items`,
        params: {
          start,
          count
        }
      });
      return result;
    }
  },
  components: {
    DetailList,
    DbHead
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === "index") {
        vm.$store.commit({
          type: "getBookListPosition",
          position: 0,
          page: 1
        });
      }
    });
  }
};
</script>

<style scoped lang="stylus">
.wrap
  height 100%
.van-loading
  height 100%
  text-align center
  line-height 6.17rem
</style>
