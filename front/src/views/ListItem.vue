<template>
  <div class="list-item">
    <v-card
      :dark="$store.state.isDark"
      max-width="500"
      class="mx-auto"
    >
      <v-img
        height="150"
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      ></v-img>

      <div
        class="chip-item"
        :class="[itemInfo.waiting_time > 60 ? 'error': 'primary']"
      >
        <span>等待</span>
        <strong>{{ itemInfo.waiting_time }}</strong>
        <span>分钟</span>
      </div>

      <v-card-title>{{ itemInfo.title }}</v-card-title>

      <v-card-subtitle>{{ itemInfo.subtitle }}</v-card-subtitle>

    </v-card>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "ListItem",
    data() {
      return {
        itemInfo: null,
        itemChartInfo: []
      }
    },
    computed: {
      ...mapState(['itemList'])
    },
    methods: {
      fetchItemInfo() {
        let id = this.$route.params?.itemId
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
    .chip-item {
      position: absolute;
      top: 130px;
      right: 20px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      border-radius: 20px;
      strong {
        font-size: 30px;
        margin-left: 5px;
        margin-right: 5px;
      }
    }
  }

</style>