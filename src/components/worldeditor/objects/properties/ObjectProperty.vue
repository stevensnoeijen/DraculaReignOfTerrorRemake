<template>
  <n-input
    v-if="
      type === String &&
        !(
          modelValue.field.startsWith('sound') ||
          modelValue.field === 'spriteModel'
        )
    "
    v-model:value="valueAsString"
  />
  <n-select
    v-if="
      (type === String || Array.isArray(type)) &&
        (modelValue.field.startsWith('sound') ||
          modelValue.field === 'spriteModel')
    "
    v-model:value="valueAsStringArray"
    filterable
    :multiple="Array.isArray(type)"
    :options="options"
  />

  <n-switch
    v-else-if="type === Boolean"
    v-model:value.boolean="valueAsBoolean"
  />

  <n-input-number
    v-else-if="type === Number"
    v-model:value="valueAsNumber"
  />
  <span v-else> Type not supported </span>
</template>

<script lang="ts" setup>
import { SelectOption } from 'naive-ui';
import { computed, onMounted, onUpdated, ref, watch } from 'vue';
import { $ref } from 'vue/macros';

import { getSounds } from '../../sound/api';
import { stringsToSelectOptions } from '../../../utils';

import { soundsToSelectOptions } from './utils';

import { getEditableProperty } from '~/game/data/decorator';
import { Unit } from '~/game/data/Unit';
import { Property, PropertyValue } from '~/game/data/ObjectsJson';
import { getSpriteModelNames } from '~/game/animation/api';



const props = defineProps<{
  modelValue: Property;
}>();

const type = computed(
  () => getEditableProperty(Unit, props.modelValue.field)?.type
);

const valueAsString = ref('');
const valueAsStringArray = ref<string[]>([]);
const valueAsBoolean = ref(false);
const valueAsNumber = ref(0);

const getValue = (): PropertyValue => {
  if (type.value === String) {
    return valueAsString.value;
  }
  if (Array.isArray(type.value)) {
    return valueAsStringArray.value;
  }
  if (type.value === Boolean) {
    return valueAsBoolean.value;
  }
  if (type.value === Number) {
    return valueAsNumber.value;
  }

  throw new Error('value not supported');
};

watch([
  valueAsString,
  valueAsStringArray,
  valueAsBoolean,
  valueAsNumber,
], () => {
  // eslint-disable-next-line vue/no-mutating-props
  props.modelValue.value = getValue();
});

const loadValues = () => {
  valueAsString.value = props.modelValue.value as string;
  valueAsStringArray.value = props.modelValue.value as string[];
  valueAsBoolean.value = props.modelValue.value as boolean;
  valueAsNumber.value = props.modelValue.value as number;
};

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
  loadValues();
  await loadOptions();
});
onUpdated(async () => {
  loadValues();
  await loadOptions();
});
</script>
