<template></template>

<script lang="ts" setup>
import * as PIXI from 'pixi.js';
import { getCurrentInstance, onMounted, onUnmounted, PropType } from 'vue';
import { IWheelOptions, Viewport } from 'pixi-viewport';

import { PixiViewportInstance } from './types';

const instance = getCurrentInstance();

const props = defineProps({
  screenWidth: {
    type: Number,
    required: false,
  },
  screenHeight: {
    type: Number,
    required: false,
  },
  interaction: {
    type: PIXI.InteractionManager,
    required: false,
  },
  wheel: {
    type: Object as PropType<IWheelOptions>,
    required: false,
  },
}); // TODO: support all properties

const viewport = new Viewport(props);
viewport.wheel(props.wheel);  

const application = instance?.parent.exposed.application as PIXI.Application;// TODO: check if it has property, else throw error
onMounted(() => {
  application.stage.addChild(viewport);
});

onUnmounted(() => {
  application.stage.removeChild(viewport);
});

defineExpose<PixiViewportInstance>({
    viewport
});
</script>