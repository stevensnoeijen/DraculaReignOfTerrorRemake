import { getEditableComponents } from './components';

describe('getEditableComponents', () => {
  it('should get all registered components', () => {
    const properties = getEditableComponents();

    expect(Object.keys(properties)).toHaveLength(4);
  });
});
