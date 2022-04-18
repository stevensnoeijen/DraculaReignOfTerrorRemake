<script setup lang="ts">
import { onMounted } from 'vue';
import { World } from 'ecsy';
import * as PIXI from 'pixi.js'

import { Constants } from './Constants';
import { TransformComponent } from './systems/TransformComponent';
import { SizeComponent } from './systems/SizeComponent';
import { SelectableComponent } from './systems/selection/SelectableComponent';
import { MovableComponent } from './systems/movement/MovableComponent';
import { HealthComponent } from './systems/health/HealthComponent';
import { GridComponent } from './systems/GridComponent';
import { MoveTransformVelocityComponent } from './systems/movement/MoveTransformVelocityComponent';
import { MovePositionDirectComponent } from './systems/movement/MovePositionDirectComponent';
import { PlayerMovementMouseComponent } from './systems/player/PlayerMovementMouseComponent';
import { PlayerMovementKeysComponent } from './systems/player/PlayerMovementKeysComponent';
import { MoveVelocityComponent } from './systems/movement/MoveVelocityComponent';
import { PathfindingComponent } from './systems/PathfindingComponent';
import { PlayerSelectionSystem } from './systems/selection/PlayerSelectionSystem';
import { HealthSystem } from './systems/health/HealthSystem';
import { AliveSystem } from './systems/alive/AliveSystem';
import { MoveTransformVelocitySystem } from './systems/movement/MoveTransformVelocitySystem';
import { InputSystem } from './systems/InputSystem';
import { PlayerMovementKeysSystem } from './systems/player/PlayerMovementKeysSystem';
import { MovePositionDirectSystem } from './systems/movement/MovePositionDirectSystem';
import { PlayerMovementMouseSystem } from './systems/player/PlayerMovementMouseSystem';
import { MoveVelocitySystem } from './systems/movement/MoveVelocitySystem';
import { EntityFactory } from './EntityFactory';
import { Pathfinding } from './ai/Pathfinding';
import { SpriteComponent } from './systems/render/sprite/SpriteComponent';
import { SpriteSystem } from './systems/render/sprite/SpriteSystem';
import { GraphicsComponent } from './systems/render/graphics/GraphicsComponent';
import { GraphicsSystem } from './systems/render/graphics/GraphicsSystem';
import { AliveComponent } from './systems/alive/AliveComponent';

const app = new PIXI.Application({
	resizeTo: window,
});

app.renderer.backgroundColor = 0x008800;

const world = new World();
let lastFrameTime = 0;

onMounted(() => {
	document.getElementById('App')!.appendChild(app.view);

	app.view.addEventListener('contextmenu', (event) => {
		event.preventDefault();
	});

	lastFrameTime = performance.now();
	app.ticker.add(() => {
		frame();
	});

	app.loader.add('swordsmen', 'assets/swordsmen.blue.move.west_06.png').load((loader, resources) => {
		startLevel(resources);
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
		.registerComponent(PathfindingComponent)
		.registerComponent(SpriteComponent)
		.registerComponent(GraphicsComponent)
		.registerComponent(GridComponent)
		.registerSystem(PlayerSelectionSystem, { app })
		.registerSystem(HealthSystem)
		.registerSystem(AliveSystem)
		.registerSystem(MoveTransformVelocitySystem)
		.registerSystem(InputSystem, { canvas: app.view })
		.registerSystem(PlayerMovementKeysSystem)
		.registerSystem(MovePositionDirectSystem)
		.registerSystem(PlayerMovementMouseSystem)
		.registerSystem(MoveVelocitySystem)
		.registerSystem(SpriteSystem, { app })
		.registerSystem(GraphicsSystem, { app });

    const pathfinding = new Pathfinding(Math.ceil(app.renderer.width / Constants.CELL_SIZE), Math.ceil(app.renderer.height / Constants.CELL_SIZE));

	world.createEntity()
		.addComponent(PathfindingComponent, {
			pathfinding: pathfinding,
		})
		// @ts-ignore
		.addComponent(GridComponent, { grid: pathfinding.grid });
});

const startLevel = (resources: PIXI.utils.Dict<PIXI.LoaderResource>): void => {
		Array.from(Array(100)).forEach(() => {
			let x = Math.round(
				Math.random() * window.innerWidth,
			);
			x -= (x % Constants.CELL_SIZE);
			let y = Math.round(
				Math.random() * window.innerHeight,
			) + (Constants.CELL_SIZE / 2);
			y -= (y % Constants.CELL_SIZE);

			EntityFactory.createUnit(world, {
				position: {
					x: x,
					y: y
				},
				color: 'red',
				texture: resources.swordsmen.texture!,
			});
		});
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
