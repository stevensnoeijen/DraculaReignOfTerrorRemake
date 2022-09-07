import { TeamColor } from './../types';

export class Team {
  public static readonly PLAYER = new Team('blue');
  public static readonly CPU = new Team('red');

  constructor(
    public readonly color: TeamColor,
  ) {}

  public equals (other: Team) {
    return this.color === other.color;
  }
}
