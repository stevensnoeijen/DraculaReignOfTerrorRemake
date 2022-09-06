import { createSystem, IComponentsQuery, queryComponents, Read, ReadEvents } from 'sim-ecs';

import { Attacked } from '../events/Attacked';
import { Died } from '../events/Died';
import { Sounds } from '../components/Sounds';
import { Commanded } from '../events/Commanded';
import { EntityEvent } from '../events/EntityEvent';

import { Action } from './../components/Sounds';

const playSound = (query: IComponentsQuery<{}>, event: EntityEvent, action: Action) => {
  if (query.matchesEntity(event.entity)) {
    event.entity.getComponent(Sounds)!.play(action);
  }
};

export const SoundsSystem = createSystem({
    commanded: ReadEvents(Commanded),
    attacked: ReadEvents(Attacked),
    died: ReadEvents(Died),

    query: queryComponents({
      sounds: Read(Sounds),
    }),
  }).withRunFunction(({
    commanded,
    attacked,
    died,
    query,
  }) => {
    commanded.execute(event => {
      playSound(query, event, 'command');
    });
    attacked.execute(event => {
      playSound(query, event, 'attackEffect');
    });
    died.execute((event) => {
      playSound(query, event, 'dead');
   });
  })
  .build();
