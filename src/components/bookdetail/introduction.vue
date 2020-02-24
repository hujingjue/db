<template>
  <div class="introduction-wrap">
    <h2>简介</h2>
    <div class="content-wrap">
      <p :style="{display:isShow}">
        {{data.intro}}
      </p>
       <span @click="showMore" v-if="isShow!=='block'">展开</span>
    </div>
   
  </div>
</template>

<script>
export default {
  props:['data'],
  data() {
    return {
        isShow:'-webkit-box'
    };
  },
  methods: {
      showMore(){
          this.isShow='block'
      }
  },
  mounted() {
      console.log(this.data)
  },
};
</script>

<style scoped lang="stylus">
.introduction-wrap
    padding .15rem
    min-height 1.69rem
    h2
        font-size 0.16rem
        font-weight normal
        color #818181
        margin-bottom .1rem
    .content-wrap
        display flex
        flex-direction column
        p
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 4
            overflow: hidden;
        span 
            color #42bd56
            text-align right
            
</style>
