<template>
  <n-data-table
    v-model:checked-row-keys="selectedProperty"
    :row-key="(row: PropertyRowData) => `${row.component}.${row.name}`"
    :columns="columns"
    :data="properties"
  />
</template>

<script lang="ts" setup>
import { DataTableColumns } from 'naive-ui';
import { watch } from 'vue';
import { $ref } from 'vue/macros';

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
  properties: PropertyRowData[];
}>();

let selectedProperty = $ref<string[]>([]);

watch(
  () => props.properties,
  () => {
    if (props.properties.length > 0)
      selectedProperty[0] =
        props.properties[0].component + '.' + props.properties[0].name;
    else selectedProperty = [];
  }
);
</script>
