<template>
    <div ref="container"></div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref } from 'vue';
import * as PIXI from 'pixi.js';
import { PixiApplicationInstance } from './types';

const container = ref<HTMLDivElement>();

// copied properties of IApplicationOptions
interface Options extends PIXI.IApplicationOptions {
    forceCanvas?: boolean;

    width?: number;
    height?: number;
    view?: HTMLCanvasElement;
    useContextAlpha?: boolean | 'notMultiplied';
    /**
     * Use `backgroundAlpha` instead.
     * @deprecated
     */
    transparent?: boolean;
    autoDensity?: boolean;
    antialias?: boolean;
    resolution?: number;
    preserveDrawingBuffer?: boolean;
    clearBeforeRender?: boolean;
    backgroundColor?: number;
    backgroundAlpha?: number;
    powerPreference?: WebGLPowerPreference;
    context?: PIXI.IRenderingContext;

    resizeTo?: Window | HTMLElement;
}

const props = defineProps<Options>();

const application = new PIXI.Application({
	...props,
});

defineExpose<PixiApplicationInstance>({
	application,
});

onMounted(() => {
    container.value?.appendChild(application.view);
});
</script>