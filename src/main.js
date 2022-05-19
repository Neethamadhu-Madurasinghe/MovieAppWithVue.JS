import { createApp } from 'vue'
import router from '@/router'
import App from './App.vue'


const app = createApp(App)
app.config.globalProperties.KEY = // themoviedb.org API key;

app.use(router)
.mount('#app')
