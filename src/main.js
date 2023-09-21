import { createApp } from 'vue'
import './style/reset.css'
import './style/transition.css'
import App from './App.vue'
import { setupRouter } from './router';



const app = createApp(App)


async function setupApp() {
    await setupRouter(app)

    app.config.productionTip = false

    app.mount('#app')
}


setupApp();

