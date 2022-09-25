import { IWorld, buildWorld } from 'sim-ecs';

import { Transform } from '../../../../components/Transform';
import { Vector2 } from '../../../../math/Vector2';
import { Node, State } from '../Node';
import { Combat } from '../../../../components/ai/Combat';

import { Team } from './../../../../components/Team';
import { IsEnemyInRange } from './IsEnemyInRange';

import { Sensory } from '~/game/components';
import { Modality } from '~/game/ai/sensor/Modality';
import { Sensor } from '~/game/ai/sensor/Sensor';

describe('IsEnemyInRange', () => {
  describe('evaluate', () => {
    let world: IWorld;

    beforeEach(() => {
      world = buildWorld().build();

    });

    it('should success set target when there is an enemy within range', () => {
      const entityInRange = world.buildEntity()
          .with(Team.CPU)
          .with(new Transform(new Vector2(0, 0)))
          .build();

      const sensor = new Sensory(
        new Sensor(
          48, [
            new Modality(entityInRange, 16),
          ]
        )
      );
      const entity = world.buildEntity()
        .with(Team.PLAYER)
        .with(new Transform(Vector2.ZERO))
        .with(new Combat(16, 0, 0, 0))
        .with(sensor)
        .build();

      const node = new IsEnemyInRange(Combat, 'aggroRange');
      const parent = new Node();
      parent.setData('entity', entity);
      parent.attach(node);

      expect(node.evaluate()).toBe(State.SUCCESS);
      expect(parent.getData('target')).not.toBeNull();
    });

  });
});
