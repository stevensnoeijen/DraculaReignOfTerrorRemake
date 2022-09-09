interface HealthProps {
  points: number;
  maxPoints: number;
}

export class Health {
  private _points: number;
  public readonly maxPoints: number;

  constructor(props: HealthProps) {
    this._points = props.points;
    this.maxPoints = props.maxPoints;
  }

  get points (): number {
    return this._points;
  }

  takeHit(damage: number): void {
    this._points -= damage;
    console.log('take hit');
  }
}
