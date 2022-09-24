import { IEntity } from 'sim-ecs';

import { State as NodeState } from '../Node';

import { EntityNode } from './EntityNode';

import { MovePath, Transform } from '~/game/components';

const random = () => {
  return Math.round(Math.random() * 3) - 1;
};

const randomDirection = (transform: Transform) => {
  return {
    x: transform.gridPosition.x + random(),
    y: transform.gridPosition.y + random(),
  };
};

export class MoveToRandomDirection extends EntityNode {
  protected evaluateByEntity(entity: IEntity): NodeState {
    const transform = entity.getComponent(Transform);
    const movePath = entity.getComponent(MovePath);

    if (transform == null || movePath == null) return this.failure();

    movePath.path = [randomDirection(transform)];

    return this.success();
  }
}
