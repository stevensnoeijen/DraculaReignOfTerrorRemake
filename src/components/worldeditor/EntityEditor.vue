<template>
  <div class="flex flex-col">
    <h2 class="text-2xl font-bold">Entity Editor</h2>
    <div class="grow flex">
      <div class="border-r-2 mr-2 pr-2">
        <h3 class="text-l font-bold">Units:</h3>
        <n-tree
          :data="typesTree"
          selectable
          :selected-keys="[selectedUnit]"
          :node-props="
            ({ option }) => ({
              onClick: () => handleTreeSelect(option),
            })
          "
        />
      </div>
      <div class="border-r-2 mr-2 pr-2">
        <h3 class="text-l font-bold">Properties:</h3>
        <n-data-table
          v-model:checked-row-keys="selectedProperty"
          :row-key="(row: RowData) => `${row.component}.${row.name}`"
          :columns="columns"
          :data="entityProperties"
        />
      </div>
      <div class="bg-green-500 grow">
        <div class="bg-green-600">propery name and input change</div>
        <div class="bg-green-800">
          Preview selected data
          <!-- <animator-preview /> -->
        </div>
      </div>
    </div>
    <div>
      <n-button @click="save"> Save </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DataTableColumns, TreeOption } from 'naive-ui';
import { computed, onMounted, watch } from 'vue';
import { $ref } from 'vue/macros';

import * as api from './api';

let data: api.Entity[] = $ref([]);
let typesTree = computed(() => {
  return data.map((item): TreeOption => ({ label: item.name, key: item.name }));
});

let selectedUnit = $ref<string>();
const handleTreeSelect = (option: TreeOption) => {
  selectedUnit = option.key as string;
};

type RowData = {
  component: string;
  name: string;
  value: string;
};

const columns: DataTableColumns<RowData> = [
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

let selectedProperty = $ref<string[]>([]);

let entityProperties = computed<RowData[]>(() => {
  if (selectedUnit == null) return [];

  const unit = data.find((item) => item.name === selectedUnit)!;

  return unit.components
    .map((component) => {
      return component.properties.map(
        (property): RowData => ({
          component: component.type,
          name: property.field,
          value: String(property.value),
        })
      );
    })
    .flat();
});

watch(
  () => selectedUnit,
  () => {
    // default select first property
    const unit = data.find((item) => item.name === selectedUnit)!;
    selectedProperty = [
      unit.components[0].type + '.' + unit.components[0].properties[0].field!,
    ];
  }
);

const save = async () => {
  await api.saveEntities(data);
};

onMounted(async () => {
  data = await api.getEntities();
  selectedUnit = data[0].name;
});
</script>
