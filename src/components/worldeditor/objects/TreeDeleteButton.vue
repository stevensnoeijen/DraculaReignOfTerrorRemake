<template>
  <n-popconfirm @positive-click="emits('click')">
    <template #trigger>
      <n-icon :title="title" :class="iconClass">
        <i-carbon-delete />
      </n-icon>
    </template>
    Are you sure you want to delete this?
  </n-popconfirm>
</template>

<script lang="ts" setup>
defineProps<{
  iconTitle: string;
  iconClass?: string;
}>();

const emits = defineEmits<{
  (event: 'click'): void;
}>();
</script>
