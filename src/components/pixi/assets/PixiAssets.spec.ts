import { AssetInitOptions, Assets } from '@pixi/assets';
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

it('should set options', async () => {
  const WrapperComponent = {
    template: `
    <PixiAssets
      :options="options"
    />
    `,
    components: {
      PixiAssets,
    },
    data() {
      return {
        options: {
          basePath: 'htts://example.com/',
        } as AssetInitOptions,
      };
    },
  };
  const wrapper = await mount(WrapperComponent);
  const component = wrapper.findComponent(PixiAssets);
  const assets = component.vm.assets;

  expect(assets.resolver.basePath).toBe('htts://example.com/');
});

it('should set default properties when none are given', () => {
  const wrapper = mount(PixiAssets);
  const assets = wrapper.vm.assets;

  expect(assets.resolver.basePath).toBe(null);
});
