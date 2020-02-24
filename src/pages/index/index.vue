<template>
  <div class="index-wrap">
    <section>
      <db-head></db-head>
      <main>
        <book-list :list="fiction.list" :type="fiction.type" :block="'fiction'" :show="isShow"></book-list>
        <book-list
          :list="nonfiction.list"
          :type="nonfiction.type"
          :block="'nonfiction'"
          :show="isShow"
        ></book-list>
        <book-list
          :list="bookStore.list"
          :header="bookStore.header"
          :urls="urls"
          :block="'bookStore'"
          :show="isShow"
        ></book-list>

        <good-book></good-book>
        <sort-browser></sort-browser>
      </main>
    </section>
  </div>
</template>

<script>
import DbHead from "components/head.vue";
import BookList from "components/index/booklist.vue";
import GoodBook from "components/index/goodbook.vue";
import SortBrowser from "components/index/sortbrowser.vue";
import { get } from "utils/http.js";
import axios from "axios";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      fiction: {
        type: "",
        list: []
      },
      nonfiction: {
        type: "",
        list: []
      },
      bookStore: {
        list: [],
        header: {}
      },
      urls: "",
      isShow: false
    };
  },
  async mounted() {
    let url = "";
    Promise.all([
      get({
        url: "/rexxar/api/v2/subject_collection/book_fiction/items",
        params: {
          start: 0,
          count: 8
        }
      }),
      get({
        url: "rexxar/api/v2/subject_collection/book_nonfiction/items",
        params: {
          start: 0,
          count: 8
        }
      }),
      get({
        url:
          "rexxar/api/v2/subject_collection/market_product_book_mobile_web/items",
        params: {
          start: 0,
          count: 8
        }
      })
    ]).then(async res => {
      this.fiction.type = res[0].data.subject_collection.id;
      this.fiction.list = res[0].data.subject_collection_items;
      this.nonfiction.type = res[1].data.subject_collection.id;
      this.nonfiction.list = res[1].data.subject_collection_items;
      this.bookStore.header = res[2].data.header;
      this.bookStore.list = res[2].data.subject_collection_items;
      this.urls = res[2].data.header.cover.url;
      this.isShow = true;
    });
    await this.$nextTick()
    let bs=new BScroll('.index-wrap',{
      mouseWheel: true,
      click:true,
      eventPassthrough:'horizontal'
    })
  },
  components: {
    DbHead,
    BookList,
    GoodBook,
    SortBrowser
  }
};
</script>

<style lang="stylus" scoped>
.index-wrap
  height 100%
  display flex
  flex-direction column
  main
    flex 1
</style>

