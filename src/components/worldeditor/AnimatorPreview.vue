<template>
  <div>
    <h1 class="text-xl font-bold">Animator preview</h1>
    <div>
      <label for="color">Color: </label>
      <select id="color" v-model="color">
        <option v-for="color of animations.colors" :key="color" :value="color">
          {{ color }}
        </option>
      </select>

      <label for="unit">Unit: </label>
      <select id="unit" v-model="unit">
        <option v-for="unit of animations.units" :key="unit" :value="unit">
          {{ unit }}
        </option>
      </select>

      <label for="animation">Animation: </label>
      <select id="animation" v-model="state">
        <option v-for="state of animations.states" :key="state" :value="state">
          {{ state }}
        </option>
      </select>

      <label for="direction">Direction: </label>
      <select id="direction" v-model="direction">
        <option
          v-for="direction of animations.directions"
          :key="direction"
          :value="direction"
        >
          {{ direction }}
        </option>
      </select>

      <pixi-application ref="applicationInstance" :width="500" :height="500">
        <template #default="{ application }">
          <pixi-viewport
            ref="viewportInstance"
            :screen-width="application.view.width"
            :screen-height="application.view.height"
            :interaction="application.renderer.plugins.interaction"
            :wheel="{
              options: {
                center: new PIXI.Point(
                  application.view.width / 2,
                  application.view.height / 2
                ),
              },
            }"
          />
        </template>
      </pixi-application>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import * as PIXI from 'pixi.js';
import { $ref } from 'vue/macros';

import { PixiApplicationInstance } from '../pixi/types';
import * as animations from '../../game/animation/utils';
import { AnimationManager } from '../../game/animation/AnimationManager';
import { Animator } from '../../game/animation/Animator';
import { PixiViewportInstance } from '../pixi/viewport/types';

const applicationInstance = ref<PixiApplicationInstance>();
const viewportInstance = $ref<PixiViewportInstance>();

const color = $ref<animations.Color>(animations.colors[0]);
watch(
  () => color,
  () => handleChangeSkin()
);

const unit = $ref<animations.Unit>(animations.units[0]);
watch(
  () => unit,
  () => handleChangeSkin()
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

onMounted(() => {
  const app = applicationInstance.value!.application;

  if (app.loader.resources['unit'] != null) {
    loadSprite();
  } else {
    app.loader.add('unit', 'assets/unit.json').load(() => {
      animationManager = new AnimationManager(
        app.loader.resources.unit.spritesheet!
      );
      loadSprite();
    });
  }
});

const loadSprite = () => {
  sprite = new PIXI.AnimatedSprite(
    animationManager
      .getModel('blue', 'swordsmen')
      .getAnimation('idle', 'north').textures
  ); // TODO: refactor to not load something...
  sprite.anchor.set(0.5);
  sprite.position.set(
    applicationInstance.value!.application.view.width / 2,
    applicationInstance.value!.application.view.height / 2
  );

  animator = animationManager.createAnimator(sprite, color, unit);
  animator.set(state, direction);

  viewportInstance.viewport.addChild(sprite);
};

onUnmounted(() => {
  viewportInstance.viewport.removeChild(sprite);
});

const handleChangeSkin = () => {
  animator = animationManager.createAnimator(sprite, color, unit);
  handleChangeAnimation();
};

const handleChangeAnimation = () => {
  animator.set(state, direction);
};
</script>
