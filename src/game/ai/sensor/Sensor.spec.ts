import { buildWorld } from 'sim-ecs';

import { Sensor } from './Sensor';

import { Modality } from '~/game/ai/sensor/Modality';

describe('Sensor', () => {
  const world = buildWorld()
    .build();

  describe('removeModalityByEntity', () => {
    const entity = world.buildEntity().build();
    const otherEntity = world.buildEntity().build();

    it('should remove modalities with the same entity', () => {
      const sensor = new Sensor(100);
      sensor.addModality(new Modality(entity, 10));
      sensor.addModality(new Modality(otherEntity, 10));

      sensor.removeModalityByEntity(entity);

      expect(sensor.modalities).toHaveLength(1);
      expect(sensor.modalities[0].entity).not.toEqual(entity);
    });

    it('should not remove modalities that do not have the same entity', () => {
      const sensor = new Sensor(100);
      sensor.addModality(new Modality(entity, 10));
      sensor.addModality(new Modality(otherEntity, 10));

      sensor.removeModalityByEntity(entity);

      expect(sensor.modalities).toHaveLength(1);
      expect(sensor.modalities[0].entity).toEqual(otherEntity);
    });

  });
});
