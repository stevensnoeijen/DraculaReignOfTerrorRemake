import { $Keys } from 'utility-types';

import { createEmptyEntityDefinition, getDefaultValueByType } from './utils';

import { EntityDefinition } from '~/game/data/EntityDefinition';
import { Unit } from '~/game/data/Unit';

describe('getDefaultValueByType', () => {
  it.each([
    [String, ''],
    [Number, 0],
    [Boolean, false],
  ])(
    'should create %O when %s is given',
    (type: unknown, expectedResponse: unknown) => {
      expect(getDefaultValueByType(type)).toBe(expectedResponse);
    }
  );

  it('should create throw error when unknown type is given', () => {
    expect(() => getDefaultValueByType(Date)).toThrow();
  });
});

describe('createEmptyEntityDefinition', () => {
  it('should set all properties', () => {
    const entityDefinition = createEmptyEntityDefinition();

    expect(Object.keys(entityDefinition.properties)).toHaveLength(10);
  });

  const testProperties = (
    entityDefinition: EntityDefinition,
    keys: readonly $Keys<Unit>[],
    expectedValue: unknown
  ) => {
    keys.forEach((key) => {
      expect(entityDefinition.properties[key]).toEqual(expectedValue);
    });
  };

  const NUMBER_PROPERTIES = [
    'healthPointsMax',
    'combatAttackRange',
    'combatAttackDamage',
  ] as const;
  const STRING_PROPERTIES = ['spriteModel', 'soundDeadByCatapult'] as const;
  const STRING_ARRAY_PROPERTIES = [
    'soundCommand',
    'soundAttackEffect',
    'soundDead',
  ] as const;
  const RANGE_PROPERTIES = ['combatAggroRange'] as const;

  // eslint-disable-next-line jest/expect-expect
  it('should set default values', () => {
    const entityDefinition = createEmptyEntityDefinition();

    testProperties(entityDefinition, NUMBER_PROPERTIES, 0);
    testProperties(entityDefinition, STRING_PROPERTIES, '');
    testProperties(entityDefinition, STRING_ARRAY_PROPERTIES, []);
    testProperties(entityDefinition, RANGE_PROPERTIES, { min: 0, max: 0 });
  });
});
