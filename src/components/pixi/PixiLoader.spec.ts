import * as PIXI from 'pixi.js';
import { mount } from '@vue/test-utils';

import PixiApplication from './PixiApplication.vue';
import PixiLoader from './PixiLoader.vue';
import { MockedLoader } from './__mocks__/pixi.js';

beforeEach(() => {
  jest.mocked(PIXI.Application).mockClear();
});

it('should expose ticker', () => {
  const wrapper = mount(PixiApplication, {
    slots: {
      default: [PixiLoader],
    },
  });
  const loaderComponent = wrapper.getComponent(PixiLoader);
  const loader = loaderComponent.vm.loader as MockedLoader;

  expect(loader.__name).toBe('mocked-pixi-loader');
});

it('should error when not placed inside a pixi-application', () => {
  expect(() => {
    mount(PixiLoader);
  }).toThrowError('pixi-loader must be used inside pixi-application');
});

it('should have default properties', () => {
  const WrapperComponent = {
    template: `
    <PixiApplication>
      <PixiLoader/>
    </PixiApplication>
    `,
    components: {
      PixiApplication,
      PixiLoader,
    },
  };
  const wrapper = mount(WrapperComponent);
  const loaderComponent = wrapper.findComponent(PixiLoader);
  const loader = loaderComponent.vm.loader;

  expect(loader.baseUrl).toBe('');
  expect(loader.concurrency).toBe(10);
  expect(loader.defaultQueryString).toBe('');
});

it('should set properties', () => {
  const WrapperComponent = {
    template: `
    <PixiApplication>
      <PixiLoader
        baseUrl="https://pixijs.download/"
        :concurrency="1"
        defaultQueryString="test=true"
      />
    </PixiApplication>
    `,
    components: {
      PixiApplication,
      PixiLoader,
    },
  };
  const wrapper = mount(WrapperComponent);
  const loaderComponent = wrapper.findComponent(PixiLoader);
  const loader = loaderComponent.vm.loader;

  expect(loader.baseUrl).toBe('https://pixijs.download/');
  expect(loader.concurrency).toBe(1);
  expect(loader.defaultQueryString).toBe('test=true');
});

// TODO: load resource

// TODO: load multiple resources

// TODO: load=true

// TODO: set emit onComplete
// TODO: set emit onError
// TODO: set emit onLoad
// TODO: set emit onProgress
