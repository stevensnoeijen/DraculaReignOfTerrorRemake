import { TreeOption } from 'naive-ui';

import { Entity } from './types';

export const unique = (items: any[]) => {
  return [...new Set(items)];
};

export const getLayers = (entities: Entity[]): string[] => {
  // get first layer names
  const layers = entities.map((entity) => {
    const layers = entity.name.split('/');
    layers.splice(-1);

    return layers[0];
  });
  return unique(layers.flat());
};

const createTreeOption = (entity: Entity, layer: string): TreeOption => {
  return {
    label: entity.name.replace(`${layer}/`, ''),
    key: entity.name,
  };
};

/**
 * Only support 1 layer atm.
 *
 * @param {Entity[]} entities
 * @returns {TreeOption[]}
 */
export const createTreeOptions = (entities: Entity[]): TreeOption[] => {
  const layers = getLayers(entities);
  console.log(layers);

  return layers.map((layer) => ({
    label: layer,
    key: layer,
    children: entities.map((entity) => createTreeOption(entity, layer)),
  }));
};
