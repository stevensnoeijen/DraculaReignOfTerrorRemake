import { ProgressCallback } from '@pixi/assets';

const mockedLoad = (urls: unknown, onProgress?: ProgressCallback) => {
  if (onProgress != null) onProgress(1);

  if (Array.isArray(urls)) {
    return Promise.resolve(
      urls.reduce((prev, url) => ({ ...prev, [url]: 'mocked-data' }), {})
    );
  } else {
    return Promise.resolve('mocked-data');
  }
};

export const AssetsClass = jest.fn().mockImplementation(() => ({
  add: jest.fn(),
  addBundle: jest.fn(),
  backgroundLoad: jest.fn(),
  backgroundLoadBundle: jest.fn(),
  get: jest.fn(),
  init: jest.fn(),
  load: jest.fn().mockImplementation(mockedLoad),
  loadBundle: jest.fn().mockImplementation(mockedLoad),
  reset: jest.fn(),
  unload: jest.fn(),
  unloadBundle: jest.fn(),
}));

export const Assets = new AssetsClass();
