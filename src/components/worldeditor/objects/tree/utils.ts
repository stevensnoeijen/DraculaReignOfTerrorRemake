import { TreeOption } from 'naive-ui';

import { GameObject, isObject } from '~/game/data/ObjectsJson';
import { removeNullable } from '~/utils/array';

type LayeredObject<T> = Record<string, T> & { __key?: string };
type LayeredObjects = LayeredObject<
  GameObject | (Record<string, GameObject> & { __key?: string })
>;

const getLayeredEntities = (entities: GameObject[]): LayeredObjects => {
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
        } as LayeredObject<GameObject>;
      }
      currentLayer = currentLayer[layer] as LayeredObject<GameObject>;
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

export const createTreeOptions = (entities: GameObject[]): TreeOption[] => {
  return createChildren(getLayeredEntities(entities));
};
