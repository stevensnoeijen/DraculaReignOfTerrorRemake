import * as PIXI from 'pixi.js';
import { mount } from '@vue/test-utils';

import PixiApplication from './PixiApplication.vue';
import PixiTicker from './PixiTicker.vue';
import { MockedTicker } from './__mocks__/pixi.js';

beforeEach(() => {
  jest.mocked(PIXI.Application).mockClear();
});

it('should error when not placed inside a pixi-application', () => {
  expect(() => {
    mount(PixiTicker);
  }).toThrowError('pixi-ticker must be used inside pixi-application');
});

it('should load correctly', () => {
  const wrapper = mount(PixiApplication, {
    slots: {
      default: [PixiTicker],
    },
  });

  expect(wrapper.vm.application.ticker).toBeDefined();
  // added listeners to emits for add and addOnce
  expect(wrapper.vm.application.ticker.add).toHaveBeenCalled();
  expect(wrapper.vm.application.ticker.addOnce).toHaveBeenCalled();
});

it('should set properties', () => {
  const WrapperComponent = {
    template: `
    <PixiApplication>
      <PixiTicker :autoStart="true" :maxFPS="30" :minFPS="15" :speed="2"/>
    </PixiApplication>
    `,
    components: {
      PixiApplication,
      PixiTicker,
    },
  };
  const wrapper = mount(WrapperComponent);
  const app = wrapper.findComponent(PixiApplication);

  expect(app.vm.application.ticker.autoStart).toBe(true);
  expect(app.vm.application.ticker.maxFPS).toBe(30);
  expect(app.vm.application.ticker.minFPS).toBe(15);
  expect(app.vm.application.ticker.speed).toBe(2);
});

it('should add tick callbacks with no priority if not set', () => {
  const WrapperComponent = {
    template: `
    <PixiApplication>
      <PixiTicker/>
    </PixiApplication>
    `,
    components: {
      PixiApplication,
      PixiTicker,
    },
  };
  const wrapper = mount(WrapperComponent);
  const component = wrapper.findComponent(PixiApplication);
  const ticker = component.vm.application.ticker as unknown as MockedTicker;

  expect(ticker.add).toHaveBeenCalledWith(
    expect.any(Function),
    undefined,
    undefined
  );

  expect(ticker.addOnce).toHaveBeenCalledWith(
    expect.any(Function),
    undefined,
    undefined
  );
});

it('should add tick callbacks with set priority', () => {
  const WrapperComponent = {
    template: `
    <PixiApplication>
      <PixiTicker :priority="${PIXI.UPDATE_PRIORITY.HIGH}"/>
    </PixiApplication>
    `,
    components: {
      PixiApplication,
      PixiTicker,
    },
  };
  const wrapper = mount(WrapperComponent);
  const component = wrapper.findComponent(PixiApplication);
  const ticker = component.vm.application.ticker as unknown as MockedTicker;

  expect(ticker.add).toHaveBeenCalledWith(
    expect.any(Function),
    undefined,
    PIXI.UPDATE_PRIORITY.HIGH
  );

  expect(ticker.addOnce).toHaveBeenCalledWith(
    expect.any(Function),
    undefined,
    PIXI.UPDATE_PRIORITY.HIGH
  );
});

it('should emit tick', () => {
  const WrapperComponent = {
    template: `
    <PixiApplication>
      <PixiTicker/>
    </PixiApplication>
    `,
    components: {
      PixiApplication,
      PixiTicker,
    },
  };
  const wrapper = mount(WrapperComponent);
  const app = wrapper.findComponent(PixiApplication);
  const component = wrapper.findComponent(PixiTicker);
  const ticker = app.vm.application.ticker as unknown as MockedTicker;

  ticker.emit(1);

  expect(component.emitted<[number]>('tick')![0][0]).toBe(1);
  expect(component.emitted<[number]>('tickOnce')![0][0]).toBe(1);
});
