<script setup lang="ts">
import { onMounted } from 'vue';
import { World } from 'ecsy';

import { Constants } from './Constants';
import { TransformComponent } from './components/TransformComponent';
import { ShapeComponent } from './components/ShapeComponent';
import { RenderComponent } from './components/RenderComponent';
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
import { RenderSystem } from './systems/RenderSystem';
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

const world = new World();
let lastFrameTime = 0;

onMounted(() => {
	const canvas = document.getElementById('game')!;

  canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });

  world
    .registerComponent(TransformComponent)
    .registerComponent(ShapeComponent)
    .registerComponent(RenderComponent)
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
    .registerSystem(RenderSystem, { canvas: canvas })
    .registerSystem(PlayerSelectionSystem)
    .registerSystem(FpsSystem)
    .registerSystem(TweenSystem)
    .registerSystem(HealthSystem)
    // .registerSystem(AliveSystem)
    .registerSystem(MoveTransformVelocitySystem)
    .registerSystem(InputSystem, { canvas: canvas })
    .registerSystem(PlayerMovementKeysSystem)
    .registerSystem(MovePositionDirectSystem)
    .registerSystem(PlayerMovementMouseSystem)
    .registerSystem(MoveVelocitySystem);

    EntityFactory.createSelector(world, {
			position: {
				x: 100,
				y: 100,
			},
		});
		EntityFactory.createFpsCouter(world, {
			position: {
				x: Constants.GAME_WIDTH - 25,
				y: 20,
			},
		});

		world.createEntity()
			.addComponent(RenderComponent)
			.addComponent(LayerComponent, {
				layer: Constants.LAYER_TILES + 1,
			})
			.addComponent(DebugComponent);

    const pathfinding = new Pathfinding(Math.ceil(Constants.GAME_WIDTH / Constants.CELL_SIZE), Math.ceil(Constants.GAME_HEIGHT / Constants.CELL_SIZE));

		world.createEntity()
			.addComponent(RenderComponent)
			.addComponent(PathfindingComponent, {
				pathfinding: pathfinding,
			})
			.addComponent(GridComponent, { grid: pathfinding.grid })
			.addComponent(GridViewComponent, { view: new GridView<PathNode>(pathfinding.grid) });

		startLevel();

		// Run!
		lastFrameTime = performance.now();
		frame();
});

const startLevel = (): void => {
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
		requestAnimationFrame(frame);
	}

</script>

<template>
  <canvas
    id="game"
    :width="Constants.GAME_WIDTH"
    :height="Constants.GAME_HEIGHT"
    style="background-color: #d4d4d4;"
  />
</template>

<style>

</style>
