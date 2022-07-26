<!-- eslint-disable vue/valid-template-root -->
<template></template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue';
import * as PIXI from 'pixi.js';
import { Dict } from '@pixi/utils';

const emits = defineEmits<{
  (
    event: 'load',
    loader: PIXI.Loader,
    resources: Dict<PIXI.LoaderResource>
  ): void;
}>();

const instance = getCurrentInstance();

// TODO: implement component and add test
</script>
