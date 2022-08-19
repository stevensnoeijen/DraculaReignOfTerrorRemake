<template>
  <n-form ref="form" inline :label-width="80" :model="object" :rules="rules">
    <n-form-item label="Name" path="name">
      <n-input v-model:value="object.name" placeholder="unit/swordsmen" />
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { FormInst, FormRules, NForm } from 'naive-ui';
import { ref } from 'vue';
import { $ref } from 'vue/macros';

import { GameObject } from '../ObjectsJson';

import { ObjectCreateInstance } from './types';
import { createEmptyObject } from './utils';

const form = ref<FormInst>();

const rules: FormRules = {
  name: {
    required: true,
    message: 'Please input your name',
    trigger: 'blur',
    min: 1,
  },
};

const object = $ref<GameObject>(createEmptyObject());

defineExpose<ObjectCreateInstance>({
  form: form as unknown as FormInst,
  object,
});
</script>
