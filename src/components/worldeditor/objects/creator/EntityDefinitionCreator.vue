<template>
  <n-form
    ref="form"
    inline
    :label-width="80"
    :model="entityDefinition"
    :rules="rules"
  >
    <n-form-item label="Name" path="name">
      <n-input
        v-model:value="entityDefinition.name"
        placeholder="unit/swordsmen"
      />
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { FormInst, FormRules, NForm } from 'naive-ui';
import { ref } from 'vue';
import { $ref } from 'vue/macros';

import { EntityDefinitionCreatorInstance } from './types';
import { createEmptyEntityDefinition } from './utils';

import { EntityDefinition } from '~/game/data/EntityDefinition';

const form = ref<FormInst>();

const rules: FormRules = {
  name: {
    required: true,
    message: 'Please input your name',
    trigger: 'blur',
    min: 1,
  },
};

const entityDefinition = $ref<EntityDefinition>(createEmptyEntityDefinition());
defineExpose<EntityDefinitionCreatorInstance>({
  form: form as unknown as FormInst,
  entityDefinition,
});
</script>
