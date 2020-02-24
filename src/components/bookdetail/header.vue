<template>
  <div class="header-wrap" :style="{background:'#'+data.header_bg_color}">
    <div class="top">
      <img :src="'https://images.weserv.nl/?url='+data.pic.normal.substring(8)" alt>
      <div>
        <h2>{{data.title}}</h2>
        <p v-if="data.honor_infos.length!==0">
          <span>No.{{data.honor_infos[0].rank}}</span>
          <span>{{data.honor_infos[0].title}}</span>
        </p>
        <p v-else>
          <span>No.5</span>
          <span>一周热门虚构类图书</span>
        </p>
        <p>{{data.press[0]}}/{{data.pubdate[0]}}出版</p>
        <div>
          <div>
            <i></i>
            <span>想读</span>
          </div>
          <div>
            <i></i>
            <span>在读</span>
          </div>
          <div>
            <i></i>
            <span>读过</span>
          </div>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="left">
        <div>
          <span>豆瓣评分</span>
          <sup>TM</sup>
        </div>
        <div>
          <div>{{data.rating.value}}</div>
          <div>
            <div>
              <i v-for="(l) in 5" :key="l"></i>
            </div>
            <div>
              <span>{{data.rating.count}}人评分</span>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div>
          <span>打开App评分</span>
        </div>
        <div class="score-wrap">
          <div class="wrap" 
            v-for="(s,index) in star.stats"
            :key="index"
          >
            <div class="star-wrap">
              <i 
                v-for="(n,index) in 5-index"
                :key="index"
              ></i>
              
            </div>
            <div class="line-wrap">
              <span :style="{width:star.stats[4-index]*100+'%'}"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <span>电子书/纸质版购买</span>
      <span>
        {{data.price[0]}}元起
        <van-icon name="arrow"/>
      </span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon } from "vant";
import BScroll from "better-scroll";
Vue.use(Icon);
export default {
  props: ["data","star"],
  data() {
    return {};
  },
  async mounted() {
    await this.$nextTick()
      let bs=new BScroll('.bookdetail-wrap',{
        bounce:false,
        click:true
      })
  },
};
</script>

