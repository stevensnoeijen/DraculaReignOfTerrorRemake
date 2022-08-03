<template>
  <slot name="default" :assets="assets" />
</template>

<script lang="ts" setup>
import { Assets as assets } from '@pixi/assets';
import { onMounted, onUnmounted } from 'vue';

import { PixiAssetsInstance } from './types';

defineExpose<PixiAssetsInstance>({
  assets,
});

const props = defineProps({});

onMounted(async () => {
  await assets.init();
});

onUnmounted(() => {
  assets.reset();
});
</script>
