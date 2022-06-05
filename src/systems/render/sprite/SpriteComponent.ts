import { Component, Types } from 'ecsy';
import * as PIXI from 'pixi.js';

export interface SpriteComponentProps {
    sprite: PIXI.Sprite;
}

export class SpriteComponent extends Component<SpriteComponentProps> {
    static schema = {
        sprite: { type: Types.Ref },
        addedToStage: { type: Types.Boolean },
    };   

    declare sprite: PIXI.Sprite;
    addedToStage: boolean = false;
}