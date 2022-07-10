import * as PIXI from 'pixi.js';

export const colors = ['red', 'blue'] as const;
export type Color = typeof colors[number];

export const units = ['swordsmen', 'crosscowsoldier', 'knight', 'juggernaut', 'catapult', 'cannon'] as const;
type Unit = typeof units[number];

export const directions = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'] as const;
export type Direction = typeof directions[number];

export const states = ['idle', 'move', 'attack', 'dying', 'dead'] as const;
export type State = typeof states[number];

export type Animation = PIXI.Texture[];
export type Animations = Record<State, Record<Direction, Animation>>;


const getAnimationKey = (color: Color, unit: Unit, state: State, direction: Direction): string => {
    if (['catapult', 'cannon'].includes(unit)) {
        // have no color in their texture
        return `${unit}.${state}.${direction}`;
    }
    return `${unit}.${color}.${state}.${direction}`;
}

const getAnimation = (spritesheet: PIXI.Spritesheet, color: Color, unit: Unit, state: State, direction: Direction): Animation => {
    const key = getAnimationKey(color, unit, state, direction);
    if (spritesheet.animations[key] != null) {
        return spritesheet.animations[key];
    }
    // dead state is no animation
    if (spritesheet.textures[key + '.png'] != null) {
        return [spritesheet.textures[key + '.png']];
    }

    // else nothing found
    return [];
}

const loadByDirection = (spritesheet: PIXI.Spritesheet, color: Color, unit: Unit, state: State): Animations => {
    return directions.reduce((directionMap, direction) => {
        return {
            ...directionMap,
            [direction]: getAnimation(spritesheet, color, unit, state, direction),
        }
    }, {}) as Animations
};

const loadByUnit = (spritesheet: PIXI.Spritesheet, color: Color, unit: Unit): Animations => {
    return states.reduce((directionMap, state) => {
        return {
            ...directionMap,
            [state]: loadByDirection(spritesheet, color, unit, state),// todo implement me
        }
    }, {}) as Animations
}

const loadByColor = (spritesheet: PIXI.Spritesheet, color: Color): Record<Unit, Animations> => {
    return units.reduce((unitMap, unit) => {
        return {
            ...unitMap,
            [unit]: loadByUnit(spritesheet, color, unit),
        };
    }, {}) as Record<Unit, Animations>;
}

export type UnitAnimations = Record<Color, Record<Unit, Animations>>;

export const load = (spritesheet: PIXI.Spritesheet): UnitAnimations => {
    return colors.reduce((colorMap, color) => {
        return {
            ...colorMap,
            [color]: loadByColor(spritesheet, color)
        }
    }, {}) as UnitAnimations;
}

const rotationToDirectionMap = new Map<number, Direction>([
    [-135, 'northwest'],
    [-90, 'north'],
    [-45, 'northeast'],
    [0, 'east'],
    [45, 'southeast'],
    [90, 'south'],
    [135, 'southwest'],
    [180, 'west'],
]);

export const rotationToDirection = (rotation: number): Direction => {
    return rotationToDirectionMap.get(rotation) ?? 'north';
}