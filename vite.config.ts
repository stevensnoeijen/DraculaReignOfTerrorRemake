import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import Checker from 'vite-plugin-checker';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
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
      resolvers: [NaiveUiResolver()],
    }),
    tsconfigPaths(),
  ],
});
