<template>
  <n-form :rules="rules" label-placement="left">
    <n-form-item :label="name" path="value">
      <object-property
        :name="name"
        :value="value"
        @update:value="updateProperty"
      />
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { FormRules } from 'naive-ui';

import { PropertyValue } from '~/game/data/ObjectsJson';

const rules: FormRules = {
  value: {
    required: true,
    message: 'Please input your value',
    trigger: 'blur',
  },
};

defineProps<{
  name: string;
  value: PropertyValue;
}>();

const emits = defineEmits<{
  (event: 'update:value', value: PropertyValue): void;
}>();

const updateProperty = (value: PropertyValue) => {
  emits('update:value', value);
};
</script>
