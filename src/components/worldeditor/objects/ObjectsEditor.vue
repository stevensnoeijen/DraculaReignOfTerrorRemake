<template>
  <div class="flex flex-col">
    <h2 class="text-2xl font-bold">Objects Editor</h2>
    <div class="grow flex">
      <div class="border-r-2 mr-2 pr-2 flex flex-col">
        <h3 class="text-l font-bold">Objects:</h3>
        <objects-tree
          v-model="objects"
          class="grow"
          :selected="selectedObject"
          @select="selectObject"
        />
        <n-button @click="showObjectCreateModal = true"> Add Object </n-button>
        <n-modal
          v-model:show="showObjectCreateModal"
          preset="confirm"
          title="Create Object"
          positive-text="Add"
          negative-text="Cancel"
          @positive-click="() => handleObjectCreate()"
          @negative-click="() => {}"
        >
          <object-create ref="objectCreateInstance" />
        </n-modal>
      </div>
      <div class="border-r-2 mr-2 pr-2 flex flex-col">
        <h3 class="text-l font-bold">Properties:</h3>
        <object-properties-tree
          v-if="selectedObject != null"
          class="grow"
          :object="selectedObject"
          @update:object="(object) => handleUpdateObject(object)"
          @select="handlePropertySelected"
        />
      </div>
      <div class="grow flex flex-col">
        <div class="border-b-2 mb-2">
          <h3 class="text-l font-bold">Property editor:</h3>
          <object-property-editor
            v-if="selectedProperty != null"
            v-model="selectedProperty"
          />
        </div>
        <div class="grow">
          <h4 class="text-l font-bold">Preview</h4>
          <sprite-model-preview
            v-if="selectedProperty?.field === 'spriteModel' && !isEmpty(selectedProperty!.value)"
            :unit="(selectedProperty!.value as Unit)"
          />
          <sound-preview
            v-if="selectedProperty?.field.includes('sound')"
            v-model="(selectedProperty!.value as string | string[])"
          />
        </div>
      </div>
    </div>
    <div class="border-t-2 mt-2 pt-2 flex flex-col items-end">
      <n-button class="px-10" size="large" @click="handleSave"> Save </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMessage } from 'naive-ui';
import { onMounted } from 'vue';
import { $ref } from 'vue/macros';
import { isEmpty } from 'lodash';

import * as api from './api';
import { GameObject, Property } from './ObjectsJson';
import { ObjectCreateInstance } from './create/types';

import { Unit } from '~/game/animation/utils';

const message = useMessage();

let objects: GameObject[] = $ref([]);
let selectedObject = $ref<GameObject | null>(null);
let selectedProperty = $ref<Property | null>(null);

const selectObject = (object: GameObject) => {
  selectedObject = object;
  if (selectedObject.properties.length > 0) {
    selectedProperty = selectedObject.properties[0];
  } else {
    selectedProperty = null;
  }
};

let showObjectCreateModal = $ref(false);
const objectCreateInstance = $ref<ObjectCreateInstance>();
const handleObjectCreate = async () => {
  try {
    await objectCreateInstance.form.validate();

    objects.push(objectCreateInstance.object);
    selectObject(objectCreateInstance.object);

    return true;
  } catch (error) {
    return false;
  }
};

const handlePropertySelected = (property: Property) => {
  selectedProperty = property;
};

const handleUpdateObject = (updatedObject: GameObject) => {
  const object = objects.find((object) => object.name === updatedObject.name)!;
  object.properties = updatedObject.properties;
};

const handleSave = async () => {
  await api.saveObjects(objects);
  message.info('saved objects to server');
};

onMounted(async () => {
  objects = await api.getObjects();
  selectedObject = objects[0];
  selectedProperty = selectedObject.properties[0];
});
</script>
getObjects
