<template>
  <n-tree
    :data="data"
    selectable
    block-line
    default-expand-all
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

import { Entity } from './types';
import { createTreeOptions } from './utils';

const props = defineProps<{
  modelValue: Entity[];
  selected: Entity | null;
}>();

const emits = defineEmits<{
  (event: 'select', entity: Entity): void;
}>();

let data = computed(() => {
  return createTreeOptions(props.modelValue);
});

let selectedKeys = $ref<string>(props.modelValue[0]?.name);

watch(
  () => props.selected,
  () => {
    selectedKeys =
      props.selected == null ? props.modelValue[0]?.name : props.selected.name;
  }
);

const handleTreeSelect = (option: TreeOption) => {
  let entity = props.modelValue.find((entity) => entity.name === option.key);
  if (entity == null) {
    // try finding first thing in that layer
    entity = props.modelValue.find((entity) =>
      entity.name.startsWith(option.key as string)
    );
  }
  if (entity == null) {
    return;
  }

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
