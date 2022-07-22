import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import './index.css';
import { routes } from './routes';
import App from './App.vue';

const app = createApp(App);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
app.use(router);

app.config.globalProperties.window = window;
app.mount('#app');
