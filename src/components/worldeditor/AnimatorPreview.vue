<template>
  <div>
    <div>
      <pixi-application ref="applicationInstance" :width="500" :height="500">
        <pixi-assets
          :load-assets="[
            {
              keysIn: 'units',
              assetsIn: 'assets/unit-spritesheet.json',
            },
          ]"
          @asset-loaded="loadedAssets"
        />
        <pixi-viewport
          v-if="app != null"
          ref="viewportInstance"
          :screen-width="app.view.width"
          :screen-height="app.view.height"
          :interaction="app.renderer.plugins.interaction"
          :wheel="{
            options: {
              center: new PIXI.Point(app.view.width / 2, app.view.height / 2),
            },
          }"
        />
      </pixi-application>
    </div>
    <div class="mt-5">
      <n-form label-placement="left" label-width="auto">
        <n-form-item label="Color">
          <n-select
            v-model:value="color"
            :options="stringsToSelectOptions(TEAM_COLORS)"
          />
        </n-form-item>

        <n-form-item label="Animation">
          <n-select
            v-model:value="state"
            :options="stringsToSelectOptions(UNIT_STATES)"
          />
        </n-form-item>

        <n-form-item label="Direction">
          <n-select
            v-model:value="direction"
            :options="stringsToSelectOptions(MOVE_DIRECTIONS)"
          />
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue';
import * as PIXI from 'pixi.js';
import { $computed, $ref } from 'vue/macros';

import { AnimationService } from '../../game/animation/AnimationService';
import { Animator } from '../../game/animation/Animator';
import { PixiViewportInstance } from '../pixi/viewport/types';
import { PixiApplicationInstance } from '../pixi/app/types';
import { AssetLoaded } from '../pixi/assets';
import { stringsToSelectOptions } from '../utils';
import { getAnimationModels } from '../../game/animation/api';

import {
  MOVE_DIRECTIONS,
  TEAM_COLORS,
  UnitType,
  UNIT_STATES,
} from '~/game/types';

const applicationInstance = $ref<PixiApplicationInstance>();
const viewportInstance = $ref<PixiViewportInstance>();

const app = $computed(() => applicationInstance?.application);
const props = defineProps<{
  unit: UnitType;
}>();

const color = $ref(TEAM_COLORS[0]);
watch(
  () => color,
  () => handleChangeModel()
);

watch(
  () => props.unit,
  () => handleChangeModel()
);

const state = $ref(UNIT_STATES[0]);
watch(
  () => state,
  () => handleChangeAnimation()
);

const direction = $ref(MOVE_DIRECTIONS[0]);
watch(
  () => direction,
  () => handleChangeAnimation()
);

let animationService: AnimationService;
let animator: Animator;
let sprite: PIXI.AnimatedSprite;

const loadedAssets: AssetLoaded<PIXI.Spritesheet> = async (assetId, asset) => {
  const animationModels = await getAnimationModels();
  animationService = new AnimationService(asset, animationModels);
  loadSprite();
};

const loadSprite = () => {
  sprite = new PIXI.AnimatedSprite([PIXI.Texture.EMPTY]);
  sprite.anchor.set(0.5);
  sprite.position.set(
    applicationInstance.application.view.width / 2,
    applicationInstance.application.view.height / 2
  );

  animator = animationService.createAnimator(sprite, color, props.unit);
  animator.set(state, direction);

  viewportInstance.viewport.addChild(sprite);
};

onBeforeUnmount(() => {
  viewportInstance.viewport.removeChild(sprite);
});

const handleChangeModel = () => {
  animator = animationService.createAnimator(sprite, color, props.unit);
  handleChangeAnimation();
};

const handleChangeAnimation = () => {
  animator.set(state, direction);
};
</script>
