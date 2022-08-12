<template>
  <n-popconfirm @positive-click="emits('click')">
    <template #trigger>
      <n-icon :title="title">
        <delete />
      </n-icon>
    </template>
    Are you sure you want to delete this?
  </n-popconfirm>
</template>

<script lang="ts" setup>
import { Delete } from '@vicons/carbon';

defineProps<{
  title: string;
}>();

const emits = defineEmits<{
  (event: 'click'): void;
}>();
</script>
