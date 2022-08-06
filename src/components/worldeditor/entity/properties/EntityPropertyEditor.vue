<template>
  <n-form :model="modelValue" :rules="rules" label-placement="left">
    <n-form-item :label="modelValue.field" path="value">
      <n-switch
        v-if="typeof property.value === 'boolean'"
        v-model:value="property.value"
      />
      <n-input
        v-if="typeof property.value === 'string'"
        v-model:value="property.value"
      />
      <n-input-number
        v-if="typeof property.value === 'number'"
        v-model:value="property.value"
      />
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { FormRules } from 'naive-ui';
import { $ref } from 'vue/macros';

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

const property = $ref(props.modelValue);
</script>
