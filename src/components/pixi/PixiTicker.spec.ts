import * as PIXI from 'pixi.js';
import { mount } from '@vue/test-utils';

import PixiApplication from './PixiApplication.vue';
import PixiTicker from './PixiTicker.vue';
import { MockedTicker } from './__mocks__/pixi.js';

beforeEach(() => {
  jest.mocked(PIXI.Application).mockClear();
});

it('should expose ticker', () => {
  const wrapper = mount(PixiApplication, {
    slots: {
      default: [PixiTicker],
    },
  });
  const tickerComponent = wrapper.getComponent(PixiTicker);
  const ticker = tickerComponent.vm.ticker as MockedTicker;

  expect(ticker.__name).toBe('mocked-pixi-ticker');
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
  const tickerComponent = wrapper.findComponent(PixiTicker);
  const ticker = tickerComponent.vm.ticker;

  expect(ticker.autoStart).toBe(true);
  expect(ticker.maxFPS).toBe(30);
  expect(ticker.minFPS).toBe(15);
  expect(ticker.speed).toBe(2);
});

it('should have default properties', () => {
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
  const tickerComponent = wrapper.findComponent(PixiTicker);
  const ticker = tickerComponent.vm.ticker;

  expect(ticker.autoStart).toBe(false);
  expect(ticker.maxFPS).toBe(0);
  expect(ticker.minFPS).toBe(10);
  expect(ticker.speed).toBe(1);
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
  const tickerComponent = wrapper.findComponent(PixiTicker);
  const ticker = tickerComponent.vm.ticker as MockedTicker;

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
  const tickerComponent = wrapper.findComponent(PixiTicker);
  const ticker = tickerComponent.vm.ticker as MockedTicker;

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
  const tickerComponent = wrapper.findComponent(PixiTicker);
  const ticker = tickerComponent.vm.ticker as MockedTicker;

  ticker.emit(1);

  expect(tickerComponent.emitted<[number]>('tick')![0][0]).toBe(1);
  expect(tickerComponent.emitted<[number]>('tickOnce')![0][0]).toBe(1);
});

it('should add listeners on mount', () => {
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
  const tickerComponent = wrapper.findComponent(PixiTicker);
  const ticker = tickerComponent.vm.ticker as MockedTicker;

  expect(ticker.add).toHaveBeenCalled();
  expect(ticker.addOnce).toHaveBeenCalled();
});

it('should remove listeners on unmount', () => {
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
  const tickerComponent = wrapper.findComponent(PixiTicker);
  const ticker = tickerComponent.vm.ticker as MockedTicker;

  wrapper.unmount();

  expect(ticker.remove).toHaveBeenCalledTimes(2);
});
