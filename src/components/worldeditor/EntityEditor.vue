<template>
  <div class="flex flex-col">
    <div class="grow flex">
      <div>
        <n-tree
          :data="typesTree"
          selectable
          :node-props="
            ({ option }) => ({
              onClick: () => handleTreeSelect(option),
            })
          "
        />
      </div>
      <div class="bg-blue-500">properties view</div>
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
import { TreeOption } from 'naive-ui';
import { computed, onMounted } from 'vue';
import { $ref } from 'vue/macros';

import * as api from './api';

let data: api.Entity[] = $ref([]);
let typesTree = computed(() => {
  return data.map((item): TreeOption => ({ label: item.name, key: item.name }));
});

const handleTreeSelect = (option: TreeOption) => {
  console.info('[Click] ' + option.label);
};

const save = async () => {
  await api.saveEntities(data);
};

onMounted(async () => {
  data = await api.getEntities();
});
</script>
