import * as PIXI from 'pixi.js';
import { mount } from '@vue/test-utils';

import PixiApplication from './PixiApplication.vue';
import PixiTicker from './PixiTicker.vue';

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
  const WrapperComp = {
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
  const wrapper = mount(WrapperComp);
  const app = wrapper.findComponent(PixiApplication);

  expect(app.vm.application.ticker.autoStart).toBe(true);
  expect(app.vm.application.ticker.maxFPS).toBe(30);
  expect(app.vm.application.ticker.minFPS).toBe(15);
  expect(app.vm.application.ticker.speed).toBe(2);
});

// TODO: add tests for adding tick(Once) and remove when unmounted
