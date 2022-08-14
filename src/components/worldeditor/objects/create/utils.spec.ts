import { GameObject } from '../ObjectsJson';

import { createEmptyObject } from './utils';

describe('createEmptyObject', () => {
  it('should set all properties', () => {
    const object = createEmptyObject();

    expect(object.properties).toHaveLength(10);
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
    'soundMove',
    'soundAttackTarget',
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
