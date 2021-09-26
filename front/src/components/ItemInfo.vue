<template>
  <v-card
      :dark="$store.state.isDark"
      max-width="500"
      class="mx-auto"
      v-if="itemInfo"
      @click="$router.replace(`/item/${itemInfo.id}`)"
  >
    <v-img
        height="150"
        :src="`http://flanb.msharebox.com:6661/url?url=${itemInfo.map_image}`"
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
</template>

<script>
export default {
  name: "ItemInfo",
  props: ['itemInfo'],
  methods: {
    test() {
      console.log(1111)
    }
  }
}
</script>

<style lang="scss" scoped>
.chip-item {
  position: absolute;
  top: 120px;
  right: 20px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 20px;
  color: #fff;
  strong {
    font-size: 30px;
    margin-left: 5px;
    margin-right: 5px;
  }
}
</style>
