import * as PIXI from 'pixi.js';
import { mount, VueWrapper } from '@vue/test-utils';
import * as _ from 'lodash';

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
    mount(PixiLoader, {});
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
      <PixiLoader :startLoading="true" />
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

const createEmptyWrapperComponent = () => {
  return {
    template: `
      <PixiApplication>
        <PixiLoader />
      </PixiApplication>
      `,
    components: {
      PixiApplication,
      PixiLoader,
    },
  };
};

const createLoaderResource = () =>
  ({ name: 'mocked-pixi-loader-resource' } as PIXI.LoaderResource);

const createEmitSetup = (): [VueWrapper, PIXI.Loader] => {
  const WrapperComponent = createEmptyWrapperComponent();
  const wrapper = mount(WrapperComponent);
  const loaderComponent = wrapper.findComponent(PixiLoader);
  const loader = loaderComponent.vm.loader;

  loader.resources = {
    loadedfile: createLoaderResource(),
  };

  // @ts-ignore
  return [loaderComponent, loader];
};

it('should add listeners on mount', () => {
  const [, loader] = createEmitSetup();

  expect(loader.onStart.add).toHaveBeenCalled();
  expect(loader.onProgress.add).toHaveBeenCalled();
  expect(loader.onLoad.add).toHaveBeenCalled();
  expect(loader.onComplete.add).toHaveBeenCalled();
  expect(loader.onError.add).toHaveBeenCalled();
});

it('should remove listeners on unmount', () => {
  const WrapperComponent = createEmptyWrapperComponent();
  const wrapper = mount(WrapperComponent);
  const loaderComponent = wrapper.getComponent(PixiLoader);
  const loader = loaderComponent.vm.loader;

  wrapper.unmount();

  expect(loader.onStart.detach).toHaveBeenCalled();
  expect(loader.onProgress.detach).toHaveBeenCalled();
  expect(loader.onLoad.detach).toHaveBeenCalled();
  expect(loader.onComplete.detach).toHaveBeenCalled();
  expect(loader.onError.detach).toHaveBeenCalled();
});

it('should emit start', () => {
  const [loaderComponent, loader] = createEmitSetup();

  loader.onStart.dispatch(loader);

  expect(loaderComponent.emitted('start')![0]).toEqual([loader]);
});

it('should emit progress', () => {
  const [loaderComponent, loader] = createEmitSetup();

  const loadedResource = _.find(loader.resources);
  loader.onProgress.dispatch(loader, loadedResource);

  expect(loaderComponent.emitted('progress')![0]).toEqual([
    loader,
    loadedResource,
  ]);
});

it('should emit load', () => {
  const [loaderComponent, loader] = createEmitSetup();

  const loadedResource = _.find(loader.resources);
  loader.onLoad.dispatch(loader, loadedResource);

  expect(loaderComponent.emitted('load')![0]).toEqual([loader, loadedResource]);
});

it('should emit complete', () => {
  const [loaderComponent, loader] = createEmitSetup();

  loader.onComplete.dispatch(loader, loader.resources);

  expect(loaderComponent.emitted('complete')![0]).toEqual([
    loader,
    loader.resources,
  ]);
});

it('should emit error', () => {
  const [loaderComponent, loader] = createEmitSetup();

  const error = new Error('mock-error');
  const erroredResource = _.find(loader.resources);
  loader.onError.dispatch(error, loader, erroredResource);

  expect(loaderComponent.emitted('error')![0]).toEqual([
    error,
    loader,
    erroredResource,
  ]);
});
