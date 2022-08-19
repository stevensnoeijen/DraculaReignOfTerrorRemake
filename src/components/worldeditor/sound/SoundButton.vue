<template>
  <n-button round @click="handleClick">
    {{ modelValue }}
    <template #icon>
      <n-icon>
        <i-carbon-play v-if="!playing" />
        <i-carbon-stop v-else />
      </n-icon>
    </template>
  </n-button>
</template>

<script lang="ts" setup>
import { Sound } from '@pixi/sound';
import { $ref } from 'vue/macros';

import { getSounds } from './api';

const props = defineProps<{
  modelValue: string;
}>();

let playing = $ref(false);

const soundsConfig = await getSounds();
const sounds = Sound.from({
  url: 'assets/sounds.mp3',
  sprites: soundsConfig.spritemap,
});

const handleClick = () => {
  if (playing) {
    sounds.stop();
    playing = false;
    return;
  }

  playing = true;
  sounds.play(props.modelValue, () => {
    playing = false;
  });
};
</script>
