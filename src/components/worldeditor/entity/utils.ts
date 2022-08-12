import { TreeOption } from 'naive-ui';

import { Entity, isEntity } from './types';

import { removeNullable } from '~/utils/array';

type EntityObject<T> = Record<string, T> & { __key?: string };
type LayeredEntities = EntityObject<
  Entity | (Record<string, Entity> & { __key?: string })
>;

const getLayeredEntities = (entities: Entity[]): LayeredEntities => {
  const layered: LayeredEntities = {};

  for (const entity of entities) {
    let layers = entity.name.split('/');
    const entitySubname = layers.splice(-1)[0]; // remove entity's name
    layers = layers.filter(removeNullable);

    let currentLayer = layered;
    for (const layer of layers) {
      if (currentLayer[layer] == null) {
        currentLayer[layer] = {
          __key:
            (currentLayer.__key != null ? currentLayer.__key + '/' : '') +
            layer,
        } as EntityObject<Entity>;
      }
      currentLayer = currentLayer[layer] as EntityObject<Entity>;
    }
    currentLayer[entitySubname] = entity;
  }

  return layered;
};

const createChildren = (layeredEntities: LayeredEntities): TreeOption[] => {
  const options: TreeOption[] = [];

  for (const key of Object.keys(layeredEntities).sort()) {
    if (key === '__key') {
      continue;
    }
    const layerOrEntity = layeredEntities[key];
    if (isEntity(layerOrEntity)) {
      options.push({
        label: key,
        key: layerOrEntity.name,
      });
    } else {
      options.push({
        label: key,
        key: layerOrEntity.__key,
        children: createChildren(layerOrEntity),
      });
    }
  }

  return options;
};

export const createTreeOptions = (entities: Entity[]): TreeOption[] => {
  return createChildren(getLayeredEntities(entities));
};
