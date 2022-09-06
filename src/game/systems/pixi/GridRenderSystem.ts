import { createSystem, ReadResource } from 'sim-ecs';
import * as PIXI from 'pixi.js';
import { DashLine } from 'pixi-dashed-line';

import { Constants } from '../../Constants';
import { Options } from '../../utils';

import { GRID_LAYER } from './layers';

const graphics = new PIXI.Graphics();

const draw = (app: PIXI.Application, options: Options) => {
  graphics.clear();

  if (!options.debug?.includes('grid')) {
    return;
  }

  const dash = new DashLine(graphics, {
    dash: [5, 5],
    width: 1,
    color: 0xaaaaaa,
  });

  for (
    let height = Constants.CELL_SIZE;
    height < app.screen.height;
    height += Constants.CELL_SIZE
  ) {
    // horizontal lines
    dash.moveTo(0, height).lineTo(app.screen.width, height);
  }

  for (
    let width = Constants.CELL_SIZE;
    width < app.screen.width;
    width += Constants.CELL_SIZE
  ) {
    // vertical lines
    dash.moveTo(width, 0).lineTo(width, app.screen.height);
  }
};

export const GridRenderSystem = createSystem({
    app: ReadResource(PIXI.Application),
    options: ReadResource(Options),
  })
  .withSetupFunction(({ app, options }) => {
    window.onresize = () => draw(app, options);

    app.stage.addChildAt(graphics, GRID_LAYER);
    draw(app, options);
  })
  .build();
