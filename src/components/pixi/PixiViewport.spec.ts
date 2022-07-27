import { mount } from '@vue/test-utils';
import { Viewport } from 'pixi-viewport';

import PixiApplication from './PixiApplication.vue';
import PixiViewport from './PixiViewport.vue';

// beforeEach(() => {
//   jest.mocked(PIXI.Application).mockClear();
// });

it('should expose viewport', () => {
  const wrapper = mount(PixiApplication, {
    slots: {
      default: [PixiViewport],
    },
  });
  const component = wrapper.getComponent(PixiViewport);
  const viewport = component.vm.viewport;

  expect(viewport).toBeInstanceOf(Viewport);
});

it('should error when not placed inside a pixi-application', () => {
  expect(() => {
    mount(PixiViewport);
  }).toThrowError('pixi-viewport must be used inside pixi-application');
});
