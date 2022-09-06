import * as PIXI from 'pixi.js';
import { Graphics } from 'pixi.js';
import { createSystem, queryComponents, Read, ReadOptional, WriteResource } from 'sim-ecs';

import { Transform } from '../../components/Transform';
import { Size } from '../../components/Size';
import { Selectable } from '../../components/input/Selectable';
import { Combat } from '../../components/ai/Combat';

import { getHealthColor } from './utils';

import { Options } from '~/game/utils';
import { Health } from '~/game/components/Health';

const drawHealthBar = (
  health: Health,
  graphics: PIXI.Graphics,
): void => {
  graphics.beginFill(0x000000);
  graphics.drawRect(-8, 12, 16, 5);
  graphics.endFill();

  const percentage = health.points / health.maxPoints;
  graphics.beginFill(getHealthColor(percentage));
  graphics.drawRect(-7, 13, 14 * percentage, 3);
  graphics.endFill();
};

const drawSelectionIndicators = (
  graphics: PIXI.Graphics,
  size: Size,
): void => {
  const offset = 4;
  const left = -size.width / 2 - offset;
  const top = -size.height / 2 - offset;
  const right = size.width / 2 + offset;

  // top left
  graphics
    .lineStyle(1, 0x000000)
    .moveTo(left, -6)
    .lineTo(left, top)
    .lineTo(left / 2, top);

  // top right
  graphics
    .lineStyle(1, 0x000000)
    .moveTo(right / 2, top)
    .lineTo(right, top)
    .lineTo(right, -6);
};

const drawAggroRadius = (
  combat: Combat,
  graphics: PIXI.Graphics,
): void => {

  graphics.lineStyle(1, 0xff0000);

  graphics.drawCircle(0, 0, combat.aggroRange);
};


let showAllHealth: boolean;
let showDebugAggro: boolean;

export const GraphicsRenderSystem = createSystem({
    options: WriteResource(Options),
    app: WriteResource(PIXI.Application),
    query: queryComponents({
      graphics: Read(Graphics),
      sprite: ReadOptional(PIXI.Sprite),
      animatedSprite: ReadOptional(PIXI.AnimatedSprite),
      size: Read(Size),
      selectable: ReadOptional(Selectable),
      transform: Read(Transform),
      health: ReadOptional(Health),
      combat: ReadOptional(Combat),
    }),
  })
  .withSetupFunction(({ options }) => {
    showAllHealth = options.showallhealth !== undefined
      ? options.showallhealth[0] == 'true'
      : false;
    showDebugAggro = options.debug?.includes('aggro') ?? false;
  })
  .withRunFunction(({
    app,
    query
  }) => {
    query.execute(({ graphics, sprite, animatedSprite, size, selectable, transform, health, combat }) => {
      // FIXME: graphics is added multiple times, optimise this
      app.stage.addChild(graphics as PIXI.Graphics);

      if (selectable != null && transform != null) {
        const target = (sprite ?? animatedSprite) as PIXI.Sprite;

        graphics.clear();
        graphics.position.set(transform.position.x, transform.position.y);

        if (selectable.selected) {
          drawSelectionIndicators(graphics as PIXI.Graphics, size);
        }
        if (health != null && (showAllHealth || selectable.selected)) {
          drawHealthBar(health as Health, graphics as PIXI.Graphics);
        }

        if (showDebugAggro && combat != null) {
          drawAggroRadius(combat, graphics as PIXI.Graphics);
        }
      } else {
        graphics.clear();
      }
    });
  })
  .build();