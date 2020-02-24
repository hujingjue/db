<template>
  <li @click="goDetail(id)">
    <img :src="newUrl" width="100px" height="142px">
    <h2>{{title}}</h2>
    <div class="score-bg">
      <i 
        v-for="(s,index) in star"
        :key="index"
        :class="{empty:s===0}"
      ></i>
     
      <span v-if="block!=='bookStore'">{{score}}</span>
      <span v-else>￥ {{price}}</span>
    </div>
  </li>
</template>

<script>
  
export default {
  props: ["url", "title", "score","price","block",'id'],
  data() {
    return {
      newUrl: "",
      star:[]
    };
  },
  mounted() {
    if(this.score<8){
        this.star=new Array(1,1,1,0,0)
        
      }else if(this.score>=8&&this.score<9.5){
        this.star=new Array(1,1,1,1,0)
      }else if(this.score>=9.5){
        this.star=new Array(1,1,1,1,1)
      }
    this.newUrl = "https://images.weserv.nl/?url=" + this.url.substring(8);
  },
  methods: {
    goDetail(id){
      if(id){
        this.$router.push('/bookdetail/'+id)
      }
      
    }
  },
};
</script>

<style scoped lang="stylus">
li
  margin-left 0.07rem
  img
    display block
    width 1rem
    height 1.42rem
    border-radius 0.05rem
  h2
    text-align center
    color #111
    font-weight normal
    font-size 0.15rem
    width 1rem
    text-overflow ellipsis
    white-space nowrap
    overflow hidden
  .score-bg
    text-align center
    height 0.15rem
    line-height 0.15rem
    i
      display inline-block
      width 0.1rem
      height 0.1rem
      background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAfhJREFUOBGlVD1LHFEUPXfWrzGJO2uhaIQ0iljESgKSpAjBwpXVKikEl6TzD6TwJ4gWaQMBS8WQgCRZ61QpglUgRbQUbMR1XfwodvbmvE1mdt/ssDPBC493733nnrkf7w2QQrSU29D9wY8poJAkkG6hD8O5E+IGgJsHkr8+7hTjdDpsnA0PLkHE4yK2r5iETyYUfdUkkRa96W3VOhLqXv8oFHNhgGCC/Xwc2jFKR0J0966w1IwVp/LasiNGOBTdxV24bhbqenCQRUY9qLzl2CasGEUVdbyA1M5R1wrq/gUqVxUp4tLghCX85D7VlonFksJQ9Un3w5S8c2sy8z3TGtGDRsla8op0vKe3O0UuMRBVDm9N8uX1Zg/3s8+hmU/sGS/wf8kN0UWZP/tgokJCY+jX3ENmWqJ3zNiJonoKXxalcPY9wFqExqmf3fvIuL+SM2WZNX9SCheHAZnZ2++h9FyxufdaQfG6CBznTvQshtDhSyA4jQieRmExhO2gaFBoi5OK8EkYECiqX9jdd1wauP7tbVgrw8a/TzETBpkp1nWZ96sg8+VV8j0j6VF4Dozo3sB4ix0ZypD3iO3r+QvQbfi1KVkobwcBkj//hmp5msSbXHxqlC67bCtDDr2fN/43wYvMaFkK1dOALNjlJa6Z8RuIP0vfAZfVhj/iqoy46fpKwgAAAABJRU5ErkJggg==')
      background-size 0.1rem 0.1rem
    .empty
      background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAeRJREFUOBGtlDsvBFEUx3d2djfiMbTsQ0NEwTaiQSGiRKWREDofgMJHEAqdSPSE0BC9SiEqWQWSzT4SzSbrsR7Fzo7fEXfNg9klbjI5j/s/vzn3MRMI1DFyudxaPp8/qEMa0GqJ0ul0QzgcvtM0zbAsqzMWi+X9aoJ+kzIXiUSmgLXhinZOcn6jJpDieRvA7tvSX64vMJvNdiAdV3I67c5kMkMq/s76AgHMUqTbC0Oh0II9dvvVQ0mlUs2GYbRWKpU2ij4swA3pylX0ZJrmNPn7crn8oOv6Y7FYfEgmk8+i07gOl0z24js6cUHqCU1uwbksefcfYPJCHeDFx5LpUq7DNp2GZeYPw2KrVuLx+Gp1D4GOATwEZvwGSFdv6Oe48PtSVwVKwCfWB/SEJyZxHaMAcBLYmdI6gJIEGg0Gg1e4tTqVZfawzBsFE+u5h4heyLfYRT/4LERrcs95gNwr+RI8nbsLJWa5I+68B8hbPSJ3kYq/03qAvHVYFShL7phni9hSuU/r0TqA8u9DOGArKvCZzXCKEzyL7O8o4Fs1T4ftHGKXisU6gOzfIKLIp2CnVCr1JhKJHVXAiZ4C7Ae8Ts6UPDfCsUUhJRYLrJGCa+xSNBo9ss8pH+gr/jK/tj0a2ETv2IZ35FSkS7HbzakAAAAASUVORK5CYII=')
      background-size 0.1rem 0.1rem
    span
      color #818181
      font-size 0.12rem
      margin-left 0.05rem
</style>
