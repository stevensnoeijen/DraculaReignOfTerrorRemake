import { defineMockGetSetProperty } from './../../../__tests__/utils';
const PIXI = jest.requireActual('pixi.js');

const ticker = {
  add: jest.fn(),
  addOnce: jest.fn(),
};

defineMockGetSetProperty(ticker, 'autoStart', false);
defineMockGetSetProperty(ticker, 'maxFPS', 0);
defineMockGetSetProperty(ticker, 'minFPS', 10);
defineMockGetSetProperty(ticker, 'speed', 1);
defineMockGetSetProperty(ticker, 'priority', PIXI.UPDATE_PRIORITY.NORMAL);

export const Application = jest.fn().mockImplementation(() => ({
  name: 'mocked-pixi-application',
  ticker,
  view: document.createElement('canvas'),
}));

export const settings = {
  RESOLUTION: PIXI.RESOLUTION,
};
