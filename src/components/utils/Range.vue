<template>
  <div class="flex">
    <n-input-number v-model:value="min" :max="max" />
    <n-input-number v-model:value="max" :min="min" />
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';

import { Range } from '~/game/utils/Range';

const props = defineProps<{
  modelValue: Range;
}>();

const emits = defineEmits<{
  (event: 'update:modelValue', modelValue: Range): void;
}>();

const min = ref(props.modelValue.min);
const max = ref(props.modelValue.max);

watch([min, max], () => {
  emits('update:modelValue', new Range(min.value, max.value));
});
</script>
