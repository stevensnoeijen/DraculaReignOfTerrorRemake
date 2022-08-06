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
import { watch } from 'vue';
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

let properties = $ref<PropertyRowData[]>();
let selectedPropertyKey = $ref<string[]>([]);

watch(
  () => props.entity,
  () => {
    if (props.entity == null) return;
    properties = props.entity.components
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
  }
);

watch(
  () => properties,
  () => {
    if (properties.length > 0)
      selectedPropertyKey[0] =
        properties[0].component + '.' + properties[0].name;
    else selectedPropertyKey = [];
  }
);

watch(
  () => selectedPropertyKey,
  () => {
    const { componentType, propertyField } = selectedPropertyKey[0].split('.');
    const property = props.entity.components.find((component) => {
      if (component.type !== componentType) return undefined;
      return component.properties.find(
        (property) => property.field === propertyField
      );
    });

    emits('select', property);
  }
);
</script>
