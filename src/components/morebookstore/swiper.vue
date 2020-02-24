<template>
  <div>
    <van-swipe :autoplay="3000" indicator-color="#e76648">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <van-image :src="image" :lazy-load="true" v-lazy="image" height="180px" width="100%"></van-image>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem, Lazyload, Image } from "vant";

Vue.use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(Image);

export default {
  data() {
    return {
      images: [
        "https://images.weserv.nl/?url=img1.doubanio.com/view/freyr_page_photo/raw/public/5008.jpg",
        "https://images.weserv.nl/?url=img1.doubanio.com/view/freyr_page_photo/raw/public/4977.jpg",
        "https://images.weserv.nl/?url=img9.doubanio.com/view/freyr_page_photo/raw/public/4946.jpg",
        "https://images.weserv.nl/?url=img3.doubanio.com/view/freyr_page_photo/raw/public/4915.jpg",
        "https://images.weserv.nl/?url=img3.doubanio.com/view/freyr_page_photo/raw/public/4794.jpg"
      ]
    };
  }
};
</script>

<style scoped lang="stylus">
.van-image
    height 46.6667vw !important
.van-swipe
    height 46.6667vw

</style>
