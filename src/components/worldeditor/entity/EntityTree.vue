<template>
  <n-tree
    :data="data"
    selectable
    :selected-keys="[selectedUnit]"
    :node-props="
      ({ option }) => ({
        onClick: () => handleTreeSelect(option),
      })
    "
  />
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue';
import { $ref } from 'vue/macros';
import type { TreeOption } from 'naive-ui';

import * as api from './api';

const props = defineProps<{
  modelValue: api.Entity[];
}>();

const emits = defineEmits<{
  (event: 'select', name: string): void;
}>();

let data = computed(() => {
  return props.modelValue.map(
    (item): TreeOption => ({ label: item.name, key: item.name })
  );
});

let selectedUnit = $ref<string>(props.modelValue[0]?.name);
const handleTreeSelect = (option: TreeOption) => {
  selectedUnit = option.key as string;
  emits('select', selectedUnit);
};

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue.length > 0) selectedUnit = props.modelValue[0].name;
  }
);
</script>
