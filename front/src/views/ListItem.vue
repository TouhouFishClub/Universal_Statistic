<template>
  <div>
    这是单个项目{{$route.params.itemId}}
  </div>
</template>

<script>
  export default {
    name: "ListItem",
    methods: {
      fetchItemInfo() {
        console.log(this.$route.params?.itemId)
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

<style scoped>

</style>