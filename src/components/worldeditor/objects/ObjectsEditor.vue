<template>
  <div class="flex flex-col">
    <h2 class="text-2xl font-bold">Objects Editor</h2>
    <div class="grow flex">
      <div
        v-if="entityDefinitions != null"
        class="border-r-2 mr-2 pr-2 flex flex-col"
      >
        <h3 class="text-l font-bold">Objects:</h3>
        <objects-tree
          v-model="entityDefinitions.definitions"
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

      <div
        v-if="selectedProperty.name != null && selectedProperty.value != null"
        class="grow flex flex-col"
      >
        <div class="border-b-2 mb-2">
          <h3 class="text-l font-bold">Property editor:</h3>
          <object-property-editor
            :key="selectedObject?.name + '.' + selectedProperty?.name"
            :name="selectedProperty.name"
            :value="selectedProperty.value"
            @update:value="handleValueUpdated"
          />
        </div>
        <div class="grow">
          <h4 class="text-l font-bold">Preview</h4>
          <animator-preview
            v-if="
              selectedProperty.name === 'spriteModel' &&
              !isEmpty(selectedProperty.value)
            "
            :unit="(selectedProperty.value as UnitType)"
          />
          <sound-preview
            v-if="
              selectedProperty.name.includes('sound') &&
              typeof selectedProperty.value === 'string'
            "
            v-model="selectedProperty.value"
          />
          <sound-preview
            v-if="
              selectedProperty.name.includes('sound') &&
              Array.isArray(selectedProperty.value)
            "
            v-model="selectedProperty.value"
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
import { onMounted, reactive } from 'vue';
import { $ref } from 'vue/macros';
import { isEmpty } from 'lodash';
import { $Keys } from 'utility-types';

import * as api from './api';
import { ObjectCreateInstance } from './create/types';

import { PropertyValue } from '~/game/data/ObjectsJson';
import { EntityDefinitions } from '~/game/data/EntityDefinitions';
import { EntityDefinition } from '~/game/data/EntityDefinition';
import { Unit } from '~/game/data/Unit';
import { UnitType } from '~/game/types';
import { firstKey } from '~/utils/object';

type Property =
  | {
      name: $Keys<Unit>;
      value: PropertyValue;
    }
  | { name: null; value: null };

const message = useMessage();

let entityDefinitions: EntityDefinitions = $ref();
let selectedObject = $ref<EntityDefinition | null>(null);
let selectedProperty = reactive<Property>({
  name: null,
  value: null,
});

const handleSelectObject = (object: EntityDefinition) => {
  selectedObject = object;
  selectedProperty.name = firstKey(selectedObject.properties) as $Keys<Unit>;
};

let showObjectCreateModal = $ref(false);
const objectCreateInstance = $ref<ObjectCreateInstance>();
const handleObjectCreate = async () => {
  try {
    await objectCreateInstance.form.validate();

    entityDefinitions.definitions.push(objectCreateInstance.object);
    handleSelectObject(objectCreateInstance.object);

    return true;
  } catch (error) {
    return false;
  }
};

const setValue = (value: PropertyValue) => {
  if (selectedObject == null || selectedProperty.name == null) return;
  if (selectedObject.properties[selectedProperty.name] == null) return;

  selectedProperty.value = value;
  // @ts-ignore
  selectedObject.properties[selectedProperty.name] = selectedProperty.value;
};

const handlePropertyNameSelected = (propertyName: string) => {
  if (selectedObject == null)
    throw new Error('No ' + EntityDefinition.name + ' selected');

  selectedProperty.name = propertyName as $Keys<Unit>;
  selectedProperty.value = selectedObject?.properties[selectedProperty.name];
};

const handleValueUpdated = (value: PropertyValue) => {
  setValue(value);
};

const handleUpdateObject = (updatedObject: EntityDefinition) => {
  const object = entityDefinitions.definitions.find(
    (object) => object.name === updatedObject.name
  )!;
  object.properties = updatedObject.properties;
};

const handleSave = async () => {
  await api.saveEntityDefinitions(entityDefinitions);
  message.info('saved objects to server');
};

onMounted(async () => {
  entityDefinitions = await api.getEntityDefinitions();
  selectedObject = entityDefinitions.definitions[0];
  selectedProperty.name = firstKey(selectedObject.properties) as $Keys<Unit>;
  selectedProperty.value = selectedObject.properties[selectedProperty.name];
});
</script>
getEntityDefsaveEntityDfinitions
