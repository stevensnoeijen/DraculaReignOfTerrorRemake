import * as PIXI from 'pixi.js';

import { defineMockGetSetProperty } from './../../../__tests__/utils';

const realPIXI = jest.requireActual('pixi.js');

const callbacks: PIXI.TickerCallback<unknown>[] = [];
const ticker = {
  add: jest.fn((callback: PIXI.TickerCallback<unknown>) =>
    callbacks.push(callback)
  ),
  addOnce: jest.fn((callback: PIXI.TickerCallback<unknown>) =>
    callbacks.push(callback)
  ),
  emit: (delta: number) => {
    callbacks.forEach((callback) => callback(delta));
  },
};

export type MockedTicker = typeof ticker;

defineMockGetSetProperty(ticker, 'autoStart', false);
defineMockGetSetProperty(ticker, 'maxFPS', 0);
defineMockGetSetProperty(ticker, 'minFPS', 10);
defineMockGetSetProperty(ticker, 'speed', 1);
defineMockGetSetProperty(ticker, 'priority', realPIXI.UPDATE_PRIORITY.NORMAL);

export const Application = jest.fn().mockImplementation(() => ({
  name: 'mocked-pixi-application',
  ticker,
  view: document.createElement('canvas'),
}));

export const settings = {
  RESOLUTION: realPIXI.RESOLUTION,
};
