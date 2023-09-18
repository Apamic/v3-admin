import { createApp } from 'vue'
import './style/reset.css'
import App from './App.vue'
import { setupRouter } from './router';

// import 'ant-design-vue/es/message/style/css';
// import 'ant-design-vue/es/notification/style/css';


const app = createApp(App)


async function setupApp() {
    await setupRouter(app)

    app.config.productionTip = false

    app.mount('#app')
}


setupApp();

