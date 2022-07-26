import * as PIXI from 'pixi.js';
import { mount } from '@vue/test-utils';

import PixiApplication from './PixiApplication.vue';
import PixiTicker from './PixiTicker.vue';

beforeEach(() => {
  jest.mocked(PIXI.Application).mockClear();
});

it('should error when pixi-ticker is not placed inside a pixi-application', () => {
  expect(() => {
    mount(PixiTicker);
  }).toThrowError('pixi-ticker must be used inside pixi-application');
});

it('should load pixi-ticker correctly', () => {
  const wrapper = mount(PixiApplication, {
    slots: {
      default: [PixiTicker],
    },
  });

  // TODO: add check is loaded correctly
});

// TODO: add tests for setting properties
// TODO: add tests for adding tick(Once) and remove when unmounted
