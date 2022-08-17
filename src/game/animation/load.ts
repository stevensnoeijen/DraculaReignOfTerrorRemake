import * as PIXI from 'pixi.js';

import {
  UnitState,
  MoveDirection,
  MOVE_DIRECTIONS,
  TeamColor,
  UnitType,
  UNIT_STATES,
} from '../types';

import { Animation } from './Animation';
import { Model } from './api';

export type DirectionalAnimations = Record<MoveDirection, Animation>;
export type AnimationMap = Record<UnitState, DirectionalAnimations>;

const createAnimation = (
  spritesheet: PIXI.Spritesheet,
  model: Model,
  state: UnitState,
  direction: MoveDirection
): Animation | null => {
  const descriptor = model.states[state][direction];

  if ('texture' in descriptor) {
    return new Animation(
      [spritesheet.textures[descriptor.texture]],
      Number.POSITIVE_INFINITY,
      false
    );
  } else {
    // animation
    return new Animation(
      spritesheet.animations[descriptor.animation],
      descriptor.speed,
      descriptor.loop
    );
  }
};

const createDirectionalAnimations = (
  spritesheet: PIXI.Spritesheet,
  spriteModel: Model,
  state: UnitState
): DirectionalAnimations => {
  return MOVE_DIRECTIONS.reduce((directionMap, direction) => {
    return {
      ...directionMap,
      [direction]: createAnimation(spritesheet, spriteModel, state, direction),
    };
  }, {}) as DirectionalAnimations;
};

export const createAnimationMap = (
  spritesheet: PIXI.Spritesheet,
  spriteModels: Model[],
  color: TeamColor,
  unitType: UnitType
): AnimationMap => {
  const spriteModel = spriteModels.find(
    (spriteModel) =>
      spriteModel.color === color && spriteModel.unit === unitType
  )!;

  return UNIT_STATES.reduce((directionMap, state) => {
    return {
      ...directionMap,
      [state]: createDirectionalAnimations(spritesheet, spriteModel, state),
    };
  }, {}) as AnimationMap;
};

export type ModelName = `${TeamColor}_${UnitType}`;
export const createModelName = (
  color: TeamColor,
  unit: UnitType
): ModelName => {
  return `${color}_${unit}`;
};

const ROTATION_TO_DIRECTION_MAP: ReadonlyMap<number, MoveDirection> = new Map<
  number,
  MoveDirection
>([
  [-135, 'northwest'],
  [-90, 'north'],
  [-45, 'northeast'],
  [0, 'east'],
  [45, 'southeast'],
  [90, 'south'],
  [135, 'southwest'],
  [180, 'west'],
]);

export const rotationToDirection = (rotation: number): MoveDirection => {
  return ROTATION_TO_DIRECTION_MAP.get(rotation) ?? 'north';
};
