import { TreeOption } from 'naive-ui';

import { EntityDefinition } from '~/game/data/EntityDefinition';
import { removeNullable } from '~/utils/array';

type LayeredEntityDefinition<T> = Record<string, T> & { __key?: string };
type LayeredEntityDefinitions = LayeredEntityDefinition<
  EntityDefinition | (Record<string, EntityDefinition> & { __key?: string })
>;

const getLayeredEntityDefinitions = (
  entityDefinitions: EntityDefinition[]
): LayeredEntityDefinitions => {
  const layered: LayeredEntityDefinitions = {};

  for (const entityDefinition of entityDefinitions) {
    let layers = entityDefinition.name.split('/');
    const entitySubname = layers.splice(-1)[0]; // remove entity's name
    layers = layers.filter(removeNullable);

    let currentLayer = layered;
    for (const layer of layers) {
      if (currentLayer[layer] == null) {
        currentLayer[layer] = {
          __key:
            (currentLayer.__key != null ? currentLayer.__key + '/' : '') +
            layer,
        } as LayeredEntityDefinition<EntityDefinition>;
      }
      currentLayer = currentLayer[
        layer
      ] as LayeredEntityDefinition<EntityDefinition>;
    }
    currentLayer[entitySubname] = entityDefinition;
  }

  return layered;
};

const createChildren = (
  layeredEntityDefinitions: LayeredEntityDefinitions
): TreeOption[] => {
  const options: TreeOption[] = [];

  for (const key of Object.keys(layeredEntityDefinitions).sort()) {
    if (key === '__key') {
      continue;
    }
    const layerOrEntity = layeredEntityDefinitions[key];
    if (layerOrEntity instanceof EntityDefinition) {
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
  return createChildren(getLayeredEntityDefinitions(entities));
};
