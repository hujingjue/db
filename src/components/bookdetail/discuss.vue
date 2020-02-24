<template>
  <div class="discuss-wrap">
    <h2>讨论</h2>
    <div class="discuss-list">
      <div class="discuss-item van-hairline--bottom"
        v-for="d in discuss.forum_topics"
        :key="d.id"
      >
        <p>{{d.title}}</p>
        <span>{{d.comments_count}}回复</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['discuss'],
  data() {
    return {};
  }
};
</script>

<style scoped lang="stylus">
.discuss-wrap
  padding 0.15rem
  h2
    font-weight normal
    color #818181
    margin-bottom 0.1rem
  .discuss-list
    .discuss-item
      margin-bottom 0.1rem
      padding-bottom 0.15rem
      p
        margin-bottom 0.1rem
      span
        color #818181
        font-size 0.14rem
    .discuss-item::after
      border-color #bbb
</style>
