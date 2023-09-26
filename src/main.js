import { createApp } from 'vue'
import './styles/reset.css'
import './styles/transition.css'
import './styles/common.less'
import App from './App.vue'
import { setupRouter } from './router';
import { setupStore } from '@/store';


const app = createApp(App)


async function setupApp() {
    setupStore(app);

    await setupRouter(app)

    app.config.productionTip = false

    app.mount('#app')
}


setupApp();

