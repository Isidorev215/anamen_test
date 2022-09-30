import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import vueAxios from 'vue-axios'

import './assets/css/main.scss'

const app = createApp(App)

axios.defaults.headers.common = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

app.use(vueAxios, axios)
app.use(router)
app.mount('#app')
