<template>
  <v-app>
    <v-navigation-drawer
        app
        v-model="drawer"
        fixed
        :dark="$store.state.isDark"
    >
      <v-sheet
          class="pa-4"
      >
        <v-avatar
            class="mb-4"
            color="#036bd9"
            size="64"
        >
          <img src="@/assets/logo.svg"/>
        </v-avatar>

        <div>北京环球度假村</div>
        <!--        <div>{{$store.state.account.birth}}</div>-->
      </v-sheet>
      <NavigationList/>

    </v-navigation-drawer>

    <v-app-bar
        app
        :dark="$store.state.isDark"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Universal Statistic</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn icon target="_blank" v-on="on" @click="$store.commit('tapTheme')">
            <v-icon>{{$store.state.isDark ? 'mdi-weather-night' : 'mdi-white-balance-sunny'}}</v-icon>
          </v-btn>
        </template>
        <span>{{$store.state.isDark ? '关闭da♂rk模式' : '开启da♂rk模式'}}</span>
      </v-tooltip>
    </v-app-bar>
    <v-main>
      <div
        class="main-container"
        :class="{
          dark: $store.state.isDark
        }"
      >
        <router-view :drawer="drawer"></router-view>
      </div>
    </v-main>


    <v-footer app :dark="$store.state.isDark">
      copyright
    </v-footer>

  </v-app>
</template>

<script>
import NavigationList from "./components/NavigationList";
export default {
  name: 'App',
  data: () => ({
    drawer: false,
  }),
  components: {
    NavigationList
  },
  mounted() {
    this.$store.dispatch('fetchNowList')
  },
  watch: {
    drawer(val) {
      if(val) {
        sessionStorage.setItem('openDrawer', true)
      } else {
        sessionStorage.removeItem('openDrawer')
      }
    }
  },
};
</script>
<style lang="scss">
  .main-container {
    min-height: 100%;
    box-sizing: border-box;
    padding: 20px;
    &.dark {
      background-color: #000;
      color: #fff;
    }
  }
</style>
