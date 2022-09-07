import * as PIXI from 'pixi.js';
import { createSystem, queryComponents, Read, ReadResource, ReadEntity, IEntity } from 'sim-ecs';

import { EntityHelper } from '../../EntityHelper';
import { Input } from '../../Input';
import { getEntityAtPosition } from '../utils';
import { Selectable } from '../../components/input/Selectable';
import { isOnTeam } from '../utils/index';

import { MouseSelection } from './MouseSelection';

import { Team } from '~/game/components/Team';

const mouseSelection = new MouseSelection();

 /**
   * Used for deselecting units when clicking,
   * but can be cancelled when dblclick-ing for moving entities.
   */
let deselectEntitiesTimeout: ReturnType<typeof setTimeout> | null = null;

const getSelected = (entities: IEntity[]): IEntity[] => {
  return entities.filter(
    (entity) => entity.getComponent(Selectable)?.selected || false
  );
};

const selectEntities = (entities: IEntity[]) => {
  if (mouseSelection.isSimpleClick()) {
    selectOneEntity(entities);
  } else {
    selectEntitiesInsideSelectionRectangle(entities);
  }
};

const updateSelect = (entities: IEntity[]) => {
  mouseSelection.update();
  getSelected(entities)
    .forEach(EntityHelper.deselect);
};

const endSelect = (entities: IEntity[]) => {
  selectEntities(entities);
  mouseSelection.end();
};

const selectEntitiesInsideSelectionRectangle = (entities: IEntity[]) => {
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
    .filter(isOnTeam(Team.PLAYER))
    .forEach((entity) => EntityHelper.select(entity));
};
const selectOneEntity = (entities: IEntity[]) => {
  // single unit select
  const entity = getEntityAtPosition(
    entities,
    Input.mousePosition.x,
    Input.mousePosition.y
  );
  if (entity != null && isOnTeam(Team.PLAYER)(entity)) {
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

const updateMouseSelection = (entities: IEntity[]) => {
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
    .map(e => e.entity);

  updateMouseSelection(entities);
})
.build();
