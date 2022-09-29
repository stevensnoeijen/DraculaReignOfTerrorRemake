<template>
  <n-input
    v-if="
      type === String && !(name.startsWith('sound') || name === 'spriteModel')
    "
    v-model:value="valueAsString"
  />
  <n-select
    v-if="
      (type === String || Array.isArray(type)) &&
      (name.startsWith('sound') || name === 'spriteModel')
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

  <n-input-number v-else-if="type === Number" v-model:value="valueAsNumber" />

  <Range v-else-if="type === RangeType" v-model="valueAsRange" />

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
import { PropertyValue } from '~/game/data/ObjectsJson';
import { getSpriteModelNames } from '~/game/animation/api';
import { Range as RangeType } from '~/game/utils/Range';

const props = defineProps<{
  name: string;
  value: PropertyValue;
}>();

const emits = defineEmits<{
  (event: 'update:value', value: PropertyValue): void;
}>();

const type = computed(() => getEditableProperty(Unit, props.name)?.type);

const valueAsString = ref('');
const valueAsStringArray = ref<string[]>([]);
const valueAsBoolean = ref(false);
const valueAsNumber = ref(0);
const valueAsRange = ref(new RangeType(0, 0));

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
  if (type.value === RangeType) {
    return valueAsRange.value;
  }

  throw new Error('value not supported');
};

watch(
  [
    valueAsString,
    valueAsStringArray,
    valueAsBoolean,
    valueAsNumber,
    valueAsRange,
  ],
  () => {
    emits('update:value', getValue());
  }
);

const loadValues = () => {
  valueAsString.value = props.value as string;
  valueAsStringArray.value = props.value as string[];
  valueAsBoolean.value = props.value as boolean;
  valueAsNumber.value = props.value as number;
  valueAsRange.value = props.value as RangeType;
};

let options: SelectOption[] = $ref([]);
const loadOptions = async () => {
  if (props.name.includes('sound')) {
    const sounds = await getSounds();
    options = soundsToSelectOptions(sounds);
  } else if (props.name === 'spriteModel') {
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
