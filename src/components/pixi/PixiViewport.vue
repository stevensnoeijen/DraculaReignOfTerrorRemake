<template>
  <slot name="default" :viewport="viewport" />
</template>

<script lang="ts" setup>
import * as PIXI from 'pixi.js';
import { getCurrentInstance, onMounted, onUnmounted, PropType } from 'vue';
import { IViewportOptions, IWheelOptions, Viewport } from 'pixi-viewport';

import { PixiViewportInstance } from './types';

const instance = getCurrentInstance();

// prop types, if required and defaults adopted from pixi-viewport code
/**
 * The optional loader parameters.
 *
 * @see https://github.com/davidfig/pixi-viewport/blob/master/src/Viewport.ts
 * for all properties
 */
const props = defineProps({
  /**
   * @type {number}
   * @default {@link window#innerWidth}
   */
  screenWidth: {
    type: Number,
    required: false,
    default: undefined,
  },

  /**
   * @type {number}
   * @default {@link window#innerHeight}
   */
  screenHeight: {
    type: Number,
    required: false,
    default: undefined,
  },

  /**
   * @type {number}
   * @default null
   */
  worldWidth: {
    type: Number as PropType<Number | null>,
    required: false,
    default: undefined,
  },

  /**
   * @type {number}
   * @default null
   */
  worldHeight: {
    type: Number as PropType<Number | null>,
    required: false,
    default: undefined,
  },

  /**
   * @type {number}
   * @description
   * Number of pixels to move to trigger an input event
   * (e.g., drag, pinch) or disable a clicked event
   * @default 5
   */
  threshold: {
    type: Number,
    required: false,
    default: undefined,
  },

  /**
   * @type {boolean}
   * @description
   * Whether the 'wheel' event is set to passive
   * (note: if false, e.preventDefault() will be called when wheel
   * is used over the viewport)
   * @default true
   */
  passiveWheel: {
    type: Boolean,
    required: false,
    default: undefined,
  },

  /**
   * @type {boolean}
   * @description
   * Whether to stopPropagation of events that impact the viewport
   * (except wheel events, see options.passiveWheel)
   * @default false
   */
  stopPropagation: {
    type: Boolean,
    required: false,
    default: undefined,
  },

  /**
   * @type {PIXI.Rectangle | null}
   * @description
   * Change the default hitArea from world size to a new value
   * @default null
   */
  forceHitArea: {
    type: PIXI.Rectangle as PropType<PIXI.Rectangle | null>,
    required: false,
    default: undefined,
  },

  /**
   * @type {boolean}
   * @description
   * Set this if you want to manually call update() function on each frame
   * @default false
   */
  noTicker: {
    type: Boolean,
    required: false,
    default: undefined,
  },

  /**
   * @type {PIXI.InteractionManager | null}
   * @description
   * InteractionManager, available from instantiated
   * `WebGLRenderer/CanvasRenderer.plugins.interaction`
   * It's used to calculate pointer postion relative
   * to canvas location on screen
   * @default null
   */
  interaction: {
    type: PIXI.InteractionManager as PropType<PIXI.InteractionManager | null>,
    required: false,
    default: undefined,
  },

  /**
   * @type {boolean}
   * @description
   * Remove oncontextmenu=() => {} from the divWheel element
   * @default false
   */
  disableOnContextMenu: {
    type: Boolean,
    required: false,
    default: undefined,
  },

  /**
   * @type {HTMLElement}
   * @description
   * div to attach the wheel event
   * @default document.body
   */
  divWheel: {
    type: HTMLElement,
    required: false,
    default: undefined,
  },

  /**
   * @type {PIXI.Ticker}
   * @description
   * Use this PIXI.ticker for updates
   * @default PIXI.Ticker.shared
   */
  ticker: {
    type: PIXI.Ticker,
    required: false,
    default: undefined,
  },

  /**
   * Zoom using mouse wheel
   *
   * NOTE: the default event listener for 'wheel' event is document.body.
   * Use `Viewport.options.divWheel` to change this default
   *
   * @param {IWheelOptions} [options]
   * @param {number} [options.percent=0.1] - percent to scroll with each spin
   * @param {number} [options.smooth] - smooth the zooming by providing
   * the number of framesto zoom between wheel spins
   * @param {boolean} [options.interrupt=true] - stop smoothing with any
   * user input on the viewport
   * @param {boolean} [options.reverse] - reverse the direction of the scroll
   * @param {PIXI.Point} [options.center] - place this point at center
   * during zoom instead of current mouse position
   * @param {number} [options.lineHeight=20] - scaling factor for
   * non-DOM_DELTA_PIXEL scrolling events
   * @param {('all'|'x'|'y')} [options.axis=all] - axis to zoom
   */
  wheel: {
    type: Object as PropType<IWheelOptions>,
    required: false,
    default: undefined,
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
