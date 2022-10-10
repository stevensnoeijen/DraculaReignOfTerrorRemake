import {
  createRouter,
  createWebHashHistory,
  RouteLocationNormalized,
  RouteRecordRaw,
} from 'vue-router';

import GameView from './views/GameView.vue';
import WorldEditorView from './views/WorldEditorView.vue';

const BASE_TITLE = 'Dracula: Reign of Terror Remake';
const DEFAULT_ICON = 'favicon.ico';

const routes: readonly RouteRecordRaw[] = [
  { path: '/', redirect: '/game' },
  {
    path: '/game',
    component: GameView,
    meta: {
      title: `Game - ${BASE_TITLE}`,
      icon: 'icons/game.ico',
    },
  },
  {
    path: '/worldeditor',
    component: WorldEditorView,
    meta: {
      title: `WorldEditor - ${BASE_TITLE}`,
      icon: 'icons/worldeditor.ico',
    },
  },
];

const updateTitle = (to: RouteLocationNormalized) => {
  document.title = to.meta.title ?? BASE_TITLE;
};
const updateIcon = (to: RouteLocationNormalized) => {
  const iconEl = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
  if (iconEl) iconEl.href = to.meta.icon ?? DEFAULT_ICON;
};

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  updateTitle(to);
  updateIcon(to);

  next();
});

export { router };
