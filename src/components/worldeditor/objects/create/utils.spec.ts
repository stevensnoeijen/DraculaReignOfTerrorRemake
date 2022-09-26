import { createEmptyObject, getDefaultValueByType } from './utils';

import { GameObject } from '~/game/data/ObjectsJson';

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

describe('createEmptyObject', () => {
  it('should set all properties', () => {
    const object = createEmptyObject();

    expect(Object.keys(object.properties)).toHaveLength(10);
  });

  const testObjectProperties = (
    object: GameObject,
    keys: readonly string[],
    expectedValue: unknown
  ) => {
    keys.forEach((key) => {
      expect(object.properties[key]).toEqual(expectedValue);
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
    const object = createEmptyObject();

    testObjectProperties(object, NUMBER_PROPERTIES, 0);
    testObjectProperties(object, STRING_PROPERTIES, '');
    testObjectProperties(object, STRING_ARRAY_PROPERTIES, []);
    testObjectProperties(object, RANGE_PROPERTIES, { min: 0, max: 0 });
  });
});
