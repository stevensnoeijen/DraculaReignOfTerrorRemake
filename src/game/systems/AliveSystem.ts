import { Entity } from 'ecsy';
import { createSystem, queryComponents, Read } from 'sim-ecs';

import { Alive } from '../components/Alive';
import { rotationToDirection } from '../animation/load';
import { EcsyEntity } from '../components/EcsyEntity';
import { Health } from '../components/Health';
import { Transform } from '../components/Transform';
import { Selectable } from '../components/input/Selectable';

import { removeSimComponent } from './utils/index';
import { Animator } from './../animation/Animator';
import { SimEcsComponent } from './SimEcsComponent';


const handleDead = (entity: Entity, transform: Transform): void => {
  removeSimComponent(entity, Selectable);
  removeSimComponent(entity, Health);

  const simEcsComponent = entity.getComponent(SimEcsComponent)!;
  simEcsComponent.entity.getComponent(Animator)!.set(
    'dead',
    rotationToDirection(transform.rotation)
  );
};

export const AliveSystem = createSystem({
    query: queryComponents({
      alive: Read(Alive),
      entity: Read(EcsyEntity),
      transform: Read(Transform),
    }),
  }).withRunFunction(({
    query
  }) => {
    query.execute(({ alive, entity, transform }) => {
      if (!alive.alive) handleDead(entity.entity, transform);
    });
  })
  .build();
