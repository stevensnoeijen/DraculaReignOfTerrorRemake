import { Component, Types } from 'ecsy';
import * as PIXI from 'pixi.js';

export interface AnimatedSpriteComponentProps {
    sprite: PIXI.AnimatedSprite;
}

export class AnimatedSpriteComponent extends Component<AnimatedSpriteComponentProps> {
    static schema = {
        sprite: { type: Types.Ref },
    };   

    declare sprite: PIXI.AnimatedSprite;
}