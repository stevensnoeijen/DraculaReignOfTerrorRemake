<template>
  <slot name="default" :loader="loader" />
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, onUnmounted, PropType } from 'vue';
import * as PIXI from 'pixi.js';

import { PixiLoaderInstance } from './types';

// prop types, if required and defaults adopted from pixi.js code
/**
 * The optional loader parameters.
 *
 * @see https://pixijs.download/dev/docs/PIXI.Loader.html
 * for all properties
 */
const props = defineProps({
  /**
   * @type {string}
   * @default ""
   * @description
   * The base url for all resources loaded by this loader.
   */
  baseUrl: {
    type: String,
    required: false,
    default: undefined,
  },

  /**
   * @type {number}
   * @default 10
   * @description
   * The number of resources to load concurrently.
   */
  concurrency: {
    type: Number,
    required: false,
    default: undefined,
  },

  /**
   * @type {string}
   * @default ""
   * @description
   * A querystring to append to every URL added to the loader.
   * This should be a valid query string without the question-mark (``?``).
   * The loader will also not escape values for you.
   * Make sure to escape your parameters with ``encodeURIComponent``
   * before assigning this property.
   */
  defaultQueryString: {
    type: String,
    required: false,
    default: undefined,
  },

  /**
   * @type {PIXI.IAddOptions | PIXI.IAddOptions[]}
   * @description
   * Adds a resource (or multiple resources) to the loader queue.
   */
  loadResources: {
    type: Object as PropType<(PIXI.IAddOptions | string)[]>,
    required: false,
    default: undefined,
  },

  /**
   * @type boolean
   * @default false
   * @description Starts loading the queued resources.
   */
  startLoading: {
    type: Boolean,
    required: false,
    default: undefined,
  },
});

const instance = getCurrentInstance();
const application = instance?.parent?.exposed?.application as PIXI.Application;
if (application == null) {
  throw new Error('pixi-loader must be used inside pixi-application');
}
const loader = application.loader;

if (props.baseUrl != null) loader.baseUrl = props.baseUrl!;
if (props.concurrency != null) loader.concurrency = props.concurrency!;
if (props.defaultQueryString != null)
  loader.defaultQueryString = props.defaultQueryString!;

if (props.loadResources != null) {
  loader.add(props.loadResources);
}

if (props.startLoading === true) {
  loader.load();
}

const emits = defineEmits<{
  /**
   * Dispatched when the loader begins to process the queue.
   *
   * `@start` is automaticly detached on unmount.
   */
  (event: 'start', ...args: Parameters<PIXI.Loader.OnStartSignal>): void;

  /**
   * Dispatched once per loaded or errored resource.
   *
   * `@progress` is automaticly detached on unmount.
   */
  (event: 'progress', ...args: Parameters<PIXI.Loader.OnProgressSignal>): void;

  /**
   * Dispatched once per loaded resource.
   *
   * `@load` is automaticly detached on unmount.
   */
  (event: 'load', ...args: Parameters<PIXI.Loader.OnLoadSignal>): void;

  /**
   * Dispatched when the queued resources all load.
   *
   * `@complete` is automaticly detached on unmount.
   */
  (event: 'complete', ...args: Parameters<PIXI.Loader.OnCompleteSignal>): void;

  /**
   * Dispatched once per errored resource.
   *
   * `@error` is automaticly detached on unmount.
   */
  (event: 'error', ...args: Parameters<PIXI.Loader.OnErrorSignal>): void;
}>();

// nodes that are set as the loader's listeners
// using any, because type is not exposed in pixi.js
let onStartNode: any = null;
let onProgressNode: any = null;
let onLoadNode: any = null;
let onCompleteNode: any = null;
let onErrorNode: any = null;

onMounted(() => {
  onStartNode = loader.onStart.add((...args) => emits('start', ...args));
  onProgressNode = loader.onProgress.add((...args) =>
    emits('progress', ...args)
  );
  onLoadNode = loader.onLoad.add((...args) => emits('load', ...args));
  onCompleteNode = loader.onComplete.add((...args) =>
    emits('complete', ...args)
  );
  onErrorNode = loader.onError.add((...args) => emits('error', ...args));
});

onUnmounted(() => {
  loader.onStart.detach(onStartNode);
  loader.onProgress.detach(onProgressNode);
  loader.onLoad.detach(onLoadNode);
  loader.onComplete.detach(onCompleteNode);
  loader.onError.detach(onErrorNode);
});

defineExpose<PixiLoaderInstance>({
  loader,
});
</script>
