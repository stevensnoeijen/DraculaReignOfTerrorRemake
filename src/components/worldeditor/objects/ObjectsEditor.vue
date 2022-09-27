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
          @select="handleSelectObject"
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
          @select="handlePropertyNameSelected"
        />
      </div>
      <div class="grow flex flex-col">
        <div class="border-b-2 mb-2">
          <h3 class="text-l font-bold">Property editor:</h3>
          <object-property-editor
            v-if="selectedPropertyName != null && value != null"
            :name="selectedPropertyName"
            :value="value"
            @update:value="handleValueUpdated"
          />
        </div>
        <div class="grow">
          <h4 class="text-l font-bold">Preview</h4>
          <sprite-model-preview
            v-if="selectedPropertyName === 'spriteModel' && !isEmpty(value)"
            :unit="(value as UnitType)"
          />
          <sound-preview
            v-if="
              selectedPropertyName?.includes('sound') &&
              typeof value === 'string'
            "
            v-model="value"
          />
          <sound-preview
            v-if="
              selectedPropertyName?.includes('sound') && Array.isArray(value)
            "
            v-model="value"
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
import { computed, onMounted } from 'vue';
import { $ref } from 'vue/macros';
import { isEmpty } from 'lodash';

import * as api from './api';
import { ObjectCreateInstance } from './create/types';

import { GameObject, PropertyValue } from '~/game/data/ObjectsJson';
import { UnitType } from '~/game/types';
import { firstKey } from '~/utils/object';

const message = useMessage();

let objects: GameObject[] = $ref([]);
let selectedObject = $ref<GameObject | null>(null);
let selectedPropertyName = $ref<string | null>(null);

const handleSelectObject = (object: GameObject) => {
  selectedObject = object;
  selectedPropertyName = firstKey(selectedObject.properties);
};

let showObjectCreateModal = $ref(false);
const objectCreateInstance = $ref<ObjectCreateInstance>();
const handleObjectCreate = async () => {
  try {
    await objectCreateInstance.form.validate();

    objects.push(objectCreateInstance.object);
    handleSelectObject(objectCreateInstance.object);

    return true;
  } catch (error) {
    return false;
  }
};

const setValue = (value: PropertyValue) => {
  if (selectedObject == null || selectedPropertyName == null) return;
  if (selectedObject.properties[selectedPropertyName] == null) return;

  selectedObject.properties[selectedPropertyName] = value;
};

const value = computed(() => selectedObject?.properties[selectedPropertyName!]);

const handlePropertyNameSelected = (propertyName: string) => {
  selectedPropertyName = propertyName;
};

const handleValueUpdated = (value: PropertyValue) => {
  setValue(value);
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
  selectedPropertyName = firstKey(selectedObject.properties);
});
</script>
