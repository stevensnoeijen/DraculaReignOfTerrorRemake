<template>
  <n-form ref="form" inline :label-width="80" :model="entity" :rules="rules">
    <n-form-item label="Name" path="name">
      <n-input v-model:value="entity.name" placeholder="unit/swordsmen" />
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { FormInst, FormRules, NForm } from 'naive-ui';
import { ref } from 'vue';
import { $ref } from 'vue/macros';

import { Entity, EntityCreateInstance } from './types';

const form = ref<FormInst>();

const rules: FormRules = {
  name: {
    required: true,
    message: 'Please input your name',
    trigger: 'blur',
    min: 1,
  },
};

const entity = $ref<Entity>({
  name: '',
  properties: [],
});

defineExpose<EntityCreateInstance>({
  // @ts-ignore
  form,
  entity,
});
</script>
