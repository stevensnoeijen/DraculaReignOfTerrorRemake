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
import { Range } from '~/game/utils/Range';
import { CombatController } from '~/game/combat/CombatController';
import { Aggro } from '~/game/combat/Aggro';
import { Attack } from '~/game/combat/Attack';

describe('IsEnemyInRange', () => {
  describe('evaluate', () => {
    let world: IWorld;

    beforeEach(() => {
      world = buildWorld().build();
    });

    it('should set target when there is an enemy within range', () => {
      const entityInRange = world
        .buildEntity()
        .with(Team.CPU)
        .with(new Transform(new Vector2(0, 0)))
        .build();

      const combat = new Combat(
        new CombatController({
          aggro: new Aggro(new Range(0, 16)),
          attack: {} as Attack,
        })
      );
      const sensor = new Sensory(
        new Sensor(48, [new Modality(entityInRange, 16)])
      );
      const entity = world
        .buildEntity()
        .with(Team.PLAYER)
        .with(new Transform(Vector2.ZERO))
        .with(combat)
        .with(sensor)
        .build();

      const node = new IsEnemyInRange(Combat, 'aggro');
      const parent = new Node();
      parent.setData('entity', entity);
      parent.attach(node);

      expect(node.evaluate()).toBe(State.SUCCESS);
      expect(parent.getData('enemy')).not.toBeNull();
    });
  });
});
