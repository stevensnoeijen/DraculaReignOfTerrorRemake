import { AssetsClass } from '@pixi/assets';
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

export type PixiAssetsInstance = {
  assets: AssetsClass;
};
