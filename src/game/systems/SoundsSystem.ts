import { createSystem, IComponentsQuery, queryComponents, Read, ReadEvents } from 'sim-ecs';

import { Attacked } from '../events/Attacked';
import { Died } from '../events/Died';
import { Sounds } from '../components/Sounds';
import { Commanded } from '../events/Commanded';
import { EntityEvent } from '../events/EntityEvent';
import { Idled } from '../events/Idled';
import { Moved } from '../events/Moved';

import { Action } from './../sounds/SoundController';

const playSound = (query: IComponentsQuery<{}>, event: EntityEvent, action: Action) => {
  if (query.matchesEntity(event.entity)) {
    event.entity.getComponent(Sounds)!.play(action);
  }
};

const stopSound = (event: EntityEvent) => event.entity.getComponent(Sounds)!.stop();

export const SoundsSystem = createSystem({
    idled: ReadEvents(Idled),
    commanded: ReadEvents(Commanded),
    moved: ReadEvents(Moved),
    attacked: ReadEvents(Attacked),
    died: ReadEvents(Died),

    query: queryComponents({
      sounds: Read(Sounds),
    }),
  }).withRunFunction(({
    idled,
    commanded,
    attacked,
    moved,
    died,
    query,
  }) => {
    idled.execute(event => {
      stopSound(event);
    });
    commanded.execute(event => {
      playSound(query, event, 'command');
    });
    moved.execute(event => {
      stopSound(event);
    });
    attacked.execute(event => {
      playSound(query, event, 'attackEffect');
    });
    died.execute((event) => {
      playSound(query, event, 'dead');
   });
  })
  .build();
