import { RouteRecordRaw } from "vue-router";
import Game from "./views/Game.vue";
import WorldEditor from "./views/WorldEditor.vue";

export const routes: readonly RouteRecordRaw[] = [
  { path: '/', redirect: '/game', },
  { path: '/game', component: Game, },
  { path: '/worldeditor', component: WorldEditor, },
]