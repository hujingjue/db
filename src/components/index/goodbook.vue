<template>
  <div class="good-book-wrap">
    <header>发现好图书</header>
    <div class="good-book-list">
      <div class="first-line">
        <ul>
          <li>小波看书</li>
          <li>村上春树周边</li>
          <li>我凭名字认定了你</li>
          <li>不可饶恕的女人们</li>
        </ul>
      </div>
      <div class="second-line">
        <ul>
            <li>爱欲书</li>
            <li>他们还写侦探小说</li>
            <li>人生识字始忧患</li>
            <li>诗歌书店</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped lang="stylus">
.good-book-wrap
  header
    font-size 0.16rem
    color #111
    margin-bottom 0.1rem
    padding-left .15rem
  .good-book-list
    padding-left 0.15rem
    overflow-x scroll
    .first-line,.second-line
        margin-bottom .2rem
      ul
        white-space nowrap
        li
            font-size 0.16rem
            border 1px solid black
            display inline-block
            padding 0 .2rem
            height .5rem
            line-height .5rem
            margin-left .15rem
            border-radius .05rem
    .first-line
        ul
            li:first-child
                color #2384E8
                border-color #2384E8
            li:nth-child(2)
                color #FFAC2D
                border-color #FFAC2D
            li:nth-child(3)
                color #3BA94D
                border-color #3BA94D
            li:nth-child(4)
                color #FF4055
                border-color #FF4055
    .second-line
        ul
            li:first-child
                color #FFAC2D
                border-color #FFAC2D
            li:nth-child(2)
                color #2384E8
                border-color #2384E8
            li:nth-child(3)
                color #3BA94D
                border-color #3BA94D
            li:nth-child(4)
                color #CC3344
                border-color #CC3344



      
</style>
