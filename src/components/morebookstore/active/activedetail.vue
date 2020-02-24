<template>
  <div class="activedetail-wrap">
      <div v-html="html"></div>
  </div>
</template>

<script>
import bus from 'assets/busevent.js'
import BScroll from 'better-scroll'
import {get} from 'utils/http.js'
export default {
  data () {
    return {
        html:''
    }
  },
  async mounted() {
      await bus.$on('url',this.getUrl)
      await this.$nextTick()
      new BScroll('.activedetail-wrap',{
          mouseWheel:true
      })
  },
  methods: {
      async getUrl(url){
          let result=await get({
              url:url+"/"
          })
          this.html=result.data
      }
  },
  beforeDestroy() {
      bus.$off('url',this.getUrl)
  },
}
</script>

<style scoped lang="stylus">
.activedetail-wrap
    height 100%
</style>
