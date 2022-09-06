<template>
  <n-tree
    :data="data"
    selectable
    block-line
    default-expand-all
    :render-suffix="renderSuffix"
    :selected-keys="[selectedKeys]"
    :node-props="nodeProps"
  />
</template>

<script lang="ts" setup>
import { computed, h, watch } from 'vue';
import { $ref } from 'vue/macros';
import type { TreeOption } from 'naive-ui';

import TreeDeleteButton from '../TreeDeleteButton.vue';

import { createTreeOptions } from './utils';

import { GameObject } from '~/game/objects/ObjectsJson';

const props = defineProps<{
  modelValue: GameObject[];
  selected: GameObject | null;
}>();

const emits = defineEmits<{
  (event: 'select', object: GameObject): void;
  (event: 'update:modelValue', modelValue: GameObject[]): void;
}>();

const data = computed(() => {
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
  let object = props.modelValue.find((object) => object.name === option.key);
  if (object == null) {
    // try finding first thing in that layer
    object = props.modelValue.find((object) =>
      object.name.startsWith(option.key as string)
    );
  }
  if (object == null) {
    return;
  }

  selectedKeys = object.name;

  emits('select', object);
};

const nodeProps = ({ option }: { option: TreeOption }) => {
  return {
    onClick: () => handleTreeSelect(option),
  };
};

const deleteObject = (objectName: string) => {
  emits('update:modelValue', [
    ...props.modelValue.filter((object) => object.name !== objectName),
  ]);
  emits('select', props.modelValue[0]);
};

const renderSuffix = ({ option }: { option: TreeOption }) => {
  if (typeof option.key !== 'string') return;

  if (option.children == null) {
    // component level
    return h(TreeDeleteButton as any, {
      'icon-title': "Delete object with all it's properties",
      'icon-class': 'ml-6',
      onClick: () => deleteObject(option.key as string),
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
