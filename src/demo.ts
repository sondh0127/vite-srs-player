import 'virtual:windi.css'
import { createApp } from 'vue'
import App from './App.vue'
// import { VueInteractive } from '../dist/vite-srs-player.es.js'
import { VueInteractive } from './main'

const app = createApp(App)
app.use(VueInteractive)
app.mount('#app')
