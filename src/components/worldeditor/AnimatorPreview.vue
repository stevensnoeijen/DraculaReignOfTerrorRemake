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
            :options="stringsToSelectOptions(animations.colors)"
          />
        </n-form-item>

        <n-form-item label="Animation">
          <n-select
            v-model:value="state"
            :options="stringsToSelectOptions(animations.states)"
          />
        </n-form-item>

        <n-form-item label="Direction">
          <n-select
            v-model:value="direction"
            :options="stringsToSelectOptions(animations.directions)"
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

import * as animations from '../../game/animation/utils';
import { AnimationManager } from '../../game/animation/AnimationManager';
import { Animator } from '../../game/animation/Animator';
import { PixiViewportInstance } from '../pixi/viewport/types';
import { PixiApplicationInstance } from '../pixi/app/types';
import { AssetLoaded } from '../pixi/assets';
import { stringsToSelectOptions } from '../utils';

const applicationInstance = $ref<PixiApplicationInstance>();
const viewportInstance = $ref<PixiViewportInstance>();

const app = $computed<PIXI.Application | null>(
  () => applicationInstance?.application ?? null
);
const props = defineProps<{
  unit: animations.Unit;
}>();

const color = $ref<animations.Color>(animations.colors[0]);
watch(
  () => color,
  () => handleChangeModel()
);

watch(
  () => props.unit,
  () => handleChangeModel()
);

const state = $ref<animations.State>(animations.states[0]);
watch(
  () => state,
  () => handleChangeAnimation()
);

const direction = $ref<animations.Direction>(animations.directions[0]);
watch(
  () => direction,
  () => handleChangeAnimation()
);

let animationManager: AnimationManager;
let animator: Animator;
let sprite: PIXI.AnimatedSprite;

const loadedAssets: AssetLoaded<PIXI.Spritesheet> = (assetId, asset) => {
  animationManager = new AnimationManager(asset);
  loadSprite();
};

const loadSprite = () => {
  sprite = new PIXI.AnimatedSprite(
    animationManager
      .getModel('blue', 'swordsmen')
      .getAnimation('idle', 'north').textures
  ); // TODO: refactor to not load something...
  sprite.anchor.set(0.5);
  sprite.position.set(
    applicationInstance.application.view.width / 2,
    applicationInstance.application.view.height / 2
  );

  animator = animationManager.createAnimator(sprite, color, props.unit);
  animator.set(state, direction);

  viewportInstance.viewport.addChild(sprite);
};

onBeforeUnmount(() => {
  applicationInstance.application.stage.removeChild(viewportInstance.viewport);
  viewportInstance.viewport.removeChild(sprite);
});

const handleChangeModel = () => {
  animator = animationManager.createAnimator(sprite, color, props.unit);
  handleChangeAnimation();
};

const handleChangeAnimation = () => {
  animator.set(state, direction);
};
</script>
