import _ from 'lodash';

import { State, Unit, Color, Direction } from './utils';

type StateDirectionDescription =
  | { texture: string }
  | {
      speed: number;
      loop: boolean;
      animation: string;
    };

export interface Model {
  unit: Unit;
  color: Color;
  states: Record<State, Record<Direction, StateDirectionDescription>>;
}

export interface UnitSpriteModelsJson {
  spritesheet: string;
  models: Model[];
}

export const getAnimationModels = async (): Promise<UnitSpriteModelsJson> => {
  const res = await fetch('/assets/animation-models.json');

  return res.json();
};

export const getSpriteModelNames = async () => {
  const spriteModels = await getAnimationModels();
  return _.uniq(spriteModels.models.map((model) => model.unit));
};
