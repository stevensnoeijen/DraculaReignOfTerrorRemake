import { createSystem } from 'sim-ecs';

import { GameTime } from '../GameTime';

let lastTime = Date.now();

export const GameTimeSystem = createSystem({})
  .withRunFunction(() => {
    const currentTime = Date.now();
    GameTime.delta = currentTime - lastTime;
    lastTime = currentTime;
  })
  .build();
