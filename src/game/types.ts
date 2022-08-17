export const TEAM_COLORS = ['red', 'blue'] as const;
export type TeamColor = typeof TEAM_COLORS[number];

export const UNIT_TYPES = [
  'swordsmen',
  'crossbowsoldier',
  'knight',
  'juggernaut',
  'catapult',
  'cannon',
] as const;
export type UnitType = typeof UNIT_TYPES[number];

export const MOVE_DIRECTIONS = [
  'north',
  'northeast',
  'east',
  'southeast',
  'south',
  'southwest',
  'west',
  'northwest',
] as const;
export type MoveDirection = typeof MOVE_DIRECTIONS[number];

export const UNIT_STATES = ['idle', 'move', 'attack', 'dying', 'dead'] as const;
export type UnitState = typeof UNIT_STATES[number];
