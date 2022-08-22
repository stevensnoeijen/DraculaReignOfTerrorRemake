<template>
  <div ref="container">
    <slot
      name="default"
      :application="application"
      :app="application"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, PropType } from 'vue';
import { $ref } from 'vue/macros';
import * as PIXI from 'pixi.js';

import { isAnyPropertySet, omitUndefined } from '../../../utils/object';

import { PixiApplicationInstance } from './types';

const container = $ref<HTMLDivElement>();

// prop types, if required and defaults adopted from pixi.js code
/**
 * The optional renderer parameters.
 *
 * @see https://pixijs.download/dev/docs/PIXI.Application.html
 * for all properties
 */
const props = defineProps({
  /**
   * @type {boolean}
   * @default true
   * @description
   * Automatically starts the rendering after the construction.
   * **Note:**
   * Setting this parameter to false does NOT stop the shared ticker
   * even if you set options.sharedTicker to true
   * in case that it is already started.
   * Stop it by your own.
   */
  autoStart: {
    type: Boolean,
    required: false,
    default: undefined,
  },

  /**
   * @type {number}
   * @default 800
   * @description
   * The width of the renderers view.
   */
  width: {
    type: Number,
    required: false,
    default: undefined,
  },

  /**
   * @type {number}
   * @default 600
   * @description
   * The height of the renderers view.
   */
  height: {
    type: Number,
    required: false,
    default: undefined,
  },

  /**
   * @type {HTMLCanvasElement}
   * @description
   * The canvas to use as a view, optional.
   */
  view: {
    type: HTMLCanvasElement,
    required: false,
    default: undefined,
  },

  /**
   * @type {boolean}
   * @default true
   * @description
   * Pass-through value for canvas' context ``alpha`` property.
   * If you want to set transparency, please use ``backgroundAlpha``.
   * This option is for cases where the canvas needs to be opaque,
   * possibly for performance reasons on some older devices.
   */
  useContextAlpha: {
    type: Boolean,
    required: false,
    default: undefined,
  },

  /**
   * @type {boolean}
   * @default false
   * @description
   * Resizes renderer view in CSS pixels to allow for resolutions other than 1.
   */
  autoDensity: {
    type: Boolean,
    required: false,
    default: undefined,
  },

  /**
   * @type {boolean}
   * @default false
   * @description
   * Sets antialias
   */
  antialias: {
    type: Boolean,
    required: false,
    default: undefined,
  },

  /**
   * @type {boolean}
   * @default false
   * @description
   * Enables drawing buffer preservation,
   * enable this if you need to call toDataUrl on the WebGL context.
   */
  preserveDrawingBuffer: {
    type: Boolean,
    required: false,
    default: undefined,
  },

  /**
   * @type {number}
   * @default {@link PIXI.settings.RESOLUTION}
   * @description
   * The resolution / device pixel ratio of the renderer.
   */
  resolution: {
    type: Number,
    required: false,
    default: undefined,
  },

  /**
   * @type {boolean}
   * @default false
   * @description
   * prevents selection of WebGL renderer, even if such is present,
   * this option only is available when using ``pixi.js-legacy``
   * or ``@pixi/canvas-renderer`` modules, otherwise it is ignored.
   */
  forceCanvas: {
    type: Boolean,
    required: false,
    default: undefined,
  },

  /**
   * @type {number}
   * @default 0x000000
   * @description
   * The background color of the rendered area (shown if not transparent)
   */
  backgroundColor: {
    type: Number,
    required: false,
    default: undefined,
  },

  /**
   * @type {number}
   * @default 1
   * @description
   * Value from 0 (fully transparent) to 1 (fully opaque).
   */
  backgroundAlpha: {
    type: Number,
    required: false,
    default: undefined,
  },

  /**
   * @type {boolean}
   * @default true
   * @description
   * This sets if the renderer will clear the canvas
   * or not before the new render pass.
   */
  clearBeforeRender: {
    type: Boolean,
    required: false,
    default: undefined,
  },

  /**
   * @type {string}
   * @description
   * Parameter passed to webgl context,
   * set to "high-performance" for devices with dual graphics card.
   * **(WebGL only)**.
   *
   * @see {@link WebGLPowerPreference}
   */
  powerPreference: {
    // eslint-disable-next-line no-undef
    type: String as PropType<WebGLPowerPreference>,
    required: false,
    default: undefined,
  },

  /**
   * @type {boolean}
   * @default false
   * @description
   * ``true`` to use PIXI.Ticker.shared, ``false`` to create new ticker.
   * If set to false, you cannot register a handler
   * to occur before anything that runs on the shared ticker.
   * The system ticker will always run before both the shared ticker
   * and the app ticker.
   */
  sharedTicker: {
    type: Boolean,
    required: false,
    default: undefined,
  },

  /**
   * @type {boolean}
   * @default false
   * @description
   * ``true`` to use PIXI.Loader.shared,
   * ``false`` to create new Loader.
   */
  sharedLoader: {
    type: Boolean,
    required: false,
    default: undefined,
  },

  /**
   * @type {Window | HTMLElement}
   * @description Element to automatically resize stage to.
   */
  resizeTo: {
    type: Object as PropType<Window | HTMLElement>,
    required: false,
    default: undefined,
  },
});

const application = new PIXI.Application(
  isAnyPropertySet(props) ? omitUndefined(props) : undefined
);

defineExpose<PixiApplicationInstance>({
  application,
});

onMounted(() => {
  container.appendChild(application.view);
});
</script>
