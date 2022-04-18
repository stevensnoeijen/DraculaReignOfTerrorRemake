import { Attributes } from 'ecsy';
import * as PIXI from 'pixi.js';
import { System, World } from 'ecsy';

export abstract class PixiJsSystem extends System {
	protected readonly app: PIXI.Application; 

	constructor(world: World, attributes: Attributes) {
        super(world, attributes);
        this.app = attributes.app;
	}
}