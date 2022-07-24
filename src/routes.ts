import { RouteRecordRaw } from 'vue-router';

import GameView from './views/GameView.vue';
import WorldEditorView from './views/WorldEditorView.vue';

export const routes: readonly RouteRecordRaw[] = [
  { path: '/', redirect: '/game' },
  { path: '/game', component: GameView }, { path: '/worldeditor', component: WorldEditorView },
];
