<template>
  <div class="flex flex-col">
    <h2 class="text-2xl font-bold">Entity Definitions Editor</h2>
    <div class="grow flex">
      <div
        v-if="entityDefinitions != null"
        class="border-r-2 mr-2 pr-2 flex flex-col"
      >
        <h3 class="text-l font-bold">Entity Definitions:</h3>
        <entity-definition-tree
          :key="selectedEntityDefinition?.name"
          v-model="entityDefinitions.definitions"
          class="grow"
          :selected="selectedEntityDefinition"
          @select="handleSelectEntityDefinition"
        />
        <n-button @click="showCreatorModal = true">
          Add Entity-Definition
        </n-button>
        <n-modal
          v-model:show="showCreatorModal"
          preset="confirm"
          title="Create Entity-Definition"
          positive-text="Add"
          negative-text="Cancel"
          @positive-click="() => handleCreate()"
          @negative-click="() => {}"
        >
          <entity-definition-creator ref="creatorInstance" />
        </n-modal>
      </div>
      <div class="border-r-2 mr-2 pr-2 flex flex-col">
        <h3 class="text-l font-bold">Properties:</h3>
        <properties-tree
          v-if="selectedEntityDefinition != null"
          class="grow"
          :properties="selectedEntityDefinition.properties"
          @select="handlePropertyNameSelected"
        />
      </div>

      <div
        v-if="selectedProperty.name != null && selectedProperty.value != null"
        class="grow flex flex-col"
      >
        <div class="border-b-2 mb-2">
          <h3 class="text-l font-bold">Property editor:</h3>
          <property-editor
            :key="selectedEntityDefinition?.name + '.' + selectedProperty?.name"
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
import { EntityDefinitionCreatorInstance } from './creator/types';

import { PropertyValue } from '~/game/data/types';
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
let selectedEntityDefinition = $ref<EntityDefinition | null>(null);
let selectedProperty = reactive<Property>({
  name: null,
  value: null,
});

const loadProperty = (propertyName: $Keys<Unit>) => {
  selectedProperty.name = propertyName;
  selectedProperty.value =
    selectedEntityDefinition?.properties[selectedProperty.name]!;
};

const handleSelectEntityDefinition = (entityDefinition: EntityDefinition) => {
  selectedEntityDefinition = entityDefinition;
  loadProperty(firstKey(selectedEntityDefinition.properties) as $Keys<Unit>);
};

let showCreatorModal = $ref(false);
const creatorInstance = $ref<EntityDefinitionCreatorInstance>();
const handleCreate = async () => {
  try {
    await creatorInstance.form.validate();

    entityDefinitions.definitions.push(creatorInstance.entityDefinition);
    handleSelectEntityDefinition(creatorInstance.entityDefinition);

    return true;
  } catch (error) {
    return false;
  }
};

const setValue = (value: PropertyValue) => {
  if (
    selectedProperty.name == null ||
    selectedEntityDefinition?.properties[selectedProperty.name!] == null
  )
    return;

  // cast as never, because selected property can not be validated
  selectedEntityDefinition.properties[selectedProperty.name] =
    selectedProperty.value = value as never;
};

const handlePropertyNameSelected = (propertyName: $Keys<Unit>) => {
  if (selectedEntityDefinition == null)
    throw new Error('No ' + EntityDefinition.name + ' selected');

  loadProperty(propertyName);
};

const handleValueUpdated = (value: PropertyValue) => {
  setValue(value);
};

const handleSave = async () => {
  await api.saveEntityDefinitions(entityDefinitions);
  message.info('saved entity-definitions to server');
};

onMounted(async () => {
  entityDefinitions = await api.getEntityDefinitions();
  selectedEntityDefinition = entityDefinitions.definitions[0];
  selectedProperty.name = firstKey(
    selectedEntityDefinition.properties
  ) as $Keys<Unit>;
  selectedProperty.value =
    selectedEntityDefinition.properties[selectedProperty.name];
});
</script>
getEntityDefsaveEntityDfinitions
