import { createSystem, queryComponents, Write } from 'sim-ecs';

import { EcsyEntity } from './../../components/EcsyEntity';
import { isAlive } from './../utils/index';

import { Target } from '~/game/components/ai/Target';

export const TargetSystem = createSystem({
  query: queryComponents({
    target: Write(Target),
  }),
})
.withRunFunction(({
  query
}) => {
  query.execute(({ target }) => {
    if (target.entity === null) {
      return;
    }

    if (!isAlive(target.entity.getComponent(EcsyEntity)!.entity)) {
      target.entity = null;
    }
  });
})
.build();
