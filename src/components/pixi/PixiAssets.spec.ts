import { Assets } from '@pixi/assets';
import { mount } from '@vue/test-utils';

import PixiAssets from './PixiAssets.vue';

afterEach(() => {
  Assets.reset();
});

it('should expose Assets', () => {
  const wrapper = mount(PixiAssets);
  const assets = wrapper.vm.assets;

  expect(assets).toBeDefined();
});

it('should init on mount', () => {
  const wrapper = mount(PixiAssets);
  const assets = wrapper.vm.assets;

  expect(assets['_initialized']).toBeTruthy();
});

it('should reset on mount', () => {
  const wrapper = mount(PixiAssets);
  const assets = wrapper.vm.assets;
  wrapper.unmount();

  expect(assets['_initialized']).not.toBeTruthy();
});
