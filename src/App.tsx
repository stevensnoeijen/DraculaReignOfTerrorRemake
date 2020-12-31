import React, { Component, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Constants } from './Constants';
import { World } from 'ecsy';
import { Position } from './components/Position';
import { Renderable } from './components/Renderable';
import { Selectable } from './components/Selectable';
import { RendererSystem } from './systems/RendererSystem';
import { Rect } from './components/Rect';
import { Size } from './components/Size';
import { EntityFactory } from './EntityFactory';
import { PlayerControlSystem } from './systems/PlayerControlSystem';
import { Selector } from './components/Selector';
import { Movable } from './components/Movable';
import { Text } from './components/Text';
import { Fps } from './components/Fps';
import { FpsSystem } from './systems/FpsSystem';
import { Layered } from './components/Layered';
import { Tweenable } from './components/Tweenable';
import { TweenSystem } from './systems/TweenSystem';
import { GridPosition } from './components/GridPosition';

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
			.registerComponent(Position)
			.registerComponent(Rect)
			.registerComponent(Renderable)
			.registerComponent(Size)
			.registerComponent(Selectable)
			.registerComponent(Selector)
			.registerComponent(Movable)
			.registerComponent(Text)
			.registerComponent(Fps)
			.registerComponent(Layered)
			.registerComponent(Tweenable)
			.registerComponent(GridPosition)
			.registerSystem(RendererSystem, { canvas: canvas, })
			.registerSystem(PlayerControlSystem, { canvas: canvas, })
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
		EntityFactory.createUnit(this.world, {
			position: { x: 100, y: 100 }
		});
	}

	private generateRandomLevel(): number[][] {
		const grid: number[][] = [];

		// add starting blocks
		const rowsToFill = 5;
		Array.from(Array(Constants.BLOCK_MAX_ROWS)).forEach((value, row) => {
			grid.push([]);
			if (row >= Constants.BLOCK_MAX_ROWS - rowsToFill) {
				Array.from(Array(Constants.BLOCK_MAX_COLUMNS)).forEach(() => {
					grid[row].push(Constants.getRandomBlockType());
				});
			} else {
				Array.from(Array(Constants.BLOCK_MAX_COLUMNS)).forEach(() => {
					grid[row].push(0);
				});
			}
		});

		return grid;
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
