<template>
  <v-list
    dense
    nav
  >
    <v-list-item-group
      :value="selectedItem"
      mandatory
    >
      <v-list-item
        v-for="(item, i) in itemList"
        :key="i"
        link
        @click="clickItem(item)"
      >
        <v-list-item-avatar>
          <v-img :src="`http://flanb.msharebox.com:6661/url?url=${item.map_image}`"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-html="item.title"></v-list-item-title>
          <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "NavigationList",
    data () {
      return {
        selectedItem: 0,
      }
    },
    beforeMount() {
      this.selectedItem = this.itemList.findIndex(x => x.id == this.$route.params?.itemId)
    },
    methods: {
      clickItem(item) {
        if(this.$route.path != `/item/${item.id}`) {
          this.$router.replace(`/item/${item.id}`)
        }
      }
    },
    computed: {
      ...mapState(['itemList'])
    },
    watch:{
      $route(){
        this.selectedItem = this.itemList.findIndex(x => x.id == this.$route.params?.itemId)
      }
    },
  }
</script>

<style scoped>

</style>
