<script setup lang="ts">
import { onMounted } from 'vue';
import { World } from 'ecsy';
import * as PIXI from 'pixi.js';

import { TransformComponent } from './systems/TransformComponent';
import { SizeComponent } from './systems/SizeComponent';
import { SelectableComponent } from './systems/selection/SelectableComponent';
import { MovableComponent } from './systems/movement/MovableComponent';
import { HealthComponent } from './systems/health/HealthComponent';
import { MoveTransformVelocityComponent } from './systems/movement/MoveTransformVelocityComponent';
import { MovePositionDirectComponent } from './systems/movement/MovePositionDirectComponent';
import { PlayerMovementMouseComponent } from './systems/player/PlayerMovementMouseComponent';
import { PlayerMovementKeysComponent } from './systems/player/PlayerMovementKeysComponent';
import { MoveVelocityComponent } from './systems/movement/MoveVelocityComponent';
import { PlayerSelectionSystem } from './systems/selection/PlayerSelectionSystem';
import { HealthSystem } from './systems/health/HealthSystem';
import { AliveSystem } from './systems/alive/AliveSystem';
import { MoveTransformVelocitySystem } from './systems/movement/MoveTransformVelocitySystem';
import { InputSystem } from './systems/InputSystem';
import { PlayerMovementKeysSystem } from './systems/player/PlayerMovementKeysSystem';
import { MovePositionDirectSystem } from './systems/movement/MovePositionDirectSystem';
import { PlayerMovementMouseSystem } from './systems/player/PlayerMovementMouseSystem';
import { MoveVelocitySystem } from './systems/movement/MoveVelocitySystem';
import { SpriteComponent } from './systems/render/sprite/SpriteComponent';
import { SpriteSystem } from './systems/render/sprite/SpriteSystem';
import { GraphicsComponent } from './systems/render/graphics/GraphicsComponent';
import { GraphicsSystem } from './systems/render/graphics/GraphicsSystem';
import { AliveComponent } from './systems/alive/AliveComponent';
import { GridSystem } from './systems/render/GridSystem';
import { getOptions } from './utils';
import { RandomUnitsLevel } from './levels/RandomUnitsLevel';
import { PathFindingLevel } from './levels/PathFindingLevel';
import { MapSystem } from './systems/render/MapSystem';
import { MovePathComponent } from './systems/movement/MovePathComponent';
import { MovePathSystem } from './systems/movement/MovePathSystem';

const app = new PIXI.Application({
	resizeTo: window,
});
app.renderer.backgroundColor = 0x008800;

const world = new World();

let lastFrameTime = 0;

const options = getOptions();

onMounted(() => {
	document.getElementById('App')!.appendChild(app.view);

	app.view.addEventListener('contextmenu', (event) => {
		event.preventDefault();
	});

	lastFrameTime = performance.now();
	app.ticker.add(() => {
		frame();
	});

	app.loader.add('swordsmen', 'assets/swordsmen.blue.move.west_06.png').load(() => {
		loadLevel();
	});

	world
		.registerComponent(TransformComponent)
		.registerComponent(SizeComponent)
		.registerComponent(SelectableComponent)
		.registerComponent(MovableComponent)
		.registerComponent(HealthComponent)
		.registerComponent(AliveComponent)
		.registerComponent(MoveTransformVelocityComponent)
		.registerComponent(MovePositionDirectComponent)
		.registerComponent(PlayerMovementMouseComponent)
		.registerComponent(PlayerMovementKeysComponent)
		.registerComponent(MoveVelocityComponent)
		.registerComponent(SpriteComponent)
		.registerComponent(GraphicsComponent)
		.registerComponent(MovePathComponent)
		.registerSystem(PlayerSelectionSystem, { app })
		.registerSystem(HealthSystem)
		.registerSystem(AliveSystem)
		.registerSystem(MoveTransformVelocitySystem)
		.registerSystem(InputSystem, { canvas: app.view })
		.registerSystem(PlayerMovementKeysSystem)
		.registerSystem(MovePositionDirectSystem)
		.registerSystem(PlayerMovementMouseSystem, { app })
		.registerSystem(MoveVelocitySystem)
		.registerSystem(SpriteSystem, { app })
		.registerSystem(GraphicsSystem, { app })
		.registerSystem(GridSystem, { app, options })
		.registerSystem(MapSystem, { app })
		.registerSystem(MovePathSystem);
});

let level;
const loadLevel = (): void => {
	if(options.level != null && options.level[0] != null) {
		const levelName = options.level[0].toLowerCase();
		if (levelName === 'randomunits') {
			level = new RandomUnitsLevel(app, world);
		} else if (levelName === 'pathfinding') {
			level = new PathFindingLevel(app, world);
		} else {
			alert('level not found');
			return;
		}
	} else {
		// default
		level = new RandomUnitsLevel(app, world);
	}

	level.load();
}

const frame = (): void => {
	// Compute delta and elapsed time
	const time = performance.now();
	const delta = time - lastFrameTime;

	// Run all the systems
	world.execute(delta, time);

	lastFrameTime = time;
}
</script>

<template>
  <div id="App"/>
</template>

<style>
	body {
		margin: 0;
		overflow: hidden;
	}
</style>
