import { Entity } from 'ecsy';

import { Input } from './Input';
import { Constants } from './Constants';
import { Vector2 } from './math/Vector2';
import * as PathFinding from './ai/pathfinding';
import { TransformComponent } from './systems/TransformComponent';

import { Predicate } from '~/utils/types';

export const filterEmpty = Boolean as <T>(t: T) => NonNullable<T>;

export class Options {
  [key: string]: string[] | undefined;
}

export const getOptions = (): Options => {
  if (window.location.hash.indexOf('?') === -1) {
    return new Options();
  }

  return window.location.hash
    .substring(window.location.hash.indexOf('?') + 1)
    .split('&')
    .filter(filterEmpty)
    .map((option) => option.split('='))
    .reduce((acc, curr) => {
      acc[curr[0]] = curr[1].split(',').filter(filterEmpty);
      return acc;
    }, new Options());
};

export type HasEquals = { equals: (other: unknown) => boolean };

export const toEqual = <T extends HasEquals>(other: T): Predicate<T> => {
  return (item: T) => item.equals(other);
};

export const arrayIncludesByEquals = <T extends HasEquals>(
  array: T[],
  object: T
): boolean => {
  return array.find(toEqual(object)) != null;
};

export const toWorldPositionCellCenter = (vector: Vector2): Vector2 => {
  return new Vector2(
    vector.x - (vector.x % Constants.CELL_SIZE) + Constants.CELL_SIZE / 2,
    vector.y - (vector.y % Constants.CELL_SIZE) + Constants.CELL_SIZE / 2
  );
};

export const toWorldPosition = (vector: Vector2): Vector2 => {
  return new Vector2(
    vector.x * Constants.CELL_SIZE + Constants.CELL_SIZE / 2,
    vector.y * Constants.CELL_SIZE + Constants.CELL_SIZE / 2
  );
};

/**
 *
 * @param {number} x
 * @param {number} y
 * @returns {Vector2} centered cell vector
 */
export const cellPositionToVector = (x: number, y: number): Vector2 => {
  return toWorldPosition(new Vector2(x, y));
};

export const toGridPosition = (vector: Vector2): Vector2 => {
  return Vector2.divides(vector, Constants.CELL_SIZE, 'floor');
};

export const getMouseGridPosition = () => toGridPosition(Input.mousePosition);

export type Position = { x: number; y: number };

export const convertPathfindingPathToPositions = (
  path: PathFinding.Path
): Position[] => {
  return path.map(({ position }) => position);
};

export const getCell = (entity: Entity): Position => {
  const component = entity.getComponent(TransformComponent)!;
  const { x, y } = toGridPosition(component.position);

  return { x, y };
};

export type Comparator<T> = (a: T, b: T) => number;

export const falsePredicate: Predicate<unknown> = () => false;

export const keepOrder: Comparator<unknown> = () => 0;

export const not = <T>(predicate: Predicate<T>): Predicate<T> => {
  return (obj) => !predicate(obj);
};
