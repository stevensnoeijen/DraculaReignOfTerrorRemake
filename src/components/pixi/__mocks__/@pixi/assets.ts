import { ProgressCallback } from '@pixi/assets';

const mockProgressCallback = (urls: unknown, onProgress?: ProgressCallback) => {
  if (onProgress != null) onProgress(1);
};

export const AssetsClass = jest.fn().mockImplementation(() => ({
  add: jest.fn(),
  addBundle: jest.fn(),
  backgroundLoad: jest.fn(),
  backgroundLoadBundle: jest.fn(),
  get: jest.fn(),
  init: jest.fn(),
  load: jest.fn().mockImplementation(mockProgressCallback),
  loadBundle: jest.fn().mockImplementation(mockProgressCallback),
  reset: jest.fn(),
  unload: jest.fn(),
  unloadBundle: jest.fn(),
}));

export const Assets = new AssetsClass();
