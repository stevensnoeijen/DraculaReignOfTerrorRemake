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
import { BehaviorTreeLevel } from './levels/BehaviorTreeLevel';
import { MapSystem } from './systems/render/MapSystem';
import { MovePathComponent } from './systems/movement/MovePathComponent';
import { MovePathSystem } from './systems/movement/MovePathSystem';
import { CollidableComponent } from './systems/movement/CollidableComponent';
import { EventBus } from './EventBus';
import { LevelLoadedEvent, Events } from './Events';
import { GameTimeSystem } from './systems/GameTimeSystem';
import { TeamComponent } from './systems/TeamComponent';
import { AttackComponent } from './systems/AttackComponent';
import { FollowComponent } from './systems/movement/FollowComponent';
import { FollowSystem } from './systems/movement/FollowSystem';
import { BehaviorTreeComponent } from './systems/ai/BehaviorTreeComponent';
import { BehaviorTreeSystem } from './systems/ai/BehaviorTreeSystem';
import { TargetComponent } from './systems/ai/TargetComponent';
import { TargetSystem } from './systems/ai/TargetSystem';

const app = new PIXI.Application({
	resizeTo: window,
});
app.renderer.backgroundColor = 0x008800;

const world = new World();
const eventBus = new EventBus<Events>();

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
		.registerComponent(CollidableComponent)
		.registerComponent(TeamComponent)
		.registerComponent(AttackComponent)
		.registerComponent(FollowComponent)
		.registerComponent(BehaviorTreeComponent)
		.registerComponent(TargetComponent)
		.registerSystem(PlayerSelectionSystem, { app, eventBus })
		.registerSystem(HealthSystem, { eventBus })
		.registerSystem(AliveSystem, { eventBus })
		.registerSystem(InputSystem, { canvas: app.view })
		// .registerSystem(PlayerMovementKeysSystem, { eventBus }) // disabled for now, not working with (map) collision atm
		.registerSystem(MovePositionDirectSystem)
		.registerSystem(PlayerMovementMouseSystem, { app, eventBus })
		.registerSystem(MoveVelocitySystem, { eventBus })
		.registerSystem(SpriteSystem, { app, eventBus })
		.registerSystem(GraphicsSystem, { app, eventBus })
		.registerSystem(GridSystem, { app, options, eventBus })
		.registerSystem(MapSystem, { app, eventBus })
		.registerSystem(MovePathSystem, { eventBus })
		.registerSystem(GameTimeSystem)
		.registerSystem(FollowSystem, { app, eventBus })
		.registerSystem(BehaviorTreeSystem)
		.registerSystem(TargetSystem);
});

let level;
const loadLevel = (): void => {
	if(options.level != null && options.level[0] != null) {
		const levelName = options.level[0].toLowerCase();
		if (levelName === 'randomunits') {
			level = new RandomUnitsLevel(app, world);
		} else if (levelName === 'pathfinding') {
			level = new PathFindingLevel(app, world);
		} else if (levelName === 'behaviortree') {
			level = new BehaviorTreeLevel(app, world);
		} else {
			alert('level not found');
			return;
		}
	} else {
		// default
		level = new RandomUnitsLevel(app, world);
	}

	level.load();
	eventBus.emit<LevelLoadedEvent>('level:loaded', { level });
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
