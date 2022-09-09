import * as PIXI from 'pixi.js';
import { createSystem, queryComponents, Read, ReadResource, ReadEntity, IEntity } from 'sim-ecs';

import { Input } from '../../Input';
import { getEntityAtPosition } from '../../utils/entity';
import { Selectable } from '../../components/input/Selectable';

import { MouseSelection } from './MouseSelection';

import { Team } from '~/game/components/Team';
import { isEntityInsideContainer } from '~/game/utils/entity';
import { isOnTeam } from '~/game/utils/components';

const mouseSelection = new MouseSelection();

 /**
   * Used for deselecting units when clicking,
   * but can be cancelled when dblclick-ing for moving entities.
   */
let deselectEntitiesTimeout: ReturnType<typeof setTimeout> | null = null;

const getSelected = (entities: IEntity[]): IEntity[] => {
  return entities.filter(
    (entity) => entity.getComponent(Selectable)?.isSelected() ?? false
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
    .forEach(entity => entity.getComponent(Selectable)?.deselect());
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
    isEntityInsideContainer(entity, {
      x: mouseSelection.startPosition!.x,
      y: mouseSelection.startPosition!.y,
      width,
      height,
    })
  )
  .filter(isOnTeam(Team.PLAYER))
  .forEach((entity) => entity.getComponent(Selectable)?.select());
};
const selectOneEntity = (entities: IEntity[]) => {
  // single unit select
  const entity = getEntityAtPosition(
    entities,
    Input.mousePosition.x,
    Input.mousePosition.y
  );
  if (entity != null && isOnTeam(Team.PLAYER)(entity)) {
    entity.getComponent(Selectable)?.select();
  } else {
    if (!Input.isMouseDblClick()) {
      // deselect entities in .3 sec, or do double-click action
      deselectEntitiesTimeout = setTimeout(() => {
        getSelected(entities)
          .forEach(e => e.getComponent(Selectable)?.deselect());
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
