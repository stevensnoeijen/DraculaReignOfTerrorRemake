import { Entity } from 'ecsy';
import { createSystem, queryComponents, Read } from 'sim-ecs';

import { Alive } from '../components/Alive';
import { rotationToDirection } from '../animation/load';
import { EcsyEntity } from '../components/EcsyEntity';
import { Health } from '../components/Health';

import { Animator } from './../animation/Animator';
import { SelectableComponent, TransformComponent } from './components';
import { SimEcsComponent } from './SimEcsComponent';

const handleDead = (entity: Entity): void => {
  entity.removeComponent(SelectableComponent);
  entity.getComponent(SimEcsComponent)!.entity.removeComponent(Health);

  const simEcsComponent = entity.getComponent(SimEcsComponent)!;
  const transformComponent = entity.getComponent(TransformComponent)!;
  simEcsComponent.entity.getComponent(Animator)!.set(
    'dead',
    rotationToDirection(transformComponent.rotation)
  );
};

export const AliveSystem = createSystem({
    query: queryComponents({
      alive: Read(Alive),
      entity: Read(EcsyEntity),
    }),
  }).withRunFunction(({
    query
  }) => {
    query.execute(({ alive, entity }) => {
      if (!alive.alive) handleDead(entity.entity);
    });
  })
  .build();
