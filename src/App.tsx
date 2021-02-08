import React, { Component, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Constants } from './Constants';
import { World } from 'ecsy';
import { TransformComponent } from './components/TransformComponent';
import { RenderComponent as RenderComponent } from './components/RenderComponent';
import { SelectableComponent } from './components/SelectableComponent';
import { RenderSystem } from './systems/RenderSystem';
import { SizeComponent } from './components/SizeComponent';
import { EntityFactory } from './EntityFactory';
import { PlayerControlSystem } from './systems/PlayerControlSystem';
import { SelectorComponent } from './components/SelectorComponent';
import { ShapeComponent } from './components/ShapeComponent';
import { TextComponent } from './components/TextComponent';
import { FpsComponent } from './components/FpsComponent';
import { FpsSystem } from './systems/FpsSystem';
import { TweenComponent } from './components/TweenComponent';
import { TweenSystem } from './systems/TweenSystem';
import { MovableComponent } from './components/MovableComponent';
import { LayerComponent } from './components/LayerComponent';
import { VisibilityComponent } from './components/VisibilityComponent';
import { HealthComponent } from './components/HealthComponent';
import { AliveComponent } from './components/AliveComponent';
import { HealthSystem } from './systems/HealthSystem';
import { AliveSystem } from './systems/AliveSystem';
import { ColliderComponent } from './components/ColliderComponent';
import { Grid } from './Grid';
import { Vector2 } from './math/Vector2';
import { DebugComponent } from './components/DebugComponent';
import * as QueryString from 'query-string';
import { Debug } from './Debug';
import { GridComponent } from './components/GridComponent';
import { GridViewComponent } from './components/GridViewComponent';
import { GridView } from './GridView';

type AppProps = {};

export default class App extends Component<AppProps> {
	private canvas: HTMLCanvasElement;
	private world: World;
	private lastFrameTime = 0;
	private options: { [key: string]: string | string[] | null; }

	constructor(props: AppProps) {
		super(props);

		this.options = QueryString.parse(location.hash);
		if (typeof this.options?.debug === 'string') {
			Debug.options = this.options.debug.split(',');
		}

		this.world = new World();

		this.handleCanvas = this.handleCanvas.bind(this);
		this.frame = this.frame.bind(this);
	}

	private handleCanvas(canvas: HTMLCanvasElement): void {
		this.canvas = canvas;

		this.world
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
			.registerComponent(ColliderComponent)
			.registerComponent(DebugComponent)
			.registerComponent(GridComponent)
			.registerComponent(GridViewComponent)
			.registerSystem(RenderSystem, { canvas: canvas })
			.registerSystem(PlayerControlSystem, { canvas: canvas })
			.registerSystem(FpsSystem)
			.registerSystem(TweenSystem)
			.registerSystem(HealthSystem)
			.registerSystem(AliveSystem);

		EntityFactory.createSelector(this.world, {
			position: {
				x: 100,
				y: 100,
			},
		});
		EntityFactory.createFpsCouter(this.world, {
			position: {
				x: Constants.GAME_WIDTH - 25,
				y: 20,
			},
		});

		this.world.createEntity()
			.addComponent(RenderComponent)
			.addComponent(DebugComponent);

		const grid = new Grid<number>({
			width: Math.ceil(Constants.GAME_WIDTH / Constants.UNIT_SIZE),
			height: Math.ceil(Constants.GAME_HEIGHT / Constants.UNIT_SIZE),
			cellSize: Constants.UNIT_SIZE,
			originPosition: Vector2.ZERO,
			initGridObject: () => 0
		});
		this.world.createEntity()
			.addComponent(RenderComponent)
			.addComponent(GridComponent, { grid: grid })
			.addComponent(GridViewComponent, { view: new GridView(grid) });

		this.startLevel();

		// Run!
		this.lastFrameTime = performance.now();
		this.frame();
	}

	private startLevel(): void {
		Array.from(Array(100)).forEach(() => {
			let x = Math.round(
				Math.random() * Constants.GAME_WIDTH
			);
			x = x - (x % Constants.UNIT_SIZE) + (Constants.UNIT_SIZE / 2);
			let y = Math.round(
				Math.random() * Constants.GAME_HEIGHT
			) + (Constants.UNIT_SIZE / 2);
			y = y - (y % Constants.UNIT_SIZE) + (Constants.UNIT_SIZE / 2);

			EntityFactory.createUnit(this.world, {
				position: {
					x: x,
					y: y
				},
				color: 'red',
			});
		});
	}

	private frame(): void {
		// Compute delta and elapsed time
		const time = performance.now();
		const delta = time - this.lastFrameTime;

		// Run all the systems
		this.world.execute(delta, time);

		this.lastFrameTime = time;
		requestAnimationFrame(this.frame);
	}

	public render(): ReactNode {
		return (
			<View style={styles.container}>
				<canvas
					width={Constants.GAME_WIDTH}
					height={Constants.GAME_HEIGHT}
					style={{ backgroundColor: '#d4d4d4' }}
					ref={this.handleCanvas}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	game: {
		width: Constants.GAME_WIDTH,
		height: Constants.GAME_HEIGHT,
		backgroundColor: '#d4d4d4',
		flex: undefined,
		overflow: 'hidden',
	},
	grid: {},
	gridRow: {
		flexDirection: 'row',
	},
	tile: {
		borderWidth: 1,
		width: 50,
		height: 50,
	},
});
