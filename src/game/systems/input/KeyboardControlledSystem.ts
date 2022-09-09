
import { createSystem, queryComponents, Read, Write } from 'sim-ecs';

import { Input } from '../../Input';
import { Vector2 } from '../../math/Vector2';
import { Selectable } from '../../components/input/Selectable';
import { MoveVelocity } from '../../components/movement/MoveVelocity';
import { Transform } from '../../components/Transform';
import { KeyboardControlled } from '../../components/input/KeyboardControlled';

const handleMovement = (moveVelocity: MoveVelocity, transform: Transform) => {
  let moveX = 0;
  let moveY = 0;

  if (Input.isKeyDown('w')) {
    moveY -= 1;
  }
  if (Input.isKeyDown('s')) {
    moveY += 1;
  }
  if (Input.isKeyDown('a')) {
    moveX -= 1;
  }
  if (Input.isKeyDown('d')) {
    moveX += 1;
  }

  const velocity = new Vector2(moveX, moveY).normalized();

  moveVelocity.velocity = velocity;

  if (!velocity.equals(Vector2.ZERO))
    transform.rotation = Vector2.angle(Vector2.ZERO, velocity) - 90;
};

const handleAction = (selectable: Selectable) => {
  if (Input.isKeyDown('Escape'))
    selectable.deselect();
};


export const KeyboardControlledSystem = createSystem({
  query: queryComponents({
    keyboardControlled: Read(KeyboardControlled),
    selectable: Write(Selectable),
    moveVelocity: Write(MoveVelocity),
    transform: Write(Transform),
  }),
})
.withRunFunction(({
  query
}) => {
  query.execute(({ selectable, moveVelocity, transform }) => {
    if (!selectable.isSelected()) return;

    handleMovement(moveVelocity, transform);
    handleAction(selectable as Selectable);
  });
})
.build();
