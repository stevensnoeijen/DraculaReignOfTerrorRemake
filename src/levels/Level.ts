import { World } from 'ecsy';
import * as PIXI from 'pixi.js';

export interface Level {
    load(app: PIXI.Application, world: World): void;
}