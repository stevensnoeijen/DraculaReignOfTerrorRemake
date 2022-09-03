import { createSystem } from 'sim-ecs';

import { GameTime } from '../GameTime';

let lastTime = performance.now();

export const GameTimeSystem = createSystem({})
  .withRunFunction(() => {
    const currentTime = performance.now();
    GameTime.delta = currentTime - lastTime;
    lastTime = currentTime;
  })
  .build();
