import { Entity } from 'ecsy';
import * as PIXI from 'pixi.js';
import { createSystem, queryComponents, Read, ReadResource, ReadEntity } from 'sim-ecs';

import { EntityHelper } from '../../EntityHelper';
import { Vector2 } from '../../math/Vector2';
import { Input } from '../../Input';
import { getEntityAtPosition, getSimComponent } from '../utils';
import { Selectable } from '../../components/player/Selectable';
import { isOnTeam } from '../utils/index';

import { EcsyEntity } from './../../components/EcsyEntity';

const SINGLE_UNIT_DISTANCE = 5;

/**
 * Start selection.
 */
let startPosition: Vector2 | null = null;
const rectangle = new PIXI.Graphics();
rectangle.visible = false;

 /**
   * Used for deselecting units when clicking,
   * but can be cancelled when dblclick-ing for moving entities.
   */
let deselectEntitiesTimeout: ReturnType<typeof setTimeout> | null = null;

const getSelected = (entities: Entity[]): Entity[] => {
  return entities.filter(
    (entity) => getSimComponent(entity, Selectable)?.selected || false
  );
};

const selectEntities = (entities: Entity[]) => {
  if (isSimpleClick()) {
    selectOneEntity(entities);
  } else {
    selectEntitiesInsideSelectionRectangle(entities);
  }
};

const startSelect = () => {
  rectangle.visible = true;
};

const updateSelect = (entities: Entity[]) => {
  const width = Input.mousePosition.x - startPosition!.x;
  const height = Input.mousePosition.y - startPosition!.y;

  getSelected(entities)
    .forEach(EntityHelper.deselect);

  rectangle.clear();
  rectangle.lineStyle(1, 0x000000);
  rectangle.drawRect(
    startPosition!.x,
    startPosition!.y,
    width,
    height
  );
};

const endSelect = (entities: Entity[]) => {
  selectEntities(entities);

  startPosition = null;

  rectangle.visible = false;
  rectangle.clear();
};

const selectEntitiesInsideSelectionRectangle = (entities: Entity[]) => {
  const width = Input.mousePosition.x - startPosition!.x;
  const height = Input.mousePosition.y - startPosition!.y;

  // get entities inside selector
  entities.filter((entity) =>
      EntityHelper.isObjectInsideContainer(entity, {
        x: startPosition!.x,
        y: startPosition!.y,
        width,
        height,
      })
    )
    .filter(isOnTeam(1))
    .forEach((entity) => EntityHelper.select(entity));
};

const isSimpleClick = (): boolean => {
  return (
    Vector2.distance(startPosition!, Input.mousePosition) <
    SINGLE_UNIT_DISTANCE
  );
};

const selectOneEntity = (entities: Entity[]) => {
  // single unit select
  const entity = getEntityAtPosition(
    entities,
    Input.mousePosition.x,
    Input.mousePosition.y
  );
  if (entity != null && isOnTeam(1)(entity)) {
    EntityHelper.select(entity);
  } else {
    if (!Input.isMouseDblClick()) {
      // deselect entities in .3 sec, or do double-click action
      deselectEntitiesTimeout = setTimeout(() => {
        getSelected(entities)
          .forEach(EntityHelper.deselect);
      }, 300);
    }
    return;
  }
};

/**
 * System for selecting units with {@link Input}'s' mouse.
 */
export const PlayerSelectionSystem = createSystem({
  app: ReadResource(PIXI.Application),
  query: queryComponents({
    entity: ReadEntity(),
    selectable: Read(Selectable),
  }),
})
.withSetupFunction(({ app }) => {
  app.stage.addChild(rectangle);
})
.withRunFunction(({
  query
}) => {
  const entities = Array.from(query.iter()).map(e => e.entity.getComponent(EcsyEntity)!.entity);

  if (Input.isMouseDblClick() && deselectEntitiesTimeout !== null) {
    clearTimeout(deselectEntitiesTimeout);
  }

  if (startPosition === null) {
    if (Input.isMouseButtonDown(0)) {
      startPosition = Input.mousePosition;
      startSelect();
    }
  } else {
    // selector is active
    if (Input.isMouseButtonUp(0)) {
      endSelect(entities);
    } else if (
      Vector2.distance(startPosition, Input.mousePosition) >
      SINGLE_UNIT_DISTANCE
    ) {
      // mouse is dragging
      updateSelect(entities);
    }
  }

  query.execute(({ selectable }) => {

  });
})
.build();
