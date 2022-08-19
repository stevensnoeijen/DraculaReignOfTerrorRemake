import path from 'path';

import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import Checker from 'vite-plugin-checker';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    Checker({
      typescript: {
        tsconfigPath: './tsconfig.build.json',
      },
      vueTsc: true,
    }),
    Vue({
      reactivityTransform: true,
    }),
    Components({
      dts: true,
      resolvers: [NaiveUiResolver(), IconsResolver()],
    }),
    Icons({
      autoInstall: true,
      compiler: 'vue3',
    }),
  ],
});
