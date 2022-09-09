<template>
  <n-form
    :model="modelValue"
    :rules="rules"
    label-placement="left"
  >
    <n-form-item
      :label="modelValue.field"
      path="value"
    >
      <object-property
        v-model="property"
        @update:model-value="updateProperty"
      />
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { FormRules } from 'naive-ui';
import { onUpdated, ref } from 'vue';

import { Property } from '~/game/data/ObjectsJson';

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
const emits = defineEmits<{
  (event: 'update:modelValue', modelValue: Property): void;
}>();

const property = ref(props.modelValue);

onUpdated(() => {
  property.value = props.modelValue;
});

const updateProperty = (property: Property) => {
  emits('update:modelValue', property);
};
</script>
