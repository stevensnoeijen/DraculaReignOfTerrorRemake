import * as PIXI from 'pixi.js';

import { defineMockGetSetProperty } from './../../../__tests__/utils';

const realPIXI = jest.requireActual('pixi.js');

const callbacks: PIXI.TickerCallback<unknown>[] = [];
const ticker = {
  __name: 'mocked-pixi-ticker',
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

export type MockedTicker = PIXI.Ticker & typeof ticker;

defineMockGetSetProperty(ticker, 'autoStart', false);
defineMockGetSetProperty(ticker, 'maxFPS', 0);
defineMockGetSetProperty(ticker, 'minFPS', 10);
defineMockGetSetProperty(ticker, 'speed', 1);
defineMockGetSetProperty(ticker, 'priority', realPIXI.UPDATE_PRIORITY.NORMAL);

const application = {
  __name: 'mocked-pixi-application',
  ticker,
  view: document.createElement('canvas'),
};

export const Application = jest.fn().mockImplementation(() => application);

export type MockedApplication = PIXI.Application & typeof application;

export const settings = {
  RESOLUTION: realPIXI.RESOLUTION,
};

export const UPDATE_PRIORITY = realPIXI.UPDATE_PRIORITY;
