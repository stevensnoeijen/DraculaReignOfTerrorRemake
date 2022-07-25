import * as _ from 'lodash';

const PIXI = jest.requireActual('pixi.js');

export const Application = jest.fn().mockImplementation(() => ({
  name: 'mocked-pixi-application',
  ticker: {
    add: _.noop,
  },
  view: document.createElement('canvas'),
}));

export const settings = {
  RESOLUTION: PIXI.RESOLUTION,
};
