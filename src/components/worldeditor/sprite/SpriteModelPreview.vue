<template>
  <animator-preview :unit="unit" />
</template>

<script lang="ts" setup>
import { Unit } from '~/game/animation/utils';

const props = defineProps<{
  unit: Unit;
}>();

// const spriteModels = await getSpriteModels();
// const units = _.uniq(spriteModels.models.map((model) => model.unit));
</script>
