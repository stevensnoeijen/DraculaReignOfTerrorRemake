import { AssetsClass, ResolveAsset, ResolverBundle } from '@pixi/assets';

export type PixiAssetsInstance = {
  assets: AssetsClass;
};

/**
 * Allows you to specify how to resolve any assets load requests.
 *
 * See different ways to load assets in the wiki;
 * @see https://pixijs.download/dev/docs/PIXI.Assets.html#add
 */
export type LoadAsset = {
  /**
   * The key or keys that you will reference when loading this asset
   */
  keysIn: string | string[];

  /**
   * The asset or assets that will be chosen from
   * when loading via the specified key
   */
  assetsIn: string | (ResolveAsset | string)[];

  /**
   * Asset-specific data that will be passed to the loaders
   * - Useful if you want to initiate loaded objects with specific data
   */
  data?: unknown;
};

/**
 * @see https://pixijs.download/dev/docs/PIXI.Assets.html#addBundle
 */
export type LoadBundle = {
  bundleId: string;
  assets: ResolverBundle['assets'];
};

export type LoadStrategy = 'direct' | 'background';
