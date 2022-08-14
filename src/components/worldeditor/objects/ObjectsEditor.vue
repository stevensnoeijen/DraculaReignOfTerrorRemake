<template>
  <div class="flex flex-col">
    <h2 class="text-2xl font-bold">Entity Editor</h2>
    <div class="grow flex">
      <div class="border-r-2 mr-2 pr-2 flex flex-col">
        <h3 class="text-l font-bold">Entities:</h3>
        <object-tree
          v-model="entities"
          class="grow"
          :selected="selectedEntity"
          @select="selectEntity"
        />
        <n-button @click="showAddEntityModal = true"> Add Entity </n-button>
        <n-modal
          v-model:show="showAddEntityModal"
          preset="confirm"
          title="Create Entity"
          positive-text="Add"
          negative-text="Cancel"
          @positive-click="() => handleEntityCreate()"
          @negative-click="() => {}"
        >
          <object-create ref="entityCreateInstance" />
        </n-modal>
      </div>
      <div class="border-r-2 mr-2 pr-2 flex flex-col">
        <h3 class="text-l font-bold">Components:</h3>
        <object-properties-tree
          v-if="selectedEntity != null"
          class="grow"
          :entity="selectedEntity"
          @update:entity="(entity) => handleUpdateEntity(entity)"
          @select="handlePropertySelected"
        />
      </div>
      <div class="grow flex flex-col">
        <div class="border-b-2 mb-2">
          <h3 class="text-l font-bold">Property editor:</h3>
          <object-property-editor
            v-if="selectedProperty != null"
            :model-value="selectedProperty"
          />
        </div>
        <div class="grow">
          <h4 class="text-l font-bold">Preview</h4>
          <!-- <animator-preview /> -->
        </div>
      </div>
    </div>
    <div class="border-t-2 mt-2 pt-2 flex flex-col items-end">
      <n-button class="px-10" size="large" @click="save"> Save </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMessage } from 'naive-ui';
import { onMounted } from 'vue';
import { $ref } from 'vue/macros';

import * as api from './api';
import { Entity, EntityCreateInstance, Property } from './types';

const message = useMessage();

let entities: Entity[] = $ref([]);
let selectedEntity = $ref<Entity | null>(null);
let selectedProperty = $ref<Property | null>(null);

const selectEntity = (entity: Entity) => {
  selectedEntity = entity;
  if (selectedEntity.properties.length > 0) {
    selectedProperty = selectedEntity.properties[0];
  } else {
    selectedProperty = null;
  }
};

let showAddEntityModal = $ref(false);
const entityCreateInstance = $ref<EntityCreateInstance>();
const handleEntityCreate = async () => {
  try {
    await entityCreateInstance.form.validate();

    entities.push(entityCreateInstance.entity);
    selectEntity(entityCreateInstance.entity);

    return true;
  } catch (error) {
    return false;
  }
};

const handlePropertySelected = (property: Property) => {
  selectedProperty = property;
};

const handleUpdateEntity = (updatedEntity: Entity) => {
  const entity = entities.find((entity) => entity.name === updatedEntity.name)!;
  entity.properties = updatedEntity.properties;
};

const save = async () => {
  await api.saveObjects(entities);
  message.info('saved entities to server');
};

onMounted(async () => {
  entities = await api.getObjects();
  selectedEntity = entities[0];
  selectedProperty = selectedEntity.properties[0];
});
</script>
getObjects
