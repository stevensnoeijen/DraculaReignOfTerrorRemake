<template>
  <n-tree
    :data="data"
    selectable
    cascade
    block-line
    default-expand-all
    :selected-keys="selectedKeys"
    :render-suffix="renderSuffix"
    :node-props="nodeProps"
    class="w-56"
  />
</template>

<script lang="ts" setup>
import { NTag, TreeOption } from 'naive-ui';
import { computed, h } from 'vue';
import { $ref } from 'vue/macros';

import { Unit } from '~/game/data/Unit';
import { ellipsize } from '~/utils';

const props = defineProps<{
  properties: Unit;
}>();

const emits = defineEmits<{
  (event: 'select', propertyName: string): void;
}>();

let data = computed(() => {
  return Object.keys(props.properties).map(
    (name): TreeOption => ({
      label: name,
      key: name,
    })
  );
});

let selectedKeys = $ref<string[]>([]);

const handleTreeSelect = (option: TreeOption) => {
  if (typeof option.key !== 'string') {
    return;
  }

  selectedKeys = [option.key];
  emits('select', option.key);
};

const nodeProps = ({ option }: { option: TreeOption }) => {
  return {
    onClick: () => handleTreeSelect(option),
  };
};

const renderSuffix = ({ option }: { option: TreeOption }) => {
  if (typeof option.key !== 'string') return;

  // property level
  const value = props.properties[option.key as keyof Unit]!;
  return h(NTag, { round: true }, { default: () => `${ellipsize(value, 3)}` });
};
</script>
