import { World } from 'ecsy';
import * as PIXI from 'pixi.js';

import { DefaultAttributes } from './../DefaultAttributes';
import { LevelLoadedEvent } from './../../Events';
import { PixiJsSystem } from "../PixiJsSystem";
import { cellPositionToVector } from './../../utils';

export class MapSystem extends PixiJsSystem {

    private graphics: PIXI.Graphics;
    private map: number[][]|null = null;

    constructor(world: World, attributes: DefaultAttributes) {
        super(world, attributes);

        this.graphics = this.app.stage.addChildAt(new PIXI.Graphics(), 0);

        attributes.eventBus.on<LevelLoadedEvent>('level:loaded', (event) => {
            this.map  = event.detail.level.collisionMap;
            this.draw();
        });
    }

    public execute(delta: number, time: number): void {}

    private draw(): void {
        this.graphics.clear();

        if (this.map == null) {
            return;
        }

        this.graphics.beginFill(0x000000);

        this.map.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell == 1) {
                    const vector = cellPositionToVector(x, y);
                    this.graphics.drawRect(vector.x - 8, vector.y - 8, 16, 16);
                }
            });
        });
        this.graphics.endFill();
    }
}