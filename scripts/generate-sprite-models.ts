import * as fs from 'fs';

const colors = ['red', 'blue'] as const;
type Color = typeof colors[number];

const units = [
  'swordsmen',
  'crossbowsoldier',
  'knight',
  'juggernaut',
  'catapult',
  'cannon',
] as const;
type Unit = typeof units[number];
const colorlessUnits: ReadonlyArray<Unit> = ['catapult', 'cannon'];
const movelessUnits: ReadonlyArray<Unit> = ['catapult', 'cannon'];

const states = ['idle', 'move', 'attack', 'dying', 'dead'] as const;
type State = typeof states[number];
const animationStates: ReadonlyArray<State> = ['move', 'attack', 'dying'];

const directions = [
  'north',
  'northeast',
  'east',
  'southeast',
  'south',
  'southwest',
  'west',
  'northwest',
] as const;
type Direction = typeof directions[number];

type BaseAnimation = {
  loop: boolean;
  speed: number;
};

type ModelState = {
  [direction in Direction]:
    | (BaseAnimation & ({ animation: string } | { texture: string }))
    | {};
};

type Model = {
  unit: Unit;
  color: Color;
  states: {
    [state in State]: ModelState;
  };
};

const getAnimationKey = (
  unit: Unit,
  color: Color,
  state: State,
  direction: Direction
): string | null => {
  if (movelessUnits.includes(unit)) {
    state = 'idle';
  }

  if (colorlessUnits.includes(unit)) {
    // have no color in their texture
    return `${unit}.${state}.${direction}`;
  }
  return `${unit}.${color}.${state}.${direction}`;
};

const models: Model[] = [];

for (const unit of units) {
  for (const color of colors) {
    //   const unitAnimations = animations.filter((animation) => animation.startsWith(unit));
    const model = {
      unit,
      color,
      states: {},
    } as Model;

    for (const state of states) {
      const modelState = {} as ModelState;
      for (const direction of directions) {
        const animationName = getAnimationKey(unit, color, state, direction);

        if (animationStates.includes(state)) {
          modelState[direction] = {
            animation: animationName,
            speed: 0.25,
            loop: true,
          };
        } else {
          modelState[direction] = {
            texture: animationName + '.png',
            speed: 0,
            loop: false,
          };
        }
      }
      model.states[state] = modelState;
    }

    models.push(model);
  }
}
fs.writeFileSync(
  __dirname + '/../public/assets/unit-sprite-models.json',
  JSON.stringify(
    {
      spritesheet: '/assets/unit-spritesheet.json',
      models,
    },
    null,
    2
  )
);
