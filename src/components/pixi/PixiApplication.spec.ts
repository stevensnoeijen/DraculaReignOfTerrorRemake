import * as PIXI from 'pixi.js';
import { mount } from '@vue/test-utils';

import PixiApplication from './PixiApplication.vue';
import { MockedApplication } from './__mocks__/pixi.js';

beforeEach(() => {
  jest.mocked(PIXI.Application).mockClear();
});

it('should expose pixi application', () => {
  const wrapper = mount(PixiApplication);

  const application = wrapper.vm.application as MockedApplication;
  expect(application.__name).toEqual('mocked-pixi-application');
});

it('should not set any options in PIXI.Application when none are set', () => {
  mount(PixiApplication);

  expect(jest.mocked(PIXI.Application).mock.calls[0][0]).toBeUndefined();
});

it('should set all options in PIXI.Application when set in properties', () => {
  const props: Record<string, unknown> = {
    autoStart: true,
    width: 100,
    height: 200,
    view: document.createElement('canvas'),
    useContextAlpha: true,
    autoDensity: true,
    antialias: true,
    preserveDrawingBuffer: true,
    resolution: 10,
    forceCanvas: true,
    backgroundColor: 0xffffff,
    backgroundAlpha: 0.5,
    clearBeforeRender: true,
    powerPreference: 'low-power',
    sharedTicker: true,
    sharedLoader: true,
    resizeTo: window,
  };

  mount(PixiApplication, {
    props: {
      ...props,
    },
  });

  expect(jest.mocked(PIXI.Application).mock.calls[0][0]).toMatchObject({
    ...props,
  });
});
