import { Component, Types } from 'ecsy';
import * as PIXI from 'pixi.js';

export interface GraphicsComponentProps {
    sprite: PIXI.Graphics;
}

export class GraphicsComponent extends Component<GraphicsComponentProps> {
    static schema = {
        graphics: { type: Types.Ref },
        addedToStage: { type: Types.Boolean },
    };   

    declare graphics: PIXI.Graphics;
    addedToStage: boolean = false;
}
