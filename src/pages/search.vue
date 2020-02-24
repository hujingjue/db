<template>
  <div class="wrap">
    <div v-html="html" ></div>
  </div>
</template>

<script>
import { get } from "utils/http.js";
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      html: ""
    };
  },
  async mounted() {
    let keyword = this.$route.params.keyword;
    await this.getData(keyword);
  },
  methods: {
    async search(e) {
      if (e.keyCode === 13) {
        let keyword = e.target.value;
        await this.getData(keyword);
      }
    },
    async getData(keyword) {
      let res = await get({
        url: "/search/",
        params: {
          query:keyword
        }
      });
      this.html = res.data;
      await this.$nextTick();
      new BScroll('.wrap',{
        mouseWheel:true
      })
      document.querySelectorAll("#button-search")[0].style.width = "auto";
      document.querySelectorAll(".TalionNav-static")[0].style.margin = "0";
      let inputs = Array.from(document.querySelectorAll("input"));
      inputs.forEach(value => {
        value.parentNode.action = "javascript:;";
        value.addEventListener("keyup", this.search);
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.wrap
  height 100%

</style>
