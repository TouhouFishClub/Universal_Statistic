<template>
  <v-list
    dense
    nav
  >
    <v-list-item-group
      v-model="selectedItem"
      mandatory
    >
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        @click="clickItem(item)"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
  export default {
    name: "NavigationList",
    data () {
      return {
        items: [
          { title: '列表', icon: 'mdi-clipboard-text', route: '/item/1' },
          { title: '图表', icon: 'mdi-chart-line', route: '/item/2' },
          { title: '设置', icon: 'mdi-cog', route: '/item/3' },
        ],
        selectedItem: 0,
      }
    },
    beforeMount() {
      this.selectedItem = this.items.findIndex(x => x.route == this.$route.path)
    },
    methods: {
      clickItem(item) {
        if(this.$route.path != item.route) {
          this.$router.replace(item.route)
        }
      }
    },
    watch:{
      $route(to,from){
        this.selectedItem = this.items.findIndex(x => x.route == this.$route.path)
      }
    },
  }
</script>

<style scoped>

</style>