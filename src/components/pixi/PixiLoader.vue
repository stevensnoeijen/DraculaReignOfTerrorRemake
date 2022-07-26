<template>
  <slot name="default" :loader="loader" />
</template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue';
import * as PIXI from 'pixi.js';
// import { Dict } from '@pixi/utils';

// const emits = defineEmits<{
//   (
//     event: 'load',
//     loader: PIXI.Loader,
//     resources: Dict<PIXI.LoaderResource>
//   ): void;
// }>();

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
});
// TODO: refactor to do easyer defineProps config with default `{ required: false, default: undefined }`

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

defineExpose({
  loader,
});
</script>
