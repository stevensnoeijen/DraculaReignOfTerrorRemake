<template>
  <n-form :model="property" :rules="rules" label-placement="left">
    <n-form-item :label="property.field" path="value">
      <object-property
        :name="property.field"
        :value="property.value"
        @update:value="updateProperty"
      />
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { FormRules } from 'naive-ui';
import { onUpdated } from 'vue';
import { $ref } from 'vue/macros';

import { Property, PropertyValue } from '~/game/data/ObjectsJson';

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

let property = $ref(props.modelValue);

onUpdated(() => {
  property = props.modelValue;
});

const updateProperty = (value: PropertyValue) => {
  property.value = value;
};
</script>
