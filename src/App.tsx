import React, { Component, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Constants } from './Constants';
import { World } from 'ecsy';
import { PositionComponent } from './components/PositionComponent';
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

type AppProps = {};

export default class App extends Component<AppProps> {
	private canvas: HTMLCanvasElement;
	private world: World;
	private lastFrameTime = 0;

	constructor(props: AppProps) {
		super(props);

		this.world = new World();

		this.handleCanvas = this.handleCanvas.bind(this);
		this.frame = this.frame.bind(this);
	}

	private handleCanvas(canvas: HTMLCanvasElement): void {
		this.canvas = canvas;

		this.world
			.registerComponent(PositionComponent)
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
			.registerSystem(RenderSystem, { canvas: canvas })
			.registerSystem(PlayerControlSystem, { canvas: canvas })
			.registerSystem(FpsSystem)
			.registerSystem(TweenSystem);

		// add selector
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

		this.startLevel();

		// Run!
		this.lastFrameTime = performance.now();
		this.frame();
	}

	private startLevel(): void {
		Array.from(Array(100)).forEach(() => {
			const x = Math.round(
				Math.random() * Constants.GAME_WIDTH - Constants.UNIT_SIZE
			);
			const y = Math.round(
				Math.random() * Constants.GAME_HEIGHT - Constants.UNIT_SIZE
			);

			EntityFactory.createUnit(this.world, {
				position: { x: x, y: y },
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
