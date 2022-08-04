import { AssetInitOptions, Assets } from '@pixi/assets';
import { mount } from '@vue/test-utils';

import PixiAssets from './PixiAssets.vue';
import { LoadAsset, LoadBundle } from './types';

afterEach(() => jest.clearAllMocks());

it('should expose Assets', () => {
  const wrapper = mount(PixiAssets);
  const assets = wrapper.vm.assets;

  expect(assets).toBeDefined();
});

it('should init on mount', () => {
  mount(PixiAssets);

  expect(Assets.init).toBeCalled();
});

it('should set default properties when none are given', () => {
  mount(PixiAssets);

  expect(Assets.init).toBeCalledWith(undefined);
});

it('should set options', () => {
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
  mount(WrapperComponent);

  expect(Assets.init).toBeCalledWith({
    basePath: 'htts://example.com/',
  });
});

it('should load asset direct', async () => {
  const WrapperComponent = {
    template: `
    <PixiAssets
      :load-assets="assets"
    />
    `,
    components: {
      PixiAssets,
    },
    data() {
      return {
        assets: [
          {
            keysIn: 'bunnyBooBoo',
            assetsIn: '/bunny.png',
          },
        ] as LoadAsset[],
      };
    },
  };
  const wrapper = await mount(WrapperComponent);
  const assetsComponent = wrapper.getComponent(PixiAssets);
  await wrapper.vm.$nextTick();

  expect(Assets.add).toHaveBeenCalledWith(
    'bunnyBooBoo',
    '/bunny.png',
    undefined
  );
  expect(Assets.load).toHaveBeenCalledWith('bunnyBooBoo', expect.any(Function));

  expect(assetsComponent.emitted('assetProgress')).toHaveLength(1);
  expect(assetsComponent.emitted('assetLoaded')).toHaveLength(1);
});

it('should load asset in the background', async () => {
  const WrapperComponent = {
    template: `
    <PixiAssets
      :load-assets="assets"
      load-assets-strategy="background"
    />
    `,
    components: {
      PixiAssets,
    },
    data() {
      return {
        assets: [
          {
            keysIn: 'bunnyBooBoo',
            assetsIn: '/bunny.png',
          },
        ] as LoadAsset[],
      };
    },
  };
  const wrapper = await mount(WrapperComponent);
  await wrapper.vm.$nextTick();

  expect(Assets.add).toHaveBeenCalledWith(
    'bunnyBooBoo',
    '/bunny.png',
    undefined
  );
  expect(Assets.backgroundLoad).toHaveBeenCalledWith('bunnyBooBoo');
});

it('should load bundle direct', async () => {
  const WrapperComponent = {
    template: `
    <PixiAssets
      :load-bundles="bundles"
    />
    `,
    components: {
      PixiAssets,
    },
    data() {
      return {
        bundles: [
          {
            bundleId: 'animals',
            assets: {
              bunny: 'bunny.png',
              chicken: 'chicken.png',
              thumper: 'thumper.png',
            },
          },
        ] as LoadBundle[],
      };
    },
  };
  const wrapper = await mount(WrapperComponent);
  const assetsComponent = wrapper.getComponent(PixiAssets);
  await wrapper.vm.$nextTick();

  expect(Assets.addBundle).toHaveBeenCalledWith('animals', {
    bunny: 'bunny.png',
    chicken: 'chicken.png',
    thumper: 'thumper.png',
  });
  expect(Assets.loadBundle).toHaveBeenCalledWith(
    'animals',
    expect.any(Function)
  );

  expect(assetsComponent.emitted('bundleProgress')).toHaveLength(1);
  expect(assetsComponent.emitted('bundleLoaded')).toHaveLength(1);
});

it('should load bundle in the background', async () => {
  const WrapperComponent = {
    template: `
    <PixiAssets
      :load-bundles="bundles"
      load-bundles-strategy="background"
    />
    `,
    components: {
      PixiAssets,
    },
    data() {
      return {
        bundles: [
          {
            bundleId: 'animals',
            assets: {
              bunny: 'bunny.png',
              chicken: 'chicken.png',
              thumper: 'thumper.png',
            },
          },
        ] as LoadBundle[],
      };
    },
  };
  const wrapper = await mount(WrapperComponent);
  await wrapper.vm.$nextTick();

  expect(Assets.addBundle).toHaveBeenCalledWith('animals', {
    bunny: 'bunny.png',
    chicken: 'chicken.png',
    thumper: 'thumper.png',
  });
  expect(Assets.backgroundLoadBundle).toHaveBeenCalledWith('animals');
});

it('should unload assets on unmount', () => {
  const WrapperComponent = {
    template: `
    <PixiAssets
      :load-assets="assets"
      :load-bundles="bundles"
    />
    `,
    components: {
      PixiAssets,
    },
    data() {
      return {
        assets: [
          {
            keysIn: 'thumper',
            assetsIn: 'bunny.png',
          },
        ] as LoadAsset[],
        bundles: [
          {
            bundleId: 'animals',
            assets: {
              bunny: 'bunny.png',
              chicken: 'chicken.png',
              thumper: 'thumper.png',
            },
          },
        ] as LoadBundle[],
      };
    },
  };
  const wrapper = mount(WrapperComponent);
  wrapper.unmount();

  expect(Assets.unload).toBeCalledWith('thumper');
  expect(Assets.unloadBundle).toBeCalledWith('animals');
});
