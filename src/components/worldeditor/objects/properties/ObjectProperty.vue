<template>
  <n-input
    v-if="
      typeof value === 'string' &&
      !(name.startsWith('sound') || name === 'spriteModel')
    "
    v-model:value="value"
  />
  <n-select
    v-if="
      (typeof value === 'string' ||
        (Array.isArray(value) && typeof value[0] === 'string')) &&
      (name.startsWith('sound') || name === 'spriteModel')
    "
    v-show="options.length > 0"
    v-model:value="value"
    filterable
    :multiple="Array.isArray(type)"
    :options="options"
  />

  <n-switch
    v-else-if="typeof value === 'boolean'"
    v-model:value.boolean="value"
  />

  <n-input-number v-else-if="typeof value === 'number'" v-model:value="value" />

  <range
    v-else-if="value instanceof RangeType && type === RangeType"
    v-model="value"
  />

  <span v-else> Type not supported </span>
</template>

<script lang="ts" setup>
import { SelectOption } from 'naive-ui';
import { computed, reactive, ref, watch } from 'vue';

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

const value = ref(props.value);

watch(value, () => {
  emits('update:value', value.value!);
});

const options: SelectOption[] = reactive([]);
const loadOptions = async () => {
  if (props.name.includes('sound')) {
    const sounds = await getSounds();
    options.push(...soundsToSelectOptions(sounds));
  } else if (props.name === 'spriteModel') {
    const names = await getSpriteModelNames();

    options.push(...stringsToSelectOptions(names));
  }
};

await loadOptions();
</script>
