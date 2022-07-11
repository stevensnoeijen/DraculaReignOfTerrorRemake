import { createApp } from 'vue'
import App from './App.vue'

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        window: typeof Window,
    }
}

const app = createApp(App);
app.config.globalProperties.window = window;
app.mount('#app');
