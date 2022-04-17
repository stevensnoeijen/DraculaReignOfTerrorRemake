import { Component, Types } from 'ecsy';
import * as PIXI from 'pixi.js';

export interface GraphicsComponentProps {
    sprite: PIXI.Graphics;
}

export class GraphicsComponent extends Component<GraphicsComponentProps> {
    declare graphics: PIXI.Graphics;
    addedToStage: boolean = false;
}

GraphicsComponent.schema = {
    graphics: { type: Types.Ref },
    addedToStage: { type: Types.Boolean },
};
