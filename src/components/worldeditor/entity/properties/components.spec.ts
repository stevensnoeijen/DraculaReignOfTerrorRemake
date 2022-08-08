import { getPropertiesByComponents } from './components';

describe('getPropertiesByComponents', () => {
  it('should get all registered components', () => {
    const properties = getPropertiesByComponents();

    expect(Object.keys(properties)).toHaveLength(20);
  });
});
