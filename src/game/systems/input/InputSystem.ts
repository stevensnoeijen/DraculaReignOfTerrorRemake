import * as PIXI from 'pixi.js';
import { createSystem, ReadResource } from 'sim-ecs';

import { Input, KeyStatus, MouseButtonStatus } from '../../Input';
import { Vector2 } from '../../math/Vector2';


let keyQueue: KeyboardEvent[] = [];
const mouseEvents: MouseEvent[] = [];

const registerListeners = (view: HTMLElement) => {
  view.addEventListener('mousedown', (event: MouseEvent) => {
    mouseEvents.push(event);
  });
  view.addEventListener('mouseup', (event: MouseEvent) => {
    mouseEvents.push(event);
  });
  view.addEventListener('click', (event: MouseEvent) => {
    mouseEvents.push(event);
  });
  view.addEventListener('dblclick', (event: MouseEvent) => {
    mouseEvents.push(event);
  });
  view.addEventListener('mousemove', (event: MouseEvent) => {
    Input.mousePosition = new Vector2(event.offsetX, event.offsetY);
  });

  window.addEventListener('keydown', (event: KeyboardEvent) => {
    keyQueue.push(event);
  });
  window.addEventListener('keyup', (event: KeyboardEvent) => {
    keyQueue.push(event);
  });
  window.addEventListener('keypress', (event: KeyboardEvent) => {
    keyQueue.push(event);
  });
};

export const InputSystem = createSystem({
  app: ReadResource(PIXI.Application),
})
.withSetupFunction(({ app }) => {
  registerListeners(app.view);
})
.withRunFunction(() => {
  Input.clearMouseStatuses();
    if (mouseEvents.length > 0) {
      let mouseEvent;
      while ((mouseEvent = mouseEvents.shift())) {
        Input.setMouseButton(
          mouseEvent.button,
          mouseEvent.type as MouseButtonStatus
        );
      }
    }

    Input.clearKeysStatus();
    if (keyQueue.length > 0) {
      let event;
      while ((event = keyQueue.pop())) {
        Input.addKeyStatus(event.key, event.type as KeyStatus);
      }
      keyQueue = [];
    }
})
.build();
