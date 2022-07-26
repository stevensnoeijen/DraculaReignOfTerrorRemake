import { Viewport } from 'pixi-viewport';
import * as PIXI from 'pixi.js';

export type PixiApplicationInstance = {
  application: PIXI.Application;
};

export type PixiTickerInstance = {
  ticker: PIXI.Ticker;
};

export type PixiLoaderInstance = {
  loader: PIXI.Loader;
};

export type PixiViewportInstance = {
  viewport: Viewport;
};
