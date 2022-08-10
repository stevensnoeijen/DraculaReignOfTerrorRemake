<template>
  <n-form :model="modelValue" :rules="rules" label-placement="left">
    <n-form-item :label="modelValue.field" path="value">
      <n-switch v-if="type === Boolean" v-model:value="property.value" />
      <n-input v-if="type === String" v-model:value="property.value" />
      <n-input-number v-if="type === Number" v-model:value="property.value" />
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { FormRules } from 'naive-ui';
import { computed } from 'vue';

import { Property } from '../types';
import { getEditableComponentProperty } from '../../../../game/component.decorator';

const rules: FormRules = {
  value: {
    required: true,
    message: 'Please input your value',
    trigger: 'blur',
  },
};

const props = defineProps<{
  modelValue: Property;
  component: string;
}>();
const property = computed(() => props.modelValue);
const type = getEditableComponentProperty(
  props.component,
  props.modelValue.field
).type;

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
