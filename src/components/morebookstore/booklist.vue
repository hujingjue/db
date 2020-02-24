<template>
  <div>
    <db-new-book-item 
    v-if="type==='newbook'"
    ></db-new-book-item>
    <db-active-item 
    v-if="type==='active'" 
    ></db-active-item>
    <db-bookorder-item 
    v-if="type==='bookorder'"
    ></db-bookorder-item>
  </div>
</template>

<script>
import DbNewBookItem from "components/morebookstore/newbook/newbookitem.vue";
import DbActiveItem from "components/morebookstore/active/active.vue";
import DbBookorderItem from "components/morebookstore/bookorder/bookorder.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      
    };
  },
  mounted() {
    
  },
  computed: {
    ...mapState({
      type: state => state.bookStore.id
    })
  },
  components: {
    DbNewBookItem,
    DbActiveItem,
    DbBookorderItem
  }
};
</script>

<style scoped lang="stylus">
</style>
