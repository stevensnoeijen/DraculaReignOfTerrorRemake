import * as PIXI from 'pixi.js';
import { Graphics } from 'pixi.js';
import {
  createSystem,
  queryComponents,
  Read,
  ReadOptional,
  WriteResource,
  ReadEvents,
  EntityAdded,
  ReadResource,
  EntityRemoved,
} from 'sim-ecs';

import { Transform } from '../../components/Transform';
import { Selectable } from '../../components/input/Selectable';
import { Combat } from '../../components/ai/Combat';
import { GraphicsRender } from '../../components/render/GraphicsRender';

import { GRAPHICS_LAYER } from './layers';
import { getHealthColor } from './utils';

import { SpriteRender } from '~/game/components/render/SpriteRender';
import { Health } from '~/game/components/Health';
import { Died } from '~/game/events/Died';
import { Options } from '~/game/Options';

const graphicsLayer = new PIXI.Container();

const drawHealthBar = (health: Health, graphics: PIXI.Graphics): void => {
  graphics.beginFill(0x000000);
  graphics.drawRect(-8, 12, 16, 5);
  graphics.endFill();

  const percentage = health.points / health.maxPoints;
  graphics.beginFill(getHealthColor(percentage));
  graphics.drawRect(-7, 13, 14 * percentage, 3);
  graphics.endFill();
};

const drawSelectionIndicators = (
  spriteRender: SpriteRender,
  graphicsRender: GraphicsRender
): void => {
  const offset = 4;
  const left = -(spriteRender.size?.width ?? 0) / 2 - offset;
  const top = -(spriteRender.size?.height ?? 0) / 2 - offset;
  const right = (spriteRender.size?.width ?? 0) / 2 + offset;

  // top left
  graphicsRender.graphics
    .lineStyle(1, 0x000000)
    .moveTo(left, -6)
    .lineTo(left, top)
    .lineTo(left / 2, top);

  // top right
  graphicsRender.graphics
    .lineStyle(1, 0x000000)
    .moveTo(right / 2, top)
    .lineTo(right, top)
    .lineTo(right, -6);
};

const drawAggroRadius = (combat: Combat, graphics: PIXI.Graphics): void => {
  graphics.lineStyle(1, 0xff0000);
  graphics.drawCircle(0, 0, combat.aggroRange);
};

let showAllHealth: boolean;
let showDebugAggro: boolean;

export const GraphicsRenderSystem = createSystem({
  options: ReadResource(Options),
  app: WriteResource(PIXI.Application),

  entityAdded: ReadEvents(EntityAdded),
  died: ReadEvents(Died),
  entityRemoved: ReadEvents(EntityRemoved),

  query: queryComponents({
    spriteRender: Read(SpriteRender),
    graphicsRender: Read(GraphicsRender),
    selectable: ReadOptional(Selectable),
    transform: Read(Transform),
    health: ReadOptional(Health),
    combat: ReadOptional(Combat),
  }),
})
  .withSetupFunction(({ options, app }) => {
    showAllHealth =
      options.showallhealth !== undefined
        ? options.showallhealth[0] == 'true'
        : false;
    showDebugAggro = options.debug?.includes('aggro') ?? false;

    app.stage.addChildAt(graphicsLayer, GRAPHICS_LAYER);
  })
  .withRunFunction(({ entityAdded, entityRemoved, died, query }) => {
    entityAdded.execute((event) => {
      if (event.entity.hasComponent(GraphicsRender))
        graphicsLayer.addChild(
          event.entity.getComponent(GraphicsRender)!.graphics
        );
    });
    entityRemoved.execute((event) => {
      if (event.entity.hasComponent(GraphicsRender))
        graphicsLayer.removeChild(
          event.entity.getComponent(GraphicsRender)!.graphics
        );
    });

    died.execute((event) => {
      if (event.entity.hasComponent(GraphicsRender)) {
        const graphics = event.entity.getComponent(GraphicsRender)!.graphics;
        graphicsLayer.removeChild(graphics);

        event.entity.removeComponent(Graphics);
      }
    });

    query.execute(
      ({
        spriteRender,
        graphicsRender,
        selectable,
        transform,
        health,
        combat,
      }) => {
        if (selectable != null && transform != null) {
          graphicsRender.graphics.clear();
          graphicsRender.graphics.position.set(
            transform.position.x,
            transform.position.y
          );

          if (selectable.isSelected()) {
            drawSelectionIndicators(spriteRender, graphicsRender);
          }
          if (health != null && (showAllHealth || selectable.isSelected())) {
            drawHealthBar(health as Health, graphicsRender.graphics);
          }

          if (showDebugAggro && combat != null) {
            drawAggroRadius(combat, graphicsRender.graphics);
          }
        } else {
          graphicsRender.graphics.clear();
        }
      }
    );
  })
  .build();
