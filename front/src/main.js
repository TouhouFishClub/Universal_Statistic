import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import Toast from '@/components/global/Toast/index'

Vue.config.productionTip = false
Vue.use(Toast)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
