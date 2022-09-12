import { Position } from '../../math/types';

type Path = Position[];

export class MovePath {
  constructor(public path: Path = []) {}
}
