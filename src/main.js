import { createApp } from 'vue'
import router from '@/router'
import App from './App.vue'


const app = createApp(App)
app.config.globalProperties.KEY = '5ded773f77c3c039fa6310e8673b8ffd';

app.use(router)
.mount('#app')
