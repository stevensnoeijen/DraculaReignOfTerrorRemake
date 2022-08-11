<template>
  <div class="flex flex-col">
    <h2 class="text-2xl font-bold">Entity Editor</h2>
    <div class="grow flex">
      <div class="border-r-2 mr-2 pr-2">
        <h3 class="text-l font-bold">Entities:</h3>
        <entity-tree v-model="entities" @select="handleSelectEntity" />
      </div>
      <div class="border-r-2 mr-2 pr-2 flex flex-col">
        <h3 class="text-l font-bold">Components:</h3>
        <entity-components-tree
          v-if="selectedEntity != null"
          class="grow"
          :entity="selectedEntity"
          @update:entity="(entity) => handleUpdateEntity(entity)"
          @select="handlePropertySelected"
        />
        <div class="">
          <n-popover trigger="hover">
            <template #trigger>
              <n-button> Add Component </n-button>
            </template>
            <div>
              <template v-if="Object.keys(addableComponents).length > 0">
                <n-button
                  v-for="(value, key) in addableComponents"
                  :key="key"
                  @click="handleAddComponent(key as string)"
                >
                  {{ key }}
                </n-button>
              </template>
              <template v-else>
                No other components available to add.
              </template>
            </div>
          </n-popover>
        </div>
      </div>
      <div class="grow flex flex-col">
        <div class="border-b-2 mb-2">
          <h3 class="text-l font-bold">Property editor:</h3>
          <entity-property-editor
            v-if="selectedProperty != null && selectedComponent != null"
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
import { computed, onMounted } from 'vue';
import { $ref } from 'vue/macros';

import * as api from './api';
import { getEditableComponents } from './components/utils';
import { Component, Entity, Property, PropertyValue } from './types';

const message = useMessage();

let entities: Entity[] = $ref([]);
let selectedEntity = $ref<Entity | null>(null);
let selectedProperty = $ref<Property | null>(null);
let selectedComponent = $ref<string | null>(null);

const handleSelectEntity = (entity: Entity) => {
  selectedEntity = entity;
  selectedComponent = selectedEntity.components[0].type;
  selectedProperty = selectedEntity.components[0].properties[0];
};

const addableComponents = computed(() => {
  const editableComponents = getEditableComponents();

  if (selectedEntity == null) {
    return [];
  }

  selectedEntity.components.forEach((component) => {
    delete editableComponents[component.type];
  });

  return editableComponents;
});

const handlePropertySelected = (property: Property, component: string) => {
  selectedProperty = property;
  selectedComponent = component;
};

const handleAddComponent = (component: string) => {
  const properties = addableComponents.value[component];
  const componentProps = {
    type: component,
    properties: [],
  } as Component;

  for (const key in properties) {
    const property = properties[key];

    componentProps.properties.push({
      field: key,
      value: property.defaultValue as PropertyValue,
    });
  }

  console.log(componentProps);
  selectedEntity!.components.push(componentProps);
};

const handleUpdateEntity = (updatedEntity: Entity) => {
  const entity = entities.find((entity) => entity.name === updatedEntity.name)!;
  entity.components = updatedEntity.components;
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
