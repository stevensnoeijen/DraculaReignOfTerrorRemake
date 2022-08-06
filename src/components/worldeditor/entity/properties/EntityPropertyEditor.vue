<template>
  <n-form :model="modelValue" :rules="rules" label-placement="left">
    <n-form-item :label="modelValue.field" path="value">
      <n-switch
        v-if="typeof property.value === 'boolean'"
        v-model:value="property.value"
        @update:value="update"
      />
      <n-input
        v-if="typeof property.value === 'string'"
        v-model:value="property.value"
        @update:value="update"
      />
      <n-input-number
        v-if="typeof property.value === 'number'"
        v-model:value="property.value"
        @update:value="update"
      />
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { FormRules } from 'naive-ui';
import { computed } from 'vue';

import { Property } from '../types';

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
