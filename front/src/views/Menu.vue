<template>
  <div class="menu">
    <p>这是所有项目列表(建设中)</p>
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
