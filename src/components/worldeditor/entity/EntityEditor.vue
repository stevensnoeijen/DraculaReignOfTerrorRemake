<template>
  <div class="flex flex-col">
    <h2 class="text-2xl font-bold">Entity Editor</h2>
    <div class="grow flex">
      <div class="border-r-2 mr-2 pr-2">
        <h3 class="text-l font-bold">Units:</h3>
        <entity-tree v-model="entities" @select="handleSelectEntity" />
      </div>
      <div class="border-r-2 mr-2 pr-2 flex flex-col">
        <h3 class="text-l font-bold">Properties:</h3>
        <entity-components-tree
          v-if="selectedEntity != null"
          class="grow"
          :entity="selectedEntity"
          @select="handlePropertySelected"
        />
        <div class="">
          <n-popover trigger="hover">
            <template #trigger>
              <n-button> Add Component </n-button>
            </template>
            <div>
              <n-button
                v-for="(, key) in editableComponents"
                @click="handleAddComponent(key)"
              >
                {{ key }}
              </n-button>
            </div>
          </n-popover>
        </div>
      </div>
      <div class="grow flex flex-col">
        <div class="border-b-2 mb-2">
          <h3 class="text-l font-bold">Property editor:</h3>
          <entity-property-editor
            v-if="selectedProperty != null"
            :model-value="selectedProperty"
            :component="selectedComponent"
          />
        </div>
        <div class="grow">
          <h4 class="text-l font-bold">Preview</h4>
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
import { getEditableComponents } from './properties/components';
import { Entity, Property } from './types';

const message = useMessage();

let entities: Entity[] = $ref([]);
let selectedEntity = $ref<Entity | null>(null);
let selectedProperty = $ref<Property | null>(null);
let selectedComponent = $ref<string | null>(null);

const editableComponents = getEditableComponents();

const handleSelectEntity = (entity: Entity) => {
  selectedEntity = entity;
  selectedComponent = selectedEntity.components[0].type;
  selectedProperty = selectedEntity.components[0].properties[0];
};

const handlePropertySelected = (property: Property, component: string) => {
  selectedProperty = property;
  selectedComponent = component;
};

const handleAddComponent = (component: string) => {
  const properties = editableComponents[component];
  const componentProps = {
    type: component,
    properties: [],
  };

  for (const key in properties) {
    const property = properties[key];

    componentProps.properties.push({
      field: key,
      value: property.defaultValue,
    });
  }

  selectedEntity!.components.push(componentProps);
};

const save = async () => {
  await api.saveEntities(entities);
  message.info('saved entities to server');
};

onMounted(async () => {
  entities = await api.getEntities();
  selectedEntity = entities[0];
  selectedComponent = selectedEntity.components[0].type;
  selectedProperty = selectedEntity.components[0].properties[0];
});
</script>
