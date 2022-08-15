<template>
  <div v-if="!Array.isArray(sounds)">
    <sound-button v-model="sounds" />
  </div>
  <div v-else>
    <sound-button
      v-for="(sound, i) in sounds"
      :key="sound"
      v-model="sounds[i]"
      class="mr-2 mb-2"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUpdated } from 'vue';
import { $ref } from 'vue/macros';

const props = defineProps<{
  modelValue: string | string[];
}>();

let sounds = $ref<string[] | string>([]);
const loadSounds = () => {
  sounds = props.modelValue;
};

onMounted(() => {
  loadSounds();
});
onUpdated(() => {
  loadSounds();
});
</script>
