<template>
  <div ref="container">
    <slot name="default" :application="application" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, PropType } from 'vue';
import { $ref } from 'vue/macros';
import * as PIXI from 'pixi.js';
import { Dict } from '@pixi/utils';

import { PixiApplicationInstance } from './types';

const container = $ref<HTMLDivElement>();

// prop types, if required and defaults adopted from pixi.js code
const props = defineProps({
  autoStart: {
    type: Boolean,
    required: false,
    default: true,
  },
  width: {
    type: Number,
    required: false,
    default: 800,
  },
  height: {
    type: Number,
    required: false,
    default: 600,
  },
  view: {
    type: HTMLCanvasElement,
    required: false,
  },
  useContextAlpha: {
    type: Boolean,
    required: false,
    default: true,
  },
  autoDensity: {
    type: Boolean,
    required: false,
    default: false,
  },
  antialias: {
    type: Boolean,
    required: false,
    default: false,
  },
  preserveDrawingBuffer: {
    type: Boolean,
    required: false,
    default: false,
  },
  resolution: {
    type: Number,
    required: false,
    default: PIXI.settings.RESOLUTION,
  },
  forceCanvas: {
    type: Boolean,
    required: false,
    default: false,
  },
  backgroundColor: {
    type: Number,
    required: false,
    default: 0x000000,
  },
  backgroundAlpha: {
    type: Number,
    required: false,
    default: 1,
  },
  clearBeforeRender: {
    type: Boolean,
    required: false,
    default: true,
  },
  powerPreference: {
    type: String as PropType<WebGLPowerPreference>,
    required: false,
    default: 'high-performance',
  },
  sharedTicker: {
    type: Boolean,
    required: false,
    default: false,
  },
  sharedLoader: {
    type: Boolean,
    required: false,
    default: false,
  },
  resizeTo: {
    type: Object as PropType<Window | HTMLElement>,
    required: false,
  },
});

const emits = defineEmits<{
  (event: 'tick', delta: number): void;
  (
    event: 'load',
    loader: PIXI.Loader,
    resources: Dict<PIXI.LoaderResource>
  ): void;
}>();

const application = new PIXI.Application(props);

defineExpose<PixiApplicationInstance>({
  application,
});

onMounted(() => {
  container.appendChild(application.view);

  application.ticker.add((delta: number) => emits('tick', delta));
  application.loader.load((...args) => emits('load', ...args));
});
</script>
