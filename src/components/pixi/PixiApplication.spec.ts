import { mount } from '@vue/test-utils';

import PixiApplication from './PixiApplication.vue';

test('should expose pixi application', () => {
  const wrapper = mount(PixiApplication);

  console.log(wrapper.vm.application); // this works!
});
