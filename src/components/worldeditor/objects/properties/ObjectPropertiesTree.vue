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
import { computed, h, onMounted, watch } from 'vue';
import { $ref } from 'vue/macros';

import { GameObject, Property } from '~/game/objects/ObjectsJson';
import { ellipsize } from '~/utils';

const props = defineProps<{
  object: GameObject;
}>();

const emits = defineEmits<{
  (event: 'select', property: Property): void;
  (event: 'update:object', object: GameObject): void;
}>();

let data = computed(() => {
  return props.object.properties.map(
    (property): TreeOption => ({
      label: property.field,
      key: property.field,
    })
  );
});

let selectedKeys = $ref<string[]>([props.object.properties[0].field]);

watch(
  () => props.object.properties,
  () => {
    if (props.object.properties.length === 0) {
      selectedKeys = [];
    } else {
      selectedKeys = [props.object.properties[0].field];
    }
  }
);

const handleTreeSelect = (option: TreeOption) => {
  if (typeof option.key !== 'string') {
    return;
  }

  const property = props.object.properties.find(
    (property) => property.field === option.key
  )!;
  selectedKeys = [property.field];
  emits('select', property);
};

const nodeProps = ({ option }: { option: TreeOption }) => {
  return {
    onClick: () => handleTreeSelect(option),
  };
};

const renderSuffix = ({ option }: { option: TreeOption }) => {
  if (typeof option.key !== 'string') return;

  // property level
  const property = props.object.properties.find(
    (property) => property.field === option.key
  )!;
  return h(
    NTag,
    { round: true },
    { default: () => `${ellipsize(property.value, 3)}` }
  );
};

onMounted(() => {
  if (data.value.length > 0) selectedKeys = [props.object.properties[0].field];
  else selectedKeys = [];
});
</script>
