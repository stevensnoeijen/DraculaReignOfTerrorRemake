<template>
  <slot name="default" :assets="assets" />
</template>

<script lang="ts" setup>
import { AssetInitOptions, Assets as assets } from '@pixi/assets';
import { onMounted, onUnmounted, PropType } from 'vue';

import {
  PixiAssetsInstance,
  LoadAsset,
  LoadBundle,
  LoadStrategy,
} from './types';

defineExpose<PixiAssetsInstance>({
  assets,
});

const props = defineProps({
  /**
   * @type {AssetInitOptions}
   * @default undefined
   * @description
   * Initialization options object for Asset Class.
   * @memberof PIXI
   * @see https://pixijs.download/dev/docs/PIXI.Assets.html#init
   */
  options: {
    type: Object as PropType<AssetInitOptions>,
    required: false,
    default: undefined,
  },

  /**
   * @type {LoadAsset[]}
   * @default undefined
   * @description
   * Allows you to specify how to resolve any assets load requests.
   * There are a few ways to load the assets, see bellow
   * @see {@link #loadAssetsStrategy} what emits are called when loading
   * @see https://pixijs.download/dev/docs/PIXI.Assets.html#add
   */
  loadAssets: {
    type: Array as PropType<LoadAsset[]>,
    required: false,
    default: undefined,
  },

  /**
   * @type {LoadStrategy}
   * @default 'direct'
   * @description
   * Load strategy for {@link #loadAssets} when set to 'direct' (default),
   * 'assetProgress' emit is called on progress
   * and 'assetLoaded' emit is called when the asset is loaded.
   * Otherwise no emits are called.
   * @see https://pixijs.download/dev/docs/PIXI.Assets.html#load
   * @see https://pixijs.download/dev/docs/PIXI.Assets.html#backgroundLoad
   */
  loadAssetsStrategy: {
    type: String as PropType<LoadStrategy>,
    required: false,
    default: 'direct',
  },

  /**
   * @type {LoadBundle[]}
   * @default undefined
   * @description
   * This adds a bundle of assets in one go
   * so that you can load them as a group.
   * For example you could add a bundle for each screen in you pixi app
   * @see {@link #loadBundlesStrategy} what emits are called when loading
   * @see https://pixijs.download/dev/docs/PIXI.Assets.html#addBundle
   */
  loadBundles: {
    type: Array as PropType<LoadBundle[]>,
    required: false,
    default: undefined,
  },

  /**
   * @type {LoadStrategy}
   * @default 'direct'
   * @description
   * Load strategy for {@link #loadBundles} when set to 'direct' (default),
   * 'bundleProgress' emit is called on progress
   * and 'bundleLoaded' emit is called when the asset is loaded.
   * Otherwise no emits are called.
   * @see https://pixijs.download/dev/docs/PIXI.Assets.html#load
   * @see https://pixijs.download/dev/docs/PIXI.Assets.html#backgroundLoad
   */
  loadBundlesStrategy: {
    type: String as PropType<LoadStrategy>,
    required: false,
    default: 'direct',
  },
});

const emits = defineEmits<{
  /**
   * optional function that is called when progress on asset loading is made.
   * The function is passed a single parameter, `progress`,
   * which represents the percentage (0.0 - 1.0) of the assets loaded.
   */
  (event: 'assetProgress', assetId: string | string[], progress: number): void;

  /**
   * Called when one asset is loaded.
   */
  (event: 'assetLoaded', assetId: string, asset: any): void;

  /**
   * optional function that is called when progress on asset loading is made.
   * The function is passed a single parameter, `progress`,
   * which represents the percentage (0.0 - 1.0) of the assets loaded.
   */
  (event: 'bundleProgress', bundleId: string, progress: number): void;

  /**
   * Called when one bundle is loaded.
   */
  (event: 'bundleLoaded', bundleId: string, bundle: any): void;
}>();

const loadAssetsDirect = async (loadAssets: LoadAsset[]) => {
  await Promise.all(
    loadAssets.map(async (loadAsset) => {
      const loadedAssets = await assets.load(loadAsset.keysIn, (progress) =>
        emits('assetProgress', loadAsset.keysIn, progress)
      );

      if (Array.isArray(loadAsset.keysIn)) {
        loadAsset.keysIn.forEach((keyIn) => {
          emits('assetLoaded', keyIn, loadedAssets[keyIn]);
        });
      } else {
        emits('assetLoaded', loadAsset.keysIn, loadedAssets);
      }
    })
  );
};

const loadAssetsInBackground = (loadAssets: LoadAsset[]) => {
  loadAssets.forEach((loadAsset) => assets.backgroundLoad(loadAsset.keysIn));
};

const loadAssets = async () => {
  if (props.loadAssets != null) {
    props.loadAssets.forEach((loadAsset) => {
      assets.add(loadAsset.keysIn, loadAsset.assetsIn, loadAsset.data);
    });

    if (props.loadAssetsStrategy === 'direct') {
      await loadAssetsDirect(props.loadAssets);
    } else {
      loadAssetsInBackground(props.loadAssets);
    }
  }
};

const loadBundlesDirect = async (loadBundles: LoadBundle[]) => {
  await Promise.all(
    loadBundles.map(async (loadBundle) => {
      const loadedBundle = await assets.loadBundle(
        loadBundle.bundleId,
        (progress) => emits('bundleProgress', loadBundle.bundleId, progress)
      );

      emits('bundleLoaded', loadBundle.bundleId, loadedBundle);
    })
  );
};

const loadBundlesInBackground = (loadBundles: LoadBundle[]) =>
  loadBundles.forEach((loadBundle) =>
    assets.backgroundLoadBundle(loadBundle.bundleId)
  );

const loadBundles = async () => {
  if (props.loadBundles != null) {
    props.loadBundles.forEach((loadBundle) =>
      assets.addBundle(loadBundle.bundleId, loadBundle.assets)
    );

    if (props.loadBundlesStrategy === 'direct') {
      await loadBundlesDirect(props.loadBundles);
    } else {
      loadBundlesInBackground(props.loadBundles);
    }
  }
};

onMounted(async () => {
  if (!assets['_initialized'] == false) {
    await assets.init(props.options);
  }
  await Promise.all([loadAssets(), loadBundles()]);
});

const unloadAssets = () => {
  if (props.loadAssets != null) {
    props.loadAssets.forEach((loadAsset) => assets.unload(loadAsset.keysIn));
  }
};

const unloadBundles = () => {
  if (props.loadBundles != null) {
    props.loadBundles.forEach((loadBundle) =>
      assets.unloadBundle(loadBundle.bundleId)
    );
  }
};

onUnmounted(() => {
  unloadAssets();
  unloadBundles();
});
</script>
