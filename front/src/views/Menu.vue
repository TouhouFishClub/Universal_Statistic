<template>
  <div class="menu">
    <ItemInfo
        v-for="itemInfo in itemList"
        :item-info="itemInfo"
        class="item-card"
    />
  </div>
</template>

<script>
  import ItemInfo from "@/components/ItemInfo";
  import { mapState } from 'vuex'
  export default {
    name: "Menu",
    components: {
      ItemInfo
    },
    computed: {
      ...mapState(['itemList'])
    }
  }
</script>

<style lang="scss" scoped>
  .menu {
    .item-card {
      margin-bottom: 20px;
    }
  }
</style>
