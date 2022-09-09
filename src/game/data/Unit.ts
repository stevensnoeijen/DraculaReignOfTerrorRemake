
import { EditableProperty } from './decorator';
import { GameObject } from './ObjectsJson';

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
    type: Number,
    nullable: false
  })
  combatAttackCooldown!: number;

  @EditableProperty({
    type: String,
    nullable: false,
  })
  spriteModel!: string;

  @EditableProperty({
    type: [String],
    nullable: false,
  })
  soundCommand!: string[];

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

  public static fromJson(object: GameObject): Unit {
    let unit = new Unit();
    unit = Object.assign(unit, {
      ...object.properties.reduce((prev, property) => ({
        ...prev,
        [property.field]: property.value,
      }), {})
    });

    return unit;
  }
}
