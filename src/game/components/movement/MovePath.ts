import { Point } from '../../math/types';

type Path = Point[];

export class MovePath {
  constructor(public path: Path = []) {}
}
