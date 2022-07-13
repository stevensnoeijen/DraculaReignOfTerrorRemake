import { createApp } from 'vue';

import './index.css';
import App from './App.vue';

const app = createApp(App);
app.config.globalProperties.window = window;
app.mount('#app');
