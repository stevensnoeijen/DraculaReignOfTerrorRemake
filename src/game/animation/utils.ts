import * as PIXI from 'pixi.js';

import { Animation, TEXTURE_SPEED } from './Animation';
import { Model } from './api';

export const colors = ['red', 'blue'] as const;
export type Color = typeof colors[number];

export const units = [
  'swordsmen',
  'crossbowsoldier',
  'knight',
  'juggernaut',
  'catapult',
  'cannon',
] as const;
export type Unit = typeof units[number];
const colorlessUnits: readonly Unit[] = ['catapult', 'cannon'];

export const directions = [
  'north',
  'northeast',
  'east',
  'southeast',
  'south',
  'southwest',
  'west',
  'northwest',
] as const;
export type Direction = typeof directions[number];

export const states = ['idle', 'move', 'attack', 'dying', 'dead'] as const;
export type State = typeof states[number];

type DirectionalAnimations = Record<Direction, Animation>;
export type AnimationMap = Record<State, DirectionalAnimations>;

const createAnimation = (
  spritesheet: PIXI.Spritesheet,
  model: Model,
  state: State,
  direction: Direction
): Animation | null => {
  const descriptor = model.states[state][direction];

  if ('texture' in descriptor) {
    return new Animation(
      [spritesheet.textures[descriptor.texture]],
      TEXTURE_SPEED,
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
  state: State
): DirectionalAnimations => {
  return directions.reduce((directionMap, direction) => {
    return {
      ...directionMap,
      [direction]: createAnimation(spritesheet, spriteModel, state, direction),
    };
  }, {}) as DirectionalAnimations;
};

export const createAnimationMap = (
  spritesheet: PIXI.Spritesheet,
  spriteModels: Model[],
  color: Color,
  unit: Unit
): AnimationMap => {
  const spriteModel = spriteModels.find(
    (spriteModel) => spriteModel.color === color && spriteModel.unit === unit
  )!;

  return states.reduce((directionMap, state) => {
    return {
      ...directionMap,
      [state]: createDirectionalAnimations(spritesheet, spriteModel, state),
    };
  }, {}) as AnimationMap;
};

export type ModelName = `${Color}_${Unit}`;
export const createModelName = (color: Color, unit: Unit): ModelName => {
  return `${color}_${unit}`;
};

const ROTATION_TO_DIRECTION_MAP: ReadonlyMap<number, Direction> = new Map<
  number,
  Direction
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

export const rotationToDirection = (rotation: number): Direction => {
  return ROTATION_TO_DIRECTION_MAP.get(rotation) ?? 'north';
};
