import { createApp } from 'vue'
import './styles/reset.css'
import './styles/transition.css'
import './styles/common.less'
import './styles/global.less'
import App from './App.vue'
import { setupRouter } from './router';
import { setupStore } from '@/store';
import { setupI18n } from '@/locales/setupI18n';

const app = createApp(App)


async function setupApp() {
    setupStore(app);

    await setupI18n(app);

    await setupRouter(app);

    app.config.productionTip = false;

    app.mount('#app');
}


setupApp();

