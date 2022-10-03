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

import { EntityDefinition } from '~/game/data/EntityDefinition';

const props = defineProps<{
  modelValue: EntityDefinition[];
  selected: EntityDefinition | null;
}>();

const emits = defineEmits<{
  (event: 'select', entityDefinition: EntityDefinition): void;
  (event: 'update:modelValue', entityDefinition: EntityDefinition[]): void;
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
  let entityDefinition = props.modelValue.find((ed) => ed.name === option.key);
  if (entityDefinition == null) {
    // try finding first thing in that layer
    entityDefinition = props.modelValue.find((ed) =>
      ed.name.startsWith(option.key as string)
    );
  }
  if (entityDefinition == null) {
    return;
  }

  selectedKeys = entityDefinition.name;

  emits('select', entityDefinition);
};

const nodeProps = ({ option }: { option: TreeOption }) => {
  return {
    onClick: () => handleTreeSelect(option),
  };
};

const remove = (name: string) => {
  emits('update:modelValue', [
    ...props.modelValue.filter((ed) => ed.name !== name),
  ]);
  emits('select', props.modelValue[0]);
};

const renderSuffix = ({ option }: { option: TreeOption }) => {
  if (typeof option.key !== 'string') return;

  if (option.children == null) {
    // component level
    return h(TreeDeleteButton as any, {
      'icon-title': "Delete entity-definition with all it's properties",
      'icon-class': 'ml-6',
      onClick: () => remove(option.key as string),
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
