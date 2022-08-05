import * as fs from "fs";

const colors = ['red', 'blue'] as const;
type Color = typeof colors[number];

const units = ['swordsmen', 'crosscowsoldier', 'knight', 'juggernaut', 'catapult', 'cannon'] as const;
type Unit = typeof units[number];
const colorlessUnits: ReadonlyArray<Unit> = ['catapult', 'cannon'];
const movelessUnits: ReadonlyArray<Unit> = ['catapult', 'cannon'];

const states = ['idle', 'move', 'attack', 'dying', 'dead'] as const;
type State = typeof states[number];
const animationStates: ReadonlyArray<State> = ['move', 'attack', 'dying'];

const directions = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'] as const;
type Direction = typeof directions[number];

type BaseAnimation = {
  loop: boolean;
  speed: number;
}

type SkinState = {
  [direction in Direction]: (BaseAnimation & ({ animation: string; } | { texture: string; })) | {};
};

type Skin = {
  unit: Unit;
  color: Color,
  states: {
    [state in State]: SkinState
  }
};

const getAnimationKey = (unit: Unit, color: Color, state: State, direction: Direction): string | null => {
  if (movelessUnits.includes(unit)) {
    state = 'idle';
  }

  if (colorlessUnits.includes(unit)) {
    // have no color in their texture
    return `${unit}.${state}.${direction}`;
  }
  return `${unit}.${color}.${state}.${direction}`;
}

const skins: Skin[] = [];

for (const unit of units) {
  for (const color of colors) {
    //   const unitAnimations = animations.filter((animation) => animation.startsWith(unit));
    const skin = {
      unit,
      color,
      states: {},
    } as Skin;

    for (const state of states) {
      const skinState = {} as SkinState;
      for (const direction of directions) {
        const animationName = getAnimationKey(unit, color, state, direction);

        if (animationStates.includes(state)) {
          skinState[direction] = {
            animation: animationName,
            speed: .25,
            loop: true,
          };
        } else {
          skinState[direction] = {
            texture: animationName + '.png',
            speed: 0,
            loop: false,
          };
        }
      }
      skin.states[state] = skinState;
    }

    skins.push(skin);
  }
}
fs.writeFileSync(__dirname + '/../public/assets/skins.json', JSON.stringify({
  spritesheet: '/assets/units-spritesheet.json',
  skins
}, null, 2));
