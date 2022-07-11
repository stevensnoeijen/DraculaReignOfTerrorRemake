
<template>
  <pixi-application ref="pixi" :resize-to="window" :background-color="0x008800"/>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { PixiApplicationInstance } from './components/types';
import { Engine } from './game/Engine';

const pixi = ref<PixiApplicationInstance>();
let engine: Engine;

window.addEventListener('contextmenu', (event) => {
	event.preventDefault();
});

onMounted(() => {
	engine = new Engine(pixi.value!.application);
});

</script>

<style>
	body {
		margin: 0;
		overflow: hidden;
	}
</style>
