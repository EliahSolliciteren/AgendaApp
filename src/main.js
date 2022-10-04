import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from '/src/store/store.js'
import persistedStateVuex from "persisted-state-vuex";

const app = createApp(App)
app.use(store)
app.use(router)
//Vue.use(persistentState, initialState)
app.mount('#app')
