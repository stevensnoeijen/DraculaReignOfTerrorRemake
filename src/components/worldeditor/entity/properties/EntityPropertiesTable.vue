<template>
  <n-data-table
    v-model:checked-row-keys="selectedPropertyKey"
    :row-key="(row: PropertyRowData) => `${row.component}.${row.name}`"
    :columns="columns"
    :data="properties"
  />
</template>

<script lang="ts" setup>
import { DataTableColumns } from 'naive-ui';
import { computed, watch } from 'vue';
import { $ref } from 'vue/macros';

import { Entity, Property } from '../types.js';

import { PropertyRowData } from './types.js';

const columns: DataTableColumns<PropertyRowData> = [
  {
    type: 'selection',
    multiple: false,
  },
  {
    title: 'Component',
    key: 'component',
  },
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Value',
    key: 'value',
  },
];

const props = defineProps<{
  entity: Entity;
}>();

const emits = defineEmits<{
  (event: 'select', property: Property): void;
}>();

let selectedPropertyKey = $ref<string[]>([]);

const properties = computed(() => {
  if (props.entity == null) return [];
  return props.entity.components
    .map((component) => {
      return component.properties.map(
        (property): PropertyRowData => ({
          component: component.type,
          name: property.field,
          value: String(property.value),
        })
      );
    })
    .flat();
});

watch(
  () => props.entity,
  () => {
    if (properties.value.length > 0)
      selectedPropertyKey[0] =
        properties.value[0].component + '.' + properties.value[0].name;
    else selectedPropertyKey = [];
  }
);

watch(
  () => selectedPropertyKey,
  () => {
    const [componentType, propertyField] = selectedPropertyKey[0].split('.');

    const component = props.entity.components.find((component) => {
      if (component.type === componentType) return component;
    });
    if (component == null) return;

    const property = component.properties.find(
      (property) => property.field === propertyField
    );
    if (property == null) return;

    emits('select', property);
  }
);
</script>
