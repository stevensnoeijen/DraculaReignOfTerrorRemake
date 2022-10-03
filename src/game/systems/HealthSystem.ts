import { createSystem, queryComponents, Read, Write } from 'sim-ecs';

import { Alive } from '../components/Alive';
import { Health } from '../components/Health';

export const HealthSystem = createSystem({
  query: queryComponents({
    health: Read(Health),
    alive: Write(Alive),
  }),
})
  .withRunFunction(({ query }) =>
    query.execute(({ health, alive }) => {
      if (health.points <= 0) {
        alive.die();
      }
    })
  )
  .build();
