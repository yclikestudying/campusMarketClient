import App from './App'
import Vant from 'vant';
import 'vant/lib/index.css';
import TopLoading from "/components/topLoading.vue"
import SmallLoading from "/components/smallLoading.vue"

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(Vant)
  app.component('TopLoading', TopLoading)
  app.component('SmallLoading', SmallLoading)
  return {
    app
  }
}
// #endif