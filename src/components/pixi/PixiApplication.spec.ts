import * as PIXI from 'pixi.js';
import { mount } from '@vue/test-utils';

import PixiApplication from './PixiApplication.vue';

it('should expose pixi application', () => {
  const wrapper = mount(PixiApplication);

  expect(wrapper.vm.application.name).toEqual('mocked-pixi-application');
});

it('should not set any options in PIXI.Application when none are set', () => {
  mount(PixiApplication);

  expect(jest.mocked(PIXI.Application).mock.calls[0][0]).toBeUndefined();
});
