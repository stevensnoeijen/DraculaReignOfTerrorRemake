import { createApp } from 'vue';

import './index.css';
import { router } from './router';
import App from './App.vue';

const app = createApp(App);

app.use(router);

app.config.globalProperties.window = window;
app.mount('#app');
