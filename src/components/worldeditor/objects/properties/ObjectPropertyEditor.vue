<template>
  <n-form :model="modelValue" :rules="rules" label-placement="left">
    <n-form-item :label="modelValue.field" path="value">
      <n-input
        v-if="type === String"
        v-model:value="(property.value as string)"
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
import { FormRules } from 'naive-ui';
import { computed } from 'vue';

import { getEditableProperty } from '../../../../game/objects/decorator';
import { Unit } from '../../../../game/objects/Unit';
import { Property } from '../ObjectsJson';

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
const type = computed(
  () => getEditableProperty(Unit, props.modelValue.field)?.type
);

defineEmits<{
  (event: 'update:modelValue', modelValue: Property): void;
}>();
</script>
