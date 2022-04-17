<script setup lang="ts">
import { onMounted } from 'vue';
import { World } from 'ecsy';
import * as PIXI from 'pixi.js'

import { Constants } from './Constants';
import { TransformComponent } from './components/TransformComponent';
import { ShapeComponent } from './components/ShapeComponent';
import { SizeComponent } from './components/SizeComponent';
import { SelectableComponent } from './components/SelectableComponent';
import { SelectorComponent } from './components/SelectorComponent';
import { MovableComponent } from './components/MovableComponent';
import { TextComponent } from './components/TextComponent';
import { FpsComponent } from './components/FpsComponent';
import { LayerComponent } from './components/LayerComponent';
import { TweenComponent } from './components/TweenComponent';
import { VisibilityComponent } from './components/VisibilityComponent';
import { HealthComponent } from './components/HealthComponent';
import { AliveComponent } from './components/AliveComponent';
import { DebugComponent } from './components/DebugComponent';
import { GridComponent } from './components/GridComponent';
import { GridViewComponent } from './components/GridViewComponent';
import { MoveTransformVelocityComponent } from './components/MoveTransformVelocityComponent';
import { MovePositionDirectComponent } from './components/MovePositionDirectComponent';
import { PlayerMovementMouseComponent } from './components/PlayerMovementMouseComponent';
import { PlayerMovementKeysComponent } from './components/PlayerMovementKeysComponent';
import { MoveVelocityComponent } from './components/MoveVelocityComponent';
import { PathfindingComponent } from './components/PathfindingComponent';
import { PlayerSelectionSystem } from './systems/PlayerSelectionSystem';
import { FpsSystem } from './systems/FpsSystem';
import { TweenSystem } from './systems/TweenSystem';
import { HealthSystem } from './systems/HealthSystem';
import { AliveSystem } from './systems/AliveSystem';
import { MoveTransformVelocitySystem } from './systems/MoveTransformVelocitySystem';
import { InputSystem } from './systems/InputSystem';
import { PlayerMovementKeysSystem } from './systems/PlayerMovementKeysSystem';
import { MovePositionDirectSystem } from './systems/MovePositionDirectSystem';
import { PlayerMovementMouseSystem } from './systems/PlayerMovementMouseSystem';
import { MoveVelocitySystem } from './systems/MoveVelocitySystem';
import { EntityFactory } from './EntityFactory';
import { Pathfinding } from './ai/Pathfinding';
import { GridView } from './GridView';
import { PathNode } from './ai/PathNode';
import { SpriteComponent } from './components/SpriteComponent';
import { SpriteSystem } from './systems/SpriteSystem';
import { GraphicsComponent } from './components/GraphicsComponent';
import { GraphicsSystem } from './systems/GraphicsSystem';

const app = new PIXI.Application();
app.renderer.backgroundColor = 0xFFFFFF;

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
    .registerComponent(ShapeComponent)
    .registerComponent(SizeComponent)
    .registerComponent(SelectableComponent)
    .registerComponent(SelectorComponent)
    .registerComponent(MovableComponent)
    .registerComponent(TextComponent)
    .registerComponent(FpsComponent)
    .registerComponent(LayerComponent)
    .registerComponent(TweenComponent)
    .registerComponent(VisibilityComponent)
    .registerComponent(HealthComponent)
    .registerComponent(AliveComponent)
    .registerComponent(DebugComponent)
    .registerComponent(GridComponent)
    .registerComponent(GridViewComponent)
    .registerComponent(MoveTransformVelocityComponent)
    .registerComponent(MovePositionDirectComponent)
    .registerComponent(PlayerMovementMouseComponent)
    .registerComponent(PlayerMovementKeysComponent)
    .registerComponent(MoveVelocityComponent)
    .registerComponent(PathfindingComponent)
	.registerComponent(SpriteComponent)
	.registerComponent(GraphicsComponent)
    .registerSystem(PlayerSelectionSystem, { app })
    .registerSystem(FpsSystem)
    .registerSystem(TweenSystem)
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

	world.createEntity()
		.addComponent(LayerComponent, {
			layer: Constants.LAYER_TILES + 1,
		})
		.addComponent(DebugComponent);

    const pathfinding = new Pathfinding(Math.ceil(Constants.GAME_WIDTH / Constants.CELL_SIZE), Math.ceil(Constants.GAME_HEIGHT / Constants.CELL_SIZE));

		world.createEntity()
			.addComponent(PathfindingComponent, {
				pathfinding: pathfinding,
			})
			// @ts-ignore
			.addComponent(GridComponent, { grid: pathfinding.grid })
			// @ts-ignore
			.addComponent(GridViewComponent, { view: new GridView<PathNode>(pathfinding.grid) });
});

const startLevel = (resources: PIXI.utils.Dict<PIXI.LoaderResource>): void => {
		Array.from(Array(100)).forEach(() => {
			let x = Math.round(
				Math.random() * Constants.GAME_WIDTH
			);
			x -= (x % Constants.CELL_SIZE);
			let y = Math.round(
				Math.random() * Constants.GAME_HEIGHT
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
  <div
    id="App"
    style="background-color: #d4d4d4;"
  />
</template>

<style>

</style>
