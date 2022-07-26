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

it('should have empty queue when nothing is set', () => {
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

  expect(loader.add).not.toBeCalled();
});

it('should add reources to the loader queue', () => {
  const WrapperComponent = {
    template: `
    <PixiApplication>
      <PixiLoader
        :loadResources="['test.png']"
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

  expect(loader.add).toBeCalledWith(['test.png']);
});

it('should add multiple reources to the loader queue', () => {
  const WrapperComponent = {
    template: `
    <PixiApplication>
      <PixiLoader
        :loadResources="['test.png', 'test2.png']"
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

  expect(loader.add).toBeCalledWith(['test.png', 'test2.png']);
});

it('should call load when set to true', () => {
  const WrapperComponent = {
    template: `
    <PixiApplication>
      <PixiLoader :load="true" />
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

  expect(loader.load).toBeCalledWith();
});

// TODO: set emit onComplete
// TODO: set emit onError
// TODO: set emit onLoad
// TODO: set emit onProgress
