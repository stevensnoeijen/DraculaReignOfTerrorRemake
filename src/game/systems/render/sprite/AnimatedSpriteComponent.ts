import { Component, Types } from 'ecsy';
import * as PIXI from 'pixi.js';

import { MoveDirection, UnitState } from '~/game/types';

type AnimatedState = `${UnitState}_${MoveDirection}`;
export interface AnimatedSpriteComponentProps {
  sprite: PIXI.AnimatedSprite;
  state: AnimatedState;
}

export class AnimatedSpriteComponent extends Component<AnimatedSpriteComponentProps> {
  static schema = {
    sprite: { type: Types.Ref },
    state: { type: Types.String },
  };

  declare sprite: PIXI.AnimatedSprite;
  state!: AnimatedState;
}
