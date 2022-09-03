import { createSystem, IEntity, queryComponents, Read, ReadEntity } from 'sim-ecs';

import { Alive } from '../components/Alive';
import { rotationToDirection } from '../animation/load';
import { Health } from '../components/Health';
import { Transform } from '../components/Transform';
import { Selectable } from '../components/input/Selectable';

import { Animator } from './../animation/Animator';


const handleDead = (entity: IEntity, transform: Transform): void => {
  entity.removeComponent(Selectable);
  entity.removeComponent(Health);

  entity.getComponent(Animator)!.set(
    'dead',
    rotationToDirection(transform.rotation)
  );
};

export const AliveSystem = createSystem({
    query: queryComponents({
      entity: ReadEntity(),
      alive: Read(Alive),
      transform: Read(Transform),
    }),
  }).withRunFunction(({
    query
  }) => {
    query.execute(({ alive, entity, transform }) => {
      if (!alive.alive) handleDead(entity, transform);
    });
  })
  .build();
