import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import GameView from './views/GameView.vue';
import WorldEditorView from './views/WorldEditorView.vue';

const BASE_TITLE = 'Dracula: Reign of Terror Remake';

const routes: readonly RouteRecordRaw[] = [
  { path: '/', redirect: '/game' },
  {
    path: '/game',
    component: GameView,
    meta: {
      title: `${BASE_TITLE} - Game`,
    },
  },
  {
    path: '/worldeditor',
    component: WorldEditorView,
    meta: {
      title: `${BASE_TITLE} - WorldEditor`,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ?? BASE_TITLE;

  next();
});

export { router };
