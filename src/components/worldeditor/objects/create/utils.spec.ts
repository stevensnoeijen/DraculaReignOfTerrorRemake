import { createEmptyObject, getDefaultValueByType } from './utils';

import { GameObject } from '~/game/objects/ObjectsJson';


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
    expect(() => getDefaultValueByType(Date)).toThrowError();
  });
});

describe('createEmptyObject', () => {
  it('should set all properties', () => {
    const object = createEmptyObject();

    expect(object.properties).toHaveLength(9);
  });

  const testObjectProperties = (
    object: GameObject,
    properties: readonly string[],
    expectedValue: unknown
  ) => {
    properties.forEach((property) => {
      expect(object.properties).toContainEqual({
        field: property,
        value: expectedValue,
      });
    });
  };

  const NUMBER_PROPERTIES = [
    'healthPointsMax',
    'combatAggroRange',
    'combatAttackRange',
    'combatAttackDamage',
  ] as const;
  const STRING_PROPERTIES = ['spriteModel', 'soundDeadByCatapult'] as const;
  const STRING_ARRAY_PROPERTIES = [
    'soundCommand',
    'soundAttackEffect',
    'soundDead',
  ] as const;

  // eslint-disable-next-line jest/expect-expect
  it('should set default values', () => {
    const object = createEmptyObject();

    testObjectProperties(object, NUMBER_PROPERTIES, 0);
    testObjectProperties(object, STRING_PROPERTIES, '');
    testObjectProperties(object, STRING_ARRAY_PROPERTIES, []);
  });
});
