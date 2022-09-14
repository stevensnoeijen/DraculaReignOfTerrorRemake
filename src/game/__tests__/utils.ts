import { IEntity, IWorld } from 'sim-ecs';

import { Point } from '../math/types';
import { Vector2 } from '../math/Vector2';
import { Team } from '../components/Team';
import { Transform } from '../components/Transform';

import { Alive } from '~/game/components/Alive';

export type CreateRandomEntities = (
  length?: number,
  minPosition?: Point,
  maxPosition?: Point,
  team?: Team
) => IEntity[];

export const constructCreateRandomEntities = (
  world: IWorld
): CreateRandomEntities => {
  return (
    length: number = 30,
    minPosition: Point = { x: 3, y: 3 },
    maxPosition: Point = { x: 100, y: 100 },
    team: Team = Team.CPU
  ) => {
    return Array.from({ length: length }).map(() => {
      return world
        .buildEntity()
        .with(team)
        .with(new Alive(true))
        .with(
          new Transform(
            new Vector2(
              Math.round(Math.random() * maxPosition.x) + minPosition.x,
              Math.round(Math.random() * maxPosition.y) + minPosition.y
            )
          )
        )
        .build();
    });
  };
};
