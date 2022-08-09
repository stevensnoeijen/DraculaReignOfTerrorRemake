import { Component, Types } from 'ecsy';

import { EditableProperty } from '~/game/component.decorator';

export interface IHealthComponentProps {
  points: number;
  maxPoints: number;
}

export class HealthComponent extends Component<IHealthComponentProps> {
  static schema = {
    points: { type: Types.Number, default: 10 },
    maxPoints: { type: Types.Number, default: 10 },
  };

  @EditableProperty({
    type: Number,
    nullable: false,
  })
  points!: number;

  @EditableProperty({
    type: Number,
    nullable: false,
  })
  maxPoints!: number;

  takeHit(damage: number): void {
    this.points -= damage;
    console.log('take hit');
  }
}
