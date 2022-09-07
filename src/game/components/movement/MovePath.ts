import { Position } from '../../utils/types';

type Path = Position[];

export class MovePath {
  constructor (
    public path: Path = [],
  ) {}
}
