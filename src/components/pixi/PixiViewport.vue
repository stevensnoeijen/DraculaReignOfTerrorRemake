<!-- eslint-disable vue/valid-template-root -->
<template></template>

<script lang="ts" setup>
import * as PIXI from 'pixi.js';
import { getCurrentInstance, onMounted, onUnmounted, PropType } from 'vue';
import { IViewportOptions, IWheelOptions, Viewport } from 'pixi-viewport';

import { PixiViewportInstance } from './types';

const instance = getCurrentInstance();

const props = defineProps({
  /** @default window.innerWidth */
  screenWidth: {
    type: Number,
    required: false,
  },
  /** @default window.innerHeight */
  screenHeight: {
    type: Number,
    required: false,
  },
  /** @default 0 */
  worldWidth: {
    type: Number as PropType<Number | null>,
    required: false,
  },
  /** @default 0 */
  worldHeight: {
    type: Number as PropType<Number | null>,
    required: false,
  },
  /** @default 5 */
  threshold: {
    type: Number,
    required: false,
  },
  /** @default true */
  passiveWheel: {
    type: Boolean,
    required: false,
    default: true,
  },
  stopPropagation: {
    type: Boolean,
    required: false,
    default: false,
  },
  forceHitArea: {
    type: PIXI.Rectangle as PropType<PIXI.Rectangle | null>,
    required: false,
  },
  /** @default false */
  noTicker: {
    type: Boolean,
    required: false,
    default: false,
  },
  interaction: {
    type: PIXI.InteractionManager as PropType<PIXI.InteractionManager | null>,
    required: false,
  },
  disableOnContextMenu: {
    type: Boolean,
    required: false,
  },
  /** @default document.body */
  divWheel: {
    type: HTMLElement,
    required: false,
  },
  /** @default PIXI.Ticker.shared */
  ticker: {
    type: PIXI.Ticker,
    required: false,
    default: PIXI.Ticker.shared,
  },

  wheel: {
    type: Object as PropType<IWheelOptions>,
    required: false,
  },
});

const viewport = new Viewport(props as unknown as IViewportOptions);
if (props.wheel != null) {
  viewport.wheel(props.wheel);
}

const application = instance?.parent?.exposed?.application as PIXI.Application;
if (application == null) {
  throw new Error('pixi-viewport must be used inside pixi-application');
}

onMounted(() => {
  // @ts-ignore
  application.stage.addChild(viewport);
});

onUnmounted(() => {
  // @ts-ignore
  application.stage.removeChild(viewport);
});

defineExpose<PixiViewportInstance>({
  viewport,
});
</script>
