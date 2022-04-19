import { World, Attributes } from 'ecsy';
import * as PIXI from 'pixi.js';
import { DashLine }  from 'pixi-dashed-line';

import { Constants } from './../../Constants';
import { PixiJsSystem } from "../PixiJsSystem"
import { Options } from '../../types';

export class GridSystem extends PixiJsSystem {

    private graphics: PIXI.Graphics;
    private options: Options;

    constructor(world: World, attributes: Attributes) {
        super(world, attributes);
        this.options = attributes.options;

        window.onresize = () => this.draw();

        this.graphics = this.app.stage.addChildAt(new PIXI.Graphics(), 0);
        this.draw();
    }

    public execute(delta: number, time: number): void {}

    private draw(): void {
        this.graphics.clear();

        if (!this.options.debug?.includes('grid')) {
            return;
        }

        const dash = new DashLine(this.graphics, {
            dash: [5, 5],
            width: 1,
            color: 0xAAAAAA,
        })

        for(let height = Constants.CELL_SIZE; height < this.app.screen.height; height += Constants.CELL_SIZE) {
            // horizontal lines
            dash.moveTo(0, height)
                .lineTo(this.app.screen.width, height);
        }

        for(let width = Constants.CELL_SIZE; width < this.app.screen.width; width += Constants.CELL_SIZE) {
            // vertical lines
            dash.moveTo(width, 0)
                .lineTo(width, this.app.screen.height);
        }
    };

}