import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import VueTypeImports from 'vite-plugin-vue-type-imports';
import mpa from 'vite-plugin-mpa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      reactivityTransform: true,
    }),
    Components(),
    VueTypeImports(),
    mpa(),
  ],
})
