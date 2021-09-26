<template>
  <div class="menu">

    <v-alert
        color="cyan"
        border="left"
        elevation="2"
        colored-border
        :dark="$store.state.isDark"
        class="mb-4"
    >

      <v-row align="center">
        <v-col class="grow">
          更新时间：{{ itemUpdateTime | fmtTime }}
        </v-col>
        <v-col class="shrink">
          <v-btn
              outlined
              :loading="pendingItems"
              :disabled="pendingItems"
              @click="$store.dispatch('fetchNowList')"
          >刷新</v-btn>
        </v-col>
      </v-row>
    </v-alert>
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
  import formatTime from '@/utils/formatTime'
  export default {
    name: "Menu",
    components: {
      ItemInfo
    },
    computed: {
      ...mapState([
        'itemList',
        'itemUpdateTime',
        'pendingItems',
      ])
    },
    filters: {
      fmtTime(data) {
        return data ? formatTime(data, 'autoFullYear') : "";
      }
    },
  }
</script>

<style lang="scss" scoped>
  .menu {
    .item-card {
      margin-bottom: 20px;
    }
  }
</style>
