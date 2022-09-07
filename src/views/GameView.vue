<template>
  <pixi-application
    ref="pixi"
    class="overflow-hidden"
    :resize-to="window"
    :background-color="0x008800"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';


import { PixiApplicationInstance } from '../components/pixi/app/types';
import { Engine } from '../game/Engine';
import * as scenarios from '../game/scenarios/factory';

import { getOptions } from '~/game/Options';

const pixi = ref<PixiApplicationInstance>();
let engine: Engine;

window.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

const getScenarioConstructor = () => {
  const options = getOptions();
    if (options.scenario == null || options.scenario[0] == null)
      return scenarios.DEFAULT_SCENARIO;

    const scenarioName = options.scenario[0].toLowerCase();
    const scenarioConstructor = scenarios.constructorByName(scenarioName);
    if (scenarioConstructor == null) {
      throw new Error('scenario not found');
    }

    return scenarioConstructor;
  };

onMounted(async () => {
  engine = new Engine(pixi.value!.application);
  engine.setScenario(getScenarioConstructor());
  await engine.run();
});
</script>
