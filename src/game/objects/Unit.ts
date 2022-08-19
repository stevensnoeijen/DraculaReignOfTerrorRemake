import { EditableProperty } from './decorator';

export class Unit {
  @EditableProperty({
    type: Number,
    nullable: false,
  })
  healthPointsMax!: number;

  @EditableProperty({
    type: Number,
    nullable: false,
  })
  combatAggroRange!: number;

  @EditableProperty({
    type: Number,
    nullable: false,
  })
  combatAttackRange!: number;

  @EditableProperty({
    type: Number,
    nullable: false,
  })
  combatAttackDamage!: number;

  @EditableProperty({
    type: String,
    nullable: false,
  })
  spriteModel!: string;

  @EditableProperty({
    type: [String],
    nullable: false,
  })
  soundMove!: string[];

  @EditableProperty({
    type: [String],
    nullable: false,
  })
  soundAttackTarget!: string[];

  @EditableProperty({
    type: [String],
    nullable: false,
  })
  soundAttackEffect!: string[];

  @EditableProperty({
    type: [String],
    nullable: false,
  })
  soundDead!: string[];

  @EditableProperty({
    type: String,
    nullable: false,
  })
  soundDeadByCatapult!: string | null;
}
