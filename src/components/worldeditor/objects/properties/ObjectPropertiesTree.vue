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

import { GameObject } from '~/game/data/ObjectsJson';
import { ellipsize } from '~/utils';

const props = defineProps<{
  object: GameObject;
}>();

const emits = defineEmits<{
  (event: 'select', propertyName: string): void;
  (event: 'update:object', object: GameObject): void;
}>();

let data = computed(() => {
  return Object.keys(props.object.properties).map(
    (name): TreeOption => ({
      label: name,
      key: name,
    })
  );
});

let selectedKeys = $ref<string[]>([]);

// watch(
//   () => props.object.properties,
//   () => {
//     if (props.object.properties.length === 0) {
//       selectedKeys = [];
//     } else {
//       selectedKeys = [firstKey(props.object.properties)];
//     }
//   }
// );

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
  const value = props.object.properties[option.key]!;
  return h(NTag, { round: true }, { default: () => `${ellipsize(value, 3)}` });
};

// onMounted(() => {
//   if (data.value.length > 0) selectedKeys = [firstKey(props.object.properties)];
//   else selectedKeys = [];
// });
</script>
