import _ from 'lodash';

import { State, Unit, Color, Direction } from './../../../game/animation/utils';

type StateDirectionDescription =
  | ({
      speed: number;
      loop: boolean;
    } & { texture: string })
  | { animation: string };

interface Model {
  unit: Unit;
  color: Color;
  states: Record<State, Record<Direction, StateDirectionDescription>>;
}

interface UnitSpriteModelsJson {
  spritesheet: string;
  models: Model[];
}

export const getSpriteModels = async (): Promise<UnitSpriteModelsJson> => {
  const res = await fetch('/assets/unit-sprite-models.json');

  return res.json();
};

export const getSpriteModelNames = async () => {
  const spriteModels = await getSpriteModels();
  return _.uniq(spriteModels.models.map((model) => model.unit));
};
