import { Component, Types } from 'ecsy';

export interface IHealthComponentProps {
  points: number;
  maxPoints: number;
}

export class HealthComponent extends Component<IHealthComponentProps> {
  static schema = {
    points: { type: Types.Number, default: 10 },
    maxPoints: { type: Types.Number, default: 10 },
  };

  points!: number;
  maxPoints!: number;

  takeHit(damage: number): void {
    this.points -= damage;
    console.log('take hit');
  }
}
