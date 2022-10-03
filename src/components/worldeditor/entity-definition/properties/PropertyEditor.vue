<template>
  <n-form :rules="rules" label-placement="left">
    <n-form-item :label="name" path="value">
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

      <n-input-number
        v-else-if="typeof value === 'number'"
        v-model:value="value"
      />

      <range
        v-else-if="value instanceof RangeType && type === RangeType"
        v-model="value"
      />

      <span v-else> Type not supported </span>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { FormRules, SelectOption } from 'naive-ui';
import { computed, reactive, ref, watch } from 'vue';

import { getSounds } from '../../sound/api';

import { soundsToSelectOptions } from './utils';

import { stringsToSelectOptions } from '~/components/utils';
import { getSpriteModelNames } from '~/game/animation/api';
import { getEditableProperty } from '~/game/data/decorator';
import { PropertyValue } from '~/game/data/types';
import { Unit } from '~/game/data/Unit';
import { Range as RangeType } from '~/game/utils/Range';

const rules: FormRules = {
  value: {
    required: true,
    message: 'Please input your value',
    trigger: 'blur',
  },
};

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
