import { Entity, World } from 'ecsy';
import { FunctionKeys } from 'utility-types';

import { State } from '../Node';

import { EntityNode } from './EntityNode';

class ImplementedEntityNode extends EntityNode {
  protected evaluateByEntity(entity: Entity): State {
    return this.success();
  }
}

describe('EntityNode', () => {
  describe('evaluate', () => {
    const world = new World();

    it('should return failure when no entity is set', () => {
      const node = new ImplementedEntityNode();

      expect(node.evaluate()).toBe(State.FAILURE);
    });

    it(`should return success
      and call evaluateByEntity when entity is set`, () => {
      const node = new ImplementedEntityNode();
      const spyEvaluateByEntity = jest.spyOn(
        node,
        'evaluateByEntity' as FunctionKeys<ImplementedEntityNode>
      );
      node.setData('entity', world.createEntity());

      expect(node.evaluate()).toBe(State.SUCCESS);
      expect(spyEvaluateByEntity).toBeCalled();
    });
  });
});
