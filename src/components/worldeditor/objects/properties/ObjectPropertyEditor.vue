<template>
  <n-form :model="modelValue" :rules="rules" label-placement="left">
    <n-form-item :label="modelValue.field" path="value">
      <n-input
        v-if="
          type === String &&
          !(
            property.field.startsWith('sound') ||
            property.field === 'spriteModel'
          )
        "
        v-model:value="(property.value as string)"
      />
      <n-select
        v-if="
          (type === String || Array.isArray(type)) &&
          (property.field.startsWith('sound') ||
            property.field === 'spriteModel')
        "
        v-model:value="(property.value as string)"
        filterable
        :multiple="Array.isArray(type)"
        :options="options"
      />
      <n-switch
        v-else-if="type === Boolean"
        v-model:value="(property.value as boolean)"
      />
      <n-input-number
        v-else-if="type === Number"
        v-model:value="(property.value as number)"
      />
      <span v-else> Type not supported </span>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { FormRules, SelectOption } from 'naive-ui';
import { computed, onMounted, onUpdated } from 'vue';
import { $ref } from 'vue/macros';

import { getEditableProperty } from '../../../../game/objects/decorator';
import { Unit } from '../../../../game/objects/Unit';
import { Property } from '../ObjectsJson';
import { getSounds } from '../../sound/api';
import { getSpriteModelNames } from '../../sprite/api';
import { stringsToSelectOptions } from '../../../utils';

import { soundsToSelectOptions } from './utils';

const rules: FormRules = {
  value: {
    required: true,
    message: 'Please input your value',
    trigger: 'blur',
  },
};

const props = defineProps<{
  modelValue: Property;
}>();
defineEmits<{
  (event: 'update:modelValue', modelValue: Property): void;
}>();

const property = computed(() => props.modelValue);
const type = computed(
  () => getEditableProperty(Unit, props.modelValue.field)?.type
);

// TODO: move this to the property itself
let options: SelectOption[] = $ref([]);
const loadOptions = async () => {
  if (props.modelValue.field.includes('sound')) {
    const sounds = await getSounds();
    options = soundsToSelectOptions(sounds);
  } else if (props.modelValue.field === 'spriteModel') {
    const names = await getSpriteModelNames();

    options = stringsToSelectOptions(names);
  } else {
    options = [];
  }
};

onMounted(async () => {
  await loadOptions();
});
onUpdated(async () => {
  await loadOptions();
});
</script>
