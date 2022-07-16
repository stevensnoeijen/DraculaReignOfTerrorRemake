<template>
  <div>
    <h1 class="text-xl font-bold">Unit editor</h1>
    <div>
      <label for="animation">Animation: </label>
      <select id="animation" v-model="animation">
        <option v-for="animation of animations.states" :value="animation">{{animation}}</option>
      </select>

      <pixi-application ref="pixi" :width="500" :height="500"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import * as PIXI from 'pixi.js';
import { onMounted } from "vue";
import { $ref } from "vue/macros";

import { PixiApplicationInstance } from "../../components/pixi/types";
import * as animations from '../../game/animations';

const pixi = ref<PixiApplicationInstance>();
const animation = $ref<animations.State>(animations.states[0]);

watch(() => animation, () => handleChangeAnimation())

let sprite: PIXI.AnimatedSprite; 

onMounted(() => {
  const app = pixi.value!.application;

  app.loader.add('unit', '/assets/unit.json')
    .load(() => {
      const unitAnimations = animations.load(app.loader.resources.unit.spritesheet!);
      const unitAnimation = unitAnimations['red'].swordsmen;
      sprite = new PIXI.AnimatedSprite(unitAnimation[animation as animations.State].north);
      sprite.anchor.set(0.5);
      sprite.position.set(app.view.width / 2, app.view.height / 2);
      sprite.animationSpeed = .25;
		  sprite.play();
      app.stage.addChild(sprite);
    });
});

const handleChangeAnimation = () => {
  const unitAnimations = animations.load(pixi.value!.application.loader.resources.unit.spritesheet!);
  const unitAnimation = unitAnimations['red'].swordsmen;

  sprite.textures = unitAnimation[animation as animations.State].north;
  sprite.play();
};
</script>
