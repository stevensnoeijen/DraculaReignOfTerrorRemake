import { Component, Types } from 'ecsy';
import * as PIXI from 'pixi.js';
import { Direction, State } from '../../../animation/utils';

type AnimationState = `${State}_${Direction}`;
export interface AnimatedSpriteComponentProps {
  sprite: PIXI.AnimatedSprite;
  state: AnimationState;
}

export class AnimatedSpriteComponent extends Component<AnimatedSpriteComponentProps> {
  static schema = {
    sprite: { type: Types.Ref },
    state: { type: Types.String },
  };

  declare sprite: PIXI.AnimatedSprite;
  state!: AnimationState;
}
