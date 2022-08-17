import _ from 'lodash';

import { UnitType, TeamColor, UnitState, MoveDirection } from './../types';

type StateDirectionDescription =
  | { texture: string }
  | {
      speed: number;
      loop: boolean;
      animation: string;
    };

export interface Model {
  unit: UnitType;
  color: TeamColor;
  states: Record<UnitState, Record<MoveDirection, StateDirectionDescription>>;
}

export interface AnimationModelsJson {
  spritesheet: string;
  models: Model[];
}

export const getAnimationModels = async (): Promise<AnimationModelsJson> => {
  const res = await fetch('/assets/animation-models.json');

  return res.json();
};

export const getSpriteModelNames = async () => {
  const spriteModels = await getAnimationModels();
  return _.uniq(spriteModels.models.map((model) => model.unit));
};
