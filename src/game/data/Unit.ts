import { jsonArrayMember, jsonMember, jsonObject } from 'typedjson';

import { Range } from '../utils/Range';

import { EditableProperty } from './decorator';
import { EntityDefinition } from './EntityDefinition';

@jsonObject({
  preserveNull: true,
})
export class Unit {
  @EditableProperty({
    type: Number,
    nullable: false,
  })
  @jsonMember(Number)
  healthPointsMax!: number;

  @EditableProperty({
    type: Range,
    nullable: false,
  })
  @jsonMember(Range)
  combatAggroRange!: Range;

  @EditableProperty({
    type: Range,
    nullable: false,
  })
  @jsonMember(Range)
  combatAttackRange!: Range;

  @EditableProperty({
    type: Number,
    nullable: false,
  })
  @jsonMember(Number)
  combatAttackDamage!: number;

  @EditableProperty({
    type: Number,
    nullable: false,
  })
  @jsonMember(Number)
  combatAttackCooldown!: number;

  @EditableProperty({
    type: String,
    nullable: false,
  })
  @jsonMember(String)
  spriteModel!: string;

  @EditableProperty({
    type: [String],
    nullable: false,
  })
  @jsonArrayMember(String)
  soundCommand!: string[];

  @EditableProperty({
    type: [String],
    nullable: false,
  })
  @jsonArrayMember(String)
  soundAttackEffect!: string[];

  @EditableProperty({
    type: [String],
    nullable: false,
  })
  @jsonArrayMember(String)
  soundDead!: string[];

  @EditableProperty({
    type: String,
    nullable: true,
  })
  @jsonMember(String)
  soundDeadByCatapult!: string | null;

  public static fromJson(object: EntityDefinition): Unit {
    let unit = new Unit();
    unit = Object.assign(unit, object.properties);

    return unit;
  }
}
