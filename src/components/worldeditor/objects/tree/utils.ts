import { TreeOption } from 'naive-ui';

import { isObject } from '~/game/data/ObjectsJson';
import { EntityDefinition } from '~/game/data/EntityDefinition';
import { removeNullable } from '~/utils/array';

type LayeredObject<T> = Record<string, T> & { __key?: string };
type LayeredObjects = LayeredObject<
  EntityDefinition | (Record<string, EntityDefinition> & { __key?: string })
>;

const getLayeredEntities = (entities: EntityDefinition[]): LayeredObjects => {
  const layered: LayeredObjects = {};

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
        } as LayeredObject<EntityDefinition>;
      }
      currentLayer = currentLayer[layer] as LayeredObject<EntityDefinition>;
    }
    currentLayer[entitySubname] = entity;
  }

  return layered;
};

const createChildren = (layeredEntities: LayeredObjects): TreeOption[] => {
  const options: TreeOption[] = [];

  for (const key of Object.keys(layeredEntities).sort()) {
    if (key === '__key') {
      continue;
    }
    const layerOrEntity = layeredEntities[key];
    if (isObject(layerOrEntity)) {
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

export const createTreeOptions = (
  entities: EntityDefinition[]
): TreeOption[] => {
  return createChildren(getLayeredEntities(entities));
};
