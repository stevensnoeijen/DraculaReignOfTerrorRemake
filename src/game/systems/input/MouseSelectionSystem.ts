import { Entity } from 'ecsy';
import * as PIXI from 'pixi.js';
import { createSystem, queryComponents, Read, ReadResource, ReadEntity } from 'sim-ecs';

import { EntityHelper } from '../../EntityHelper';
import { Input } from '../../Input';
import { getEntityAtPosition, getSimComponent } from '../utils';
import { Selectable } from '../../components/player/Selectable';
import { isOnTeam } from '../utils/index';
import { EcsyEntity } from '../../components/EcsyEntity';
import { MouseSelection } from '../player/MouseSelection';

const mouseSelection = new MouseSelection();

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
  if (mouseSelection.isSimpleClick()) {
    selectOneEntity(entities);
  } else {
    selectEntitiesInsideSelectionRectangle(entities);
  }
};

const updateSelect = (entities: Entity[]) => {
  mouseSelection.update();
  getSelected(entities)
    .forEach(EntityHelper.deselect);
};

const endSelect = (entities: Entity[]) => {
  selectEntities(entities);
  mouseSelection.end();
};

const selectEntitiesInsideSelectionRectangle = (entities: Entity[]) => {
  const width = Input.mousePosition.x - mouseSelection.startPosition!.x;
  const height = Input.mousePosition.y - mouseSelection.startPosition!.y;

  // get entities inside selector
  entities.filter((entity) =>
      EntityHelper.isObjectInsideContainer(entity, {
        x: mouseSelection.startPosition!.x,
        y: mouseSelection.startPosition!.y,
        width,
        height,
      })
    )
    .filter(isOnTeam(1))
    .forEach((entity) => EntityHelper.select(entity));
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

const updateMouseSelection = (entities: Entity[]) => {
  if (Input.isMouseDblClick() && deselectEntitiesTimeout !== null) {
    clearTimeout(deselectEntitiesTimeout);
  }

  if (mouseSelection.started) {
    if (Input.isMouseButtonUp(0)) {
      endSelect(entities);
    } else if (mouseSelection.isDragging()) {
      updateSelect(entities);
    }
  }

  if (!mouseSelection.started && Input.isMouseButtonDown(0)) {
    mouseSelection.start();
  }
};

/**
 * System for selecting units with {@link Input}'s' mouse.
 */
export const MouseSelectionSystem = createSystem({
  app: ReadResource(PIXI.Application),
  query: queryComponents({
    entity: ReadEntity(),
    selectable: Read(Selectable),
  }),
})
.withSetupFunction(({ app }) => {
  app.stage.addChild(mouseSelection.rectangle);
})
.withRunFunction(({
  query
}) => {
  const entities = Array.from(query.iter())
    .map(e => e.entity.getComponent(EcsyEntity)!.entity);

  updateMouseSelection(entities);
})
.build();
