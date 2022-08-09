<template>
  <div class="flex flex-col">
    <h2 class="text-2xl font-bold">Entity Editor</h2>
    <div class="grow flex">
      <div class="border-r-2 mr-2 pr-2">
        <h3 class="text-l font-bold">Units:</h3>
        <entity-tree v-model="entities" @select="handleSelectEntity" />
      </div>
      <div class="border-r-2 mr-2 pr-2">
        <h3 class="text-l font-bold">Properties:</h3>
        <entity-properties-table
          v-if="selectedEntity != null"
          :entity="selectedEntity"
          @select="(property) => (selectedProperty = property)"
        />
      </div>
      <div class="grow">
        <div>
          <h3 class="text-l font-bold">Property editor:</h3>
          <entity-property-editor
            v-if="selectedProperty != null"
            :model-value="selectedProperty"
          />
        </div>
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
import { useMessage } from 'naive-ui';
import { onMounted } from 'vue';
import { $ref } from 'vue/macros';

import * as api from './api';
import { Entity, Property } from './types';

const message = useMessage();

let entities: Entity[] = $ref([]);
let selectedEntity = $ref<Entity | null>(null);
let selectedProperty = $ref<Property | null>(null);

const handleSelectEntity = (entity: Entity) => {
  selectedEntity = entity;
  selectedProperty = selectedEntity.components[0].properties[0];
};

const save = async () => {
  await api.saveEntities(entities);
  message.info('saved entities to server');
};

onMounted(async () => {
  entities = await api.getEntities();
  selectedEntity = entities[0];
  selectedProperty = selectedEntity.components[0].properties[0];
});
</script>
