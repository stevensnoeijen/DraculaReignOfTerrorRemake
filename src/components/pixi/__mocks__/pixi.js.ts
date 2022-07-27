import * as PIXI from 'pixi.js';

import { defineMockGetSetProperty } from './../../../__tests__/utils';

const realPIXI = jest.requireActual('pixi.js');

export type MockedTicker = PIXI.Ticker & {
  __name: string;
  emit: (delta: number) => void;
};

export const Ticker = jest.fn().mockImplementation(() => {
  const callbacks: PIXI.TickerCallback<unknown>[] = [];

  const ticker = {
    __name: 'mocked-pixi-ticker',
    add: jest.fn((callback: PIXI.TickerCallback<unknown>) =>
      callbacks.push(callback)
    ),
    addOnce: jest.fn((callback: PIXI.TickerCallback<unknown>) =>
      callbacks.push(callback)
    ),
    remove: jest.fn(),
    emit: (delta: number) => {
      callbacks.forEach((callback) => callback(delta));
    },
  };

  // set default properties
  defineMockGetSetProperty(ticker, 'autoStart', false);
  defineMockGetSetProperty(ticker, 'maxFPS', 0);
  defineMockGetSetProperty(ticker, 'minFPS', 10);
  defineMockGetSetProperty(ticker, 'speed', 1);
  defineMockGetSetProperty(ticker, 'priority', realPIXI.UPDATE_PRIORITY.NORMAL);

  return ticker;
});

export type MockedLoader = PIXI.Loader & { __name: string };

type SignalListeners =
  | PIXI.Loader.OnStartSignal
  | PIXI.Loader.OnProgressSignal
  | PIXI.Loader.OnLoadSignal
  | PIXI.Loader.OnCompleteSignal
  | PIXI.Loader.OnErrorSignal;

export const Loader = jest.fn().mockImplementation(() => {
  const createSignal = () => {
    const listeners: SignalListeners[] = [];

    return {
      add: jest.fn((listener: SignalListeners) => listeners.push(listener)),
      dispatch: (...args: Parameters<SignalListeners>) => {
        // @ts-ignore TODO: replace or remove ts-ignore
        listeners.forEach((listener) => listener(...args));
      },
      detach: jest.fn(),
    };
  };

  const loader = {
    __name: 'mocked-pixi-loader',
    add: jest.fn(),
    load: jest.fn(),
    onStart: createSignal(),
    onProgress: createSignal(),
    onLoad: createSignal(),
    onComplete: createSignal(),
    onError: createSignal(),
    resources: {} as Record<string, PIXI.LoaderResource>,
  };

  // set default properties
  defineMockGetSetProperty(loader, 'baseUrl', '');
  defineMockGetSetProperty(loader, 'concurrency', 10);
  defineMockGetSetProperty(loader, 'defaultQueryString', '');

  return loader;
});

export type MockedApplication = PIXI.Application & { __name: string };

export const Application = jest.fn().mockImplementation(() => {
  return {
    __name: 'mocked-pixi-application',
    ticker: new Ticker(),
    loader: new Loader(),
    view: document.createElement('canvas'),
    stage: {
      addChild: jest.fn(),
    },
  };
});

export const settings = {
  RESOLUTION: realPIXI.RESOLUTION,
};

export const UPDATE_PRIORITY = realPIXI.UPDATE_PRIORITY;

export const Rectangle = realPIXI.Rectangle;
