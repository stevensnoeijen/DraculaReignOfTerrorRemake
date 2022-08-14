<template>
  <n-form :model="modelValue" :rules="rules" label-placement="left">
    <n-form-item :label="modelValue.field" path="value">
      <n-switch
        v-if="type === Boolean"
        v-model:value="(property.value as boolean)"
      />
      <n-input
        v-if="type === String"
        v-model:value="(property.value as string)"
      />
      <n-input-number
        v-if="type === Number"
        v-model:value="(property.value as number)"
      />
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { FormRules } from 'naive-ui';
import { computed } from 'vue';

import { Property } from '../types';
import { getEditableProperty } from '../../../../game/component.decorator';
import { Unit } from '../../../../game/Unit';

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
const property = computed(() => props.modelValue);
const type = getEditableProperty(Unit, props.modelValue.field)?.type;

const emits = defineEmits<{
  (event: 'update:modelValue', modelValue: Property): void;
}>();

const update = (value: Property['value']) => {
  emits('update:modelValue', {
    ...props.modelValue,
    value,
  });
};
</script>
