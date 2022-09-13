import { createSystem, ReadEvents } from 'sim-ecs';

import { Attacked } from '../events/Attacked';
import { Died } from '../events/Died';
import { Sounds } from '../components/Sounds';
import { Commanded } from '../events/Commanded';
import { EntityEvent } from '../events/EntityEvent';
import { Idled, Moved } from '../events';
import { AttackStopped } from '../events/AttackedStopped';

import { Action } from './../sounds/SoundController';

const playSound = (event: EntityEvent, action: Action) => {
  event.entity.getComponent(Sounds)?.play(action);
};

const stopSound = (event: EntityEvent, action: Action) =>
  event.entity.getComponent(Sounds)?.stop(action);

export const SoundsSystem = createSystem({
  commanded: ReadEvents(Commanded),
  moved: ReadEvents(Moved),
  attacked: ReadEvents(Attacked),
  attackStopped: ReadEvents(AttackStopped),
  died: ReadEvents(Died),
  idled: ReadEvents(Idled),
})
  .withRunFunction(({ commanded, moved, attacked, attackStopped, died }) => {
    commanded.execute((event) => {
      playSound(event, 'command');
    });
    moved.execute((event) => {
      stopSound(event, 'attackEffect');
    });
    attacked.execute((event) => {
      playSound(event, 'attackEffect');
    });
    attackStopped.execute((event) => {
      stopSound(event, 'attackEffect');
    });
    died.execute((event) => {
      stopSound(event, 'attackEffect');
      playSound(event, 'dead');
    });
  })
  .build();
