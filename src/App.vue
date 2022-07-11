
<template>
  <pixi-application ref="pixi" :resize-to="window" :background-color="0x008800"/>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { PixiApplicationInstance } from './components/types';
import { Game } from './game/Game';

const pixi = ref<PixiApplicationInstance>();
let game: Game;

window.addEventListener('contextmenu', (event) => {
	event.preventDefault();
});

onMounted(() => {
	game = new Game(pixi.value!.application);
});

</script>

<style>
	body {
		margin: 0;
		overflow: hidden;
	}
</style>
