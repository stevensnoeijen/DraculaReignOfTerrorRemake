<template>
  <n-tree
    :data="data"
    selectable
    block-line
    default-expand-all
    :render-suffix="renderSuffix"
    :selected-keys="[selectedKeys]"
    :node-props="
      ({ option }) => ({
        onClick: () => handleTreeSelect(option),
      })
    "
  />
</template>

<script lang="ts" setup>
import { computed, h, watch } from 'vue';
import { $ref } from 'vue/macros';
import type { TreeOption } from 'naive-ui';

import { Entity } from './types';
import { createTreeOptions } from './utils';
import TreeDeleteButtonVue from './TreeDeleteButton.vue';

const props = defineProps<{
  modelValue: Entity[];
  selected: Entity | null;
}>();

const emits = defineEmits<{
  (event: 'select', entity: Entity): void;
  (event: 'update:modelValue', modelValue: Entity[]): void;
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

const deleteEntity = (entityName: string) => {
  emits('update:modelValue', [
    ...props.modelValue.filter((entity) => entity.name !== entityName),
  ]);
  emits('select', props.modelValue[0]);
};

const renderSuffix = ({ option }: { option: TreeOption }) => {
  if (typeof option.key !== 'string') return;

  if (option.children == null) {
    // component level
    return h(TreeDeleteButtonVue, {
      title: "delete entity with all it's properties",
      class: 'ml-6',
      onClick: () => deleteEntity(option.key as string),
    });
  }
};

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue.length > 0) selectedKeys = props.modelValue[0].name;
  }
);
</script>
