<template>
  <div>
    <h1 class="text-xl font-bold">Unit editor</h1>
    <div>
      <label for="color">Color: </label>
      <select id="color" v-model="color">
        <option v-for="color of animations.colors" :value="color">{{color}}</option>
      </select>


      <label for="unit">Unit: </label>
      <select id="unit" v-model="unit">
        <option v-for="unit of animations.units" :value="unit">{{unit}}</option>
      </select>

      <label for="animation">Animation: </label>
      <select id="animation" v-model="state">
        <option v-for="state of animations.states" :value="state">{{state}}</option>
      </select>

      <label for="direction">Direction: </label>
      <select id="direction" v-model="direction">
        <option v-for="direction of animations.directions" :value="direction">{{direction}}</option>
      </select>

      <pixi-application ref="pixi" :width="500" :height="500"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import * as PIXI from 'pixi.js';
import { onMounted } from "vue";
import { $ref } from "vue/macros";

import { PixiApplicationInstance } from "../../components/pixi/types";
import * as animations from '../../game/animations';

const pixi = ref<PixiApplicationInstance>();

const color = $ref<animations.Color>(animations.colors[0]);
watch(() => color, () => handleChangeAnimation());

const unit = $ref<animations.Unit>(animations.units[0]);
watch(() => unit, () => handleChangeAnimation());

const state = $ref<animations.State>(animations.states[0]);
watch(() => state, () => handleChangeAnimation());

const direction = $ref<animations.Direction>(animations.directions[0]);
watch(() => direction, () => handleChangeAnimation());

let unitAnimations: animations.UnitAnimations;
const getAnimation = (color: animations.Color, unit: animations.Unit, state: animations.State, direction: animations.Direction): animations.Animation => {
  return unitAnimations[color][unit][state][direction];
}

let sprite: PIXI.AnimatedSprite; 

onMounted(() => {
  const app = pixi.value!.application;

  app.loader.add('unit', '/assets/unit.json')
    .load(() => {
      unitAnimations = animations.load(app.loader.resources.unit.spritesheet!);

      sprite = new PIXI.AnimatedSprite(getAnimation(color, unit, state, direction));
      sprite.anchor.set(0.5);
      sprite.position.set(app.view.width / 2, app.view.height / 2);
      sprite.animationSpeed = .25;
		  sprite.play();
      app.stage.addChild(sprite);
    });
});

const handleChangeAnimation = () => {
  sprite.textures = getAnimation(color, unit, state, direction);
  sprite.play();
};
</script>
