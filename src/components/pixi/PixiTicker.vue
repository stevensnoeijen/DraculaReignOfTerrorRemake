<template>
  <slot name="default" :ticker="ticker" />
</template>

<script lang="ts" setup>
import * as PIXI from 'pixi.js';
import { getCurrentInstance, onMounted, onUnmounted } from 'vue';

import { PixiTickerInstance } from './types';

const props = defineProps({
  /**
   * @type {boolean}
   * @default false
   * @description Whether or not this ticker should invoke the method
   * {@link PIXI.Ticker#start} automatically when a listener is added.
   */
  autoStart: {
    type: Boolean,
    required: false,
    default: undefined,
  },

  /**
   * @type {number}
   * @default 0
   * @description
   * Manages the minimum amount of milliseconds required to elapse
   * between invoking {@link PIXI.Ticker#update}.
   * This will effect the measured value of {@link PIXI.Ticker#FPS}.
   * If it is set to ``0``, then there is no limit;
   * PixiJS will render as many frames as it can.
   * Otherwise it will be at least ``minFPS``
   */
  maxFPS: {
    type: Number,
    required: false,
    default: undefined,
  },

  /**
   * @type {number}
   * @default 10
   * @description
   * Manages the maximum amount of milliseconds allowed to elapse
   * between invoking {@link PIXI.Ticker#update}.
   * This value is used to cap {@link PIXI.Ticker#deltaTime},
   * but does not effect the measured value of {@link IXI.Ticker#FPS}.
   * When setting this property it is clamped to a value between ``0``
   * and ``PIXI.settings.TARGET_FPMS * 1000``.
   */
  minFPS: {
    type: Number,
    required: false,
    default: undefined,
  },

  /**
   * @type {number}
   * @default 1
   * @description
   * Factor of current PIXI.Ticker#deltaTime.
   */
  speed: {
    type: Number,
    required: false,
    default: undefined,
  },

  /**
   * @default {@link PIXI.UPDATE_PRIORITY.NORMAL}
   * @description The priority for emitting
   *
   * Used when adding a tick and tickOnce event-listener.
   */
  priority: {
    type: Number,
    required: false,
    default: undefined,
  },
});

const emits = defineEmits<{
  /**
   * Register a handler for tick events.
   * Calls continuously unless it is removed or the ticker is stopped.
   *
   * Tick is automaticly removed on unmount.
   *
   */
  (event: 'tick', delta: number): void;

  /**
   * Add a handler for the tick event which is only execute once.
   *
   * Tick is automaticly removed on unmount.
   */
  (event: 'tickOnce', delta: number): void;
}>();

const instance = getCurrentInstance();
const application = instance?.parent?.exposed?.application as PIXI.Application;
if (application == null) {
  throw new Error('pixi-ticker must be used inside pixi-application');
}
const ticker = application.ticker;

if (props.autoStart != null) {
  ticker.autoStart = props.autoStart!;
}
if (props.maxFPS != null) {
  ticker.maxFPS = props.maxFPS!;
}
if (props.minFPS != null) {
  ticker.minFPS = props.minFPS!;
}
if (props.speed != null) {
  ticker.speed = props.speed!;
}

const tickCallback: PIXI.TickerCallback<unknown> = (delta: number) =>
  emits('tick', delta);

const tickOnceCallback: PIXI.TickerCallback<unknown> = (delta: number) =>
  emits('tickOnce', delta);

onMounted(() => {
  ticker.add(tickCallback, undefined, props.priority);
  ticker.addOnce(tickOnceCallback, undefined, props.priority);
});

onUnmounted(() => {
  ticker.remove(tickCallback);
  ticker.remove(tickOnceCallback);
});

defineExpose<PixiTickerInstance>({
  ticker: ticker,
});
</script>
