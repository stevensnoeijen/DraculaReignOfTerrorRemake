import { Entity } from 'ecsy';
import { createSystem, queryComponents, Read } from 'sim-ecs';

import { Alive } from '../components/Alive';
import { rotationToDirection } from '../animation/load';
import { EcsyEntity } from '../components/EcsyEntity';

import { SelectableComponent, HealthComponent, AssetComponent, TransformComponent } from './components';

const handleDead = (entity: Entity): void => {
  entity.removeComponent(SelectableComponent);
  entity.removeComponent(HealthComponent);

  const assetComponent = entity.getComponent(AssetComponent)!;
  const transformComponent = entity.getComponent(TransformComponent)!;
  assetComponent.animator.set(
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
