import { Component, Types } from 'ecsy';
import * as PIXI from 'pixi.js';

export interface SpriteComponentProps {
    sprite: PIXI.Sprite;
}

export class SpriteComponent extends Component<SpriteComponentProps> {
    declare sprite: PIXI.Sprite;
    addedToStage: boolean = false;
}

SpriteComponent.schema = {
    sprite: { type: Types.Ref },
    addedToStage: { type: Types.Boolean },
};
