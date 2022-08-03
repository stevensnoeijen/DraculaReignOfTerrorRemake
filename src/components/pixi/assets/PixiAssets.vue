<template>
  <slot name="default" :assets="assets" />
</template>

<script lang="ts" setup>
import { AssetInitOptions, Assets as assets } from '@pixi/assets';
import { onMounted, onUnmounted, PropType } from 'vue';

import { PixiAssetsInstance } from './types';

defineExpose<PixiAssetsInstance>({
  assets,
});

const props = defineProps({
  /**
   * @type {AssetInitOptions}
   * @default undefined
   * @description
   * Initialization options object for Asset Class.
   * @memberof PIXI
   */
  options: {
    type: Object as PropType<AssetInitOptions>,
    required: false,
    default: undefined,
  },
});

onMounted(async () => {
  await assets.init(props.options);
});

onUnmounted(() => {
  assets.reset();
});
</script>
