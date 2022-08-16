<template>
  <animator-preview :unit="unit" />
</template>

<script lang="ts" setup>
import { Unit } from '~/game/animation/utils';

defineProps<{
  unit: Unit;
}>();
</script>
