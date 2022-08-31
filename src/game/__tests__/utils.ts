import { buildWorld } from 'sim-ecs';
import { Entity, World } from 'ecsy';

import { Position } from '../utils';
import { Vector2 } from '../math/Vector2';
import { Team } from '../components/Team';
import { Transform } from '../components/Transform';

import { SimEcsComponent } from './../systems/SimEcsComponent';

import { Alive } from '~/game/components/Alive';

export type CreateRandomEntities = (
  length?: number,
  minPosition?: Position,
  maxPosition?: Position,
  team?: number
) => Entity[];

export const constructCreateRandomEntities = (
  world: World
): CreateRandomEntities => {
  const newWorld = buildWorld().build();

  return (
    length: number = 30,
    minPosition: Position = { x: 3, y: 3 },
    maxPosition: Position = { x: 100, y: 100 },
    teamId: number = 2
  ) => {
    return Array.from({ length: length }).map(() => {
      return world
        .createEntity()
        .addComponent(SimEcsComponent, {
          entity: newWorld.buildEntity()
            .with(new Team(teamId))
            .with(new Alive(true))
            .with(new Transform(
                new Vector2(
                  Math.round(Math.random() * maxPosition.x) + minPosition.x,
                  Math.round(Math.random() * maxPosition.y) + minPosition.y
                )
              )
            )
            .build(),
        });
    });
  };
};
