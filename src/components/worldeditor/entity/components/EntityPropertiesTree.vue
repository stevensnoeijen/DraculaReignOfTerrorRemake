<template>
  <n-tree
    :data="data"
    selectable
    cascade
    block-line
    default-expand-all
    :selected-keys="selectedKeys"
    :render-suffix="renderSuffix"
    :node-props="
      ({ option }) => ({
        onClick: () => handleTreeSelect(option),
      })
    "
    class="w-56"
  />
</template>

<script lang="ts" setup>
import { NTag, TreeOption } from 'naive-ui';
import { computed, h, onMounted, watch } from 'vue';
import { $ref } from 'vue/macros';

import { Entity, Property } from '../types.js';

const props = defineProps<{
  entity: Entity;
}>();

const emits = defineEmits<{
  (event: 'select', property: Property): void;
  (event: 'update:entity', entity: Entity): void;
}>();

let data = computed(() => {
  return props.entity.properties.map(
    (property): TreeOption => ({
      label: property.field,
      key: property.field,
    })
  );
});

let selectedKeys = $ref<string[]>([props.entity.properties[0].field]);

watch(
  () => props.entity.properties,
  () => {
    if (props.entity.properties.length === 0) {
      selectedKeys = [];
    } else {
      selectedKeys = [props.entity.properties[0].field];
    }
  }
);

const handleTreeSelect = (option: TreeOption) => {
  if (typeof option.key !== 'string') {
    return;
  }

  const property = props.entity.properties.find(
    (property) => property.field === option.key
  )!;
  selectedKeys = [property.field];
  emits('select', property);
};

const renderSuffix = ({ option }: { option: TreeOption }) => {
  if (typeof option.key !== 'string') return;

  // property level
  const property = props.entity.properties.find(
    (property) => property.field === option.key
  )!;
  return h(NTag, { round: true }, { default: () => `${property.value}` });
};

onMounted(() => {
  if (data.value.length > 0) selectedKeys = [props.entity.properties[0].field];
  else selectedKeys = [];
});
</script>
