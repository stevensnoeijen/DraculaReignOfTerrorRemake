<template>
  <n-tree
    :data="data"
    selectable
    block-line
    :selected-keys="[selectedKeys]"
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

import { Entity } from './types.js';

const props = defineProps<{
  modelValue: Entity[];
}>();

const emits = defineEmits<{
  (event: 'select', entity: Entity): void;
}>();

let data = computed(() => {
  return props.modelValue.map(
    (item): TreeOption => ({ label: item.name, key: item.name })
  );
});

let selectedKeys = $ref<string>(props.modelValue[0]?.name);

const handleTreeSelect = (option: TreeOption) => {
  const entity = props.modelValue.find(
    (entity) => entity.name === option.label
  )!;
  selectedKeys = entity.name;

  emits('select', entity);
};

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue.length > 0) selectedKeys = props.modelValue[0].name;
  }
);
</script>
