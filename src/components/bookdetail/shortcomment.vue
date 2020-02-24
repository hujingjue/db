<template>
  <div class="short-comment-wrap">
    <h2>短评</h2>
    <div class="comment-item" v-for="(sc,index) in shortComment.interests" :key="sc.id">
      <div class="header">
        <img src="sc.user.avatar" alt>
        <p>{{sc.user.name}}</p>
        <div class="star-wrap" v-if="sc.rating!==null">
          <i
          class="have"
          v-for="(v,index) in sc.rating.value"
          :key="index"
          ></i>
          <i
          class="none"
          v-for="(o,index) in 5-(sc.rating.value)"
          :key="index+10"
          >
          </i>
        </div>
        <p>{{date[index]}}</p>
      </div>
      <div class="content-wrap van-hairline--bottom">
        <p ref="content">{{sc.comment}}</p>
        <span @click="showMore($event)">展开</span>
        <div class="footer">
          <div>
            <i class="like"></i>
            <span>{{sc.vote_count}}</span>
          </div>
          <div>
            <i class="more"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('zh-cn')
export default {
  props: ["shortComment"],
  data() {
    return {
      date:[]
    };
  },
  mounted() {
    this.$refs.content.forEach(value => {
      if (value.clientHeight > 63) {
        value.parentNode.children[1].style.display="inline-block"
        value.style.display='-webkit-box'
      }
    });
    this.shortComment.interests.forEach(value=>{
      this.date.push(moment(value.create_time).fromNow())
    })
  },
  methods: {
    showMore(e) {
      e.target.previousElementSibling.style.display="block"
      e.target.style.display='none'
    }
  }
};
</script>

