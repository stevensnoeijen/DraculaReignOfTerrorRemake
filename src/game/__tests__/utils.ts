import { IEntity, IWorld } from 'sim-ecs';

import { Position } from '../math/types';
import { Vector2 } from '../math/Vector2';
import { Team } from '../components/Team';
import { Transform } from '../components/Transform';

import { Alive } from '~/game/components/Alive';

export type CreateRandomEntities = (
  length?: number,
  minPosition?: Position,
  maxPosition?: Position,
  team?: Team
) => IEntity[];

export const constructCreateRandomEntities = (
  world: IWorld
): CreateRandomEntities => {
  return (
    length: number = 30,
    minPosition: Position = { x: 3, y: 3 },
    maxPosition: Position = { x: 100, y: 100 },
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
