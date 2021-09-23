<template>
  <div class="list-item">
    <ItemInfo :item-info="itemInfo"/>
    <ItemLineChart
      :item-id="itemId"
    />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import ItemLineChart from "@/components/ItemLineChart";
  import ItemInfo from "@/components/ItemInfo";
  export default {
    name: "ListItem",
    components: {
      ItemLineChart,
      ItemInfo,
    },
    data() {
      return {
        itemInfo: null,
        itemChartInfo: [],
        itemId: null,
      }
    },
    computed: {
      ...mapState(['itemList'])
    },
    methods: {
      fetchItemInfo() {
        let id = this.$route.params?.itemId
        this.itemId = id
        this.itemInfo = this.itemList.filter(x => x.id == id)[0]
      }
    },
    mounted() {
      this.fetchItemInfo()
    },
    watch:{
      $route(){
        this.fetchItemInfo()
      }
    },
  }
</script>

<style lang="scss" scoped>
  .list-item {

  }
</style>
