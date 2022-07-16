<template>
  <div>
    <h1 class="text-xl font-bold">Unit editor</h1>
    <div>
      <pixi-application ref="pixi" :width="500" :height="500" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { $ref } from "vue/macros";
import * as PIXI from 'pixi.js';

import { PixiApplicationInstance } from "../../components/pixi/types";
import * as animations from '../../game/animations';
import { onMounted } from "vue";

const pixi = $ref<PixiApplicationInstance>();

onMounted(() => {
  pixi.application.loader.add('unit', '/assets/unit.json')
    .load(() => {
      const unitAnimations = animations.load(pixi.application.loader.resources.unit.spritesheet!);
      const unitAnimation = unitAnimations['red'].swordsmen;
      const sprite = new PIXI.AnimatedSprite(unitAnimation.move.north);
      sprite.anchor.set(0.5);
      sprite.position.set(pixi.application.view.width / 2, pixi.application.view.height / 2);
      sprite.animationSpeed = .25;
		  sprite.play();
      pixi.application.stage.addChild(sprite);
    });
});
</script>
