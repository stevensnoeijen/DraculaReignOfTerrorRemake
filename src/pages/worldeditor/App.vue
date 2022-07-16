
<template>
	<div class="m-3">
		<h1 class="text-3xl font-bold underline">
			World Editor
		</h1>

		<div>
			<h1 class="text-xl font-bold">Unit editor</h1>
			<div>
				<pixi-application ref="pixi"/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PixiApplicationInstance } from '../../components/pixi/types';


const pixi = ref<PixiApplicationInstance>();

</script>
