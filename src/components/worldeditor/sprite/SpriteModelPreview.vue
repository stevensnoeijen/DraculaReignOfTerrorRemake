<template>
  <animator-preview :unit="unit" />
</template>

<script lang="ts" setup>
import { UnitType } from '~/game/types';

defineProps<{
  unit: UnitType;
}>();
</script>