<style scoped lang="stylus">
.header-wrap
  padding 0.2rem 0.15rem
  background #2e3c4c
  color #fff
  .top
    display flex
    img
      width 1rem
      height 1.42rem
    >div
      margin-left 0.1rem
      width 100%
      h2
        font-size 0.24rem
        font-weight normal
      p:nth-child(2)
        font-size 0.12rem
        color #9D5F00
        padding 0.1rem 0
        span:first-child
          display inline-block
          height 0.24rem
          padding 0 0.11rem 0 0.09rem
          background linear-gradient(#FFF3E6, #FEF0B3)
          line-height 0.24rem
          border-radius 0.03rem 0 0 0.03rem
        span:last-child
          display inline-block
          background linear-gradient(45deg, #FFD395, #FEC36E)
          height 0.24rem
          padding 0 0.1rem
          line-height 0.24rem
          border-radius 0 0.03rem 0.03rem 0
      p:nth-child(3)
        opacity 0.7
        font-size 0.12rem
        padding-bottom 0.1rem
      div:nth-child(4)
        display flex
        width 100%
        div
          flex 1
          height 0.3rem
          margin-right 0.1rem
          background #fff
          color #000
          border-radius 0.03rem
          font-size 0.12rem
          display flex
          align-items center
          justify-content center
          i
            display inline-block
            width 0.14rem
            height 0.14rem
            background-size 0.14rem 0.14rem !important
            line-height 0.3rem
            margin-right 0.05rem
        div:first-child
          i
            background url('https://img3.doubanio.com/f/talion/cf2ab22e9cbc28a2c43de53e39fce7fbc93131d1/pics/card/ic_mark_todo_s.png')
        div:nth-child(2)
          i
            background url('https://img3.doubanio.com/f/talion/3157e2ea17ccc9d21ad3a0b9bd97a49116275219/pics/card/ic_mark_doing_s.png')
        div:last-child
          i
            background url('https://img3.doubanio.com/f/talion/78fc5f5f93ba22451fd7ab36836006cb9cc476ea/pics/card/ic_mark_done_s.png')
  .center
    margin-top 0.1rem
    background rgba(0, 0, 0, 0.1)
    padding 0.1rem 0.15rem
    border-radius 0.05rem
    display flex
    .left
      flex 1
      div:first-child
        span, sup
          font-size 0.12rem !important
        sup
          display inline-block
          transform scale(0.7)
      >div:last-child
        margin-top 0.1rem
        display flex
        border-right 1px solid rgba(255, 255, 255, 0.2)
        >div:first-child
          font-size 0.3rem
          font-weight 500
        >div:last-child
          margin 0.05rem 0 0 0.1rem
          >div:first-child
            i
              display inline-block
              width 0.13rem
              height 0.13rem
              background-size 0.13rem 0.13rem !important
              background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAvVJREFUSA21lj1oFFEQx2d2jwTydXsRQUEw2BhiIcGgxkSwUbw7gkhCxCpJIXaCjWUKLQWxshbLgPEzZ2NhREGChSjY2BgMoiC3l3gazceO/3fHbi7Z9+7uncnC8ubNm5nf7Oy8t8vU4CXPUg+J+CCt5Y/wEP22DePYOih7edx5CNBzELvJ9UYaidEQmBIyHsGYJyLZQmAL25KpTJFLbZ0LxLSn7CtCf+QAny98toll/8QtqbMbUIVipiZn3AaqbO3BDschjowJMrCBW4FlqqMTrTUUB3AXPfVOxfVmjRWYWt2LqGyzNpxr12R2YNaUOcxCeFgeUXs4rTXWDS7tXaY+Y0CmFmpKjhrXtyywPOk4So7TjzbzKHCSaBEPd5IkHMWDT1lPnNjiv3kqsoJX8QO+i1hYwl0e1dwJNmSRVyy5VB7Gqc0RdngmMo9Sy+0dxujCzzqcKVyngC4hgTWdxfbrgls0509Emx4lT6PkUwC1bT8MEUXW0TtXOO3fUfEjsJpIzusldmYg7lXzbbyKiH4B0FwYcxNYKWXG2w94Din1hEb/OX6lIMhytvCuMk5sH8Ngnv4GAyjNbKVhQ7LIe5LlY1uhKlYMrJT4xBWo6J/B86t33uAlL2jVH+TM8oIugBasDHmUVtDtL3VOdemEPuEf5afJ1gguOTANmhxr6plPVrOpDiZuHIz/Mcm17TbBjWB54HWhs/eZHOvSc8KYuBFMTVS1VHWBA8cYwwzmGmVG8wD+vGoCbE7eDCZDc6ijj+QmFfOHOZ0/jcNhAnve1ycgvdiQ2iNYC5bp9l3E0h0LVjoQguM4+q5huy2rdRwOd0lW1Ck3HbNndqk12R/TQ6EFU7OLpsBva3ipD7wEk/TF7+Ps4ttQHY6c/fUNTz9MwfoIfgK+h/rSyK72PevBDg9EzkJviFZ78fm8wZdpNdJrBCR1n4prPSj9vYrlExVyJOrBgXxA5gt4yqs0lx/gTPFj5FFD4NGlPGf8MZx6acRQfq91Lv8AZLTfj0RLVbcAAAAASUVORK5CYII=')
            i:last-child
              background url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxM3B4IiB2aWV3Qm94PSIwIDAgMTMgMTMiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjUgKDY3NDY5KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT7liIbnu4RAM3g8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0i6aG16Z2iMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IueUteW9seadoeebriIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEzMy4wMDAwMDAsIC0zMjkuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtMTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI0LjAwMDAwMCwgMzAzLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0zIj4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0i5YiG57uEIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDkuMDAwMDAwLCAyNi4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTYuNTUsMTAuNjM1ODQwNCBMNi41NSwxLjMzMDk1MzU4ZS0wNiBDNi41NTA0MjIyNiw0LjQ0MDc5MDAzZS0wNyA2LjU1MDg0NDkyLC0yLjc1MzM1MzFlLTE0IDYuNTUxMjY3OTcsLTIuNzUzMzUzMWUtMTQgQzYuODI4NDE4NTEsLTIuNzUzMzUzMWUtMTQgNi45MjcyNTg1NiwwLjE5MzE0Nzg2NyA2LjkzMjIxNzUxLDAuMjA5MDk1ODU2IEw4LjQ5OTkyNTc2LDQuMzY0MjExNSBMMTIuNjA2Nzg5LDQuNTk4MjQ4MjQgQzEyLjYwNjc4OSw0LjU5ODI0ODI0IDEyLjg4ODM4OTksNC42MDk2Nzc2MyAxMi45Nzc2NTExLDQuOTQxNTczIEMxMy4wNjE1Mjk1LDUuMjUzNTMzMzkgMTIuODgyMjg2Niw1LjQzMjU5Mzg2IDEyLjg4MjI4NjYsNS40MzI1OTM4NiBMOS43MzA4NDg4Myw4LjE1Njg2NDc5IEwxMC43NDY5Njg2LDEyLjQyNzY0NzcgQzEwLjc0Njk2ODYsMTIuNDI3NjQ3NyAxMC44MzUxMjc4LDEyLjY5NzUyMzEgMTAuNTkwMDE5NywxMi44OTM0MTc1IEMxMC4zNDk4MjgzLDEzLjA4NTQxMzYgMTAuMTIyMzA5NywxMi45NDc5OTUxIDEwLjEyMjMwOTcsMTIuOTQ3OTk1MSBMNi41NjE1NjczNCwxMC42MjgzMTU4IEw2LjU1LDEwLjYzNTg0MDQgWiIgaWQ9IuWQiOW5tuW9oueKtiIgZmlsbD0iI0ZGRkZGRiIgb3BhY2l0eT0iMC4zIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLjEsMTAuNjM1ODQwNCBMMC4xLDEuMzMwOTUzNThlLTA2IEMwLjEwMDQyMjI2MSw0LjQ0MDc5MDAzZS0wNyAwLjEwMDg0NDkxOCwtMi43NTMzNTMxZS0xNCAwLjEwMTI2Nzk3MywtMi43NTMzNTMxZS0xNCBDMC4zNzg0MTg1MTMsLTIuNzUzMzUzMWUtMTQgMC40NzcyNTg1NTksMC4xOTMxNDc4NjcgMC40ODIyMTc1MTUsMC4yMDkwOTU4NTYgTDIuMDQ5OTI1NzYsNC4zNjQyMTE1IEw2LjE1Njc4OSw0LjU5ODI0ODI0IEM2LjE1Njc4OSw0LjU5ODI0ODI0IDYuNDM4Mzg5ODgsNC42MDk2Nzc2MyA2LjUyNzY1MTA5LDQuOTQxNTczIEM2LjYxMTUyOTUsNS4yNTM1MzMzOSA2LjQzMjI4NjU1LDUuNDMyNTkzODYgNi40MzIyODY1NSw1LjQzMjU5Mzg2IEwzLjI4MDg0ODgzLDguMTU2ODY0NzkgTDQuMjk2OTY4NTgsMTIuNDI3NjQ3NyBDNC4yOTY5Njg1OCwxMi40Mjc2NDc3IDQuMzg1MTI3OCwxMi42OTc1MjMxIDQuMTQwMDE5NzQsMTIuODkzNDE3NSBDMy44OTk4MjgyNiwxMy4wODU0MTM2IDMuNjcyMzA5NjYsMTIuOTQ3OTk1MSAzLjY3MjMwOTY2LDEyLjk0Nzk5NTEgTDAuMTExNTY3MzQzLDEwLjYyODMxNTggTDAuMSwxMC42MzU4NDA0IFoiIGlkPSLlkIjlubblvaLnirYiIGZpbGw9IiNGRkFDMkMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuMzI1MDAwLCA2LjQ5NzgxMikgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtMy4zMjUwMDAsIC02LjQ5NzgxMikgIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')
          >div:last-child
            span
              font-size 0.12rem
              transform scale(0.9)
              opacity 0.7
    .right
      flex 1
      div:first-child
        text-align right
        >span
          padding 0.03rem
          font-size 0.12rem
          border 1px solid #fff
          border-radius 0.05rem
      .score-wrap
        margin-top 0.1rem
        .wrap
          display flex
          height 0.1rem
          align-items center
          line-height 0.1rem
          justify-content space-around
          .star-wrap
            width 0.35rem
            i
              display inline-block
              width 0.07rem
              height 0.07rem
              background url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iOHB4IiBoZWlnaHQ9IjhweCIgdmlld0JveD0iMCAwIDggOCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTIuNSAoNjc0NjkpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPkltcG9ydGVkIExheWVycyBDb3B5QDN4PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IumhtemdojEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9IjAuNSI+CiAgICAgICAgPGcgaWQ9ImlQaG9uZS04IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjMxLjAwMDAwMCwgLTM1Ni4wMDAwMDApIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNS4wMDAwMDAsIDI5My4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTg4LjUwMDAwMCwgMzEuNTAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hCI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zNC45ODc5NjYsMzQuNjYwODQ3IEMzNC45Mzk5MDIyLDM0LjQ4MjEzNDEgMzQuNzg4MjcxLDM0LjQ3NTk3OTggMzQuNzg4MjcxLDM0LjQ3NTk3OTggTDMyLjU3Njg4MzEsMzQuMzQ5OTYgTDMxLjczMjczMjUsMzIuMTEyNTkwMSBDMzEuNzMwMDYyMywzMi4xMDQwMDI3IDMxLjY3Njg0MDcsMzIgMzEuNTI3NjA1OCwzMiBDMzEuMzgyMDQ1MywzMiAzMS4zMjM4MDI4LDMyLjA5NzYzMzcgMzEuMzE5ODA4OSwzMi4xMTI1OTAxIEwzMC40ODQ3NjQ0LDM0LjM0MDEwODQgQzMwLjQ4NDc2NDQsMzQuMzQwMTA4NCAyOC4yMDQyMjUsMzQuNDc4MTI2NyAyOC4xOTI2MzEzLDM0LjQ3ODk2MTUgQzI4LjA2Nzc0NzgsMzQuNDg4MDAyMiAyOC4wMTUxODgxLDM0LjYwOTUxMzYgMjguMDA2MjQxNywzNC42NTE5MDE4IEMyNy45ODM0MTk0LDM0Ljc2MDI0NTkgMjguMDI4MjE5NiwzNC44NDI4Mjc5IDI4LjA1OTUwODksMzQuODc1NTMxNSBMMjkuODA2MjM1MiwzNi40MDg1OTMzIEwyOS4yNTQ4MjYsMzguNzQzODM1NSBDMjkuMjU0ODI2LDM4Ljc0MzgzNTUgMjkuMjIzMDgwMiwzOC44NjI0ODQ0IDI5LjM2NDE2NzUsMzguOTU2NTQwMSBDMjkuNDk1Mzk1NywzOS4wNDM5ODgyIDI5LjYxMjM1OTksMzguOTcyNDI2NyAyOS42MTIzNTk5LDM4Ljk3MjQyNjcgTDMxLjUzMzE1MTYsMzcuNzIyOTM5MyBMMzMuNDUwNDc0NCwzOC45NzE5OTc0IEMzMy40NTA0NzQ0LDM4Ljk3MTk5NzQgMzMuNTcyOTg0NCwzOS4wNDU5OTE5IDMzLjcwMjMxODMsMzguOTQyNjA5NCBDMzMuODM0Mjk5NiwzOC44MzcxMjc4IDMzLjc4NjgyOTIsMzguNjkxODEwMyAzMy43ODY4MjkyLDM4LjY5MTgxMDMgTDMzLjIzOTY4NzgsMzYuMzkyMTU4IEwzNC45MzY2MTU4LDM0LjkyNTI0MjkgQzM0LjkzNjYxNTgsMzQuOTI1MjQyOSAzNS4wMzMxMzEzLDM0LjgyODgyNTcgMzQuOTg3OTY2LDM0LjY2MDg0NyIgaWQ9IkltcG9ydGVkLUxheWVycy1Db3B5Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')
              background-size 0.07rem 0.07rem
          .line-wrap
            width 1rem
            height 0.03rem
            background rgba(255, 255, 255, 0.2)
            position relative
            span
              display inline-block
              height 0.03rem
              background #FFAC2C
              position absolute
              top 0
              left 0
  .bottom
    padding 0.13rem 0.15rem
    margin-top 0.1rem
    background rgba(0, 0, 0, 0.1)
    border-radius 0.05rem
    display flex
    justify-content space-between
    span:first-child
      font-size 0.14rem
    span:last-child
      color rgba(255, 255, 255, 0.7)
      font-size 0.12rem
</style>
