import { createSystem, queryComponents, Write, ReadEvents, EntityAdded, Read, EntityRemoved, ReadEntity, IEntity } from 'sim-ecs';

import { isSameEntity } from '../../utils/entity';
import { Alive } from '../../components/Alive';

import { distance, isInRange } from '~/game/utils/components/transform';
import { Sensory, Transform } from '~/game/components';
import { Died, EntityEvent, Idled, Moved } from '~/game/events';
import { Modality } from '~/game/ai/sensor/Modality';

const processAliveEvent = (
  entity: IEntity,
  sensory: Sensory,
  event: EntityEvent,
) => {
  if (isSameEntity(entity)(event.entity))
    return;

  if (!isInRange(entity, sensory.sensor.range)(event.entity))
    return;

  const range = distance(entity, event.entity);

  sensory.sensor.addModality(
    new Modality(event.entity, range)
  );

  // process event.entity too
  event.entity.getComponent(Sensory)?.sensor.addModality(
    new Modality(entity, range)
  );
};

const processDeadEvents = (
  entity: IEntity,
  sensory: Sensory,
  event: EntityEvent,
) => {
  if (isSameEntity(entity)(event.entity))
    return;

  sensory.sensor.removeModalityByEntity(event.entity);

  // process event.entity too
  event.entity.getComponent(Sensory)?.sensor.removeModalityByEntity(entity);
};

export const SensorySystem = createSystem({
  entityAdded: ReadEvents(EntityAdded),
  entityRemoved: ReadEvents(EntityRemoved),
  died: ReadEvents(Died),
  idled: ReadEvents(Idled),
  moved: ReadEvents(Moved),
  query: queryComponents({
    entity: ReadEntity(),
    alive: Read(Alive),
    sensory: Write(Sensory),
    transform: Read(Transform),
  }),
})
.withRunFunction(({
  entityAdded,
  entityRemoved,
  died,
  idled,
  moved,
  query
}) => {
  const entities = Array.from(query.iter());

  const aliveEvents: EntityEvent[] = [entityAdded, moved, idled]
    .map(eventReader => Array.from(eventReader.iter()))
    .flat();
  for(const entity of entities) {
    if (entity.alive.isDead()) continue;

    for(const event of aliveEvents) {
      processAliveEvent(entity.entity, entity.sensory as Sensory, event);
    }
  }

  const deadEvents: EntityEvent[] = [died, entityRemoved]
    .map(eventReader => Array.from(eventReader.iter()))
    .flat();
  for(const entity of entities) {
    if (entity.alive.isDead()) continue;

    for(const event of deadEvents) {
      processDeadEvents(entity.entity, entity.sensory as Sensory, event);
    }
  }
})
.build();