<style scoped lang="stylus">
.short-comment-wrap
  padding 0.15rem
  >h2
    font-size 0.16rem
    font-weight normal
    color #818181
  .comment-item
    margin-bottom 0.15rem
    .header
      display flex
      img
        width 0.2rem
        height 0.2rem
        border-radius 50%
        margin-right 0.1rem
      p:last-child
        color #c0c0c0
        font-size 0.12rem
        margin-left 0.1rem
      .star-wrap
        margin-left 0.05rem
        i
          display inline-block
          width 0.13rem
          height 0.13rem
          background-size 0.13rem 0.13rem !important 
        i.have
          background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAvVJREFUSA21lj1oFFEQx2d2jwTydXsRQUEw2BhiIcGgxkSwUbw7gkhCxCpJIXaCjWUKLQWxshbLgPEzZ2NhREGChSjY2BgMoiC3l3gazceO/3fHbi7Z9+7uncnC8ubNm5nf7Oy8t8vU4CXPUg+J+CCt5Y/wEP22DePYOih7edx5CNBzELvJ9UYaidEQmBIyHsGYJyLZQmAL25KpTJFLbZ0LxLSn7CtCf+QAny98toll/8QtqbMbUIVipiZn3AaqbO3BDschjowJMrCBW4FlqqMTrTUUB3AXPfVOxfVmjRWYWt2LqGyzNpxr12R2YNaUOcxCeFgeUXs4rTXWDS7tXaY+Y0CmFmpKjhrXtyywPOk4So7TjzbzKHCSaBEPd5IkHMWDT1lPnNjiv3kqsoJX8QO+i1hYwl0e1dwJNmSRVyy5VB7Gqc0RdngmMo9Sy+0dxujCzzqcKVyngC4hgTWdxfbrgls0509Emx4lT6PkUwC1bT8MEUXW0TtXOO3fUfEjsJpIzusldmYg7lXzbbyKiH4B0FwYcxNYKWXG2w94Din1hEb/OX6lIMhytvCuMk5sH8Ngnv4GAyjNbKVhQ7LIe5LlY1uhKlYMrJT4xBWo6J/B86t33uAlL2jVH+TM8oIugBasDHmUVtDtL3VOdemEPuEf5afJ1gguOTANmhxr6plPVrOpDiZuHIz/Mcm17TbBjWB54HWhs/eZHOvSc8KYuBFMTVS1VHWBA8cYwwzmGmVG8wD+vGoCbE7eDCZDc6ijj+QmFfOHOZ0/jcNhAnve1ycgvdiQ2iNYC5bp9l3E0h0LVjoQguM4+q5huy2rdRwOd0lW1Ck3HbNndqk12R/TQ6EFU7OLpsBva3ipD7wEk/TF7+Ps4ttQHY6c/fUNTz9MwfoIfgK+h/rSyK72PevBDg9EzkJviFZ78fm8wZdpNdJrBCR1n4prPSj9vYrlExVyJOrBgXxA5gt4yqs0lx/gTPFj5FFD4NGlPGf8MZx6acRQfq91Lv8AZLTfj0RLVbcAAAAASUVORK5CYII=')
        i.none
          background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAtxJREFUSA21l01oE0EUgLv5wdBEGhUhkj9zW8xBAkFs2lIQFIsHDxVFEJocvApePHrQoyCePOUgHgNKL3oS/EHBQ0CopAZyCCFJiSDV1ICQmMRvJBs2252wu00Hhnnz3rz3vTeTnWnn5hy2ZrO5Sf9WLBbnnYRwOXGq1WpJ/K7S1VAodM1JDEdgl8uV1cFyOtmyaBtcKBTcgG9pBEVRVqvV6mltbnW0Dc5kMpcJHtIBFI/Hk9XNLYm2wUTdB2EHNtArloijRbYW1+v142ztDv2IETIcDi9EIpG3Rr1sbqtiKrtpBh0Ft/UjswUGkJVVQELr5XL5qMxu1FsGj77dtDGAbj7v9/uv6+ZTRYVzO8eKRbYxyDktIAfp/0eqWEAXFONI72GUNtZ2Mf5gfRt5zzC2me+hbw8Gg49Ko9HYRXFMGu1wDDUX0CeHE1selarfu8Lh8ANKv82yv/Kls7MAfZzP53Pj75izXuOcCyACs8NMROozu0OhT4V2DBYTnrkUGb1i+0+J+Qxbh129EY1GX2sxJz4nsvnS7XYXMW5rCw46UsgOfUUPFTEnKtYgvDZBr9e7SeWrms7JCHALvytcpQ2j/0TFmjGRSPxqt9uXcBRn7qjh+67T6SybQUVAU7AwJJPJLhV/ELKThm9FVdXfMl8pWDiQ9bLM0YJ+ZdqaqWAcDwJWK5XKSRlcChZ/zrBdEZmjFb3P55MmLgXzq566VVbAJC6NIQUTWJqtgHL+FfqbaQk4Ak9x6nMLPQJ6lk/lImOO/lOSQKpUKplewaYV81SeIJBqDAZgq9/vn+cWukf/I+zAn/V6vTPYXhrXM3cHAgFxE+5rpmAqEts8vtUI2qXfb7Va6VgsVjRG4cJpkcA6fuK/iu96u9vtNj1nUzDbvKQ5A/xMlSkCP0yn0z1NbzayCy+Ai+qf6+wZnTwWZeCvODfod3k7l+LxuOVHA/guSW6QwBqUbWJ8GtN0wj/otREARiWDTAAAAABJRU5ErkJggg==')

    .content-wrap
      padding-left 0.25rem
      display flex
      flex-direction column
      p
        margin 0.05rem 0 0.1rem 0
        display block
        -webkit-box-orient vertical
        -webkit-line-clamp 3
        overflow hidden
      >span
        text-align right
        color #42bd56
        display none
    .footer
      display flex
      justify-content space-between
      div:first-child
        display flex
      .like
        display inline-block
        width 0.2rem
        height 0.2rem
        background-size 0.2rem 0.2rem
        background url('https://img3.doubanio.com/f/talion/7a0756b3b6e67b59ea88653bc0cfa14f61ff219d/pics/card/ic_like_gray.svg')
      span
        color #ccc
        font-size 0.14rem
      div:last-child
        margin-bottom 0.1rem
      .more
        display inline-block
        width 0.2rem
        height 0.2rem
        background url('https://img3.doubanio.com/f/talion/be268c0a1adb577c8dfdcfbe48c818af3983ed62/pics/card/more.svg')
        background-size 0.2rem 0.2rem
    .content-wrap::after
      border-color #bbb
</style>
