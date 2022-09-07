import * as PIXI from 'pixi.js';
import { default as generateEllerMaze } from 'generate-maze';

import { Constants } from '../constants';

type Size = { width: number; height: number };

export const getGridSizeByScreen = (app: PIXI.Application): Size => {
  return {
    width: Math.ceil(app.screen.width / Constants.CELL_SIZE),
    height: Math.ceil(app.screen.height / Constants.CELL_SIZE),
  };
};

export const createEmptyGrid = (size: Size): number[][] => {
  return Array.from({ length: size.height }, () =>
    Array.from({ length: size.width }, () => 0)
  );
};

type MazeObject = {
  x: number;
  y: number;
  top: boolean;
  left: boolean;
  bottom: boolean;
  right: boolean;
};

export const generateMaze = (size: Size): number[][] => {
  const ellerMaze = generateEllerMaze(
    Math.floor(size.width / 2),
    Math.floor(size.height / 2),
    true,
    Math.random() * 1000
  ) as MazeObject[][];

  return convertEllerMazeToGrid(ellerMaze);
};

const convertEllerMazeToGrid = (ellerMaze: MazeObject[][]): number[][] => {
  const map: number[][] = [];
  for (const row of ellerMaze) {
    map[row[0].y * 2] = [];
    map[row[0].y * 2 + 1] = [];
    map[row[0].y * 2 + 2] = [];
    for (const column of row) {
      map[column.y * 2][column.x * 2] = 1; // top left
      map[column.y * 2 + 1][column.x * 2] = column.left ? 1 : 0; // left
      map[column.y * 2][column.x * 2 + 1] = column.top ? 1 : 0; // top
      map[column.y * 2][column.x * 2 + 2] = 1; // top right
      map[column.y * 2 + 1][column.x * 2 + 1] = 0; // center
      map[column.y * 2 + 1][column.x * 2 + 2] = column.right ? 1 : 0; // right
      map[column.y * 2 + 2][column.x * 2 + 2] = 1; // right bottom
      map[column.y * 2 + 2][column.x * 2 + 1] = column.bottom ? 1 : 0; // bottom
      map[column.y * 2 + 2][column.x * 2] = 1; // bottom right
    }
  }

  return map;
};
