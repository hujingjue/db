<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {get} from 'utils/http.js'
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
#app
  height 100%
  background #fff
</style>
