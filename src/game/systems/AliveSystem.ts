import { Entity } from 'ecsy';
import { createSystem, queryComponents, Read } from 'sim-ecs';

import { Alive } from '../components/Alive';
import { rotationToDirection } from '../animation/load';
import { EcsyEntity } from '../components/EcsyEntity';
import { Health } from '../components/Health';
import { TransformComponent } from '../components/TransformComponent';

import { Animator } from './../animation/Animator';
import { SelectableComponent } from './components';
import { SimEcsComponent } from './SimEcsComponent';


const handleDead = (entity: Entity, transform: TransformComponent): void => {
  entity.removeComponent(SelectableComponent);
  entity.getComponent(SimEcsComponent)!.entity.removeComponent(Health);

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
      transform: Read(TransformComponent),
    }),
  }).withRunFunction(({
    query
  }) => {
    query.execute(({ alive, entity, transform }) => {
      if (!alive.alive) handleDead(entity.entity, transform);
    });
  })
  .build();
