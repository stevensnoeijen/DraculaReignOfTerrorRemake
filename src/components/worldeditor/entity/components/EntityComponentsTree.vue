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
import { NIcon, NTag, TreeOption } from 'naive-ui';
import { computed, h, onMounted, watch } from 'vue';
import { $ref } from 'vue/macros';
import { Delete } from '@vicons/carbon';

import { Entity, Component, Property } from '../types.js';

const propertyOptionKey = (component: Component, property: Property) =>
  `${component.type}.${property.field}`;

const props = defineProps<{
  entity: Entity;
}>();

const emits = defineEmits<{
  (event: 'select', property: Property, component: string): void;
  (event: 'update:entity', entity: Entity): void;
}>();

let data = computed(() => {
  return props.entity.components.map(
    (component): TreeOption => ({
      label: component.type,
      key: component.type,
      children: component.properties.map((property) => ({
        key: propertyOptionKey(component, property),
        label: property.field,
      })),
    })
  );
});

let selectedKeys = $ref<string[]>([
  propertyOptionKey(
    props.entity.components[0],
    props.entity.components[0].properties[0]
  ),
]);

watch(
  () => props.entity.components,
  () => {
    if (props.entity.components.length === 0) {
      selectedKeys = [];
    } else {
      selectedKeys = [
        propertyOptionKey(
          props.entity.components[0],
          props.entity.components[0].properties[0]
        ),
      ];
    }
  }
);

const handleTreeSelect = (option: TreeOption) => {
  if (typeof option.key !== 'string') {
    return;
  }

  if (!option.key.includes('.')) {
    // component level
    const component = props.entity.components.find(
      (component) => component.type === option.key
    );
    if (component == null) return;

    selectedKeys = [propertyOptionKey(component, component.properties[0])];

    // select first component
    emits('select', component.properties[0], component.type);
  } else {
    // property level
    const [componentType, propertyField] = option.key.split('.');
    const component = props.entity.components.find(
      (component) => component.type === componentType
    )!;
    const property = component?.properties.find(
      (property) => property.field === propertyField
    )!;

    selectedKeys = [propertyOptionKey(component, property)];
    // select first component
    emits('select', property, component.type);
  }
};

const deleteComponent = (componentType: string) => {
  emits('update:entity', {
    ...props.entity,
    components: props.entity.components.filter(
      (component) => component.type !== componentType
    ),
  });
};

const renderSuffix = ({ option }: { option: TreeOption }) => {
  if (typeof option.key !== 'string') return;

  if (!option.key.includes('.')) {
    // component level
    return h(
      NIcon,
      {
        title: "delete component with all it's properties",
        onClick: () => deleteComponent(option.key as string),
      },
      {
        default: () => h(Delete, {}),
      }
    );
  } else {
    // property level
    const [componentType, propertyField] = option.key.split('.');
    const component = props.entity.components.find(
      (component) => component.type === componentType
    )!;
    const property = component?.properties.find(
      (property) => property.field === propertyField
    )!;
    return h(NTag, { round: true }, { default: () => `${property.value}` });
  }
};

onMounted(() => {
  if (data.value.length > 0)
    selectedKeys = [
      propertyOptionKey(
        props.entity.components[0],
        props.entity.components[0].properties[0]
      ),
    ];
  else selectedKeys = [];
});
</script>
